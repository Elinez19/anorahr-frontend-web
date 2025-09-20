import { useState, useEffect } from "react";
import { Moon, Sun, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { AppSidebar } from "@/components/custom/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import UserDropdown from "@/components/custom/user-dropdown";
import FeedbackDialog from "@/components/custom/feedback-dialog";
import { RiLeafLine } from "@remixicon/react";
import { HRStatsGrid, sampleHRStats } from "@/components/custom/hr-stats-grid";
import { ReusableTable } from "@/components/custom/reusable-table";
import {
  getLeaveColumns,
  sampleLeaveData,
} from "@/components/custom/leave-table-columns";
import { Plus } from "lucide-react";

export default function LeavesPage() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    setIsDarkMode(prefersDark);
    if (prefersDark) {
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
  };

  const handleEditLeave = (leave: any) => {
    console.log("Edit leave:", leave);
  };

  const handleDeleteLeave = (leave: any) => {
    console.log("Delete leave:", leave);
  };

  const handleViewLeave = (leave: any) => {
    console.log("View leave:", leave);
  };

  const handleApproveLeave = (leave: any) => {
    console.log("Approve leave:", leave);
  };

  const handleRejectLeave = (leave: any) => {
    console.log("Reject leave:", leave);
  };

  const handleDataChange = (newData: any[]) => {
    // Handle data changes
  };

  const handleDeleteRows = (rows: any[]) => {
    // Handle bulk delete
  };

  const columns = getLeaveColumns(
    handleEditLeave,
    handleDeleteLeave,
    handleViewLeave,
    handleApproveLeave,
    handleRejectLeave
  );

  const customActions = (
    <Button size="sm" asChild>
      <Link to="/dashboard/leaves/request">
        <Plus className="w-4 h-4 mr-2" />
        Request Leave
      </Link>
    </Button>
  );

  return (
    <div className={`${isDarkMode ? "dark" : ""}`}>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset className="overflow-hidden px-4 md:px-6 lg:px-8">
          <header className="flex h-16 shrink-0 items-center gap-2 border-b">
            <div className="flex flex-1 items-center gap-2 px-3">
              <SidebarTrigger className="-ms-4" />
              <Separator
                orientation="vertical"
                className="mr-2 data-[orientation=vertical]:h-4"
              />
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem className="hidden md:block">
                    <BreadcrumbLink href="#">
                      <RiLeafLine size={22} aria-hidden="true" />
                      <span className="sr-only">Leaves</span>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="hidden md:block" />
                  <BreadcrumbItem>
                    <BreadcrumbPage>Leave Management</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
            <div className="flex gap-3 ml-auto">
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-full hover:bg-muted transition-colors"
                aria-label="Toggle dark mode"
              >
                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              <FeedbackDialog />
              <UserDropdown />
            </div>
          </header>
          <div className="flex flex-1 flex-col gap-4 lg:gap-6 py-4 lg:py-6">
            {/* Page intro */}
            <div className="flex items-center justify-between gap-4">
              <div className="space-y-1">
                <h1 className="text-2xl font-semibold">Leave Management</h1>
                <p className="text-sm text-muted-foreground">
                  Track and manage employee leave requests, approvals, and
                  balances.
                </p>
              </div>
              <Button className="px-3" asChild>
                <Link to="/dashboard/leaves/request">
                  <Plus className="w-4 h-4 mr-2" />
                  Request Leave
                </Link>
              </Button>
            </div>

            {/* Leave Stats */}
            <HRStatsGrid stats={sampleHRStats} />

            {/* Leaves Table */}
            <div className="min-h-[100vh] flex-1 md:min-h-min">
              <ReusableTable
                data={sampleLeaveData}
                columns={columns}
                searchPlaceholder="Search leaves..."
                searchColumn="employeeName"
                filterColumns={[
                  {
                    columnId: "status",
                    label: "Status",
                    options: [
                      {
                        value: "pending",
                        label: "Pending",
                        count: sampleLeaveData.filter(
                          (l) => l.status === "pending"
                        ).length,
                      },
                      {
                        value: "approved",
                        label: "Approved",
                        count: sampleLeaveData.filter(
                          (l) => l.status === "approved"
                        ).length,
                      },
                      {
                        value: "rejected",
                        label: "Rejected",
                        count: sampleLeaveData.filter(
                          (l) => l.status === "rejected"
                        ).length,
                      },
                    ],
                  },
                  {
                    columnId: "leaveType",
                    label: "Leave Type",
                    options: [
                      {
                        value: "annual",
                        label: "Annual",
                        count: sampleLeaveData.filter(
                          (l) => l.leaveType === "annual"
                        ).length,
                      },
                      {
                        value: "sick",
                        label: "Sick",
                        count: sampleLeaveData.filter(
                          (l) => l.leaveType === "sick"
                        ).length,
                      },
                      {
                        value: "maternity",
                        label: "Maternity",
                        count: sampleLeaveData.filter(
                          (l) => l.leaveType === "maternity"
                        ).length,
                      },
                      {
                        value: "emergency",
                        label: "Emergency",
                        count: sampleLeaveData.filter(
                          (l) => l.leaveType === "emergency"
                        ).length,
                      },
                    ],
                  },
                ]}
                onDataChange={handleDataChange}
                onDeleteRows={handleDeleteRows}
                emptyMessage="No leave requests found."
                customActions={customActions}
              />
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
