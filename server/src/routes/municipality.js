import express from "express";
import {
  createAllMunicipalities,
  getMunicipalities,
} from "../controllers/municipality.js";

const municipalityRouter = express.Router();

municipalityRouter.get("/", getMunicipalities);

municipalityRouter.post("/", createAllMunicipalities);

export default municipalityRouter;
