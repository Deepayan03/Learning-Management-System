import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const Authorize = ({ allowedRoles }) => {
  const { isLoggedIn, role } = useSelector((state) => state.auth);
  console.log(isLoggedIn,role);
  return isLoggedIn && allowedRoles.find((userRole) => userRole === role) ? (
    <Outlet />
  ) : isLoggedIn ? (
    <Navigate to="/denied" />
  ) : (
    <Navigate to="/login" />
  );
};

export default Authorize;
