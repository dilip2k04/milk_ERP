// services/discountService.js
import api from "../utils/apiClient";

const discountService = {
  getAll: () => api.get("/discounts"),
  create: (data) => api.post("/discounts", data),
  update: (id, data) => api.put(`/discounts/${id}`, data),
  remove: (id) => api.delete(`/discounts/${id}`),
};

export default discountService;
