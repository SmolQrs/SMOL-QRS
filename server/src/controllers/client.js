import mongoose from "mongoose";
import Client, { validateClient } from "../models/Client.js";
import Organization from "../models/Organization.js";
import User from "../models/User.js";
import { closeCaseEmailTemplate } from "../services/email_service/closeCaseEmailTemplate.js";
import { emailSender } from "../services/email_service/email.js";
import { newClientEmailTemplate } from "../services/email_service/emailHtmlTemplates.js";

import { logError, logInfo } from "../util/logging.js";
import validationErrorMessage from "../util/validationErrorMessage.js";

export const getClients = async (req, res) => {
  try {
    const clients = await Client.find();
    res.status(200).json({ success: true, result: clients });
  } catch (error) {
    logError(error);
    res.status(500).json({
      success: false,
      msg: "Unable to get clients, try again later",
    });
  }
};

export const getClient = async (req, res) => {
  const { email } = req.user;
  const { clientNumber } = req.params;
  try {
    const user = await User.findOne({ email: email });
    const client = await Client.findOne({ clientNumber: clientNumber });
    if (client.advisor === user._id.toString()) {
      const matchedCoordinators = await User.find({
        _id: { $in: client.matchedCoordinators },
      });
      const acceptedCoordinators = await User.find({
        _id: { $in: client.acceptedCoordinators },
      });
      const rejectedCoordinators = await User.find({
        _id: { $in: client.rejectedCoordinators },
      });
      res.status(200).json({
        success: true,
        result: {
          client,
          matchedCoordinators,
          acceptedCoordinators,
          rejectedCoordinators,
        },
      });
    } else {
      res
        .status(400)
        .json({ success: false, msg: "Sorry! Ongeldig aanvraag nummer." });
    }
  } catch (error) {
    logError(error);
    res.status(500).json({
      success: false,
      msg: "Unable to get client, try again later",
    });
  }
};

export const createClient = async (req, res, next) => {
  const { email } = req.user;
  const client = req.body;

  try {
    const user = await User.findOne({ email: email });
    const newClient = { ...client, advisor: user._id };
    if (typeof newClient !== "object") {
      res.status(400).json({
        success: false,
        msg: `You need to provide a 'client' object. Received: ${JSON.stringify(
          newClient
        )}`,
      });

      return;
    }
    const errorList = [];
    validateClient(newClient);

    if (errorList.length > 0) {
      res
        .status(400)
        .json({ success: false, msg: validationErrorMessage(errorList) });
    } else {
      if (user?.role === "intaker" || user?.role === "coordinator") {
        const newClientObj = new Client(newClient);
        const client = await newClientObj.save(newClient);
        await User.findOneAndUpdate(
          { email: email },
          { $addToSet: { clients: client.clientNumber } }
        );

        req.client = client;
        next();
      } else {
        res.status(401).json({
          success: false,
          msg: "You are unauthorized to get the user info",
        });
      }
    }
  } catch (error) {
    logError(error);
    res.status(500).json({
      success: false,
      msg: "Aanvraag niet opgeslagen. Probeer opnieuw.",
    });
  }
};
export const updateClient = async (req, res, next) => {
  const { email } = req.user;
  const { clientNumber } = req.params;
  try {
    const user = await User.findOne({ email: email });
    const client = await Client.findOne({ clientNumber: clientNumber });
    if (client?.isEmailSent) {
      res.status(404).json({
        success: false,
        msg: "You can not update aanvraag if you already sent email to the coordinators",
      });
    } else {
      if (user?._id.toString() === client?.advisor) {
        await Client.findOneAndUpdate({ clientNumber: clientNumber }, req.body);
        const updatedClient = await Client.findOne({
          clientNumber: clientNumber,
        });
        req.client = updatedClient;
        next();
      } else {
        res.status(404).json({
          success: false,
          msg: "You haven't got authorization to update an client",
        });
      }
    }
  } catch (error) {
    logError(error);
    res.status(500).json({
      success: false,
      msg: "Unable to update client, try again later",
    });
  }
};

export const getMatchedOrganizations = async (req, res) => {
  logInfo(req.client);
  const { gender, age, disabilityType, municipality, category, _id } =
    req.client;
  try {
    const organizations = await Organization.find({
      forGender: { $in: [gender, "all"] },
      minAge: { $lt: age },
      maxAge: { $gt: age },
      disabilities: disabilityType,
    });
    logInfo(organizations);
    const organizationNames = organizations?.map(
      (organization) => organization.organizationName
    );
    const coordinators = await User.find({
      municipalities: municipality,
      categories: category,
      organizationName: { $in: organizationNames },
      role: "coordinator",
    });

    const client = await Client.findByIdAndUpdate(_id, {
      matchedCoordinators:
        coordinators.length > 0
          ? coordinators?.map((coordinator) =>
              mongoose.Types.ObjectId(coordinator?._id)
            )
          : [],
    });

    logInfo(coordinators);
    res.status(200).json({ success: true, result: client });
  } catch (error) {
    logError(error);
    res.status(500).json({
      success: false,
      msg: "Aanvraag niet opgeslagen. Probeer opnieuw.",
    });
  }
};

export const sendNewClientEmail = async (req, res) => {
  const { email } = req.user;
  const { clientNumber } = req.params;
  try {
    const advisor = await User.findOne({ email: email });
    if (advisor.role === "intaker" || advisor.role === "coordinator") {
      const client = await Client.findOne({ clientNumber: clientNumber });
      const coordinators = await User.find({
        _id: { $in: client.matchedCoordinators },
      });
      const promises = coordinators.map(async (coordinator) => {
        const html = newClientEmailTemplate(coordinator, client, advisor);
        const info = await emailSender({
          from: "QRS TEAM <noreply@smol-qrs.nl>",
          to: `${coordinator.email}`,
          subject: "New client",
          html: html,
        });
        logInfo(info);
        return info;
      });
      const results = await Promise.all(promises);
      await Client.findOneAndUpdate(
        { clientNumber: clientNumber },
        { isEmailSent: true }
      );

      res.status(200).json({ success: true, result: results });
    } else {
      res.status(401).json({
        success: false,
        msg: "You are unauthorized to send emails",
      });
    }
  } catch (error) {
    logError(error);
    res.status(500).json({
      success: false,
      msg: "Mails niet verzonden. Probeer opnieuw.",
    });
  }
};

export const reactedCoordinator = async (req, res) => {
  const { clientId, coordinatorId, accepted } = req.params;
  try {
    if (accepted == 1) {
      await Client.findByIdAndUpdate(clientId, {
        $addToSet: {
          acceptedCoordinators: mongoose.Types.ObjectId(coordinatorId),
        },
      });
    } else {
      await Client.findByIdAndUpdate(clientId, {
        $addToSet: {
          rejectedCoordinators: mongoose.Types.ObjectId(coordinatorId),
        },
      });
    }
    res.status(200).json({
      success: true,
      msg:
        accepted == 1
          ? "We hebben een bericht naar de intaker gestuurd dat je kunt helpen."
          : "We hebben een bericht naar de intaker gestuurd dat je niet kunt helpen.",
    });
  } catch (error) {
    logInfo(error);
    res.status(500).json({
      success: false,
      msg: "Antwoord niet verzonden. Probeer opnieuw.",
    });
  }
};

export const closeClient = async (req, res) => {
  const { email } = req.user;
  const { clientNumber } = req.params;
  try {
    const user = await User.findOne({ email: email });
    const client = await Client.findOne({ clientNumber: clientNumber });
    if (user?._id.toString() === client?.advisor) {
      const coordinators = await User.find({
        _id: { $in: client.matchedCoordinators },
      });
      const acceptedCoordinators = await User.find({
        _id: { $in: client.acceptedCoordinators },
      });
      const organizationNames = acceptedCoordinators?.map(
        (coordinator) => coordinator.organizationName
      );

      const promises = coordinators.map(async (coordinator) => {
        const html = closeCaseEmailTemplate(
          coordinator,
          client,
          organizationNames,
          user
        );
        await emailSender({
          from: "QRS TEAM <noreply@smol-qrs.nl>",
          to: `${coordinator.email}`,
          subject: "Afsluiten de aanvraag",
          html: html,
        });
      });
      const results = await Promise.all(promises);
      logInfo(results);
      await Client.findByIdAndUpdate(client._id, { isClosed: true });
      res.status(200).json({ success: true, msg: "Result message send" });
    } else {
      res.status(401).json({
        success: false,
        msg: "U kunt deze aanvraag niet sluiten.",
      });
    }
  } catch (error) {
    logError(error);
    res.status(500).json({
      success: false,
      msg: "Afsluiten aanvraag niet verwerkt. Probeer opnieuw.",
    });
  }
};

export const deleteClient = async (req, res) => {
  const { userName } = req.user;
  const { id } = req.params;
  try {
    const user = await User.findOne({ userName: userName });
    if (user.role === "admin") {
      await Client.findByIdAndDelete(id);
      res.status(200).json({
        success: true,
        msg: `Client with id: ${id} deleted from database`,
      });
    } else {
      res.status(404).json({
        success: false,
        msg: "You haven't got authorization to delete an client",
      });
    }
  } catch (error) {
    logError(error);
    res.status(500).json({
      success: false,
      msg: "Unable to delete client, try again later",
    });
  }
};
