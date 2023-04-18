import mongoose from "mongoose";
import validateAllowedFields from "../util/validateAllowedFields.js";

const municipalitySchema = new mongoose.Schema({
  municipalityName: { type: String, required: true },
});

const Municipality = mongoose.model("municipalities", municipalitySchema);

export const validateMunicipality = (municipalityObject) => {
  const errorList = [];
  const allowedKeys = ["title", "keyWords"];

  const validatedKeysMessage = validateAllowedFields(
    municipalityObject,
    allowedKeys
  );

  if (validatedKeysMessage.length > 0) {
    errorList.push(validatedKeysMessage);
  }

  if (municipalityObject.municipalityName == null) {
    errorList.push("municipality name is a required field");
  }

  return errorList;
};

export default Municipality;
