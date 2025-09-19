import { encrypt } from "@/helpers/helpers.encryptDecrypt";
import { axiosClient } from "@/services/api/axiosClient";
import type { ILogin, ILoginToken } from "@/types/auth_types";

export const handle_tokens = (response: ILoginToken) => {
  console.log(response);
  const encryptedAccessToken = encrypt(response.data.accessToken);
  const encryptedRefreshToken = encrypt(response.data.refreshToken);
  localStorage.setItem("EimpactAccessToken", encryptedAccessToken);
  localStorage.setItem("EimpactRefreshToken", encryptedRefreshToken);

  return {
    accessToken: encryptedAccessToken,
    refreshToken: encryptedRefreshToken,
  };
};

const Login = async (userData: ILogin) => {
  const response = await axiosClient.post(`/auth/login`, userData);
  return handle_tokens(response.data);
};

const Register = async (userData: unknown) => {
  const response = await axiosClient.post(`/auth/register`, userData);
  return response.data;
};

const VerifyOrganization = async (verificationData: unknown) => {
  const response = await axiosClient.post(
    `/auth/verify-organization`,
    verificationData
  );
  return response.data;
};

const ResendVerification = async (emailData: unknown) => {
  const response = await axiosClient.post(
    `/auth/resend-verification`,
    emailData
  );
  return response.data;
};

const GetAccessToken = async (tokenData: unknown) => {
  const response = await axiosClient.post(`/auth/get-access-token`, tokenData);
  return handle_tokens(response.data);
};

const ForgotPassword = async (emailData: unknown) => {
  const response = await axiosClient.post(`/auth/forgot-password`, emailData);
  return response.data;
};

const ResetPassword = async (resetData: unknown) => {
  const response = await axiosClient.put(`/auth/reset-password`, resetData);
  return response.data;
};

const LogoutAPI = async () => {
  try {
    const response = await axiosClient.post(`/auth/logout`);
    return response.data;
  } catch (error) {
    console.error("Logout API error:", error);
    // Continue with local logout even if API fails
  }
};

export const Logout = async () => {
  // Call logout API first
  await LogoutAPI();

  // Clear local storage
  localStorage.removeItem("EimpactAccessToken");
  localStorage.removeItem("EimpactRefreshToken");
  localStorage.removeItem("EimpactProfile");

  // Redirect to login
  window.location.href = "/auth/login";
};

// Helper function to check if user is authenticated
export const isAuthenticated = (): boolean => {
  const accessToken = localStorage.getItem("EimpactAccessToken");
  return !!accessToken;
};

// Helper function to get tokens from storage
export const getTokens = () => {
  const accessToken = localStorage.getItem("EimpactAccessToken");
  const refreshToken = localStorage.getItem("EimpactRefreshToken");
  return {
    accessToken,
    refreshToken,
  };
};

// Helper function to clear all auth data
export const clearAuthData = () => {
  localStorage.removeItem("EimpactAccessToken");
  localStorage.removeItem("EimpactRefreshToken");
  localStorage.removeItem("EimpactProfile");
};

const authService = {
  Login,
  Register,
  VerifyOrganization,
  ResendVerification,
  GetAccessToken,
  ForgotPassword,
  ResetPassword,
  Logout,
  LogoutAPI,
  isAuthenticated,
  getTokens,
  clearAuthData,
};

export default authService;
