import { axiosClient } from "@/services/api/axiosClient";
import type { Department } from "@/types/dashboard_types";

// Get all departments
export const getDepartments = async () => {
  const response = await axiosClient.get("/departments");
  return response.data;
};

// Add a new department
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const addDepartment = async (departmentData: any) => {
  const response = await axiosClient.post("/departments", departmentData);
  return response.data;
};

// Add bulk departments
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const addBulkDepartments = async (departmentsData: any[]) => {
  const response = await axiosClient.post("/departments/bulk", {
    departments: departmentsData,
  });
  return response.data;
};

// Update department by ID
export const updateDepartment = async (
  departmentId: string,
  departmentData: { name: string; description?: string; commonRoles?: string[] }
) => {
  const response = await axiosClient.put(
    `/departments/${departmentId}`,
    departmentData
  );
  return response.data;
};

// Disable department by ID (soft delete via DELETE - sets isActive: false)
export const disableDepartment = async (
  departmentId: string
): Promise<{ data: Department }> => {
  const response = await axiosClient.delete(`/departments/${departmentId}`);
  return { data: response.data.data }; // API returns { success, message, data }
};

// Restore department by ID (sets isActive: true)
export const restoreDepartment = async (
  departmentId: string
): Promise<{ data: Department }> => {
  const response = await axiosClient.patch(
    `/departments/${departmentId}/restore`
  );
  return { data: response.data.data }; // API returns { success, message, data }
};

// Helper function to get department by ID
export const getDepartmentById = async (departmentId: string) => {
  try {
    const departments = await getDepartments();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return departments.find((dept: any) => dept.id === departmentId);
  } catch (error) {
    console.error("Error fetching department by ID:", error);
    return null;
  }
};

// Helper function to check if department exists
export const checkDepartmentExists = async (departmentName: string) => {
  try {
    const departments = await getDepartments();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return departments.some(
      (dept: any) => dept.name?.toLowerCase() === departmentName.toLowerCase()
    );
  } catch (error) {
    console.error("Error checking department existence:", error);
    return false;
  }
};

// Helper function to get active departments only
export const getActiveDepartments = async () => {
  try {
    const departments = await getDepartments();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return departments.filter((dept: any) => dept.status !== "disabled");
  } catch (error) {
    console.error("Error fetching active departments:", error);
    return [];
  }
};

// Helper function to search departments by name
export const searchDepartments = async (searchTerm: string) => {
  try {
    const departments = await getDepartments();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return departments.filter(
      (dept: any) =>
        dept.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dept.description?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  } catch (error) {
    console.error("Error searching departments:", error);
    return [];
  }
};

// Helper function to get department statistics
export const getDepartmentStats = async () => {
  try {
    const departments = await getDepartments();
    const active = departments.filter(
      (dept: { status: string }) => dept.status !== "disabled"
    );
    const disabled = departments.filter(
      (dept: { status: string }) => dept.status === "disabled"
    );

    return {
      total: departments.length,
      active: active.length,
      disabled: disabled.length,
    };
  } catch (error) {
    console.error("Error getting department stats:", error);
    return {
      total: 0,
      active: 0,
      disabled: 0,
    };
  }
};

const departmentsService = {
  getDepartments,
  addDepartment,
  addBulkDepartments,
  updateDepartment,
  disableDepartment,
  restoreDepartment,
  getDepartmentById,
  checkDepartmentExists,
  getActiveDepartments,
  searchDepartments,
  getDepartmentStats,
};

export default departmentsService;
