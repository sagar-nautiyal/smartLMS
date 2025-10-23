// src/components/CartPage.jsx
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  cartSelector,
  fetchCart,
  updateCartItem,
  removeFromCart,
} from "../reducer/CartReducer";

export default function CartPage() {
  const { courses, totalItems, totalPrice, loading } =
    useSelector(cartSelector);
  const [updatingId, setUpdatingId] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const handleUpdateQuantity = async (courseId, newQuantity) => {
    if (newQuantity < 1) return;
    setUpdatingId(courseId);
    await dispatch(updateCartItem({ courseId, quantity: newQuantity }));
    setUpdatingId(null);
  };

  const handleRemove = async (courseId) => {
    setUpdatingId(courseId);
    await dispatch(removeFromCart(courseId));
    setUpdatingId(null);
  };

  // Skeleton loader
  if (loading) {
    return (
      <div className="container mt-4">
        <h2>🛒 Your Cart</h2>
        <div className="row">
          <div className="col-md-8">
            {[1, 2].map((i) => (
              <div key={i} className="placeholder-glow border rounded p-3 mb-3">
                <span className="placeholder col-6"></span>
                <span className="placeholder col-4"></span>
              </div>
            ))}
          </div>
          <div className="col-md-4">
            <div className="card p-3 shadow-sm">
              <span className="placeholder col-12"></span>
              <span className="placeholder col-8"></span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!courses || courses.length === 0) {
    return (
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-8 text-center">
            <div className="card shadow-sm p-4">
              <h2 className="mb-3 text-primary">🛒 Your Cart</h2>
              <div className="alert alert-info">
                <p className="mb-2">Your cart is currently empty.</p>
                <Link to="/courses" className="btn btn-outline-primary">
                  Browse Courses
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-4">🛒 Your Cart</h2>
      <div className="row">
        {/* Cart Items */}
        <div className="col-md-8">
          <ul className="list-group">
            {courses.map((item) => (
              <li
                key={item.courseId._id}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                <div className="me-3">
                  <h5 className="mb-1">{item.courseId.title}</h5>
                  <p className="mb-2 text-muted">
                    ${item.price} × {item.quantity}
                  </p>
                  {/* Quantity Controls */}
                  <div className="btn-group" role="group" aria-label="quantity">
                    <button
                      className="btn btn-sm btn-outline-secondary"
                      disabled={updatingId === item.courseId._id}
                      onClick={() =>
                        handleUpdateQuantity(
                          item.courseId._id,
                          Math.max(1, item.quantity - 1)
                        )
                      }
                    >
                      –
                    </button>
                    <span className="btn btn-sm btn-light">
                      {item.quantity}
                    </span>
                    <button
                      className="btn btn-sm btn-outline-secondary"
                      disabled={updatingId === item.courseId._id}
                      onClick={() =>
                        handleUpdateQuantity(
                          item.courseId._id,
                          item.quantity + 1
                        )
                      }
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="text-end">
                  <div className="fw-bold mb-2">
                    ${item.price * item.quantity}
                  </div>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    disabled={updatingId === item.courseId._id}
                    onClick={() => handleRemove(item.courseId._id)}
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Order Summary */}
        <div className="col-md-4">
          <div className="card p-3 shadow-sm">
            <h4>Order Summary</h4>
            <hr />
            <p className="d-flex justify-content-between">
              <span>Total Items:</span>
              <span>{totalItems}</span>
            </p>
            <p className="d-flex justify-content-between fw-bold">
              <span>Total Price:</span>
              <span>${totalPrice}</span>
            </p>
            <button
              className="btn btn-primary w-100 mt-3"
              onClick={() => navigate("/cart/checkout")}
            >
              Proceed to Checkout
            </button>
            <Link to="/courses" className="btn btn-link w-100 mt-2">
              Continue shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
