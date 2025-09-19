import { axiosClient } from "@/services/api/axiosClient";
import type { Role } from "@/types/dashboard_types";

// Get all roles
export const getRoles = async (): Promise<{ data: Role[] }> => {
  const response = await axiosClient.get("/roles");
  return response.data;
};

// Add a new role
export const addRole = async (data: {
  name: string;
  description?: string;
  relatedRole: string;
  createdBy: string;
}) => {
  const response = await axiosClient.post("/roles", data);
  return response.data;
};

// Get related roles
export const getRelatedRoles = async (): Promise<{
  data: Array<{ _id: string; roleType: string; roleName: string }>;
}> => {
  const response = await axiosClient.get("/roles/related-roles");
  return response.data;
};

// Get role by ID
export const getRoleById = async (roleId: string): Promise<{ data: Role }> => {
  const response = await axiosClient.get(`/roles/${roleId}`);
  return response.data;
};

// Update role by ID
export const updateRole = async (
  roleId: string,
  data: {
    name?: string;
    description?: string;
    relatedRole?: string;
    createdBy?: string;
  }
): Promise<{ success: boolean; message: string; data: Role }> => {
  const response = await axiosClient.put(`/roles/${roleId}`, data);
  return response.data;
};

// ✅ FIXED: Disable role by ID (soft delete via DELETE - sets isActive: false)
export const disableRole = async (roleId: string): Promise<{ data: Role }> => {
  const response = await axiosClient.delete(`/roles/${roleId}`);
  return { data: response.data.data }; // API returns { success, message, data }
};
// Add bulk roles
export const addBulkRoles = async (
  roles: Omit<Role, "_id" | "createdAt" | "updatedAt" | "isActive">[]
): Promise<{
  success: boolean;
  message: string;
  data: {
    createdCount: number;
    roles: Role[];
    summary?: Record<string, unknown>;
  };
}> => {
  const response = await axiosClient.post("/roles/bulk", { roles });
  return response.data;
};

// Restore role by ID (sets isActive: true)
export const restoreRole = async (roleId: string): Promise<{ data: Role }> => {
  const response = await axiosClient.patch(`/roles/${roleId}/restore`);
  return { data: response.data.data }; // API returns { success, message, data }
};

const rolesService = {
  getRoles,
  addRole,
  getRelatedRoles,
  getRoleById,
  updateRole,
  disableRole,
  addBulkRoles,
  restoreRole,
};

export default rolesService;
