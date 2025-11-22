// routers/CompanyRoutes.jsx
import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import CompanyLayout from "../layouts/CompanyLayout";

import Dashboard from "../pages/company/Dashboard";
import MilkSummary from "../pages/company/MilkSummary";
import MilkUsage from "../pages/company/MilkUsage";

export default function CompanyRoutes() {
  return (
    <PrivateRoute allowedRoles={["company"]}>
      <CompanyLayout>
        <Routes>
          <Route path="" element={<Dashboard />} />
          <Route path="milk-summary" element={<MilkSummary />} />
          <Route path="milk-usage" element={<MilkUsage />} />
        </Routes>
      </CompanyLayout>
    </PrivateRoute>
  );
}
