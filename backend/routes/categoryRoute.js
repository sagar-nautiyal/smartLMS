import express from "express";
import CategoryController from "../controllers/CategoryController.js";
const categoryRouter = express.Router();

const categoryController = new CategoryController();

//get all categories
categoryRouter.get("/", (req, res) => {
  categoryController.getCategories(req, res);
});
categoryRouter.get("/filters", (req, res) => {
  categoryController.filterCategories(req, res);
});

export default categoryRouter;
