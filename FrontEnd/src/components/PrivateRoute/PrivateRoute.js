import React from "react";
import { Route, Navigate, useLocation } from "react-router-dom";

const isAuthenticated = () => {
  return localStorage.getItem("jwtToken") !== null;
};

const PrivateRoute = ({ element: Component, allowedRoles, userRole }) => {
  const location = useLocation();

  const handleUnauthorizedAccess = () => {
    return <Navigate to="/unauthorized" state={{ message: "Unauthorized access" }} />;
  };

  const handleNotLoggedIn = () => {
    return (
      <Navigate
        to="/login"
        state={{ message: "You are not logged in.", returnPath: location.pathname }}
      />
    );
  };

  if (!isAuthenticated()) {
    return handleNotLoggedIn();
  }

  if (allowedRoles && !allowedRoles.includes(userRole)) {
    return handleUnauthorizedAccess();
  }

  return <Component />;
};

export default PrivateRoute;



