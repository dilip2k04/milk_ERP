// layouts/AdminLayout.jsx
import AppSidebar from "../components/common/AppSidebar";
import AppHeader from "../components/common/AppHeader";
import useAuth from "../hooks/useAuth";
import { Navigate } from "react-router-dom";

export default function AdminLayout({ children }) {
  const { user, loading } = useAuth();

  if (loading) return null;

  if (!user || user.role !== "admin") {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex min-h-screen">
      <AppSidebar />

      <div className="flex flex-col flex-1">
        <AppHeader />

        <main className="flex-1 bg-muted/30 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
