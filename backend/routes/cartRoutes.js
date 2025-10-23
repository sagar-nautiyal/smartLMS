import express from "express";
import auth from "../middlewares/auth.js";
import CartController from "../controllers/cartController.js";
const cartRouter = express.Router();

const cartController = new CartController();
cartRouter.get("/", auth, (req, res) => {
  cartController.getCartItems(req, res);
});
cartRouter.post("/:courseId", auth, (req, res) => {
  cartController.addItemtoCart(req, res);
});
cartRouter.put("/:courseId", auth, (req, res) => {
  cartController.updateCartItems(req, res);
});
cartRouter.delete("/:courseId", auth, (req, res) => {
  cartController.removeItemFromCart(req, res);
});

export default cartRouter;
