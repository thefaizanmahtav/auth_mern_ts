import API from "../config/apiClient";

export const login = async (data) => API.post("/auth/login", data);
export const logout = async () => API.get("/auth/logout");
export const register = async (data) => API.post("/auth/register", data);
export const verifyEmail = async (verificationCode) => API.get(`/auth/email/verify/${verificationCode}`);
export const sendPasswordResetEmail = async (email) => API.post(`/auth/password/forgot`, { email });
export const resetPassword = async ({password, code}) => API.post(`/auth/password/reset`, { password, verificationCode : code });

export const getUser = async () => API.get("/user");