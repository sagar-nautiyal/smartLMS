import express from "express";
import PaymentController from "../controllers/PaymentController.js";

const paymentRouter = express.Router();

const paymenetController = new PaymentController();
//create payment intent
paymentRouter.post("/create-payment-intent", (req, res) => {
  paymenetController.createPaymentIntent(req, res);
});

//enroll after successful payment
paymentRouter.post("/enroll-after-payment", (req, res) => {
  paymenetController.enrollAfterPayment(req, res);
});

export default paymentRouter;
