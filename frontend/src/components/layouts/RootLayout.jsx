// src/layouts/RootLayout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

function RootLayout() {
  return (
    <>
      <div className="d-flex flex-column min-vh-100">
        <Navbar />
        <div className="flex-grow-1 mt-4">
          <Outlet />
        </div>
        <Footer />
      </div>
    </>
  );
}

export default RootLayout;
