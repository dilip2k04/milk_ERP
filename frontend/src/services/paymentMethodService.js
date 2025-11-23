import api from "../utils/apiClient";

const paymentMethodService = {
  getAll: () => api.get("/payment-methods"),
  getOne: (id) => api.get(`/payment-methods/${id}`),
  create: (data) => api.post("/payment-methods", data),
  update: (id, data) => api.put(`/payment-methods/${id}`, data),
  remove: (id) => api.delete(`/payment-methods/${id}`),
};

export default paymentMethodService;
