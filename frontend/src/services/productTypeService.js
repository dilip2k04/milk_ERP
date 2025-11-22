// src/services/productTypeService.js
import api from "../utils/apiClient";

const productTypeService = {
  getAll: () => api.get("/product-types"),
  create: (payload) => api.post("/product-types", payload),
  update: (id, payload) => api.put(`/product-types/${id}`, payload),
  remove: (id) => api.delete(`/product-types/${id}`),
};

export default productTypeService;
