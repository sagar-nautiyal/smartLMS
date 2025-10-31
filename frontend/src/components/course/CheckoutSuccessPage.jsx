// CheckoutSuccessPage.jsx
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { clearCartState } from "../../reducer/CartReducer";
import { toast } from "react-toastify";
import axios from "axios";
import { buildApiUrl } from "../../config/apiConfig";

export default function CheckoutSuccessPage() {
  const dispatch = useDispatch();
  const [enrolling, setEnrolling] = useState(true);
  const [enrollmentSuccess, setEnrollmentSuccess] = useState(false);

  useEffect(() => {
    const enrollUserInCourses = async () => {
      try {
        const token = localStorage.getItem("token");

        // ...

        const response = await axios.post(
          buildApiUrl("payment/enroll-after-payment"),
          {},
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        // ...

        // Validate response structure
        if (
          !response.data ||
          !response.data.message ||
          !Array.isArray(response.data.enrolledCourses)
        ) {
          throw new Error("Invalid enrollment response structure");
        }

        // Clear the cart state in frontend after successful enrollment
        dispatch(clearCartState());
        setEnrollmentSuccess(true);

        // Safely handle enrolledCourses array
        const enrolledCourseNames =
          response.data.enrolledCourses.length > 0
            ? response.data.enrolledCourses.join(", ")
            : "your courses";

        toast.success(
          `Payment successful! Enrolled in courses: ${enrolledCourseNames}`
        );
      } catch (error) {
        console.error("Enrollment error:", error);
        toast.error(
          "Payment successful, but there was an issue enrolling in courses. Please contact support."
        );
      } finally {
        setEnrolling(false);
      }
    };

    enrollUserInCourses();
  }, [dispatch]);

  if (enrolling) {
    return (
      <div className="container mt-5 text-center">
        <div className="card shadow-sm p-5">
          <div className="spinner-border text-primary mb-3" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <h3>Processing Your Enrollment...</h3>
          <p>Please wait while we enroll you in your courses.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-5 text-center">
      <div className="card shadow-sm p-5">
        <h2
          className={`mb-3 ${
            enrollmentSuccess ? "text-success" : "text-warning"
          }`}
        >
          {enrollmentSuccess ? "✅ Payment Successful!" : "⚠️ Payment Received"}
        </h2>
        <p className="lead">
          {enrollmentSuccess
            ? "Thank you for your purchase, your courses are now unlocked."
            : "Your payment was processed, but there was an issue with enrollment."}
        </p>
        {enrollmentSuccess && (
          <p className="text-muted mb-4">
            ✅ Your courses have been added to your learning dashboard!
          </p>
        )}
        <Link to="/myLearning" className="btn btn-primary mt-3">
          Go to My Courses
        </Link>
        {!enrollmentSuccess && (
          <p className="text-muted mt-3">
            <small>
              If you continue to have issues, please contact support.
            </small>
          </p>
        )}
      </div>
    </div>
  );
}
