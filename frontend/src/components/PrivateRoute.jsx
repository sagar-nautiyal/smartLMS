import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";
import { authSelector } from "../reducer/AuthReducer";

function PrivateRoute() {
  const { isAuthenticated, isLoading } = useSelector(authSelector);
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
}

export default PrivateRoute;
