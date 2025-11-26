// src/services/milkEntryService.js
import api from "../utils/apiClient";

const milkEntryService = {
  uploadFile: (file) => {
    const formData = new FormData();
    formData.append("file", file);

    return api.post("/csv/milk-entries/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },
};

export default milkEntryService;
