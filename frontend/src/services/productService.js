// src/services/productService.js
import api from "../utils/apiClient";

const productService = {
  // All roles can GET
  getAll: () => api.get("/products"),

  // Admin-only (backend restricts automatically)
  create: (payload) => api.post("/products", payload),
  update: (id, payload) => api.put(`/products/${id}`, payload),
  remove: (id) => api.delete(`/products/${id}`),
};

export default productService;
