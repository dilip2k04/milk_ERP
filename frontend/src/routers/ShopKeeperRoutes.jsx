// routers/ShopKeeperRoutes.jsx
import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import ShopKeeperLayout from "../layouts/ShopKeeperLayout";

import Dashboard from "../pages/shopkeeper/Dashboard";
import Customers from "../pages/shopkeeper/Customers";
import CreateOrder from "../pages/shopkeeper/Order";
import OrderHistory from "../pages/shopkeeper/OrderHistory";
import PendingPayments from "../pages/shopkeeper/PendingPayments";
import Profile from "../pages/shopkeeper/Profile";

export default function ShopKeeperRoutes() {
  return (
    <PrivateRoute allowedRoles={["shop_keeper"]}>
      <ShopKeeperLayout>
        <Routes>
          <Route path="" element={<Dashboard />} />
          <Route path="customers" element={<Customers />} />
          <Route path="order" element={<CreateOrder />} />
          <Route path="order-history" element={<OrderHistory />} />
          <Route path="pending-payments" element={<PendingPayments />} />
          <Route path="profile" element={<Profile />} />
        </Routes>
      </ShopKeeperLayout>
    </PrivateRoute>
  );
}
