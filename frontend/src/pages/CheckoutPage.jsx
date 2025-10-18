import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { createPaymentIntentThunk } from "../reducer/PaymentReducer";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { fetchCurrentCourse } from "../reducer/CourseReducer";
import { CheckoutForm } from "../components/course/CheckoutForm";
const stripeKey = import.meta.env.VITE_PUBLIC_STRIPE_KEY;
const stripePromise = loadStripe(stripeKey);
export default function CheckoutPage() {
  console.log("CheckoutPage mounted");
  const [clientSecret, setClientSecret] = useState("");
  const [courseAmount, setCourseAmount] = useState(0);
  const dispatch = useDispatch();
  const { courseId } = useParams();

  //fetch the current Course to set the amount
  useEffect(() => {
    console.log("Fetching the current Course initiated.......");
    const fetchCourse = async () => {
      try {
        const course = await dispatch(
          fetchCurrentCourse({ courseId })
        ).unwrap();
        setCourseAmount(course.price);
      } catch (err) {
        console.error("Failed to fetch course:", err);
      }
    };

    if (courseId) {
      fetchCourse();
    }
  }, [dispatch, courseId]);

  //fetching client secret
  useEffect(() => {
    console.log("Payment Intent Initiated.....");
    const fetchClientSecretKey = async (amount) => {
      try {
        const response = await dispatch(
          createPaymentIntentThunk(amount)
        ).unwrap();
        console.log("response for client secret", response);
        setClientSecret(response.client_secret);
      } catch (err) {
        toast.error("Something went wrong");
      }
    };
    fetchClientSecretKey(courseAmount);
  }, [courseAmount]);
  return (
    <>
      <h1>Checkout Page</h1>
      {clientSecret ? (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm amount={courseAmount} />
        </Elements>
      ) : (
        <p>Loading payment details...</p>
      )}
    </>
  );
}
