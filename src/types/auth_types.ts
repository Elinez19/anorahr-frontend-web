//Login Type

export type ILogin = {
  email: string;
  password: string;
};

export type ILoginToken = {
  data: {
    accessToken?: string;
    refreshToken?: string;
    requireTwoFa?: boolean;
  };
};

// Register Types
export type IRegister = {
  companyName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
  address: string;
  logo?: string;
  website?: string;
  primaryContact: {
    name: string;
    phone: string;
    email: string;
  };
};

// Forgot Password Types
export type IForgotPassword = {
  email: string;
};

// Reset Password Types
export type IResetPassword = {
  token: string;
  password: string;
};

// Verify Organization Types
export type IVerifyOrganization = {
  companyName: string;
  companyAddress: string;
  phoneNumber: string;
  industry: string;
  companySize: string;
  description?: string;
};

// Resend Verification Types
export type IResendVerification = {
  email: string;
};

// Get Access Token Types
export type IGetAccessToken = {
  refreshToken: string;
};
