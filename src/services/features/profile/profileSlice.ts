import { createAsyncThunkWithHandler } from "@/services/api/apiHandler";
import { createSlice } from "@reduxjs/toolkit";
import { profileService } from "./profileService";

// Define Profile interface locally to avoid import issues
interface Profile {
  name: string;
  email: string;
  phone: string;
  address: string;
  logo: string;
  website: string;
  isVerified: boolean;
  status: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  primaryContact: {
    name: string;
    phone: string;
    email: string;
  };
  _id: string;
}

interface ProfileState {
  profile: Profile;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  message: string;
}

const EimpactProfile = localStorage.getItem("EimpactProfile");

const initialState: ProfileState = {
  profile: EimpactProfile ? JSON.parse(EimpactProfile) : null,
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};

export const getProfile = createAsyncThunkWithHandler(
  "profile/getProfile",
  async () => {
    return await profileService.getProfile();
  }
);

export const updateProfile = createAsyncThunkWithHandler(
  "profile/updateProfile",
  async (profileData: Partial<Profile>) => {
    return await profileService.updateProfile(profileData);
  }
);

export const changePassword = createAsyncThunkWithHandler(
  "profile/changePassword",
  async (data: {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
    currentRefreshToken: string;
  }) => {
    return await profileService.changePassword(data);
  }
);

export const requestEmailChange = createAsyncThunkWithHandler(
  "profile/requestEmailChange",
  async (data: { newEmail: string; password: string }) => {
    return await profileService.requestEmailChange(data);
  }
);

export const confirmEmailChange = createAsyncThunkWithHandler(
  "profile/confirmEmailChange",
  async (confirmationData: { token: string }) => {
    return await profileService.confirmEmailChange(confirmationData);
  }
);

export const requestDeleteAccount = createAsyncThunkWithHandler(
  "profile/requestDeleteAccount",
  async (data: { password: string }) => {
    return await profileService.requestDeleteAccount(data);
  }
);

export const confirmDeleteAccount = createAsyncThunkWithHandler(
  "profile/confirmDeleteAccount",
  async (data: { token: string }) => {
    return await profileService.confirmDeleteAccount(data);
  }
);

export const changePasswordWithToken = createAsyncThunkWithHandler(
  "profile/changePasswordWithToken",
  async (data: { token: string }) => {
    return await profileService.changePasswordWithToken(data);
  }
);

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    resetProfile: (state: ProfileState) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.profile = action.payload.data;
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload as string;
      })
      .addCase(updateProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.profile = action.payload.data;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload as string;
      })
      .addCase(changePassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(changePassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.message = action.payload as string;
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload as string;
      })
      .addCase(requestEmailChange.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(requestEmailChange.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.message = action.payload.message;
      })
      .addCase(requestEmailChange.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload as string;
      })
      .addCase(confirmEmailChange.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(confirmEmailChange.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.message = action.payload as string;
      })
      .addCase(confirmEmailChange.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload as string;
      })
      .addCase(requestDeleteAccount.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(requestDeleteAccount.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.message = action.payload.message;
      })
      .addCase(requestDeleteAccount.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload as string;
      })
      .addCase(confirmDeleteAccount.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(confirmDeleteAccount.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.message = action.payload.message;
      })
      .addCase(confirmDeleteAccount.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload as string;
      })
      .addCase(changePasswordWithToken.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(changePasswordWithToken.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.message = action.payload.message;
      })
      .addCase(changePasswordWithToken.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload as string;
      });
  },
});

export const { resetProfile } = profileSlice.actions;
export default profileSlice.reducer;
