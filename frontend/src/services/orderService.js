// src/services/orderService.js
import api from "../utils/apiClient";

const orderService = {
  // ---------- ShopKeeper ----------
  create: (data) => api.post("/orders", data),
  getMy: () => api.get("/orders/my"),
  cancelMy: (id) => api.patch(`/orders/${id}/cancel`),
  deleteMy: (id) => api.delete(`/orders/${id}`),

  // ---------- Admin ----------
  adminGetAll: (params = {}) => api.get("/orders", { params }),
  adminApprove: (id) => api.patch(`/orders/${id}/approve`),
  adminReject: (id) => api.patch(`/orders/${id}/reject`),
  adminDeliver: (id) => api.patch(`/orders/${id}/deliver`),
  adminDelete: (id) => api.delete(`/orders/${id}/admin`),
};

export default orderService;
