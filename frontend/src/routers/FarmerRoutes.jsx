// routers/FarmerRoutes.jsx
import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import FarmerLayout from "../layouts/FarmerLayout";

import Dashboard from "../pages/farmer/Dashboard";
import MilkHistory from "../pages/farmer/MyMilkEntries";
import Payments from "../pages/farmer/Payments";
import Profile from "../pages/farmer/Profile";

export default function FarmerRoutes() {
  return (
    <PrivateRoute allowedRoles={["farmer"]}>
      <FarmerLayout>
        <Routes>
          <Route path="" element={<Dashboard />} />
          <Route path="milk-history" element={<MilkHistory />} />
          <Route path="payments" element={<Payments />} />
          <Route path="profile" element={<Profile />} />
        </Routes>
      </FarmerLayout>
    </PrivateRoute>
  );
}
