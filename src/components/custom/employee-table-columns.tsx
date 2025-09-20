import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { type ColumnDef, type FilterFn } from "@tanstack/react-table";
import { MoreHorizontal, Eye, Edit, Trash2 } from "lucide-react";
import { RiCheckLine } from "@remixicon/react";
import type { Employee } from "@/interfaces/hr";
import { RowActions } from "./reusable-table";

// Status filter function for employees
const statusFilterFn: FilterFn<Employee> = (
  row,
  columnId,
  filterValue: string[]
) => {
  if (!filterValue?.length) return true;
  const status = row.getValue(columnId) as string;
  return filterValue.includes(status);
};

export const getEmployeeColumns = (
  onEdit?: (employee: Employee) => void,
  onDelete?: (employee: Employee) => void,
  onView?: (employee: Employee) => void
): ColumnDef<Employee>[] => [
  {
    header: "Employee",
    accessorKey: "firstName",
    cell: ({ row }) => {
      const employee = row.original;
      return (
        <div className="flex items-center gap-3">
          <img
            src={
              employee.avatar ||
              `https://ui-avatars.com/api/?name=${employee.firstName}+${employee.lastName}&background=8B5CF6&color=fff`
            }
            alt={`${employee.firstName} ${employee.lastName}`}
            className="w-8 h-8 rounded-full object-cover"
          />
          <div>
            <div className="font-medium">
              {employee.firstName} {employee.lastName}
            </div>
            <div className="text-sm text-muted-foreground">
              {employee.email}
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
    header: "Department",
    accessorKey: "department",
    cell: ({ row }) => (
      <span className="text-muted-foreground">
        {row.getValue("department")}
      </span>
    ),
    size: 140,
    minSize: 120,
  },
  {
    header: "Position",
    accessorKey: "position",
    cell: ({ row }) => (
      <span className="text-muted-foreground">{row.getValue("position")}</span>
    ),
    size: 160,
    minSize: 140,
  },
  {
    header: "Status",
    accessorKey: "status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      const getStatusBadge = (status: Employee["status"]) => {
        const variants = {
          active:
            "bg-green-100 text-green-800 hover:bg-green-200 border-green-200",
          inactive:
            "bg-gray-100 text-gray-800 hover:bg-gray-200 border-gray-200",
          on_leave:
            "bg-yellow-100 text-yellow-800 hover:bg-yellow-200 border-yellow-200",
        };
        return variants[status];
      };

      return (
        <div className="flex items-center h-full">
          <Badge
            variant="outline"
            className={cn(
              "gap-1 py-0.5 px-2 text-sm",
              getStatusBadge(status as Employee["status"])
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
            {status.replace("_", " ")}
          </Badge>
        </div>
      );
    },
    size: 120,
    minSize: 100,
    filterFn: statusFilterFn,
  },
  {
    header: "Hire Date",
    accessorKey: "hireDate",
    cell: ({ row }) => {
      const date = new Date(row.getValue("hireDate"));
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
    header: "Salary",
    accessorKey: "salary",
    cell: ({ row }) => {
      const salary = row.getValue("salary") as number;
      if (!salary) return <span className="text-muted-foreground">—</span>;

      return (
        <span className="text-muted-foreground">
          {new Intl.NumberFormat("en-NG", {
            style: "currency",
            currency: "NGN",
            minimumFractionDigits: 0,
          }).format(salary)}
        </span>
      );
    },
    size: 120,
    minSize: 100,
  },
  {
    header: "Manager",
    accessorKey: "manager",
    cell: ({ row }) => {
      const manager = row.getValue("manager") as string;
      return <span className="text-muted-foreground">{manager || "—"}</span>;
    },
    size: 140,
    minSize: 120,
  },
  {
    id: "actions",
    header: () => <span className="sr-only">Actions</span>,
    cell: ({ row }) => {
      const employee = row.original;
      const actions = [
        {
          label: "View Details",
          onClick: () => onView?.(employee),
        },
        {
          label: "Edit",
          onClick: () => onEdit?.(employee),
        },
        {
          label: "Delete",
          onClick: () => onDelete?.(employee),
          variant: "destructive" as const,
        },
      ];

      return <RowActions item={employee} actions={actions} />;
    },
    size: 70,
    minSize: 60,
    enableHiding: false,
  },
];

// Sample employee data for testing
export const sampleEmployeeData: Employee[] = [
  {
    id: "1",
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@company.com",
    phone: "+234 801 234 5678",
    department: "Engineering",
    position: "Senior Developer",
    hireDate: "2022-03-15",
    status: "active",
    salary: 850000,
    manager: "Jane Smith",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face",
  },
  {
    id: "2",
    firstName: "Sarah",
    lastName: "Johnson",
    email: "sarah.johnson@company.com",
    phone: "+234 802 345 6789",
    department: "HR",
    position: "HR Manager",
    hireDate: "2021-08-20",
    status: "active",
    salary: 750000,
    manager: "CEO",
    avatar:
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=32&h=32&fit=crop&crop=face",
  },
  {
    id: "3",
    firstName: "Michael",
    lastName: "Brown",
    email: "michael.brown@company.com",
    phone: "+234 803 456 7890",
    department: "Marketing",
    position: "Marketing Director",
    hireDate: "2020-11-10",
    status: "on_leave",
    salary: 900000,
    manager: "CEO",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face",
  },
  {
    id: "4",
    firstName: "Emily",
    lastName: "Davis",
    email: "emily.davis@company.com",
    phone: "+234 804 567 8901",
    department: "Finance",
    position: "Financial Analyst",
    hireDate: "2023-01-15",
    status: "active",
    salary: 650000,
    manager: "CFO",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face",
  },
  {
    id: "5",
    firstName: "David",
    lastName: "Wilson",
    email: "david.wilson@company.com",
    phone: "+234 805 678 9012",
    department: "Engineering",
    position: "DevOps Engineer",
    hireDate: "2022-07-08",
    status: "active",
    salary: 800000,
    manager: "John Doe",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=32&h=32&fit=crop&crop=face",
  },
];
