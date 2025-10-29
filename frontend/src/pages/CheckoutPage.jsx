import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { createPaymentIntentThunk } from "../reducer/PaymentReducer";
import { toast } from "react-toastify";
import { CheckoutForm } from "../components/course/CheckoutForm";
import axios from "axios";
const stripeKey = import.meta.env.VITE_PUBLIC_STRIPE_KEY;
const stripePromise = loadStripe(stripeKey);
export default function CheckoutPage() {
  const [clientSecret, setClientSecret] = useState("");
  const [cart, setCart] = useState();
  const dispatch = useDispatch();

  //fetch the cart Items for currentUser
  useEffect(() => {
    const fetchCart = async () => {
      const token = localStorage.getItem("token");
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";
      const res = await axios.get(`${apiUrl}/api/cart`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCart(res.data); // cart contains courses[] and totalPrice
    };
    fetchCart();
  }, []);

  //fetching client secret
  useEffect(() => {
    if (cart?.totalPrice > 0) {
      const fetchClientSecretKey = async (amount) => {
        try {
          const response = await dispatch(
            createPaymentIntentThunk(amount)
          ).unwrap();
          setClientSecret(response.client_secret);
        } catch (err) {
          toast.error("Something went wrong");
        }
      };
      fetchClientSecretKey(cart.totalPrice);
    }
  }, [cart]);

  return (
    <>
      <div className="container mt-5">
        <div className="row">
          {/* Order Summary */}
          <div className="col-md-5">
            <div className="card shadow-sm p-4">
              <h4 className="mb-3">🛒 Order Summary</h4>
              <ul className="list-group list-group-flush mb-3">
                {cart?.courses.map((c) => (
                  <li
                    key={c.courseId._id}
                    className="list-group-item d-flex justify-content-between"
                  >
                    <span>{c.courseId.title}</span>
                    <span>
                      ${c.price} × {c.quantity}
                    </span>
                  </li>
                ))}
              </ul>
              <hr />
              <h5 className="d-flex justify-content-between">
                <span>Total:</span>
                <span className="fw-bold text-primary">
                  ${cart?.totalPrice}
                </span>
              </h5>
            </div>
          </div>

          {/* Payment Form */}
          <div className="col-md-7">
            <div className="card shadow-sm p-4">
              <h4 className="mb-3">💳 Payment Details</h4>
              {clientSecret ? (
                <Elements stripe={stripePromise} options={{ clientSecret }}>
                  <CheckoutForm amount={cart?.totalPrice} />
                </Elements>
              ) : (
                <div className="text-center text-muted">
                  <div
                    className="spinner-border spinner-border-sm me-2"
                    role="status"
                  ></div>
                  Loading payment details...
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
