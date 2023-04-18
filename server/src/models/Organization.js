import mongoose from "mongoose";
import validateAllowedFields from "../util/validateAllowedFields.js";

const organizationSchema = new mongoose.Schema({
  organizationName: { type: String, required: true },
  forGender: { type: String, default: "all" },
  minAge: { type: Number, default: 0 },
  maxAge: { type: Number, default: 100 },
  disabilities: [String],
  coordinators: [{ type: mongoose.ObjectId, ref: "users" }],
  advisors: [{ type: mongoose.ObjectId, ref: "users" }],
});

const Organization = mongoose.model("organizations", organizationSchema);

export const validateOrganization = (organizationObject) => {
  const errorList = [];
  const allowedKeys = [
    "organizationName",
    "forGender",
    "minAge",
    "maxAge",
    "disabilities",
    "coordinators",
    "advisors",
  ];

  const validatedKeysMessage = validateAllowedFields(
    organizationObject,
    allowedKeys
  );

  if (validatedKeysMessage.length > 0) {
    errorList.push(validatedKeysMessage);
  }

  if (organizationObject.organizationName == null) {
    errorList.push("organizationName is a required field");
  }

  return errorList;
};

export default Organization;
