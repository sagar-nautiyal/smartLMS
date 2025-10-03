import express from "express";
import auth from "../middlewares/auth";
import PaymentController from "../controllers/PaymentController";

const paymentRouter = express.Router();

const paymenetController = new PaymentController();
//get all courses
paymentRouter.post("/create-payment-intent", auth, (req, res) => {
  paymenetController.createPaymentIntent(req, res);
});

export default paymentRouter;
