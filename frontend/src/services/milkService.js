// services/milkService.js
import api from "../utils/apiClient";

const milkService = {
  // Sessions
  getSessions: () => api.get("/milk-sessions"),
  createSession: (data) => api.post("/milk-sessions", data),

  // Milk Entries
  getEntries: (params = {}) => api.get("/milk-entries", { params }),
  createEntry: (data) => api.post("/milk-entries", data),

  // CSV Upload
  uploadCSV: (formData) =>
    api.post("/milk/upload-csv", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),

  // Rate Config
  getRates: () => api.get("/rate-configs"),
  createRate: (data) => api.post("/rate-configs", data),
  updateRate: (id, data) => api.put(`/rate-configs/${id}`, data),
  deleteRate: (id) => api.delete(`/rate-configs/${id}`),
};

export default milkService;
