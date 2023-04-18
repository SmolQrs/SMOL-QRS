import Category, { validateCategory } from "../models/Category.js";
import User from "../models/User.js";

import { logError, logInfo } from "../util/logging.js";
import validationErrorMessage from "../util/validationErrorMessage.js";

export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json({ success: true, result: categories });
  } catch (error) {
    logError(error);
    res.status(500).json({
      success: false,
      msg: "Unable to get categories, try again later",
    });
  }
};

export const createCategory = async (req, res) => {
  const { email } = req.user;
  const newCategory = req.body;
  try {
    const user = await User.findOne({ email: email });

    if (typeof newCategory !== "object") {
      res.status(400).json({
        success: false,
        msg: `You need to provide a 'category' object. Received: ${JSON.stringify(
          newCategory
        )}`,
      });

      return;
    }
    const errorList = [];
    validateCategory(newCategory);

    if (user.role !== "admin") {
      errorList.push("You haven't got authorization to create new category");
    }

    if (errorList.length > 0) {
      res
        .status(400)
        .json({ success: false, msg: validationErrorMessage(errorList) });
    } else {
      const category = await Category.create(newCategory);

      res.status(201).json({ success: true, result: category });
    }
  } catch (error) {
    logError(error);
    res.status(500).json({
      success: false,
      msg: "Unable to create category, try again later",
    });
  }
};

export const getCategory = async (req, res) => {
  try {
    const { title } = req.params;
    const category = await Category.findOne({ title: title });
    res.status(200).json({ success: true, result: category });
  } catch (error) {
    logError(error);
    res.status(500).json({
      success: false,
      msg: "Unable to get category, try again later",
    });
  }
};

export const filterCategories = async (req, res) => {
  const { query } = req.query;
  try {
    const categories = await Category.find({
      title: { $regex: query, $options: "i" },
    });
    res.status(200).json({ success: true, result: categories });
  } catch (error) {
    logError(error);
    res.status(500).json({
      success: false,
      msg: "Unable to get categories, try again later",
    });
  }
};

export const updateCategory = async (req, res) => {
  const { email } = req.user;
  const { id } = req.params;
  try {
    const user = await User.findOne({ email: email });
    if (user.role === "admin") {
      await Category.findByIdAndUpdate(id, req.body);
      const updatedCategory = await Category.findById(id);
      res.status(200).json({ success: true, result: updatedCategory });
    } else {
      res.status(401).json({
        success: false,
        msg: "You haven't got authorization to update an category",
      });
    }
  } catch (error) {
    logError(error);
    res.status(500).json({
      success: false,
      msg: "Unable to update category, try again later",
    });
  }
};
export const deleteCategory = async (req, res) => {
  const { email } = req.user;
  const { id } = req.params;
  try {
    const user = await User.findOne({ email: email });
    if (user.role === "admin") {
      await Category.findByIdAndDelete(id);
      res.status(200).json({
        success: true,
        msg: `Category with id: ${id} deleted from database`,
      });
    } else {
      res.status(401).json({
        success: false,
        msg: "You haven't got authorization to delete an category",
      });
    }
  } catch (error) {
    logError(error);
    res.status(500).json({
      success: false,
      msg: "Unable to delete category, try again later",
    });
  }
};
