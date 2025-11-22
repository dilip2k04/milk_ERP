// services/stockService.js
import api from "../utils/apiClient";

const stockService = {
  getAll: () => api.get("/product-stocks"),
  getByProduct: (productId) => api.get(`/product-stocks/${productId}`),
  adjustStock: (productId, data) =>
    api.post(`/product-stocks/${productId}/adjust`, data),
};

export default stockService;
