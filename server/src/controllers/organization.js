import mongoose from "mongoose";
import Organization, { validateOrganization } from "../models/Organization.js";
import User, { validateUser } from "../models/User.js";
import bcrypt from "bcrypt";

import { logError, logInfo } from "../util/logging.js";
import validationErrorMessage from "../util/validationErrorMessage.js";
import { newUserEmailTemplate } from "../services/email_service/newUserEmailTemplate.js";
import { emailSender } from "../services/email_service/email.js";

export const getOrganizations = async (req, res) => {
  try {
    const organizations = await Organization.find({}).sort({
      organizationName: 1,
    });
    res.status(200).json({ success: true, result: organizations });
  } catch (error) {
    logError(error);
    res.status(500).json({
      success: false,
      msg: "Unable to get organizations, try again later",
    });
  }
};

export const createOrganization = async (req, res) => {
  const adminEmail = req.user.email;

  const { organizationName, firstName, lastName, email, phone, password } =
    req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const newCoordinator = {
    firstName,
    lastName,
    email,
    phone,
    password: hashedPassword,
    organizationName,
    role: "coordinator",
  };
  try {
    const user = await User.findOne({ email: adminEmail });
    const errorList = [];
    validateUser(newCoordinator);

    if (user.role !== "admin") {
      errorList.push(
        "You haven't got authorization to create new organization"
      );
    }

    if (errorList.length > 0) {
      res
        .status(400)
        .json({ success: false, msg: validationErrorMessage(errorList) });
    } else {
      const coordinator = await User.create(newCoordinator);
      const html = newUserEmailTemplate(user, coordinator, password);
      await emailSender({
        from: "badboymiharbi@gmail.com",
        to: `${coordinator.email}`,
        subject: "Nieuw Coordinator",
        html: html,
      });
      const organization = {
        organizationName,
        coordinators: [coordinator._id],
      };
      const newOrganization = await Organization.create(organization);

      res.status(201).json({ success: true, result: newOrganization });
    }
  } catch (error) {
    logError(error);
    res.status(500).json({
      success: false,
      msg: "Unable to create organization, try again later",
    });
  }
};

export const getOrganization = async (req, res) => {
  try {
    const { organizationName } = req.params;
    const organization = await Organization.findOne({
      organizationName: organizationName,
    });
    res.status(200).json({ success: true, result: organization });
  } catch (error) {
    logError(error);
    res.status(500).json({
      success: false,
      msg: "Unable to get organization, try again later",
    });
  }
};

export const updateOrganization = async (req, res) => {
  const { userName } = req.user;
  const { organizationName } = req.params;
  try {
    const user = await User.findOne({ userName: userName });
    if (
      user.role === "admin" ||
      (user.role === "coordinator" &&
        user.organizationName === organizationName)
    ) {
      await Organization.findOneAndUpdate(
        { organizationName: organizationName },
        req.body
      );
      const updatedOrganization = await Organization.findOne({
        organizationName: organizationName,
      });
      res.status(200).json({ success: true, result: updatedOrganization });
    } else {
      res.status(401).json({
        success: false,
        msg: "You haven't got authorization to update an organization",
      });
    }
  } catch (error) {
    logError(error);
    res.status(500).json({
      success: false,
      msg: "Unable to update organization, try again later",
    });
  }
};
export const deleteOrganization = async (req, res) => {
  const { userName } = req.user;
  const { organizationName } = req.params;
  try {
    const user = await User.findOne({ userName: userName });
    if (user.role === "admin") {
      await Organization.findOneAndDelete({
        organizationName: organizationName,
      });
      res.status(200).json({
        success: true,
        msg: `Organization with id: ${id} deleted from database`,
      });
    } else {
      res.status(401).json({
        success: false,
        msg: "You haven't got authorization to delete an organization",
      });
    }
  } catch (error) {
    logError(error);
    res.status(500).json({
      success: false,
      msg: "Unable to delete organization, try again later",
    });
  }
};
export const searchOrganizations = async (req, res) => {
  try {
    const { query } = req.query;
    const organizations = await Organization.find({
      $or: [{ organizationName: { $regex: query, $options: "i" } }],
      isAvailable: true,
    });
    res.status(200).json({ success: true, result: organizations });
  } catch (error) {
    logError(error);
    res.status(500).json({
      success: false,
      msg: "Unable to get organizations, try again later",
    });
  }
};
