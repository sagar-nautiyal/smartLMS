import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
export default class PaymentController {
  async createPaymentIntent(req, res) {
    const { amount } = req.body;
    console.log("Amount to be sent to stripe: ", amount);
    try {
      const args = {
        amount: amount * 100,
        currency: "usd",
        automatic_payment_methods: {
          enabled: true,
        },
      };
      //create payment intent
      const paymentIntent = await stripe.paymentIntents.create(args);
      console.log("response from stripe to our server", paymentIntent);

      //returning back to client
      return res
        .status(200)
        .json({ client_secret: paymentIntent.client_secret });
    } catch (err) {
      return res.status(500).json({ message: "Internal server error" });
    }
  }
}
