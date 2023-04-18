import express from "express";
import {
  createOrganization,
  getOrganizations,
  searchOrganizations,
  updateOrganization,
  getOrganization,
  deleteOrganization,
} from "../controllers/organization.js";
import { authenticateToken } from "../controllers/user.js";

const organizationRouter = express.Router();

organizationRouter.get("/", getOrganizations);
organizationRouter.post("/create", authenticateToken, createOrganization);
organizationRouter.patch(
  "/update/:organizationName",
  authenticateToken,
  updateOrganization
);
organizationRouter.get(
  "/organization_detail/:organizationName",
  getOrganization
);
organizationRouter.delete(
  "/delete/:organizationName",
  authenticateToken,
  deleteOrganization
);
organizationRouter.get("/search", searchOrganizations);

export default organizationRouter;
