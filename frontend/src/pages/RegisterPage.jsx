// src/pages/RegisterUser.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import illustration from "../assets/login.svg"; // Add a register illustration in this path

function RegisterUser() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Register Data:", formData);
    // TODO: Add API call for registration
  };

  return (
    <div className="container-fluid vh-100 d-flex align-items-center bg-light">
      <div
        className="row w-100 shadow-lg bg-white rounded"
        style={{ minHeight: "75vh" }}
      >
        {/* Left Illustration */}
        <div className="col-md-6 d-none d-md-flex justify-content-center align-items-center p-4 text-white rounded-start">
          <div className="text-center">
            <img
              src={illustration}
              alt="Register Illustration"
              className="img-fluid mb-3"
              style={{ maxHeight: "300px" }}
            />
            <h3 className="fw-bold">Join Smart Learning</h3>
            <p className="small">
              Create your account to access courses, track progress, and achieve
              more.
            </p>
          </div>
        </div>

        {/* Right Form */}
        <div className="col-md-6 d-flex justify-content-center align-items-center p-4">
          <div className="w-100" style={{ maxWidth: "400px" }}>
            <h3 className="text-center mb-4">Create an Account</h3>

            <form onSubmit={handleSubmit}>
              {/* Full Name */}
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="form-control"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Email */}
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="form-control"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Password */}
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="form-control"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Confirm Password */}
              <div className="mb-4">
                <label htmlFor="confirmPassword" className="form-label">
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  className="form-control"
                  placeholder="Re-enter your password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Submit */}
              <button type="submit" className="btn btn-primary w-100 mb-3">
                Register
              </button>
            </form>

            {/* Login Link */}
            <p className="text-center mb-0">
              Already have an account?{" "}
              <Link to="/login" className="text-decoration-none">
                Login here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterUser;
