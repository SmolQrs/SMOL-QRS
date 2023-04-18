import Client from "../models/Client.js";
import User from "../models/User.js";
import { logError, logInfo } from "../util/logging.js";
import mongoose from "mongoose";

export const totalMatchedClients = async (req, res) => {
  const { email } = req.user;
  const { startDate, endDate } = req.body;
  const start = new Date(startDate); // start date
  const end = new Date(endDate); // end date
  try {
    const user = await User.findOne({ email: email });
    if (user.role === "admin") {
      const totalRequest = await Client.aggregate([
        {
          $match: {
            createdAt: { $gte: start, $lte: end }, // filter clients created within the specified time frame
          },
        },
        { $group: { _id: null, myCount: { $sum: 1 } } },
        { $project: { _id: 0 } },
      ]);
      const unmatchedAmount = await Client.aggregate([
        {
          $match: {
            matchedCoordinators: { $exists: true, $eq: [] }, // filter only clients that have matched coordinators
            createdAt: { $gte: start, $lte: end }, // filter clients created within the specified time frame
          },
        },
        { $group: { _id: null, myCount: { $sum: 1 } } },
        { $project: { _id: 0 } },
      ]);
      const matchedAmount = await Client.aggregate([
        {
          $match: {
            matchedCoordinators: { $exists: true, $ne: [] }, // filter only clients that have matched coordinators
            createdAt: { $gte: start, $lte: end }, // filter clients created within the specified time frame
          },
        },
        {
          $lookup: {
            from: "users", // name of the coordinators collection
            localField: "matchedCoordinators",
            foreignField: "_id",
            as: "coordinators",
          },
        },
        {
          $unwind: "$coordinators",
        },
        {
          $group: {
            _id: "$coordinators.organizationName", // group by organization
            count: { $sum: 1 }, // count the number of clients
          },
        },
      ]);

      const acceptedAmount = await Client.aggregate([
        {
          $match: {
            acceptedCoordinators: { $exists: true, $ne: [] }, // filter only clients that have matched coordinators
            createdAt: { $gte: start, $lte: end }, // filter clients created within the specified time frame
          },
        },
        {
          $lookup: {
            from: "users", // name of the coordinators collection
            localField: "acceptedCoordinators",
            foreignField: "_id",
            as: "coordinators",
          },
        },
        {
          $unwind: "$coordinators",
        },
        {
          $group: {
            _id: "$coordinators.organizationName", // group by organization
            count: { $sum: 1 }, // count the number of clients
          },
        },
      ]);

      const rejectedAmount = await Client.aggregate([
        {
          $match: {
            rejectedCoordinators: { $exists: true, $ne: [] }, // filter only clients that have matched coordinators
            createdAt: { $gte: start, $lte: end }, // filter clients created within the specified time frame
          },
        },
        {
          $lookup: {
            from: "users", // name of the coordinators collection
            localField: "rejectedCoordinators",
            foreignField: "_id",
            as: "coordinators",
          },
        },
        {
          $unwind: "$coordinators",
        },
        {
          $group: {
            _id: "$coordinators.organizationName", // group by organization
            count: { $sum: 1 }, // count the number of clients
          },
        },
      ]);

      res.status(200).json({
        success: true,
        result: {
          totalRequest,
          unmatchedAmount,
          matchedAmount,
          acceptedAmount,
          rejectedAmount,
        },
      });
    } else {
      res.status(401).json({
        success: false,
        msg: "You are unauthorized to get the user info",
      });
    }
  } catch (error) {
    logError(error);
    res.status(500).json({
      success: false,
      msg: "Aanvraag niet opgeslagen. Probeer opnieuw.",
    });
  }
};
