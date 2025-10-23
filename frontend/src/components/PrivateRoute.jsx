import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";
import { authSelector } from "../reducer/AuthReducer";

function PrivateRoute({ children }) {
  const { isAuthenticated, isLoading } = useSelector(authSelector);
  if (isLoading) {
    // Show a spinner or skeleton while checking auth
    return <div className="text-center my-5">Checking authentication...</div>;
  }

  // If children are passed (direct wrapping), render children
  // If no children (nested routes), render Outlet
  return isAuthenticated ? (children || <Outlet />) : <Navigate to="/login" replace />;
}

export default PrivateRoute;
