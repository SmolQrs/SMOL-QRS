import Category from "../models/Category.js";
import User from "../models/User.js";
import { logError, logInfo } from "../util/logging.js";

export const addNewKeyWord = async (req, res) => {
  const { email } = req.user;
  const { title } = req.params;
  const newKeyword = req.body;

  try {
    const user = await User.findOne({ email: email });
    if (user.role === "admin") {
      await Category.updateOne(
        { title: title },
        { $push: { keyWords: newKeyword } }
      );
      const category = await Category.findOne({ title: title });
      res.status(200).json({ success: true, result: category });
    } else {
      res.status(401).json({
        success: false,
        msg: "You haven't got authorization to add a new keyword",
      });
    }
  } catch (error) {
    res.status(200).json({
      success: false,
      msg: "Unable to get categories, try again later",
    });
  }
};

export const updateKeyWord = async (req, res) => {
  const { email } = req.user;
  const { keyWordId } = req.params;
  const newKeyWord = req.body;

  try {
    const user = await User.findOne({ email: email });
    if (user.role === "admin") {
      await Category.updateOne(
        { "keyWords._id": keyWordId },
        {
          $set: {
            "keyWords.$.keyWord": newKeyWord.keyWord,
            "keyWords.$.definition": newKeyWord.definition,
          },
        }
      );
      const category = await Category.findOne({
        "keyWords._id": keyWordId,
      });
      res.status(200).json({ success: true, result: category });
    } else {
      res.status(401).json({
        success: false,
        msg: "You haven't got authorization to update a keyword",
      });
    }
  } catch (error) {
    logError(error);
    res.status(200).json({
      success: false,
      msg: "Unable to get categories, try again later",
    });
  }
};
export const deleteKeyWord = async (req, res) => {
  const { email } = req.user;
  const { keyWordId } = req.params;

  try {
    const user = await User.findOne({ email: email });
    if (user.role === "admin") {
      await Category.updateOne(
        { "keyWords._id": keyWordId },
        {
          $pull: { keyWords: { _id: keyWordId } },
        }
      );

      res
        .status(200)
        .json({ success: true, msg: "KeyWord is deleted successfully" });
    } else {
      res.status(401).json({
        success: false,
        msg: "You haven't got authorization to delete a keyword",
      });
    }
  } catch (error) {
    logError(error);
    res.status(200).json({
      success: false,
      msg: "Unable to delete keyWord, try again later",
    });
  }
};
