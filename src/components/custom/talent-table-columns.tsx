import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { type ColumnDef, type FilterFn } from "@tanstack/react-table";
import { RiStarFill, RiCheckLine } from "@remixicon/react";
import { RowActions } from "./reusable-table";

// Talent interface
export interface Talent {
  id: string;
  name: string;
  position: string;
  department: string;
  level: "high" | "medium" | "low";
  skills: string[];
  experience: number;
  status: "active" | "inactive";
  potential: number;
  readiness: number;
  lastReview: string;
}

// Status filter function for talent
const statusFilterFn: FilterFn<Talent> = (
  row,
  columnId,
  filterValue: string[]
) => {
  if (!filterValue?.length) return true;
  const status = row.getValue(columnId) as string;
  return filterValue.includes(status);
};

// Level filter function for talent
const levelFilterFn: FilterFn<Talent> = (
  row,
  columnId,
  filterValue: string[]
) => {
  if (!filterValue?.length) return true;
  const level = row.getValue(columnId) as string;
  return filterValue.includes(level);
};

export const getTalentColumns = (
  onEdit?: (talent: Talent) => void,
  onDelete?: (talent: Talent) => void,
  onView?: (talent: Talent) => void
): ColumnDef<Talent>[] => [
  {
    header: "Talent",
    accessorKey: "name",
    cell: ({ row }) => {
      const talent = row.original;
      return (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
            <span className="text-sm font-medium text-indigo-600">
              {talent.name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .slice(0, 2)}
            </span>
          </div>
          <div>
            <div className="font-medium">{talent.name}</div>
            <div className="text-sm text-muted-foreground">
              {talent.position}
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
    header: "Potential Level",
    accessorKey: "level",
    cell: ({ row }) => {
      const level = row.getValue("level") as string;
      const getLevelBadge = (level: Talent["level"]) => {
        const variants = {
          high: "bg-green-100 text-green-800 hover:bg-green-200 border-green-200",
          medium:
            "bg-yellow-100 text-yellow-800 hover:bg-yellow-200 border-yellow-200",
          low: "bg-gray-100 text-gray-800 hover:bg-gray-200 border-gray-200",
        };
        return variants[level];
      };

      const getLevelIcon = (level: Talent["level"]) => {
        switch (level) {
          case "high":
            return <RiStarFill className="text-green-500" size={14} />;
          case "medium":
            return <RiStarFill className="text-yellow-500" size={14} />;
          case "low":
            return <RiStarFill className="text-gray-500" size={14} />;
          default:
            return null;
        }
      };

      return (
        <div className="flex items-center h-full">
          <Badge
            variant="outline"
            className={cn(
              "gap-1 py-0.5 px-2 text-sm capitalize",
              getLevelBadge(level as Talent["level"])
            )}
          >
            {getLevelIcon(level as Talent["level"])}
            {level} potential
          </Badge>
        </div>
      );
    },
    size: 140,
    minSize: 120,
    filterFn: levelFilterFn,
  },
  {
    header: "Skills",
    accessorKey: "skills",
    cell: ({ row }) => {
      const skills = row.getValue("skills") as string[];
      return (
        <span className="text-muted-foreground">
          {skills.length} skill{skills.length !== 1 ? "s" : ""}
        </span>
      );
    },
    size: 100,
    minSize: 80,
  },
  {
    header: "Experience",
    accessorKey: "experience",
    cell: ({ row }) => {
      const experience = row.getValue("experience") as number;
      return (
        <span className="text-muted-foreground">
          {experience} {experience === 1 ? "year" : "years"}
        </span>
      );
    },
    size: 100,
    minSize: 80,
  },
  {
    header: "Potential Score",
    accessorKey: "potential",
    cell: ({ row }) => {
      const potential = row.getValue("potential") as number;
      return (
        <div className="flex items-center gap-2">
          <div className="w-16 bg-gray-200 rounded-full h-2">
            <div
              className="bg-green-500 h-2 rounded-full"
              style={{ width: `${potential}%` }}
            ></div>
          </div>
          <span className="text-sm text-muted-foreground">{potential}%</span>
        </div>
      );
    },
    size: 140,
    minSize: 120,
  },
  {
    header: "Readiness",
    accessorKey: "readiness",
    cell: ({ row }) => {
      const readiness = row.getValue("readiness") as number;
      return (
        <div className="flex items-center gap-2">
          <div className="w-16 bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-500 h-2 rounded-full"
              style={{ width: `${readiness}%` }}
            ></div>
          </div>
          <span className="text-sm text-muted-foreground">{readiness}%</span>
        </div>
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
      const getStatusBadge = (status: Talent["status"]) => {
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
              getStatusBadge(status as Talent["status"])
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
    size: 100,
    minSize: 80,
    filterFn: statusFilterFn,
  },
  {
    header: "Last Review",
    accessorKey: "lastReview",
    cell: ({ row }) => {
      const date = new Date(row.getValue("lastReview"));
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
      const talent = row.original;
      const actions = [
        {
          label: "View Details",
          onClick: () => onView?.(talent),
        },
        {
          label: "Edit",
          onClick: () => onEdit?.(talent),
        },
        {
          label: "Delete",
          onClick: () => onDelete?.(talent),
          variant: "destructive" as const,
        },
      ];

      return <RowActions item={talent} actions={actions} />;
    },
    size: 70,
    minSize: 60,
    enableHiding: false,
  },
];

// Sample talent data
export const sampleTalentData: Talent[] = [
  {
    id: "1",
    name: "John Doe",
    position: "Senior Developer",
    department: "Engineering",
    level: "high",
    skills: ["React", "Node.js", "TypeScript", "AWS", "Leadership"],
    experience: 5,
    status: "active",
    potential: 90,
    readiness: 85,
    lastReview: "2024-01-15",
  },
  {
    id: "2",
    name: "Sarah Johnson",
    position: "HR Manager",
    department: "Human Resources",
    level: "high",
    skills: [
      "Strategic Planning",
      "Employee Relations",
      "Recruitment",
      "Training",
    ],
    experience: 7,
    status: "active",
    potential: 88,
    readiness: 92,
    lastReview: "2024-01-10",
  },
  {
    id: "3",
    name: "Michael Brown",
    position: "Marketing Director",
    department: "Marketing",
    level: "medium",
    skills: [
      "Digital Marketing",
      "Brand Management",
      "Analytics",
      "Campaign Strategy",
    ],
    experience: 6,
    status: "active",
    potential: 75,
    readiness: 70,
    lastReview: "2023-12-20",
  },
  {
    id: "4",
    name: "Emily Davis",
    position: "Financial Analyst",
    department: "Finance",
    level: "medium",
    skills: ["Financial Analysis", "Budgeting", "Excel", "Reporting"],
    experience: 4,
    status: "active",
    potential: 65,
    readiness: 60,
    lastReview: "2023-12-15",
  },
  {
    id: "5",
    name: "David Wilson",
    position: "DevOps Engineer",
    department: "Engineering",
    level: "high",
    skills: ["Docker", "Kubernetes", "CI/CD", "Monitoring", "Infrastructure"],
    experience: 4,
    status: "active",
    potential: 95,
    readiness: 80,
    lastReview: "2024-01-05",
  },
  {
    id: "6",
    name: "Lisa Anderson",
    position: "Junior Developer",
    department: "Engineering",
    level: "low",
    skills: ["JavaScript", "HTML", "CSS", "Git"],
    experience: 2,
    status: "active",
    potential: 45,
    readiness: 30,
    lastReview: "2023-11-30",
  },
];
