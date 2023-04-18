import express from "express";
import {
  createCategory,
  deleteCategory,
  filterCategories,
  getCategories,
  getCategory,
} from "../controllers/category.js";
import {
  addNewKeyWord,
  deleteKeyWord,
  updateKeyWord,
} from "../controllers/keyword.js";
import { authenticateToken } from "../controllers/user.js";
const categoryRouter = express.Router();

categoryRouter.get("/", getCategories);
categoryRouter.get("/category/:title", getCategory);
categoryRouter.post("/create", authenticateToken, createCategory);
categoryRouter.get("/search", filterCategories);
categoryRouter.delete("/delete/:id", authenticateToken, deleteCategory);
categoryRouter.patch("/add-keyWord/:title", authenticateToken, addNewKeyWord);
categoryRouter.patch(
  "/update-keyWord/:keyWordId",
  authenticateToken,
  updateKeyWord
);
categoryRouter.delete(
  "/delete-keyWord/:keyWordId",
  authenticateToken,
  deleteKeyWord
);
export default categoryRouter;
