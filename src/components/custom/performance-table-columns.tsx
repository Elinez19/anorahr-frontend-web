import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { type ColumnDef, type FilterFn } from "@tanstack/react-table";
import { RiStarFill } from "@remixicon/react";
import { RowActions } from "./reusable-table";

// Performance interface
export interface Performance {
  id: string;
  employeeId: string;
  employeeName: string;
  reviewPeriod: string;
  rating: number;
  goals: string[];
  achievements: string[];
  nextSteps: string[];
  reviewer: string;
  reviewDate: string;
}

// Rating filter function for performance
const ratingFilterFn: FilterFn<Performance> = (
  row,
  columnId,
  filterValue: string[]
) => {
  if (!filterValue?.length) return true;
  const rating = row.getValue(columnId) as number;
  return filterValue.includes(rating.toString());
};

export const getPerformanceColumns = (
  onEdit?: (performance: Performance) => void,
  onDelete?: (performance: Performance) => void,
  onView?: (performance: Performance) => void
): ColumnDef<Performance>[] => [
  {
    header: "Employee",
    accessorKey: "employeeName",
    cell: ({ row }) => {
      const performance = row.original;
      return (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
            <span className="text-sm font-medium text-purple-600">
              {performance.employeeName
                .split(" ")
                .map((n) => n[0])
                .join("")
                .slice(0, 2)}
            </span>
          </div>
          <div>
            <div className="font-medium">{performance.employeeName}</div>
            <div className="text-sm text-muted-foreground">
              ID: {performance.employeeId}
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
    header: "Review Period",
    accessorKey: "reviewPeriod",
    cell: ({ row }) => (
      <span className="text-muted-foreground">
        {row.getValue("reviewPeriod")}
      </span>
    ),
    size: 140,
    minSize: 120,
  },
  {
    header: "Rating",
    accessorKey: "rating",
    cell: ({ row }) => {
      const rating = row.getValue("rating") as number;
      const getRatingBadge = (rating: number) => {
        const variants = {
          5: "bg-green-100 text-green-800 hover:bg-green-200 border-green-200",
          4: "bg-blue-100 text-blue-800 hover:bg-blue-200 border-blue-200",
          3: "bg-yellow-100 text-yellow-800 hover:bg-yellow-200 border-yellow-200",
          2: "bg-orange-100 text-orange-800 hover:bg-orange-200 border-orange-200",
          1: "bg-red-100 text-red-800 hover:bg-red-200 border-red-200",
        };
        return (
          variants[rating as keyof typeof variants] ||
          "bg-gray-100 text-gray-800 hover:bg-gray-200 border-gray-200"
        );
      };

      return (
        <div className="flex items-center gap-2">
          <Badge
            variant="outline"
            className={cn("gap-1 py-0.5 px-2 text-sm", getRatingBadge(rating))}
          >
            <RiStarFill className="w-3 h-3" />
            {rating}/5
          </Badge>
        </div>
      );
    },
    size: 100,
    minSize: 80,
    filterFn: ratingFilterFn,
  },
  {
    header: "Goals",
    accessorKey: "goals",
    cell: ({ row }) => {
      const goals = row.getValue("goals") as string[];
      return (
        <span className="text-muted-foreground">
          {goals.length} goal{goals.length !== 1 ? "s" : ""}
        </span>
      );
    },
    size: 100,
    minSize: 80,
  },
  {
    header: "Achievements",
    accessorKey: "achievements",
    cell: ({ row }) => {
      const achievements = row.getValue("achievements") as string[];
      return (
        <span className="text-muted-foreground">
          {achievements.length} achievement
          {achievements.length !== 1 ? "s" : ""}
        </span>
      );
    },
    size: 120,
    minSize: 100,
  },
  {
    header: "Reviewer",
    accessorKey: "reviewer",
    cell: ({ row }) => (
      <span className="text-muted-foreground">{row.getValue("reviewer")}</span>
    ),
    size: 140,
    minSize: 120,
  },
  {
    header: "Review Date",
    accessorKey: "reviewDate",
    cell: ({ row }) => {
      const date = new Date(row.getValue("reviewDate"));
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
      const performance = row.original;
      const actions = [
        {
          label: "View Details",
          onClick: () => onView?.(performance),
        },
        {
          label: "Edit",
          onClick: () => onEdit?.(performance),
        },
        {
          label: "Delete",
          onClick: () => onDelete?.(performance),
          variant: "destructive" as const,
        },
      ];

      return <RowActions item={performance} actions={actions} />;
    },
    size: 70,
    minSize: 60,
    enableHiding: false,
  },
];

// Sample performance data
export const samplePerformanceData: Performance[] = [
  {
    id: "1",
    employeeId: "EMP001",
    employeeName: "John Doe",
    reviewPeriod: "Q4 2023",
    rating: 5,
    goals: [
      "Complete project A",
      "Improve team collaboration",
      "Learn new technology",
    ],
    achievements: [
      "Delivered project on time",
      "Mentored 2 junior developers",
      "Completed certification",
    ],
    nextSteps: ["Lead next major project", "Take on more responsibilities"],
    reviewer: "Sarah Johnson",
    reviewDate: "2023-12-31",
  },
  {
    id: "2",
    employeeId: "EMP002",
    employeeName: "Sarah Johnson",
    reviewPeriod: "Q4 2023",
    rating: 4,
    goals: [
      "Streamline HR processes",
      "Improve employee satisfaction",
      "Reduce turnover",
    ],
    achievements: [
      "Implemented new onboarding process",
      "Employee satisfaction increased by 15%",
    ],
    nextSteps: ["Focus on talent development", "Implement new HR system"],
    reviewer: "Michael Brown",
    reviewDate: "2023-12-30",
  },
  {
    id: "3",
    employeeId: "EMP003",
    employeeName: "Michael Brown",
    reviewPeriod: "Q4 2023",
    rating: 4,
    goals: [
      "Increase brand awareness",
      "Launch new campaign",
      "Improve conversion rates",
    ],
    achievements: [
      "Successful product launch",
      "Brand awareness increased by 25%",
    ],
    nextSteps: ["Expand to new markets", "Develop digital marketing strategy"],
    reviewer: "Emily Davis",
    reviewDate: "2023-12-29",
  },
  {
    id: "4",
    employeeId: "EMP004",
    employeeName: "Emily Davis",
    reviewPeriod: "Q4 2023",
    rating: 3,
    goals: [
      "Improve financial reporting",
      "Reduce costs",
      "Implement new system",
    ],
    achievements: ["Reduced operational costs by 10%"],
    nextSteps: [
      "Complete system implementation",
      "Train team on new processes",
    ],
    reviewer: "David Wilson",
    reviewDate: "2023-12-28",
  },
  {
    id: "5",
    employeeId: "EMP005",
    employeeName: "David Wilson",
    reviewPeriod: "Q4 2023",
    rating: 5,
    goals: [
      "Maintain system uptime",
      "Implement automation",
      "Reduce response time",
    ],
    achievements: [
      "99.9% uptime achieved",
      "Automated 3 key processes",
      "Response time reduced by 50%",
    ],
    nextSteps: ["Implement AI monitoring", "Expand automation scope"],
    reviewer: "John Doe",
    reviewDate: "2023-12-27",
  },
];
