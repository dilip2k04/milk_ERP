// services/orderService.js
import api from "../utils/apiClient";

const orderService = {
  create: (data) => api.post("/orders", data),
  getAll: (params = {}) => api.get("/orders", { params }),
  getById: (id) => api.get(`/orders/${id}`),

  cancel: (id) => api.post(`/orders/${id}/cancel`),
  approve: (id) => api.post(`/orders/${id}/approve`),
};

export default orderService;
