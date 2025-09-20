// src/components/Footer.jsx
import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-dark text-white pt-5 pb-3 mt-auto">
      <div className="container">
        <div className="row">
          {/* About */}
          <div className="col-md-4 mb-3">
            <h5 className="fw-bold">SmartLMS</h5>
            <p className="small text-white-50">
              A smart learning platform to access courses, track progress, and
              achieve your goals anytime, anywhere.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-md-4 mb-3">
            <h6 className="fw-bold">Quick Links</h6>
            <ul className="list-unstyled">
              <li>
                <Link to="/" className="text-white text-decoration-none">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/courses" className="text-white text-decoration-none">
                  Courses
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-white text-decoration-none">
                  About
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-white text-decoration-none">
                  Login
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact / Social */}
          <div className="col-md-4 mb-3">
            <h6 className="fw-bold">Connect With Us</h6>
            <p className="small text-white-50 mb-1">
              Email: support@smartlms.com
            </p>
            <p className="small text-white-50 mb-1">Phone: +91 123 456 7890</p>
            <div className="d-flex gap-2 mt-2">
              <a href="#" className="text-white fs-5">
                <i className="bi bi-facebook"></i>
              </a>
              <a href="#" className="text-white fs-5">
                <i className="bi bi-twitter"></i>
              </a>
              <a href="#" className="text-white fs-5">
                <i className="bi bi-linkedin"></i>
              </a>
              <a href="#" className="text-white fs-5">
                <i className="bi bi-instagram"></i>
              </a>
            </div>
          </div>
        </div>

        <hr className="border-white-50" />

        <div className="text-center small text-white-50">
          &copy; {new Date().getFullYear()} SmartLMS. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
