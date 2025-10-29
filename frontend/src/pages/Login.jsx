// src/pages/Login.jsx
import React from "react";
import { Link } from "react-router-dom";
import illustration from "../assets/login.svg"; // Ensure you have an illustration image in this path
import { useDispatch } from "react-redux";
import { loginthunk } from "../reducer/AuthReducer";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const userData = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    try {
      await dispatch(loginthunk(userData)).unwrap();
      toast.success("Logged in Successfully!");
      navigate("/");
      window.location.href = "/";
    } catch {
      toast.error("Login failed. Please try again.");
    }
  };

  return (
    <div className="container-fluid vh-100 d-flex align-items-center bg-light">
      <div
        className="row w-100 shadow-lg bg-white rounded"
        style={{ minHeight: "70vh" }}
      >
        {/* Left Illustration */}
        <div className="col-md-6 d-none d-md-flex justify-content-center align-items-center p-4 text-white rounded-start">
          <div className="text-center">
            <img
              src={illustration}
              alt="Login Illustration"
              className="img-fluid mb-3"
              style={{ maxHeight: "300px" }}
            />
            <h3 className="fw-bold">Smart Learning</h3>
            <p className="small">
              Access your courses, track progress, and achieve more.
            </p>
          </div>
        </div>

        {/* Right Form */}
        <div className="col-md-6 d-flex justify-content-center align-items-center p-4">
          <div className="w-100" style={{ maxWidth: "400px" }}>
            <h3 className="text-center mb-4">Welcome Back</h3>

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email address
                </label>
                <input
                  type="email"
                  id="email"
                  className="form-control"
                  placeholder="Enter your email"
                  name="email"
                  required
                />
              </div>

              <div className="mb-2">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  className="form-control"
                  placeholder="Enter your password"
                  name="password"
                  required
                />
              </div>

              <div className="d-flex justify-content-end mb-3">
                <Link to="#" className="small text-decoration-none">
                  Forgot password?
                </Link>
              </div>

              <button type="submit" className="btn btn-primary w-100 mb-3">
                Login
              </button>
            </form>

            <p className="text-center mb-0">
              Don’t have an account?{" "}
              <Link to="/register" className="text-decoration-none">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
