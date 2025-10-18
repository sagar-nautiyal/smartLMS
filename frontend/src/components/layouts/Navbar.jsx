// src/components/Navbar.jsx

import { Link } from "react-router-dom";
import { authSelector, logout } from "../../reducer/AuthReducer";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Navbar() {
  const { currentUser, isAuthenticated } = useSelector(authSelector);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handlLogout = async () => {
    try {
      dispatch(logout());
      toast.success("Logged Out");
      navigate("/");
    } catch (err) {
      console.log(err);
      toast.error("Problem loggin out");
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm px-3">
      <div className="container">
        {/* Brand */}
        <Link className="navbar-brand fw-bold text-primary" to="/">
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
          </ul>

          {/* Right Side Buttons */}
          <div className="d-flex ms-lg-3">
            <>
              {isAuthenticated ? (
                <div className="d-flex align-items-center ms-auto">
                  {/* { currentUser.name ? currentUser.name : unde} */}
                  <span className="me-3">
                    {currentUser ? `Hi,${currentUser.name}` : "Hi"}
                  </span>
                  <button
                    className="btn btn-outline-danger"
                    onClick={handlLogout}
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <>
                  <Link to="/login" className="btn btn-outline-primary me-2">
                    Login
                  </Link>
                  <Link to="/register" className="btn btn-primary">
                    Sign Up
                  </Link>
                </>
              )}
            </>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
