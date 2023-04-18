import mongoose from "mongoose";
import validateAllowedFields from "../util/validateAllowedFields.js";

const keyWordSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    definition: String,
    categories: [String],
  },
  { timestamps: true }
);

const KeyWord = mongoose.model("keyWords", keyWordSchema);

export const validateKeyWord = (keyWordObject) => {
  const errorList = [];
  const allowedKeys = ["title", "definition", "categories"];

  const validatedKeysMessage = validateAllowedFields(
    keyWordObject,
    allowedKeys
  );

  if (validatedKeysMessage.length > 0) {
    errorList.push(validatedKeysMessage);
  }

  if (keyWordObject.title == null) {
    errorList.push("title is a required field");
  }

  return errorList;
};

export default KeyWord;
