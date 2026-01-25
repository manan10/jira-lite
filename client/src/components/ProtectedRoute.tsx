import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../store/hooks";

export const ProtectedRoute = () => {
  const { user } = useAppSelector((state) => state.auth);

  // If not logged in, redirect to login page
  if (!user) {
    return <Navigate to="/" replace />;
  }

  // If logged in, render the child route (The Dashboard)
  return <Outlet />;
};
