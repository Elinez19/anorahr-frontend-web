import { axiosClient } from "@/services/api/axiosClient";
import type { Profile } from "@/types/dashboard_types";

const getProfile = async () => {
  const response = await axiosClient.get("/profile/me");
  if (response.data) {
    localStorage.setItem("EimpactProfile", JSON.stringify(response.data.data));
  }
  return response.data;
};

const updateProfile = async (profileData: Partial<Profile>) => {
  const response = await axiosClient.put("/profile/update", profileData);
  if (response.data) {
    localStorage.setItem("EimpactProfile", JSON.stringify(response.data));
  }
  return response.data;
};

const changePassword = async (data: {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
  currentRefreshToken: string;
}) => {
  const response = await axiosClient.put("/profile/change-password", data);
  return response.data;
};

const requestEmailChange = async (data: {
  newEmail: string;
  password: string;
}) => {
  const response = await axiosClient.post(
    "/profile/request-email-change",
    data
  );
  return response.data;
};

const confirmEmailChange = async (confirmationData: { token: string }) => {
  const response = await axiosClient.put(
    "/profile/confirm-email-change",
    confirmationData
  );
  if (response.data) {
    localStorage.setItem("EimpactProfile", JSON.stringify(response.data));
  }
  return response.data;
};

const requestDeleteAccount = async (data: { password: string }) => {
  const response = await axiosClient.post(
    "/profile/request-delete-account",
    data
  );
  return response.data;
};

const confirmDeleteAccount = async (data: { token: string }) => {
  const response = await axiosClient.delete("/profile/confirm-delete-account", {
    data,
  });
  // Clear profile from localStorage on successful deletion
  if (response.data) {
    localStorage.removeItem("EimpactProfile");
  }
  return response.data;
};

// Helper function to get profile from localStorage
export const getProfileFromStorage = () => {
  const profile = localStorage.getItem("EimpactProfile");
  return profile ? JSON.parse(profile) : null;
};

// Helper function to clear profile from localStorage
export const clearProfileFromStorage = () => {
  localStorage.removeItem("EimpactProfile");
};

const changePasswordWithToken = async (data: { token: string }) => {
  const response = await axiosClient.put("/profile/change-password", data);
  return response.data;
};

export const profileService = {
  getProfile,
  updateProfile,
  changePassword,
  requestEmailChange,
  confirmEmailChange,
  requestDeleteAccount,
  confirmDeleteAccount,
  changePasswordWithToken,
};
