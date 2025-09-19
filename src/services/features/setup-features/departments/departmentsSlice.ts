import { createAsyncThunkWithHandler } from "@/services/api/apiHandler";
import departmentsService from "./departmentsService";
import { createSlice } from "@reduxjs/toolkit";

interface DepartmentsState {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  departments: any[];
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  message: string;
}

const initialState: DepartmentsState = {
  departments: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};

export const getDepartments = createAsyncThunkWithHandler("departments/getDepartments", async () => {
  return await departmentsService.getDepartments();
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const addDepartment = createAsyncThunkWithHandler("departments/addDepartment", async (departmentData: any) => {
  return await departmentsService.addDepartment(departmentData);
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const addBulkDepartments = createAsyncThunkWithHandler("departments/addBulkDepartments", async (payload: { departments: any[] }) => {
  return await departmentsService.addBulkDepartments(payload.departments);
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const updateDepartment = createAsyncThunkWithHandler("departments/updateDepartment", async (departmentData: any) => {
  const { departmentId, ...rest } = departmentData;
  return await departmentsService.updateDepartment(departmentId, rest);
});

export const disableDepartment = createAsyncThunkWithHandler("departments/disableDepartment", async (departmentId: string) => {
  return await departmentsService.disableDepartment(departmentId);
});

export const restoreDepartment = createAsyncThunkWithHandler("departments/restoreDepartment", async (departmentId: string) => {
  return await departmentsService.restoreDepartment(departmentId);
});

const departmentsSlice = createSlice({
  name: "departments",
  initialState,
  reducers: {
    resetDepartments: (state: DepartmentsState) => {
      state.departments = [];
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getDepartments.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getDepartments.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.departments = action.payload.data;
      })
      .addCase(getDepartments.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload as string;
      })
      .addCase(addDepartment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addDepartment.fulfilled, (state) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.message = "Department added successfully";
      })
      .addCase(addDepartment.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload as string;
      })
      .addCase(addBulkDepartments.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addBulkDepartments.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.departments = action.payload.data;
        state.message = "Bulk departments added successfully";
      })
      .addCase(addBulkDepartments.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload as string;
      })
      .addCase(updateDepartment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateDepartment.fulfilled, (state) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.message = "Department updated successfully";
      })
      .addCase(updateDepartment.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload as string;
      })
      .addCase(disableDepartment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(disableDepartment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        const index = state.departments.findIndex(dept => dept._id === action.payload.data._id);
        if (index !== -1) {
          state.departments[index] = action.payload.data;
        }
        state.message = "Department disabled successfully";
      })
      .addCase(disableDepartment.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload as string;
      })
      .addCase(restoreDepartment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(restoreDepartment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        const index = state.departments.findIndex(dept => dept._id === action.payload.data._id);
        if (index !== -1) {
          state.departments[index] = action.payload.data;
        }
        state.message = "Department restored successfully";
      })
      .addCase(restoreDepartment.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload as string;
      });
  },
});

export const { resetDepartments } = departmentsSlice.actions;
export default departmentsSlice.reducer;
