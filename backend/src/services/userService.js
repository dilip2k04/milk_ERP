import api from "../utils/apiClient";

const userService = {
  getAll: () => api.get("/users"),  
  create: (data) => api.post("/users", data),
  update: (id, data) => api.patch(`/users/${id}`, data),
  remove: (id) => api.delete(`/users/${id}`),
};

export default userService;
