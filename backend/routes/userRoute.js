import express from "express";
import UserController from "../controllers/UserController.js";
import auth from "../middlewares/auth.js";
const userRouter = express.Router();

const userController = new UserController();
userRouter.post("/register", (req, res) => {
  userController.register(req, res);
});

userRouter.post("/login", (req, res) => {
  userController.login(req, res);
});

userRouter.get("/me", auth, (req, res) => {
  return res.json(req.user);
});

export default userRouter;
