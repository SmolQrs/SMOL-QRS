import express from "express";

import {
  createUser,
  getUser,
  login,
  authenticateToken,
  updateUser,
  smsAuthentication,
  getCoWorkers,
  getCoWorker,
  deleteUser,
  changePassword,
  sendPasswordChangeLink,
} from "../controllers/user.js";

const userRouter = express.Router();

userRouter.get("/user", authenticateToken, getUser);
userRouter.post("/create", createUser);
userRouter.post("/sms-authentication", smsAuthentication);
userRouter.post("/send-password-change-link", sendPasswordChangeLink);
userRouter.post("/login", login);
userRouter.patch("/update/:id", authenticateToken, updateUser);
userRouter.patch("/password-change", authenticateToken, changePassword);
userRouter.get("/coworkers", authenticateToken, getCoWorkers);
userRouter.get("/coworker/:id", authenticateToken, getCoWorker);
userRouter.delete("/delete/:id", authenticateToken, deleteUser);

export default userRouter;
