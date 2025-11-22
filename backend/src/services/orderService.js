// src/services/orderService.js
import api from "../utils/apiClient";

const orderService = {
  // Shop Keeper:
  create: (data) => api.post("/orders", data),
  getMy: () => api.get("/orders/my"),
  cancel: (id) => api.patch(`/orders/${id}/cancel`),
  remove: (id) => api.delete(`/orders/${id}`),

  // Admin:
  getAll: (params = {}) => api.get("/orders", { params }),
  updateStatus: (id, status) =>
    api.patch(`/orders/${id}/status`, { status }),
};

export default orderService;
