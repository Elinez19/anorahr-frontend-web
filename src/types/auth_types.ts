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
  }
};
