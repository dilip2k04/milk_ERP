// routers/AdminRoutes.jsx
import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import AdminLayout from "../layouts/AdminLayout";

import Dashboard from "../pages/admin/Dashboard";
import Users from "../pages/admin/Users";
import Products from "../pages/admin/Products";
import ProductTypes from "../pages/admin/ProductTypes";
import MilkSessions from "../pages/admin/MilkSessions";
import UploadCSV from "../pages/admin/UploadCSV";
import MilkEntries from "../pages/admin/MilkEntries";
import MilkRates from "../pages/admin/MilkRates";
import Orders from "../pages/admin/Orders";
import ShopkeeperDues from "../pages/admin/ShopkeeperDues";
import FarmerPayments from "../pages/admin/FarmerPayments";
import ShopkeeperPayments from "../pages/admin/ShopkeeperPayments";
import PaymentMethods from "../pages/admin/PaymentMethods";
import Discounts from "../pages/admin/Discounts";
import Reports from "../pages/admin/Reports";
import Settings from "../pages/admin/Settings";
import Profile from "../pages/admin/Profile";

export default function AdminRoutes() {
  return (
    <PrivateRoute allowedRoles={["admin"]}>
      <AdminLayout>
        <Routes>
          <Route path="" element={<Dashboard />} />
          <Route path="users" element={<Users />} />
          <Route path="products" element={<Products />} />
          <Route path="product-type" element={<ProductTypes />} />
          <Route path="milk-sessions" element={<MilkSessions />} />
          <Route path="upload-csv" element={<UploadCSV />} />
          <Route path="milk-entries" element={<MilkEntries />} />
          <Route path="milk-rates" element={<MilkRates />} />
          <Route path="orders" element={<Orders />} />
          <Route path="shopkeeper-dues" element={<ShopkeeperDues />} />
          <Route path="farmer-payments" element={<FarmerPayments />} />
          <Route path="shopkeeper-payments" element={<ShopkeeperPayments />} />
          <Route path="payment-methods" element={<PaymentMethods />} />
          <Route path="discounts" element={<Discounts />} />
          <Route path="reports" element={<Reports />} />
          <Route path="settings" element={<Settings />} />
          <Route path="profile" element={<Profile />} />
        </Routes>
      </AdminLayout>
    </PrivateRoute>
  );
}
