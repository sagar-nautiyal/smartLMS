import express from "express";
import CategoryController from "../controllers/CategoryController.js";
const categoryRouter = express.Router();

const categoryController = new CategoryController();

//get all categories
categoryRouter.get("/", (req, res) => {
  categoryController.getCategories(req, res);
});

export default categoryRouter;
