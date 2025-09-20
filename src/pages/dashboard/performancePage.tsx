import { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";
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
import { RiBarChartLine } from "@remixicon/react";
import { HRStatsGrid, sampleHRStats } from "@/components/custom/hr-stats-grid";
import { ReusableTable } from "@/components/custom/reusable-table";
import {
  getPerformanceColumns,
  samplePerformanceData,
} from "@/components/custom/performance-table-columns";
import { Plus } from "lucide-react";

export default function PerformancePage() {
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

  const handleEditPerformance = (performance: any) => {
    console.log("Edit performance:", performance);
  };

  const handleDeletePerformance = (performance: any) => {
    console.log("Delete performance:", performance);
  };

  const handleViewPerformance = (performance: any) => {
    console.log("View performance:", performance);
  };

  const handleDataChange = (newData: any[]) => {
    // Handle data changes
  };

  const handleDeleteRows = (rows: any[]) => {
    // Handle bulk delete
  };

  const columns = getPerformanceColumns(
    handleEditPerformance,
    handleDeletePerformance,
    handleViewPerformance
  );

  const customActions = (
    <Button size="sm">
      <Plus className="w-4 h-4 mr-2" />
      Add Review
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
                      <RiBarChartLine size={22} aria-hidden="true" />
                      <span className="sr-only">Performance</span>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="hidden md:block" />
                  <BreadcrumbItem>
                    <BreadcrumbPage>Performance Management</BreadcrumbPage>
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
                <h1 className="text-2xl font-semibold">
                  Performance Management
                </h1>
                <p className="text-sm text-muted-foreground">
                  Track employee performance, conduct reviews, and set goals.
                </p>
              </div>
              <Button className="px-3">
                <Plus className="w-4 h-4 mr-2" />
                Add Review
              </Button>
            </div>

            {/* Performance Stats */}
            <HRStatsGrid stats={sampleHRStats} />

            {/* Performance Table */}
            <div className="min-h-[100vh] flex-1 md:min-h-min">
              <ReusableTable
                data={samplePerformanceData}
                columns={columns}
                searchPlaceholder="Search performance..."
                searchColumn="employeeName"
                filterColumns={[
                  {
                    columnId: "rating",
                    label: "Rating",
                    options: [
                      {
                        value: "5",
                        label: "Excellent (5)",
                        count: samplePerformanceData.filter(
                          (p) => p.rating === 5
                        ).length,
                      },
                      {
                        value: "4",
                        label: "Good (4)",
                        count: samplePerformanceData.filter(
                          (p) => p.rating === 4
                        ).length,
                      },
                      {
                        value: "3",
                        label: "Average (3)",
                        count: samplePerformanceData.filter(
                          (p) => p.rating === 3
                        ).length,
                      },
                      {
                        value: "2",
                        label: "Below Average (2)",
                        count: samplePerformanceData.filter(
                          (p) => p.rating === 2
                        ).length,
                      },
                      {
                        value: "1",
                        label: "Poor (1)",
                        count: samplePerformanceData.filter(
                          (p) => p.rating === 1
                        ).length,
                      },
                    ],
                  },
                ]}
                onDataChange={handleDataChange}
                onDeleteRows={handleDeleteRows}
                emptyMessage="No performance reviews found."
                customActions={customActions}
              />
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
