import User, { validateUser } from "../models/User.js";
import Organization from "../models/Organization.js";
import { logError, logInfo } from "../util/logging.js";
import validationErrorMessage from "../util/validationErrorMessage.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { sendSms, verifySms } from "../services/sms_service/twillo.js";
import { newUserEmailTemplate } from "../services/email_service/newUserEmailTemplate.js";
import { emailSender } from "../services/email_service/email.js";
import { passwordChangeEmailTemplate } from "../services/email_service/passwordChangeEmailTemplate.js";

export const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token === null) return res.sendStatus(401);
  try {
    const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = user;

    next();
  } catch (error) {
    res.status(400).json({ success: false, msg: error.message });
  }
};

export const getUser = async (req, res) => {
  const { email } = req.user;
  try {
    const user = await User.findOne({ email: email }, { password: false });
    res.status(200).json({ success: true, result: user });
  } catch (error) {
    logError(error);
    res
      .status(500)
      .json({ success: false, msg: "Unable to get user, try again later" });
  }
};

export const getCoWorkers = async (req, res) => {
  const { email } = req.user;
  try {
    const user = await User.findOne({ email: email });
    const organization = user?.organizationName;
    const coWorkers = await User.find({ organizationName: organization });
    res.status(200).json({ success: true, result: coWorkers });
  } catch (error) {
    logError(error);
    res
      .status(500)
      .json({ success: false, msg: "Unable to get user, try again later" });
  }
};

export const getCoWorker = async (req, res) => {
  const { id } = req.params;
  const { email } = req.user;
  try {
    const authUser = await User.findOne({ email: email });
    if (authUser?.role === "coordinator") {
      const coworker = await User.findById(id, { password: false });
      res.status(200).json({ success: true, result: coworker });
    } else {
      res.status(401).json({
        success: false,
        msg: "You are unauthorized to get the user info",
      });
    }
  } catch (error) {
    logError(error);
    res
      .status(500)
      .json({ success: false, msg: "Unable to get user, try again later" });
  }
};

export const createUser = async (req, res) => {
  try {
    const user = req.body;

    if (typeof user !== "object") {
      res.status(400).json({
        success: false,
        msg: `You need to provide a 'user' object. Received: ${JSON.stringify(
          user
        )}`,
      });

      return;
    }

    const errorList = validateUser(user);

    if (errorList.length > 0) {
      res
        .status(400)
        .json({ success: false, msg: validationErrorMessage(errorList) });
    } else {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      const userInfo = {
        ...user,
        password: hashedPassword,
      };
      const newUser = await User.create(userInfo);
      const html = newUserEmailTemplate(user, newUser, req.body.password);
      await emailSender({
        from: "noreply@smol-qrs.nl",
        to: `${newUser.email}`,
        subject: "Nieuw Gebruiker",
        html: html,
      });

      if (newUser?.role === "coordinator") {
        await Organization.findOneAndUpdate(
          { organizationName: user.organizationName },
          { $addToSet: { coordinators: newUser._id } }
        );
      }
      if (newUser?.role === "intaker")
        await Organization.findOneAndUpdate(
          { organizationName: user.organizationName },
          { $addToSet: { advisors: newUser._id } }
        );

      res.status(201).json({ success: true, result: newUser });
    }
  } catch (error) {
    logError(error);
    res.status(500).json({
      success: false,
      error: error,
      msg: "Unable to create the user",
    });
  }
};

export const smsAuthentication = async (req, res) => {
  const { email, password } = req.body;
  if (email.trim().length === 0) {
    res.status(400).json({ success: false, msg: "Vul het mailadres in." });
    return;
  }

  if (password.trim().length === 0) {
    res.status(400).json({ success: false, msg: "Vul het wachtwoord in." });
    return;
  }

  try {
    const user = await User.findOne({ email: email });

    if (user === null) {
      res.status(401).json({
        success: false,
        msg: "Mailadres is niet correct. Probeer opnieuw.",
      });
    } else {
      const result = await bcrypt.compare(password, user.password);
      if (result !== true) {
        res.status(401).json({
          success: false,
          msg: "Wachtwoord is niet correct. Probeer opnieuw.",
        });
      } else {
        const serviceSid = await sendSms(user.phone);
        const smsToken = jwt.sign(serviceSid, process.env.ACCESS_TOKEN_SECRET);
        res.status(200).json({
          success: true,
          result: { msg: "Sms code is verzonden.", smsToken: smsToken },
        });
      }
    }
  } catch (error) {
    logError(error);
    res.status(500).json({ success: false, msg: error.message });
  }
};

export const login = async (req, res) => {
  const { email, smsCode, smsToken } = req.body;
  try {
    const serviceSid = jwt.verify(smsToken, process.env.ACCESS_TOKEN_SECRET);
    const user = await User.findOne({ email: email });
    const isSmsCodeValid = await verifySms(user.phone, smsCode, serviceSid);
    if (isSmsCodeValid === "approved") {
      const accessToken = jwt.sign(
        { email: email },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "480h" }
      );
      const userData = await User.findOne(
        { email: email },
        { password: false }
      );
      res.status(201).json({
        success: true,
        result: { user: userData, accessToken: accessToken },
      });
    }
  } catch (error) {
    logError(error);
    res.status(500).json({ success: false, msg: error.message });
  }
};

export const updateUser = async (req, res) => {
  const { email } = req.user;
  const { id } = req.params;
  let hashedPassword;
  try {
    const authUser = await User.findOne({ email: email });
    if (authUser?.role === "admin" || authUser?.role === "coordinator") {
      if (req.body.password) {
        hashedPassword = await bcrypt.hash(req.body.password, 10);
        await User.findOneAndUpdate(
          { _id: id },
          { ...req.body, password: hashedPassword }
        );
      } else {
        await User.findOneAndUpdate({ _id: id }, req.body);
      }

      const updatedUser = await User.findById(id, { password: false });
      res.status(200).json({
        success: true,
        result: updatedUser,
      });
    } else {
      res
        .status(401)
        .json({ success: false, msg: "You are unauthorized to update user" });
    }
  } catch (error) {
    logError(error);
    res
      .status(500)
      .json({ success: false, msg: "Unable to update user, try again later" });
  }
};
export const sendPasswordChangeLink = async (req, res) => {
  const { email } = req.body;
  if (email.trim().length === 0) {
    res.status(400).json({ success: false, msg: "Vul het mailadres in." });
    return;
  }
  try {
    const user = await User.findOne({ email: email });

    if (user === null) {
      res.status(401).json({
        success: false,
        msg: "Mailadres is niet correct. Probeer opnieuw.",
      });
    } else {
      const accessToken = jwt.sign(
        { email: email },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "30m" }
      );
      const html = passwordChangeEmailTemplate(accessToken);
      await emailSender({
        from: "noreply@smol-qrs.nl",
        to: `${email}`,
        subject: "Nieuw Wachtwoord link",
        html: html,
      });
      res.status(200).json({
        success: true,
        msg: "Wachtwoord wijzigen link verzonden.",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: "Wijzigingen niet opgeslagen. Probeer opnieuw.",
    });
  }
};

export const changePassword = async (req, res) => {
  const { email } = req.user;
  const { password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.findOneAndUpdate({ email: email }, { password: hashedPassword });
    const updatedUser = await User.findOne(
      { email: email },
      { password: false }
    );
    res.status(200).json({
      success: true,
      result: updatedUser,
    });
  } catch (error) {
    logError(error);
    res
      .status(500)
      .json({ success: false, msg: "Unable to update user, try again later" });
  }
};

export const deleteUser = async (req, res) => {
  const { email } = req.user;
  const { id } = req.params;
  try {
    const authUser = await User.findOne({ email: email });
    if (authUser?.role === "admin" || authUser?.role === "coordinator") {
      await User.findByIdAndDelete(id);
      res.status(200).json({
        success: true,
        msg: "User is deleted successfully",
      });
    } else {
      res
        .status(401)
        .json({ success: false, msg: "You are unauthorized to delete user" });
    }
  } catch (error) {
    logError(error);
    res.status(500).json({
      success: false,
      msg: "Wijzigingen niet opgeslagen. Probeer opnieuw.",
    });
  }
};

// export const addFavorite = async (req, res) => {
//   const email = req.user;
//   const { productId } = req.params;
//   try {
//     const user = await User.findOne({ email: email });
//     const isProductFavorite = user.favorites.some(
//       (product) => product.productId.toString() === productId
//     );
//     if (!isProductFavorite) {
//       await User.findOneAndUpdate(
//         { email: req.user },
//         { $push: { favorites: { productId } } }
//       );
//     } else {
//       await User.findOneAndUpdate(
//         { email: req.user },
//         { $pull: { favorites: { productId } } }
//       );
//     }
//     const updatedUser = await User.findOne(
//       { email: email },
//       { password: false }
//     )
//       .populate({
//         path: "recentViews.productId",
//         select: "images price title rate",
//       })
//       .populate({
//         path: "shoppingCart.productId",
//         select: "images price title inStock rate brand",
//       })
//       .exec();
//     res.status(200).json({
//       success: true,
//       result: updatedUser,
//     });
//   } catch (error) {
//     logError(error);
//     res
//       .status(500)
//       .json({ success: false, msg: "Unable to update user, try again later" });
//   }
// };

// export const addToRecentViews = async (req, res) => {
//   const email = req.user;
//   const { productId } = req.params;
//   const { category, subCategory } = req.body;
//   try {
//     const user = await User.findOne({ email: email });
//     const isProductInRecent = user.recentViews.some(
//       (product) => product.productId?.toString() === productId
//     );
//     if (!isProductInRecent) {
//       await User.findOneAndUpdate(
//         { email: req.user },
//         {
//           $push: {
//             recentViews: {
//               $each: [{ productId, category, subCategory }],
//               $position: 0,
//               $slice: 5,
//             },
//           },
//         }
//       );
//     } else {
//       await User.findOneAndUpdate(
//         { email: req.user },
//         { $pull: { recentViews: { productId } } }
//       );
//       await User.findOneAndUpdate(
//         { email: req.user },
//         {
//           $push: {
//             recentViews: {
//               $each: [{ productId, category, subCategory }],
//               $position: 0,
//               $slice: 5,
//             },
//           },
//         }
//       );
//     }
//     const updatedUser = await User.findOne(
//       { email: email },
//       { password: false }
//     )
//       .populate({
//         path: "recentViews.productId",
//         select: "images price title rate",
//       })
//       .populate({
//         path: "shoppingCart.productId",
//         select: "images price title inStock rate brand",
//       })
//       .exec();
//     res.status(200).json({
//       success: true,
//       result: updatedUser,
//     });
//   } catch (error) {
//     logError(error);
//     res
//       .status(500)
//       .json({ success: false, msg: "Unable to update user, try again later" });
//   }
// };
