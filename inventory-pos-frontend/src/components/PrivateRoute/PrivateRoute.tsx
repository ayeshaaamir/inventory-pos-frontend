import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import { PrivateRouteProps } from "../../interfaces/PrivateRouteProps";

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  children,
  allowedRoles,
}) => {
  const userRole = Cookies.get("userRole");
  const location = useLocation();

  if (!userRole) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  const role = parseInt(userRole, 10);

  if (!allowedRoles.includes(role)) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return <>{children}</>;
};

export default PrivateRoute;
