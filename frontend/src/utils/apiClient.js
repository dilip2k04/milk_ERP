// utils/apiClient.js
import axios from "axios";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

// 🔥 Wait for Firebase to load user before sending token
const waitForUser = () =>
  new Promise((resolve) => {
    if (auth.currentUser) return resolve(auth.currentUser);

    const unsub = onAuthStateChanged(auth, (user) => {
      unsub();
      resolve(user);
    });
  });

// 🔥 Interceptor that ALWAYS attaches a valid token
api.interceptors.request.use(async (config) => {
  const user = await waitForUser();  // <-- ensures user is ready

  if (user) {
    const token = await user.getIdToken();
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;
