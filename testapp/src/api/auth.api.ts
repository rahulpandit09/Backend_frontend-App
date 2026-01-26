import api from "./axios";

// Register
export const registerStudent = (data) => {
  return api.post("/auth/register", data);
};

// Login
export const loginUser = (data) => {
  return api.post("/auth/login", data);
};
