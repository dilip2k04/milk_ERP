// App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";

import AuthRoutes from "./routers/AuthRoutes";
import AdminRoutes from "./routers/AdminRoutes";
import CompanyRoutes from "./routers/CompanyRoutes";
import ShopKeeperRoutes from "./routers/ShopKeeperRoutes";
import FarmerRoutes from "./routers/FarmerRoutes";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth routes */}
        <Route path="/login/*" element={<AuthRoutes />} />
        <Route path="/change-password/*" element={<AuthRoutes />} />

        {/* Role-based app sections */}
        <Route path="/admin/*" element={<AdminRoutes />} />
        <Route path="/company/*" element={<CompanyRoutes />} />
        <Route path="/shop/*" element={<ShopKeeperRoutes />} />
        <Route path="/farmer/*" element={<FarmerRoutes />} />

        {/* Default redirect → login */}
        <Route path="*" element={<AuthRoutes />} />
      </Routes>
    </BrowserRouter>
  );
}
