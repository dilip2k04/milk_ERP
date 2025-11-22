// services/milkUsageService.js
import api from "../utils/apiClient";

const milkUsageService = {
  getAll: () => api.get("/milk-usage"),
  create: (data) => api.post("/milk-usage", data),
  update: (id, data) => api.put(`/milk-usage/${id}`, data),
  remove: (id) => api.delete(`/milk-usage/${id}`),
};

export default milkUsageService;
