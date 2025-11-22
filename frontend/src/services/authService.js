// services/authService.js
import api from "../utils/apiClient";

const authService = {
  login: (email, password) =>
    api.post("/auth/login", { email, password }),

  getMe: () =>
    api.get("/auth/me"),
};

export default authService;
