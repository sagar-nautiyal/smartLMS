import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
const stripeKey = import.meta.env.VITE_PUBLIC_STRIPE_KEY;
const stripePromise = loadStripe(stripeKey);
export default function CheckoutPage() {
  const amount = 5000; //amount in cents $50
  return (
    <>
      <h1>Checkout Page</h1>
      <Elements stripe={stripePromise} options={{ clientSecret: "test" }}>
        <CheckoutForm amount={amount} />
      </Elements>
    </>
  );
}
