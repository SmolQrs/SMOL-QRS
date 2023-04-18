import mongoose from "mongoose";
import validateAllowedFields from "../util/validateAllowedFields.js";

const categorySchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    keyWords: [{ keyWord: String, definition: String }],
  },
  { timestamps: true }
);

const Category = mongoose.model("categories", categorySchema);

export const validateCategory = (categoryObject) => {
  const errorList = [];
  const allowedKeys = ["title", "keyWords"];

  const validatedKeysMessage = validateAllowedFields(
    categoryObject,
    allowedKeys
  );

  if (validatedKeysMessage.length > 0) {
    errorList.push(validatedKeysMessage);
  }

  if (categoryObject.title == null) {
    errorList.push("title is a required field");
  }

  return errorList;
};

export default Category;
