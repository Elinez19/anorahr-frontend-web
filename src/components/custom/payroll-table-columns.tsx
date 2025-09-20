import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { type ColumnDef, type FilterFn } from "@tanstack/react-table";
import { RiCheckLine, RiCloseLine, RiTimeLine } from "@remixicon/react";
import { RowActions } from "./reusable-table";

// Payroll interface
export interface Payroll {
  id: string;
  employeeId: string;
  employeeName: string;
  payPeriod: string;
  basicSalary: number;
  allowances: number;
  deductions: number;
  netSalary: number;
  status: "processed" | "pending" | "failed";
  paymentDate: string;
  paymentMethod: string;
  bankAccount: string;
}

// Status filter function for payroll
const statusFilterFn: FilterFn<Payroll> = (
  row,
  columnId,
  filterValue: string[]
) => {
  if (!filterValue?.length) return true;
  const status = row.getValue(columnId) as string;
  return filterValue.includes(status);
};

export const getPayrollColumns = (
  onEdit?: (payroll: Payroll) => void,
  onDelete?: (payroll: Payroll) => void,
  onView?: (payroll: Payroll) => void
): ColumnDef<Payroll>[] => [
  {
    header: "Employee",
    accessorKey: "employeeName",
    cell: ({ row }) => {
      const payroll = row.original;
      return (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
            <span className="text-sm font-medium text-green-600">
              {payroll.employeeName
                .split(" ")
                .map((n) => n[0])
                .join("")
                .slice(0, 2)}
            </span>
          </div>
          <div>
            <div className="font-medium">{payroll.employeeName}</div>
            <div className="text-sm text-muted-foreground">
              ID: {payroll.employeeId}
            </div>
          </div>
        </div>
      );
    },
    size: 200,
    minSize: 180,
    enableHiding: false,
  },
  {
    header: "Pay Period",
    accessorKey: "payPeriod",
    cell: ({ row }) => (
      <span className="text-muted-foreground">{row.getValue("payPeriod")}</span>
    ),
    size: 120,
    minSize: 100,
  },
  {
    header: "Basic Salary",
    accessorKey: "basicSalary",
    cell: ({ row }) => {
      const amount = row.getValue("basicSalary") as number;
      return (
        <span className="text-muted-foreground">
          {new Intl.NumberFormat("en-NG", {
            style: "currency",
            currency: "NGN",
            minimumFractionDigits: 0,
          }).format(amount)}
        </span>
      );
    },
    size: 140,
    minSize: 120,
  },
  {
    header: "Allowances",
    accessorKey: "allowances",
    cell: ({ row }) => {
      const amount = row.getValue("allowances") as number;
      return (
        <span className="text-green-600">
          +
          {new Intl.NumberFormat("en-NG", {
            style: "currency",
            currency: "NGN",
            minimumFractionDigits: 0,
          }).format(amount)}
        </span>
      );
    },
    size: 120,
    minSize: 100,
  },
  {
    header: "Deductions",
    accessorKey: "deductions",
    cell: ({ row }) => {
      const amount = row.getValue("deductions") as number;
      return (
        <span className="text-red-600">
          -
          {new Intl.NumberFormat("en-NG", {
            style: "currency",
            currency: "NGN",
            minimumFractionDigits: 0,
          }).format(amount)}
        </span>
      );
    },
    size: 120,
    minSize: 100,
  },
  {
    header: "Net Salary",
    accessorKey: "netSalary",
    cell: ({ row }) => {
      const amount = row.getValue("netSalary") as number;
      return (
        <span className="font-medium text-foreground">
          {new Intl.NumberFormat("en-NG", {
            style: "currency",
            currency: "NGN",
            minimumFractionDigits: 0,
          }).format(amount)}
        </span>
      );
    },
    size: 140,
    minSize: 120,
  },
  {
    header: "Status",
    accessorKey: "status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      const getStatusBadge = (status: Payroll["status"]) => {
        const variants = {
          processed:
            "bg-green-100 text-green-800 hover:bg-green-200 border-green-200",
          pending:
            "bg-yellow-100 text-yellow-800 hover:bg-yellow-200 border-yellow-200",
          failed: "bg-red-100 text-red-800 hover:bg-red-200 border-red-200",
        };
        return variants[status];
      };

      const getStatusIcon = (status: Payroll["status"]) => {
        switch (status) {
          case "processed":
            return <RiCheckLine className="text-emerald-500" size={14} />;
          case "failed":
            return <RiCloseLine className="text-red-500" size={14} />;
          case "pending":
            return <RiTimeLine className="text-yellow-500" size={14} />;
          default:
            return null;
        }
      };

      return (
        <div className="flex items-center h-full">
          <Badge
            variant="outline"
            className={cn(
              "gap-1 py-0.5 px-2 text-sm",
              getStatusBadge(status as Payroll["status"])
            )}
          >
            {getStatusIcon(status as Payroll["status"])}
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
    header: "Payment Date",
    accessorKey: "paymentDate",
    cell: ({ row }) => {
      const date = new Date(row.getValue("paymentDate"));
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
      const payroll = row.original;
      const actions = [
        {
          label: "View Details",
          onClick: () => onView?.(payroll),
        },
        {
          label: "Edit",
          onClick: () => onEdit?.(payroll),
        },
        {
          label: "Delete",
          onClick: () => onDelete?.(payroll),
          variant: "destructive" as const,
        },
      ];

      return <RowActions item={payroll} actions={actions} />;
    },
    size: 70,
    minSize: 60,
    enableHiding: false,
  },
];

// Sample payroll data
export const samplePayrollData: Payroll[] = [
  {
    id: "1",
    employeeId: "EMP001",
    employeeName: "John Doe",
    payPeriod: "January 2024",
    basicSalary: 850000,
    allowances: 50000,
    deductions: 75000,
    netSalary: 825000,
    status: "processed",
    paymentDate: "2024-01-31",
    paymentMethod: "Bank Transfer",
    bankAccount: "****1234",
  },
  {
    id: "2",
    employeeId: "EMP002",
    employeeName: "Sarah Johnson",
    payPeriod: "January 2024",
    basicSalary: 750000,
    allowances: 45000,
    deductions: 65000,
    netSalary: 730000,
    status: "processed",
    paymentDate: "2024-01-31",
    paymentMethod: "Bank Transfer",
    bankAccount: "****5678",
  },
  {
    id: "3",
    employeeId: "EMP003",
    employeeName: "Michael Brown",
    payPeriod: "January 2024",
    basicSalary: 900000,
    allowances: 60000,
    deductions: 80000,
    netSalary: 880000,
    status: "processed",
    paymentDate: "2024-01-31",
    paymentMethod: "Bank Transfer",
    bankAccount: "****9012",
  },
  {
    id: "4",
    employeeId: "EMP004",
    employeeName: "Emily Davis",
    payPeriod: "January 2024",
    basicSalary: 650000,
    allowances: 40000,
    deductions: 55000,
    netSalary: 635000,
    status: "pending",
    paymentDate: "2024-01-31",
    paymentMethod: "Bank Transfer",
    bankAccount: "****3456",
  },
  {
    id: "5",
    employeeId: "EMP005",
    employeeName: "David Wilson",
    payPeriod: "January 2024",
    basicSalary: 800000,
    allowances: 50000,
    deductions: 70000,
    netSalary: 780000,
    status: "processed",
    paymentDate: "2024-01-31",
    paymentMethod: "Bank Transfer",
    bankAccount: "****7890",
  },
  {
    id: "6",
    employeeId: "EMP006",
    employeeName: "Lisa Anderson",
    payPeriod: "January 2024",
    basicSalary: 700000,
    allowances: 45000,
    deductions: 60000,
    netSalary: 685000,
    status: "failed",
    paymentDate: "2024-01-31",
    paymentMethod: "Bank Transfer",
    bankAccount: "****2345",
  },
];
