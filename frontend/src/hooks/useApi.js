// hooks/useApi.js
import axios from "axios";
import { useEffect, useMemo } from "react";
import useAuth from "./useAuth";
import { useUI } from "../context/UIContext";

/**
 * Hook: useApi
 * Returns a pre-configured Axios instance with:
 * - Authorization token
 * - Global loading overlay
 * - Error handling
 */
export default function useApi() {
  const { token, logout } = useAuth();
  const { setGlobalLoading } = useUI();

  const api = useMemo(() => {
    const instance = axios.create({
      baseURL: "/api",
      timeout: 15000,
    });

    // ------------------------
    // REQUEST INTERCEPTOR
    // ------------------------
    instance.interceptors.request.use(
      (config) => {
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        setGlobalLoading(true);
        return config;
      },
      (error) => {
        setGlobalLoading(false);
        return Promise.reject(error);
      }
    );

    // ------------------------
    // RESPONSE INTERCEPTOR
    // ------------------------
    instance.interceptors.response.use(
      (response) => {
        setGlobalLoading(false);
        return response.data;
      },
      (error) => {
        setGlobalLoading(false);

        // Auto logout on unauthorized
        if (error.response?.status === 401) {
          logout();
        }

        throw error;
      }
    );

    return instance;
  }, [token, logout, setGlobalLoading]);

  return api;
}
