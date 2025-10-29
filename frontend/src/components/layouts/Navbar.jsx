// src/components/Navbar.jsx
import { Link, useNavigate } from "react-router-dom";
import { authSelector, logout } from "../../reducer/AuthReducer";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { cartSelector, fetchCart } from "../../reducer/CartReducer";

function Navbar() {
  const { currentUser, isAuthenticated } = useSelector(authSelector);
  const { totalItems } = useSelector(cartSelector);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchCart());
    }
  }, [dispatch, isAuthenticated]);

  const handlLogout = async () => {
    try {
      dispatch(logout());
      toast.success("Logged Out");
      navigate("/");
    } catch (err) {
      toast.error("Problem logging out");
    }
  };

  return (
    <nav
      className="navbar navbar-expand-lg navbar-light bg-white shadow-sm px-3"
      style={{
        background:
          "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%) !important",
        backdropFilter: "blur(10px)",
        borderBottom: "1px solid rgba(255,255,255,0.2)",
      }}
    >
      <div className="container">
        {/* Brand */}
        <Link
          className="navbar-brand fw-bold"
          to="/"
          style={{
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            fontSize: "1.8rem",
            letterSpacing: "0.5px",
          }}
        >
          <i className="bi bi-mortarboard-fill me-2"></i>
          SmartLMS
        </Link>

        {/* Toggler (mobile) */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Nav Links */}
        <div className="collapse navbar-collapse" id="navbarContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/courses">
                Courses
              </Link>
            </li>

            {isAuthenticated && (
              <li className="nav-item">
                <Link className="nav-link" to="/myLearning">
                  My Learning
                </Link>
              </li>
            )}

            {isAuthenticated && (
              <li className="nav-item position-relative">
                <Link className="nav-link" to="/cart">
                  <i className="bi bi-cart fs-5"></i>
                  {totalItems > 0 && (
                    <span
                      className="position-absolute top-5 start-100 translate-middle badge rounded-pill bg-danger"
                      style={{ fontSize: "0.7rem" }}
                    >
                      {totalItems}
                    </span>
                  )}
                </Link>
              </li>
            )}
          </ul>

          {/* Right Side Buttons */}
          <div className="d-flex ms-lg-3">
            {isAuthenticated ? (
              <div className="dropdown" style={{ zIndex: 1050 }}>
                <button
                  className="btn btn-light dropdown-toggle d-flex align-items-center border-0 shadow-sm"
                  type="button"
                  id="accountDropdown"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  style={{
                    borderRadius: "25px",
                    padding: "8px 16px",
                    background:
                      "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    color: "white",
                    border: "none",
                  }}
                >
                  <div className="d-flex align-items-center">
                    <div
                      className="rounded-circle me-2 d-flex align-items-center justify-content-center"
                      style={{
                        width: "32px",
                        height: "32px",
                        backgroundColor: "rgba(255,255,255,0.2)",
                        fontSize: "14px",
                        fontWeight: "bold",
                      }}
                    >
                      {currentUser?.name?.charAt(0).toUpperCase() || "U"}
                    </div>
                    <span className="fw-medium">
                      {currentUser?.name || "User"}
                    </span>
                  </div>
                </button>
                <ul
                  className="dropdown-menu dropdown-menu-end shadow-lg border-0"
                  style={{
                    minWidth: "200px",
                    borderRadius: "12px",
                    padding: "8px 0",
                  }}
                >
                  <li>
                    <Link
                      className="dropdown-item d-flex align-items-center py-2 px-3"
                      to="/profile"
                      style={{ borderRadius: "8px" }}
                    >
                      <i className="bi bi-person-circle me-2 fs-5 text-primary"></i>
                      <span>My Profile</span>
                    </Link>
                  </li>
                  <li>
                    <hr className="dropdown-divider my-1" />
                  </li>
                  <li>
                    <button
                      className="dropdown-item d-flex align-items-center py-2 px-3 text-danger"
                      onClick={handlLogout}
                      style={{
                        borderRadius: "8px",
                        border: "none",
                        background: "none",
                        width: "100%",
                        textAlign: "left",
                      }}
                    >
                      <i className="bi bi-box-arrow-right me-2 fs-5"></i>
                      <span>Logout</span>
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className="btn btn-outline-primary me-2 rounded-pill px-4"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="btn btn-primary rounded-pill px-4"
                  style={{
                    background:
                      "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    border: "none",
                  }}
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
