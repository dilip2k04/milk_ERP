// src/services/paymentMethodService.js
import api from "../utils/apiClient";

const paymentMethodService = {
  // ShopKeeper + Admin
  getAll: () => api.get("/payment-methods"),

  // Admin only
  create: (data) => api.post("/payment-methods", data),
  update: (id, data) => api.put(`/payment-methods/${id}`, data),
  remove: (id) => api.delete(`/payment-methods/${id}`),
};

export default paymentMethodService;
