// context/AdminContext.jsx
import { createContext, useContext, useState } from "react";

const AdminContext = createContext();
export const useAdmin = () => useContext(AdminContext);

export function AdminProvider({ children }) {
  const [selectedSession, setSelectedSession] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [dashboardStats, setDashboardStats] = useState(null);

  const value = {
    selectedSession,
    setSelectedSession,
    selectedProduct,
    setSelectedProduct,
    dashboardStats,
    setDashboardStats,
  };

  return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>;
}
