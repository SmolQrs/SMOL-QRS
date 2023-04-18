import mongoose from "mongoose";
import validateAllowedFields from "../util/validateAllowedFields.js";

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["admin", "intaker", "coordinator"],
    required: true,
  },
  organizationName: String,
  clients: [String],
  phone: { type: String, required: true },
  address: String,
  postCode: String,
  municipalities: [String],
  categories: [String],
});

const User = mongoose.model("users", userSchema);

export const validateUser = (userObject) => {
  const errorList = [];
  const allowedKeys = [
    "firstName",
    "lastName",
    "email",
    "password",
    "role",
    "phone",
    "address",
    "postCode",
    "municipalities",
    "categories",
    "organizationName",
  ];

  const validatedKeysMessage = validateAllowedFields(userObject, allowedKeys);

  if (validatedKeysMessage.length > 0) {
    errorList.push(validatedKeysMessage);
  }

  if (userObject.email == null) {
    errorList.push("email is a required field");
  }

  if (userObject.password == null) {
    errorList.push("password is a required field");
  }
  if (userObject.role == null) {
    errorList.push("role is a required field");
  }
  if (userObject.phone == null) {
    errorList.push("phone is a required field");
  }
  return errorList;
};

export default User;
