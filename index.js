// Load our .env variables
import dotenv from "dotenv";
dotenv.config();

import app from "./server/src/app.js";
import { logInfo, logError } from "./server/src/util/logging.js";
import connectDB from "./server/src/db/connectDB.js";

// The environment should set the port
const port = process.env.PORT;

if (port == null) {
  // If this fails, make sure you have created a `.env` file in the right place with the PORT set
  logError(new Error("Cannot find a PORT number, did you create a .env file?"));
}

const startServer = async () => {
  try {
    await connectDB();
    app.listen(port, () => {
      logInfo(`Server started on port ${port}`);
    });
  } catch (error) {
    logError(error);
  }
};

// Start the server
startServer();
