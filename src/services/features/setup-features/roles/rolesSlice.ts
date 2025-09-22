import { createAsyncThunkWithHandler } from "@/services/api/apiHandler";
import rolesService from "./rolesService";
import { createSlice } from "@reduxjs/toolkit";

// Define Role interface locally to avoid import issues
interface Role {
  _id: string;
  name: string;
  description?: string;
  relatedRole: string;
  createdBy: string;
  createdAt?: string;
  updatedAt?: string;
  isActive?: boolean;
}

interface RolesState {
  roles: Role[];
  relatedRoles: Array<{ _id: string; roleType: string; roleName: string }>;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  message: string;
  isLoadingRelatedRoles: boolean;
  errorRelatedRoles: string | null;
  isLoadingCreateRole: boolean;
  errorCreateRole: string | null;
}

const initialState: RolesState = {
  roles: [],
  relatedRoles: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
  isLoadingRelatedRoles: false,
  errorRelatedRoles: null,
  isLoadingCreateRole: false,
  errorCreateRole: null,
};

export const getRoles = createAsyncThunkWithHandler(
  "roles/getRoles",
  async () => {
    return await rolesService.getRoles();
  }
);

export const addRole = createAsyncThunkWithHandler(
  "roles/addRole",
  async (roleData: {
    name: string;
    description?: string;
    relatedRole: string;
    createdBy: string;
  }) => {
    return await rolesService.addRole(roleData);
  }
);

export const getRelatedRoles = createAsyncThunkWithHandler(
  "roles/getRelatedRoles",
  async () => {
    return await rolesService.getRelatedRoles();
  }
);

export const getRoleById = createAsyncThunkWithHandler(
  "roles/getRoleById",
  async (roleId: string) => {
    return await rolesService.getRoleById(roleId);
  }
);

export const updateRole = createAsyncThunkWithHandler(
  "roles/updateRole",
  async ({
    roleId,
    data,
  }: {
    roleId: string;
    data: Partial<Omit<Role, "_id" | "createdAt" | "updatedAt">>;
  }) => {
    // Convert relatedRole to string if it's an array
    const payload = {
      ...data,
      relatedRole: Array.isArray(data.relatedRole)
        ? data.relatedRole[0]
        : data.relatedRole,
    };
    return await rolesService.updateRole(roleId, payload);
  }
);

// Disable role by ID (soft delete, PATCH isActive: false)
export const disableRole = createAsyncThunkWithHandler(
  "roles/disableRole",
  async (roleId: string) => {
    return await rolesService.disableRole(roleId);
  }
);

export const addBulkRoles = createAsyncThunkWithHandler(
  "roles/addBulkRoles",
  async (
    roles: Omit<Role, "_id" | "createdAt" | "updatedAt" | "isActive">[]
  ) => {
    return await rolesService.addBulkRoles(roles);
  }
);

export const restoreRole = createAsyncThunkWithHandler(
  "roles/restoreRole",
  async (roleId: string) => {
    return await rolesService.restoreRole(roleId);
  }
);

export const fetchRelatedRoles = createAsyncThunkWithHandler(
  "roles/fetchRelatedRoles",
  async () => {
    return await rolesService.getRelatedRoles();
  }
);

export const createRole = createAsyncThunkWithHandler(
  "roles/createRole",
  async (data: {
    name: string;
    description?: string;
    relatedRole: string;
    createdBy: string;
  }) => {
    return await rolesService.addRole(data);
  }
);

const rolesSlice = createSlice({
  name: "roles",
  initialState,
  reducers: {
    resetRoles: (state: RolesState) => {
      state.roles = [];
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getRoles.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getRoles.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.roles = Array.isArray(action.payload.data)
          ? action.payload.data
          : [action.payload.data];
      })
      .addCase(getRoles.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload as string;
      })
      .addCase(addRole.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addRole.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.roles.push(action.payload.data);
        state.message = "Role added successfully";
      })
      .addCase(addRole.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload as string;
      })
      .addCase(getRelatedRoles.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getRelatedRoles.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.relatedRoles = action.payload.data;
      })
      .addCase(getRelatedRoles.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload as string;
      })
      .addCase(getRoleById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getRoleById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.roles = Array.isArray(action.payload.data)
          ? action.payload.data
          : [action.payload.data];
      })
      .addCase(getRoleById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload as string;
      })
      .addCase(updateRole.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateRole.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        const updated = action.payload.data;
        state.roles = state.roles.map((role) =>
          role._id === updated._id ? updated : role
        );
        state.message = action.payload.message || "Role updated successfully";
      })
      .addCase(updateRole.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload as string;
      })
      // FIXED: Disable role - update specific role instead of replacing entire array
      .addCase(disableRole.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(disableRole.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        const disabledRole = action.payload.data;
        // Update the specific role in the array
        state.roles = state.roles.map((role) =>
          role._id === disabledRole._id ? disabledRole : role
        );
        state.message = "Role disabled successfully";
      })
      .addCase(disableRole.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload as string;
      })
      .addCase(addBulkRoles.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addBulkRoles.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        if (Array.isArray(action.payload.data.roles)) {
          state.roles = [...state.roles, ...action.payload.data.roles];
        }
        state.message =
          action.payload.message || "Bulk roles added successfully";
      })
      .addCase(addBulkRoles.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload as string;
      })
      // FIXED: Restore role - update specific role instead of replacing entire array
      .addCase(restoreRole.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(restoreRole.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        const restoredRole = action.payload.data;
        // Update the specific role in the array
        state.roles = state.roles.map((role) =>
          role._id === restoredRole._id ? restoredRole : role
        );
        state.message = "Role restored successfully";
      })
      .addCase(restoreRole.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload as string;
      })
      .addCase(fetchRelatedRoles.pending, (state) => {
        state.isLoadingRelatedRoles = true;
        state.errorRelatedRoles = null;
      })
      .addCase(fetchRelatedRoles.fulfilled, (state, action) => {
        state.isLoadingRelatedRoles = false;
        state.relatedRoles = action.payload.data;
      })
      .addCase(fetchRelatedRoles.rejected, (state, action) => {
        state.isLoadingRelatedRoles = false;
        state.errorRelatedRoles = action.payload as string;
      })
      .addCase(createRole.pending, (state) => {
        state.isLoadingCreateRole = true;
        state.errorCreateRole = null;
      })
      .addCase(createRole.fulfilled, (state, action) => {
        state.isLoadingCreateRole = false;
        state.roles.push(action.payload.data);
      })
      .addCase(createRole.rejected, (state, action) => {
        state.isLoadingCreateRole = false;
        state.errorCreateRole = action.payload as string;
      });
  },
});

export const { resetRoles } = rolesSlice.actions;
export default rolesSlice.reducer;
