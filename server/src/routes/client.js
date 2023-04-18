import express from "express";
import {
  closeClient,
  createClient,
  getClient,
  getMatchedOrganizations,
  reactedCoordinator,
  sendNewClientEmail,
  updateClient,
} from "../controllers/client.js";
import { totalMatchedClients } from "../controllers/report.js";
import { authenticateToken } from "../controllers/user.js";
const clientRouter = express.Router();

clientRouter.get("/client/:clientNumber", authenticateToken, getClient);
clientRouter.patch(
  "/update/:clientNumber",
  authenticateToken,
  updateClient,
  getMatchedOrganizations
);
clientRouter.post("/report", authenticateToken, totalMatchedClients);
clientRouter.post(
  "/create",
  authenticateToken,
  createClient,
  getMatchedOrganizations
);
clientRouter.post(
  "/send-new-client-mail/:clientNumber",
  authenticateToken,
  sendNewClientEmail
);
clientRouter.patch(
  "/email-reply/:coordinatorId/:clientId/:accepted",
  reactedCoordinator
);
clientRouter.post(
  "/close-client/:clientNumber",
  authenticateToken,
  closeClient
);

export default clientRouter;
