import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { UserContext } from "../../contexts/user";
import Spinner from "../Spinner";

function ProtectedRoutes({ role }) {
  const { user, isLoading } = useContext(UserContext);
  if (isLoading) return <Spinner />;
  if (user && user?.role !== role) return <Navigate to="/home" />;
  if (user && user?.role === role) return <Outlet />;
}

export default ProtectedRoutes;
