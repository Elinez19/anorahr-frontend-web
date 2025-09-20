import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { type ColumnDef, type FilterFn } from "@tanstack/react-table";
import { RiCheckLine, RiCloseLine, RiTimeLine } from "@remixicon/react";
import { RowActions } from "./reusable-table";

// Leave interface
export interface Leave {
  id: string;
  employeeId: string;
  employeeName: string;
  leaveType: "annual" | "sick" | "maternity" | "paternity" | "emergency";
  startDate: string;
  endDate: string;
  duration: number;
  status: "pending" | "approved" | "rejected";
  reason: string;
  appliedDate: string;
  approvedBy?: string;
  approvedDate?: string;
}

// Status filter function for leaves
const statusFilterFn: FilterFn<Leave> = (
  row,
  columnId,
  filterValue: string[]
) => {
  if (!filterValue?.length) return true;
  const status = row.getValue(columnId) as string;
  return filterValue.includes(status);
};

// Leave type filter function
const leaveTypeFilterFn: FilterFn<Leave> = (
  row,
  columnId,
  filterValue: string[]
) => {
  if (!filterValue?.length) return true;
  const leaveType = row.getValue(columnId) as string;
  return filterValue.includes(leaveType);
};

export const getLeaveColumns = (
  onEdit?: (leave: Leave) => void,
  onDelete?: (leave: Leave) => void,
  onView?: (leave: Leave) => void,
  onApprove?: (leave: Leave) => void,
  onReject?: (leave: Leave) => void
): ColumnDef<Leave>[] => [
  {
    header: "Employee",
    accessorKey: "employeeName",
    cell: ({ row }) => {
      const leave = row.original;
      return (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
            <span className="text-sm font-medium text-blue-600">
              {leave.employeeName
                .split(" ")
                .map((n) => n[0])
                .join("")
                .slice(0, 2)}
            </span>
          </div>
          <div>
            <div className="font-medium">{leave.employeeName}</div>
            <div className="text-sm text-muted-foreground">
              ID: {leave.employeeId}
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
    header: "Leave Type",
    accessorKey: "leaveType",
    cell: ({ row }) => {
      const leaveType = row.getValue("leaveType") as string;
      const getLeaveTypeBadge = (type: Leave["leaveType"]) => {
        const variants = {
          annual:
            "bg-green-100 text-green-800 hover:bg-green-200 border-green-200",
          sick: "bg-red-100 text-red-800 hover:bg-red-200 border-red-200",
          maternity:
            "bg-pink-100 text-pink-800 hover:bg-pink-200 border-pink-200",
          paternity:
            "bg-blue-100 text-blue-800 hover:bg-blue-200 border-blue-200",
          emergency:
            "bg-orange-100 text-orange-800 hover:bg-orange-200 border-orange-200",
        };
        return variants[type];
      };

      return (
        <Badge
          variant="outline"
          className={cn(
            "gap-1 py-0.5 px-2 text-sm capitalize",
            getLeaveTypeBadge(leaveType as Leave["leaveType"])
          )}
        >
          {leaveType}
        </Badge>
      );
    },
    size: 120,
    minSize: 100,
    filterFn: leaveTypeFilterFn,
  },
  {
    header: "Duration",
    accessorKey: "duration",
    cell: ({ row }) => {
      const duration = row.getValue("duration") as number;
      return (
        <span className="text-muted-foreground">
          {duration} {duration === 1 ? "day" : "days"}
        </span>
      );
    },
    size: 100,
    minSize: 80,
  },
  {
    header: "Start Date",
    accessorKey: "startDate",
    cell: ({ row }) => {
      const date = new Date(row.getValue("startDate"));
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
    header: "End Date",
    accessorKey: "endDate",
    cell: ({ row }) => {
      const date = new Date(row.getValue("endDate"));
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
    header: "Status",
    accessorKey: "status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      const getStatusBadge = (status: Leave["status"]) => {
        const variants = {
          pending:
            "bg-yellow-100 text-yellow-800 hover:bg-yellow-200 border-yellow-200",
          approved:
            "bg-green-100 text-green-800 hover:bg-green-200 border-green-200",
          rejected: "bg-red-100 text-red-800 hover:bg-red-200 border-red-200",
        };
        return variants[status];
      };

      const getStatusIcon = (status: Leave["status"]) => {
        switch (status) {
          case "approved":
            return <RiCheckLine className="text-emerald-500" size={14} />;
          case "rejected":
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
              getStatusBadge(status as Leave["status"])
            )}
          >
            {getStatusIcon(status as Leave["status"])}
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
    header: "Applied Date",
    accessorKey: "appliedDate",
    cell: ({ row }) => {
      const date = new Date(row.getValue("appliedDate"));
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
      const leave = row.original;
      const actions = [
        {
          label: "View Details",
          onClick: () => onView?.(leave),
        },
        ...(leave.status === "pending"
          ? [
              {
                label: "Approve",
                onClick: () => onApprove?.(leave),
              },
              {
                label: "Reject",
                onClick: () => onReject?.(leave),
                variant: "destructive" as const,
              },
            ]
          : []),
        {
          label: "Edit",
          onClick: () => onEdit?.(leave),
        },
        {
          label: "Delete",
          onClick: () => onDelete?.(leave),
          variant: "destructive" as const,
        },
      ];

      return <RowActions item={leave} actions={actions} />;
    },
    size: 70,
    minSize: 60,
    enableHiding: false,
  },
];

// Sample leave data
export const sampleLeaveData: Leave[] = [
  {
    id: "1",
    employeeId: "EMP001",
    employeeName: "John Doe",
    leaveType: "annual",
    startDate: "2024-02-15",
    endDate: "2024-02-20",
    duration: 6,
    status: "approved",
    reason: "Family vacation",
    appliedDate: "2024-01-15",
    approvedBy: "Sarah Johnson",
    approvedDate: "2024-01-16",
  },
  {
    id: "2",
    employeeId: "EMP002",
    employeeName: "Sarah Johnson",
    leaveType: "sick",
    startDate: "2024-01-20",
    endDate: "2024-01-22",
    duration: 3,
    status: "approved",
    reason: "Flu and fever",
    appliedDate: "2024-01-19",
    approvedBy: "Michael Brown",
    approvedDate: "2024-01-19",
  },
  {
    id: "3",
    employeeId: "EMP003",
    employeeName: "Michael Brown",
    leaveType: "maternity",
    startDate: "2024-03-01",
    endDate: "2024-05-01",
    duration: 62,
    status: "pending",
    reason: "Maternity leave",
    appliedDate: "2024-01-10",
  },
  {
    id: "4",
    employeeId: "EMP004",
    employeeName: "Emily Davis",
    leaveType: "emergency",
    startDate: "2024-01-25",
    endDate: "2024-01-26",
    duration: 2,
    status: "approved",
    reason: "Medical emergency",
    appliedDate: "2024-01-24",
    approvedBy: "David Wilson",
    approvedDate: "2024-01-24",
  },
  {
    id: "5",
    employeeId: "EMP005",
    employeeName: "David Wilson",
    leaveType: "annual",
    startDate: "2024-04-10",
    endDate: "2024-04-17",
    duration: 8,
    status: "pending",
    reason: "Spring break",
    appliedDate: "2024-01-12",
  },
  {
    id: "6",
    employeeId: "EMP006",
    employeeName: "Lisa Anderson",
    leaveType: "sick",
    startDate: "2024-01-18",
    endDate: "2024-01-19",
    duration: 2,
    status: "rejected",
    reason: "Minor cold",
    appliedDate: "2024-01-17",
    approvedBy: "John Doe",
    approvedDate: "2024-01-17",
  },
];
