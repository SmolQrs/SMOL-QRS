import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import organizationRouter from "./routes/organization.js";
import userRouter from "./routes/user.js";
import municipalityRouter from "./routes/municipality.js";
import clientRouter from "./routes/client.js";
import categoryRouter from "./routes/category.js";

// Create an express server
const app = express();

// Tell express to use the json middleware
app.use(express.json());

// Allow everyone to access our API. In a real application, we would need to restrict this!
app.use(cors());

/****** Attach routes ******/
/**
 * We use /api/ at the start of every route!
 * As we also host our client code on heroku we want to separate the API endpoints.
 */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/api/organizations", organizationRouter);
app.use("/api/users", userRouter);
app.use("/api/municipalities", municipalityRouter);
app.use("/api/clients", clientRouter);
app.use("/api/categories", categoryRouter);
app.use(express.static(path.join(__dirname, "../../client/build")));
app.get("*", function (_, res) {
  res.sendFile(
    path.join(__dirname, "../../client/build/index.html"),
    function (err) {
      res.status(500).send(err);
    }
  );
});

export default app;
