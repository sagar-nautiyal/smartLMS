import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { useSelector } from "react-redux";
import { paymentSelector } from "../../reducer/PaymentReducer";
import { toast } from "react-toastify";
export const CheckoutForm = () => {
  const { isLoading, error } = useSelector(paymentSelector);
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) return;
    const { error } = await stripe.confirmPayment({
      // `Elements` instance that's used to create the Express Checkout Element.
      elements,
      // `clientSecret` from the created PaymentIntent
      //clientSecret,
      confirmParams: {
        return_url: `${window.location.origin}/checkout-success`,
      },
      // Uncomment below if you only want redirect for redirect-based payments.
      // redirect: 'if_required',
    });

    if (error) {
      // This point is reached only if there's an immediate error when confirming the payment. Show the error to your customer (for example, payment details incomplete).
      toast.error(error.message);
    }
    // } else {
    //   // Your customer will be redirected to your `return_url`.
    //   toast.error("Something went wrong! Please try again.");
    // }
  };
  return (
    <>
      <form id="course-payment" onSubmit={handleSubmit}>
        <PaymentElement id="payment-element" />
        <button
          type="submit"
          disabled={isLoading || !stripe || !elements}
          id="submit"
          className="btn btn-primary w-100 mt-3 d-flex justify-content-center align-items-center"
        >
          {isLoading ? (
            <div
              className="spinner-border spinner-border-sm me-2"
              role="status"
            ></div>
          ) : (
            "💳 Pay Now"
          )}
        </button>
      </form>
    </>
  );
};
