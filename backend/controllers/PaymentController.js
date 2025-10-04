import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
export default class PaymentController {
  async createPaymentIntent(req, res) {
    const { amount } = req.body;
    try {
      const args = {
        amount: amount,
        currency: "usd",
        automatic_payment_methods: {
          enabled: true,
        },
      };
      //create payment intent
      const paymentIntent = await stripe.paymentIntents.create(args);
      console.log(paymentIntent.client_secret);

      //returning back to client
      return res
        .status(200)
        .json({ client_secret: paymentIntent.client_secret });
    } catch (err) {
      return res.status(500).json({ message: "Internal server error" });
    }
  }
}
