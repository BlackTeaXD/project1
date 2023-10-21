import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ logined, children }) => {
  if (!logined) {
    return <Navigate replace />;
  }
  return children;
};

export default ProtectedRoute;
