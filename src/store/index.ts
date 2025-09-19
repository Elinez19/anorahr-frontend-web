import { configureStore } from "@reduxjs/toolkit";

import authReducer from "@/services/features/auth/authSlice";
import profileReducer from "@/services/features/profile/profileSlice";
import rolesReducer from "@/services/features/setup-features/roles/rolesSlice";
import departmentsReducer from "@/services/features/setup-features/departments/departmentsSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    roles: rolesReducer,
    departments: departmentsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
