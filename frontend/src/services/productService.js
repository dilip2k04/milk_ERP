// services/productService.js
import api from "../utils/apiClient";

const productService = {
  getTypes: () => api.get("/product-types"),
  createType: (data) => api.post("/product-types", data),
  updateType: (id, data) => api.put(`/product-types/${id}`, data),
  deleteType: (id) => api.delete(`/product-types/${id}`),

  getProducts: () => api.get("/products"),
  createProduct: (data) => api.post("/products", data),
  updateProduct: (id, data) => api.put(`/products/${id}`, data),
  deleteProduct: (id) => api.delete(`/products/${id}`),
};

export default productService;
