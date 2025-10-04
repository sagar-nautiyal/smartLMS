import express from "express";
import PaymentController from "../controllers/PaymentController.js";

const paymentRouter = express.Router();

const paymenetController = new PaymentController();
//get all courses
paymentRouter.post("/create-payment-intent", (req, res) => {
  paymenetController.createPaymentIntent(req, res);
});

export default paymentRouter;
