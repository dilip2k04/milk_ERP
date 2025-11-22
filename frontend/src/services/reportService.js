// services/reportService.js
import api from "../utils/apiClient";

const reportService = {
  getMilkReport: (params) => api.get("/reports/milk", { params }),
  getFinanceReport: (params) => api.get("/reports/finance", { params }),
  getSalesReport: (params) => api.get("/reports/sales", { params }),
  getFarmerReport: (params) => api.get("/reports/farmer", { params }),
};

export default reportService;
