// CheckoutSuccessPage.jsx
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { clearCartState } from "../../reducer/CartReducer";
import { toast } from "react-toastify";

export default function CheckoutSuccessPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    // Just clear the cart state in frontend after successful payment
    dispatch(clearCartState());
    toast.success("Payment successful! Your courses are now available.");
  }, [dispatch]);

  return (
    <div className="container mt-5 text-center">
      <div className="card shadow-sm p-5">
        <h2 className="text-success mb-3">✅ Payment Successful!</h2>
        <p className="lead">
          Thank you for your purchase, your courses are now unlocked.
        </p>
        <p className="text-muted mb-4">
          ✅ Your courses have been added to your learning dashboard!
        </p>
        <Link to="/myLearning" className="btn btn-primary mt-3">
          Go to My Courses
        </Link>
      </div>
    </div>
  );
}
