import { RiArrowRightUpLine } from "@remixicon/react";
import { cn } from "@/lib/utils";
import {
  Users,
  Building2,
  Calendar,
  Clock,
  TrendingUp,
  UserPlus,
  UserMinus,
  Award,
} from "lucide-react";

interface HRStatsCardProps {
  title: string;
  value: string;
  change: {
    value: string;
    trend: "up" | "down";
  };
  icon: React.ReactNode;
}

export function HRStatsCard({ title, value, change, icon }: HRStatsCardProps) {
  const isPositive = change.trend === "up";
  const trendColor = isPositive ? "text-emerald-500" : "text-red-500";

  return (
    <div className="relative p-4 lg:p-5 group before:absolute before:inset-y-8 before:right-0 before:w-px before:bg-gradient-to-b before:from-input/30 before:via-input before:to-input/30 last:before:hidden">
      <div className="relative flex items-center gap-4">
        <RiArrowRightUpLine
          className="absolute right-0 top-0 opacity-0 group-has-[a:hover]:opacity-100 transition-opacity text-emerald-500"
          size={20}
          aria-hidden="true"
        />
        {/* Icon */}
        <div className="max-[480px]:hidden size-10 shrink-0 rounded-full bg-amber-600/25 border border-amber-600/50 flex items-center justify-center text-amber-600">
          {icon}
        </div>
        {/* Content */}
        <div>
          <a
            href="#"
            className="font-medium tracking-widest text-xs uppercase text-muted-foreground/60 before:absolute before:inset-0"
          >
            {title}
          </a>
          <div className="text-2xl font-semibold mb-2">{value}</div>
          <div className="text-xs text-muted-foreground/60">
            <span className={cn("font-medium", trendColor)}>
              {isPositive ? "↗" : "↘"} {change.value}
            </span>{" "}
            vs last month
          </div>
        </div>
      </div>
    </div>
  );
}

interface HRStatsGridProps {
  stats: HRStatsCardProps[];
}

export function HRStatsGrid({ stats }: HRStatsGridProps) {
  return (
    <div className="grid grid-cols-2 min-[1200px]:grid-cols-4 border border-border rounded-xl bg-gradient-to-br from-sidebar/60 to-sidebar">
      {stats.map((stat) => (
        <HRStatsCard key={stat.title} {...stat} />
      ))}
    </div>
  );
}

// Sample HR stats data
export const sampleHRStats = [
  {
    title: "Total Employees",
    value: "247",
    change: {
      value: "+8%",
      trend: "up" as const,
    },
    icon: <Users className="w-5 h-5" />,
  },
  {
    title: "Departments",
    value: "12",
    change: {
      value: "+2",
      trend: "up" as const,
    },
    icon: <Building2 className="w-5 h-5" />,
  },
  {
    title: "Active Leaves",
    value: "23",
    change: {
      value: "-5%",
      trend: "down" as const,
    },
    icon: <Calendar className="w-5 h-5" />,
  },
  {
    title: "Pending Requests",
    value: "7",
    change: {
      value: "+2",
      trend: "up" as const,
    },
    icon: <Clock className="w-5 h-5" />,
  },
  {
    title: "New Hires",
    value: "15",
    change: {
      value: "+25%",
      trend: "up" as const,
    },
    icon: <UserPlus className="w-5 h-5" />,
  },
  {
    title: "On Leave",
    value: "8",
    change: {
      value: "-12%",
      trend: "down" as const,
    },
    icon: <UserMinus className="w-5 h-5" />,
  },
  {
    title: "Avg Tenure",
    value: "3.2y",
    change: {
      value: "+0.3y",
      trend: "up" as const,
    },
    icon: <Award className="w-5 h-5" />,
  },
  {
    title: "Turnover Rate",
    value: "5.2%",
    change: {
      value: "-1.8%",
      trend: "down" as const,
    },
    icon: <TrendingUp className="w-5 h-5" />,
  },
];
