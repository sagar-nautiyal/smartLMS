// src/layouts/RootLayout.jsx
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

function RootLayout() {
  const location = useLocation();

  // Define routes where you don't want Navbar/Footer
  const hideLayout = ["/login", "/register"].includes(location.pathname);

  return (
    <div className="d-flex flex-column min-vh-100">
      {!hideLayout && <Navbar />}
      <div className="flex-grow-1 mt-4">
        <Outlet />
      </div>
      {!hideLayout && <Footer />}
    </div>
  );
}

export default RootLayout;
