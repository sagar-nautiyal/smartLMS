import express from "express";
import UserController from "../controllers/UserController.js";
const userRouter = express.Router();

const userController = new UserController();
userRouter.post("/register", (req, res) => {
  userController.register(req, res);
});

userRouter.post("/login", (req, res) => {
  userController.login(req, res);
});

export default userRouter;
