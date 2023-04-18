import mongoose from "mongoose";
import { logInfo } from "../util/logging.js";
import validateAllowedFields from "../util/validateAllowedFields.js";
import Numerator from "./ClientNumberCounter.js";

const clientSchema = new mongoose.Schema(
  {
    clientNumber: { type: String, unique: true },
    clientName: { type: String, required: true },
    gender: { type: String, enum: ["M", "V"], required: true },
    age: { type: Number, required: true },
    municipality: { type: String, required: true },
    disabilityType: { type: String, required: true },
    disability: { type: String, required: true },
    email: { type: String, required: true },
    phone: Number,
    address: String,
    postCode: String,
    category: String,
    extraInformation: String,
    keyWords: [String],
    advisor: String,
    matchedCoordinators: [mongoose.ObjectId],
    acceptedCoordinators: [mongoose.ObjectId],
    rejectedCoordinators: [mongoose.ObjectId],
    isEmailSent: { type: Boolean, default: false },
    isClosed: { type: Boolean, default: false },
  },
  { timestamps: true }
);

//* This part creates clientNumber before saving new client
clientSchema.pre("save", async function (next) {
  let nextClientNumber;
  try {
    const lastUsedNumber = await Numerator.find();

    if (lastUsedNumber.length === 0) {
      nextClientNumber = 1000;
      await Numerator.create({ lastClientNumber: nextClientNumber });
    } else {
      const lastClientNumber = lastUsedNumber[0].lastClientNumber;
      nextClientNumber = lastClientNumber + 1;
      await Numerator.findOneAndUpdate(
        { lastClientNumber: nextClientNumber - 1 },
        { lastClientNumber: nextClientNumber }
      );
    }
    this.clientNumber = "P" + nextClientNumber;

    next();
  } catch (error) {
    logInfo(error);
    errorList.push("There is a problem for creating client number.");
  }
});

const Client = mongoose.model("clients", clientSchema);
export const validateClient = (clientObject) => {
  const errorList = [];
  const allowedKeys = [
    "clientName",
    "gender",
    "age",
    "municipality",
    "disability",
    "disabilityType",
    "address",
    "postCode",
    "email",
    "phone",
    "category",
    "extraInformation",
    "keyWords",
    "advisor",
    "matchedCoordinators",
    "acceptedCoordinators",
    "rejectedCoordinators",
    "isEmailSent",
    "isClosed",
  ];

  const validatedKeysMessage = validateAllowedFields(clientObject, allowedKeys);

  if (validatedKeysMessage.length > 0) {
    errorList.push(validatedKeysMessage);
  }

  if (clientObject.clientName == null) {
    errorList.push("clientName is a required field");
  }
  if (clientObject.gender == null) {
    errorList.push("gender is a required field");
  }
  if (clientObject.age == null) {
    errorList.push("age is a required field");
  }
  if (clientObject.municipality == null) {
    errorList.push("municipality is a required field");
  }
  if (clientObject.disabilityType == null) {
    errorList.push("disabilityType is a required field");
  }

  return errorList;
};

export default Client;
