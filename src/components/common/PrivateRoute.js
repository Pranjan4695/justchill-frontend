import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const auth = localStorage.getItem("userList");
  return auth ? <Outlet /> : <Navigate to="/home" />;
};

export default PrivateRoute;
