// services/paymentService.js
import api from "../utils/apiClient";

const paymentService = {
  // Farmer payments
  payFarmer: (data) => api.post("/payments/farmer", data),
  getFarmerPayments: (farmerId) =>
    api.get(`/payments/farmer/${farmerId}`),

  // Shopkeeper payments
  recordShopkeeperPayment: (data) =>
    api.post("/payments/shopkeeper", data),

  getShopkeeperPayments: (shopKeeperId) =>
    api.get(`/payments/shopkeeper/${shopKeeperId}`),
};

export default paymentService;
