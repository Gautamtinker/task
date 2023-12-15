// PrivateRoute.js
import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ element, isLoggedIn, updateLoggedIn }) => {
  // If user is logged in, render the element, else navigate to the login page
  return isLoggedIn ? element : <Navigate to="/" />;
};

export default PrivateRoute;
