// routers/AuthRoutes.jsx
import { Routes, Route } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";

import Login from "../pages/auth/Login";
import ChangePassword from "../pages/auth/ChangePassword";

export default function AuthRoutes() {
  return (
    <AuthLayout>
      <Routes>
        <Route path="" element={<Login />} />                 {/* /login */}
        <Route path="change-password" element={<ChangePassword />} /> {/* /login/change-password */}
      </Routes>
    </AuthLayout>
  );
}
