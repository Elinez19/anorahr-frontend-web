import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import type { RootState, AppDispatch } from "@/store";
import {
  LoginUser,
  Register,
  ForgotPassword,
  ResetPassword,
  VerifyOrganization,
  ResendVerification,
  GetAccessToken,
  LogoutUser,
  resetAuth,
} from "@/services/features/auth/authSlice";
import type {
  ILogin,
  IRegister,
  IForgotPassword,
  IResetPassword,
  IVerifyOrganization,
  IResendVerification,
  IGetAccessToken,
} from "@/types/auth_types";

// Custom hook for login
export const useLogin = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading, isError, isSuccess, message, token } = useSelector(
    (state: RootState) => state.auth
  );

  const login = (loginData: ILogin) => {
    dispatch(LoginUser(loginData));
  };

  const reset = () => {
    dispatch(resetAuth());
  };

  useEffect(() => {
    if (isSuccess && token) {
      toast.success("Login successful! Welcome back.");
    }
  }, [isSuccess, token]);

  useEffect(() => {
    if (isError && message) {
      toast.error(message);
    }
  }, [isError, message]);

  return {
    login,
    reset,
    isLoading,
    isError,
    isSuccess,
    message,
    token,
  };
};

// Custom hook for registration
export const useRegister = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading, isError, isSuccess, message } = useSelector(
    (state: RootState) => state.auth
  );

  const register = (registerData: IRegister) => {
    dispatch(Register(registerData));
  };

  const reset = () => {
    dispatch(resetAuth());
  };

  useEffect(() => {
    if (isSuccess && message) {
      toast.success(
        "Registration successful! Please check your email to verify your account."
      );
    }
  }, [isSuccess, message]);

  useEffect(() => {
    if (isError && message) {
      toast.error(message);
    }
  }, [isError, message]);

  return {
    register,
    reset,
    isLoading,
    isError,
    isSuccess,
    message,
  };
};

// Custom hook for forgot password
export const useForgotPassword = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading, isError, isSuccess, message } = useSelector(
    (state: RootState) => state.auth
  );

  const forgotPassword = (emailData: IForgotPassword) => {
    dispatch(ForgotPassword(emailData));
  };

  const reset = () => {
    dispatch(resetAuth());
  };

  useEffect(() => {
    if (isSuccess && message) {
      toast.success("Password reset link sent to your email!");
    }
  }, [isSuccess, message]);

  useEffect(() => {
    if (isError && message) {
      toast.error(message);
    }
  }, [isError, message]);

  return {
    forgotPassword,
    reset,
    isLoading,
    isError,
    isSuccess,
    message,
  };
};

// Custom hook for reset password
export const useResetPassword = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading, isError, isSuccess, message } = useSelector(
    (state: RootState) => state.auth
  );

  const resetPassword = (resetData: IResetPassword) => {
    dispatch(ResetPassword(resetData));
  };

  const reset = () => {
    dispatch(resetAuth());
  };

  useEffect(() => {
    if (isSuccess && message) {
      toast.success("Password reset successful!");
    }
  }, [isSuccess, message]);

  useEffect(() => {
    if (isError && message) {
      toast.error(message);
    }
  }, [isError, message]);

  return {
    resetPassword,
    reset,
    isLoading,
    isError,
    isSuccess,
    message,
  };
};

// Custom hook for verify organization
export const useVerifyOrganization = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading, isError, isSuccess, message } = useSelector(
    (state: RootState) => state.auth
  );

  const verifyOrganization = (verificationData: IVerifyOrganization) => {
    dispatch(VerifyOrganization(verificationData));
  };

  const reset = () => {
    dispatch(resetAuth());
  };

  useEffect(() => {
    if (isSuccess && message) {
      toast.success("Company verification submitted successfully!");
    }
  }, [isSuccess, message]);

  useEffect(() => {
    if (isError && message) {
      toast.error(message);
    }
  }, [isError, message]);

  return {
    verifyOrganization,
    reset,
    isLoading,
    isError,
    isSuccess,
    message,
  };
};

// Custom hook for resend verification
export const useResendVerification = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading, isError, isSuccess, message } = useSelector(
    (state: RootState) => state.auth
  );

  const resendVerification = (emailData: IResendVerification) => {
    dispatch(ResendVerification(emailData));
  };

  const reset = () => {
    dispatch(resetAuth());
  };

  useEffect(() => {
    if (isSuccess && message) {
      toast.success("Verification email sent successfully!");
    }
  }, [isSuccess, message]);

  useEffect(() => {
    if (isError && message) {
      toast.error(message);
    }
  }, [isError, message]);

  return {
    resendVerification,
    reset,
    isLoading,
    isError,
    isSuccess,
    message,
  };
};

// Custom hook for logout
export const useLogout = () => {
  const dispatch = useDispatch<AppDispatch>();

  const logout = () => {
    dispatch(LogoutUser());
  };

  return {
    logout,
  };
};

// Custom hook for getting access token
export const useGetAccessToken = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading, isError, isSuccess, message, token } = useSelector(
    (state: RootState) => state.auth
  );

  const getAccessToken = (tokenData: IGetAccessToken) => {
    dispatch(GetAccessToken(tokenData));
  };

  useEffect(() => {
    if (isSuccess && message) {
      toast.success("Token refreshed successfully");
    }
  }, [isSuccess, message]);

  useEffect(() => {
    if (isError && message) {
      toast.error(message);
    }
  }, [isError, message]);

  return {
    getAccessToken,
    isLoading,
    isError,
    isSuccess,
    message,
    token,
  };
};

// Custom hook for auth state
export const useAuthState = () => {
  const { token, isLoading, isError, isSuccess, message } = useSelector(
    (state: RootState) => state.auth
  );

  const isAuthenticated = !!token;

  return {
    token,
    isLoading,
    isError,
    isSuccess,
    message,
    isAuthenticated,
  };
};
