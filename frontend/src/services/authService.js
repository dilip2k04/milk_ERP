// services/authService.js
import api from "../utils/apiClient";
import { auth } from "../utils/firebase";

const authService = {
  getMe: async () => {
    const user = auth.currentUser;
    if (user) {
      const token = await user.getIdToken();
      return api.get("/auth/me", {
        headers: { Authorization: `Bearer ${token}` }
      });
    }

    return api.get("/auth/me"); // fallback
  },
};

export default authService;
