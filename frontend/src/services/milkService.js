// services/milkService.js
import api from "../utils/apiClient";

const milkService = {
  // -------------------------
  // MILK SESSIONS  (CRUD)
  // -------------------------
  getSessions: () => api.get("/milk-sessions"),
  createSession: (data) => api.post("/milk-sessions", data),
  updateSession: (id, data) => api.put(`/milk-sessions/${id}`, data),
  deleteSession: (id) => api.delete(`/milk-sessions/${id}`),

  // -------------------------
  // MILK ENTRIES
  // -------------------------
  getEntries: (params = {}) => api.get("/milk-entries", { params }),
  createEntry: (data) => api.post("/milk-entries", data),

  // -------------------------
  // CSV UPLOAD
  // -------------------------
  uploadCSV: (formData) =>
    api.post("/milk/upload-csv", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),

  // -------------------------
  // RATE CONFIG (CRUD)
  // -------------------------
  getRates: () => api.get("/rate-configs"),
  createRate: (data) => api.post("/rate-configs", data),
  updateRate: (id, data) => api.put(`/rate-configs/${id}`, data),
  deleteRate: (id) => api.delete(`/rate-configs/${id}`),
};

export default milkService;
