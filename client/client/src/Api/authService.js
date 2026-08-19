import API from "./axiosConfig";

export const registerUser = (userData) => API.post("/auth/signup", userData);

export const loginUser = (credentials) => API.post("/auth/login", credentials);

export const loginWithGoogleToken = (tokenId) =>
  API.post("/auth/google-login", { token: tokenId });

export const getProfile = () => API.get("/auth/profile");

// Utility function to check if user is authenticated
export const isAuthenticated = () => {
  return !!sessionStorage.getItem("token");
};

// Utility function to get user info
export const getUserInfo = () => {
  const token = sessionStorage.getItem("token");
  const role = sessionStorage.getItem("role");
  const user = sessionStorage.getItem("user");

  return {
    token,
    role,
    user: user ? JSON.parse(user) : null,
  };
};
