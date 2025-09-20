import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { type ColumnDef, type FilterFn } from "@tanstack/react-table";
import { RiCheckLine, RiShieldLine } from "@remixicon/react";
import { RowActions } from "./reusable-table";

// Role interface
export interface Role {
  id: string;
  name: string;
  description: string;
  permissions: string[];
  employeeCount: number;
  status: "active" | "inactive";
  createdAt: string;
  updatedAt: string;
}

// Status filter function for roles
const statusFilterFn: FilterFn<Role> = (
  row,
  columnId,
  filterValue: string[]
) => {
  if (!filterValue?.length) return true;
  const status = row.getValue(columnId) as string;
  return filterValue.includes(status);
};

export const getRoleColumns = (
  onEdit?: (role: Role) => void,
  onDelete?: (role: Role) => void,
  onView?: (role: Role) => void
): ColumnDef<Role>[] => [
  {
    header: "Role Name",
    accessorKey: "name",
    cell: ({ row }) => {
      const role = row.original;
      return (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center">
            <RiShieldLine className="w-4 h-4 text-amber-600" />
          </div>
          <div>
            <div className="font-medium">{role.name}</div>
            <div className="text-sm text-muted-foreground">
              {role.permissions.length} permissions
            </div>
          </div>
        </div>
      );
    },
    size: 250,
    minSize: 200,
    enableHiding: false,
  },
  {
    header: "Description",
    accessorKey: "description",
    cell: ({ row }) => (
      <span className="text-muted-foreground max-w-xs truncate block">
        {row.getValue("description")}
      </span>
    ),
    size: 300,
    minSize: 250,
  },
  {
    header: "Employees",
    accessorKey: "employeeCount",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <span className="text-muted-foreground">
          {row.getValue("employeeCount")}
        </span>
        <span className="text-xs text-muted-foreground">
          {row.getValue("employeeCount") === 1 ? "employee" : "employees"}
        </span>
      </div>
    ),
    size: 120,
    minSize: 100,
  },
  {
    header: "Status",
    accessorKey: "status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      const getStatusBadge = (status: Role["status"]) => {
        const variants = {
          active:
            "bg-green-100 text-green-800 hover:bg-green-200 border-green-200",
          inactive:
            "bg-gray-100 text-gray-800 hover:bg-gray-200 border-gray-200",
        };
        return variants[status];
      };

      return (
        <div className="flex items-center h-full">
          <Badge
            variant="outline"
            className={cn(
              "gap-1 py-0.5 px-2 text-sm",
              getStatusBadge(status as Role["status"])
            )}
          >
            {status === "active" && (
              <RiCheckLine
                className="text-emerald-500"
                size={14}
                aria-hidden="true"
              />
            )}
            {status === "inactive" && "- "}
            {status}
          </Badge>
        </div>
      );
    },
    size: 120,
    minSize: 100,
    filterFn: statusFilterFn,
  },
  {
    header: "Created",
    accessorKey: "createdAt",
    cell: ({ row }) => {
      const date = new Date(row.getValue("createdAt"));
      return (
        <span className="text-muted-foreground">
          {date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </span>
      );
    },
    size: 120,
    minSize: 100,
  },
  {
    header: "Last Updated",
    accessorKey: "updatedAt",
    cell: ({ row }) => {
      const date = new Date(row.getValue("updatedAt"));
      return (
        <span className="text-muted-foreground">
          {date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </span>
      );
    },
    size: 120,
    minSize: 100,
  },
  {
    id: "actions",
    header: () => <span className="sr-only">Actions</span>,
    cell: ({ row }) => {
      const role = row.original;
      const actions = [
        {
          label: "View Details",
          onClick: () => onView?.(role),
        },
        {
          label: "Edit",
          onClick: () => onEdit?.(role),
        },
        {
          label: "Delete",
          onClick: () => onDelete?.(role),
          variant: "destructive" as const,
        },
      ];

      return <RowActions item={role} actions={actions} />;
    },
    size: 70,
    minSize: 60,
    enableHiding: false,
  },
];

// Sample role data
export const sampleRoleData: Role[] = [
  {
    id: "1",
    name: "Administrator",
    description: "Full system access with all permissions and capabilities",
    permissions: [
      "read",
      "write",
      "delete",
      "admin",
      "user_management",
      "system_config",
    ],
    employeeCount: 3,
    status: "active",
    createdAt: "2023-01-15",
    updatedAt: "2024-01-10",
  },
  {
    id: "2",
    name: "HR Manager",
    description:
      "Human resources management with employee and recruitment access",
    permissions: [
      "read",
      "write",
      "employee_management",
      "recruitment",
      "reports",
    ],
    employeeCount: 2,
    status: "active",
    createdAt: "2023-02-20",
    updatedAt: "2024-01-05",
  },
  {
    id: "3",
    name: "Team Lead",
    description: "Team management with limited administrative capabilities",
    permissions: ["read", "write", "team_management", "reports"],
    employeeCount: 8,
    status: "active",
    createdAt: "2023-03-10",
    updatedAt: "2023-12-15",
  },
  {
    id: "4",
    name: "Employee",
    description: "Basic employee access with read-only permissions",
    permissions: ["read", "self_profile"],
    employeeCount: 45,
    status: "active",
    createdAt: "2023-01-01",
    updatedAt: "2023-11-20",
  },
  {
    id: "5",
    name: "Finance Manager",
    description: "Financial management and payroll processing capabilities",
    permissions: ["read", "write", "finance", "payroll", "reports"],
    employeeCount: 1,
    status: "active",
    createdAt: "2023-04-05",
    updatedAt: "2024-01-08",
  },
  {
    id: "6",
    name: "Guest",
    description: "Limited access for external users and visitors",
    permissions: ["read"],
    employeeCount: 0,
    status: "inactive",
    createdAt: "2023-05-15",
    updatedAt: "2023-10-30",
  },
];
