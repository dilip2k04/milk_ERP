// routers/PrivateRoute.jsx
import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function PrivateRoute({ children, allowedRoles = [] }) {
  const { firebaseUser, role, loading } = useAuth();

  if (loading) return null;

  // Not logged in
  if (!firebaseUser) {
    return <Navigate to="/login" replace />;
  }

  // Role restriction
  if (allowedRoles.length > 0 && !allowedRoles.includes(role)) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
