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
import { RiUserStarLine } from "@remixicon/react";
import { HRStatsGrid, sampleHRStats } from "@/components/custom/hr-stats-grid";
import { ReusableTable } from "@/components/custom/reusable-table";
import {
  getTalentColumns,
  sampleTalentData,
} from "@/components/custom/talent-table-columns";

export default function TalentPage() {
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

  const handleEditTalent = (talent: any) => {
    console.log("Edit talent:", talent);
  };

  const handleDeleteTalent = (talent: any) => {
    console.log("Delete talent:", talent);
  };

  const handleViewTalent = (talent: any) => {
    console.log("View talent:", talent);
  };

  const handleDataChange = (newData: any[]) => {
    // Handle data changes
  };

  const handleDeleteRows = (rows: any[]) => {
    // Handle bulk delete
  };

  const columns = getTalentColumns(
    handleEditTalent,
    handleDeleteTalent,
    handleViewTalent
  );

  const customActions = (
    <Button size="sm" asChild>
      <Link to="/dashboard/talent/add">
        <Plus className="w-4 h-4 mr-2" />
        Add Talent
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
                      <RiUserStarLine size={22} aria-hidden="true" />
                      <span className="sr-only">Talent</span>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="hidden md:block" />
                  <BreadcrumbItem>
                    <BreadcrumbPage>Talent Management</BreadcrumbPage>
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
                <h1 className="text-2xl font-semibold">Talent Management</h1>
                <p className="text-sm text-muted-foreground">
                  Identify, develop, and retain top talent in your organization.
                </p>
              </div>
              <Button className="px-3" asChild>
                <Link to="/dashboard/talent/add">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Talent
                </Link>
              </Button>
            </div>

            {/* Talent Stats */}
            <HRStatsGrid stats={sampleHRStats} />

            {/* Talent Table */}
            <div className="min-h-[100vh] flex-1 md:min-h-min">
              <ReusableTable
                data={sampleTalentData}
                columns={columns}
                searchPlaceholder="Search talent..."
                searchColumn="name"
                filterColumns={[
                  {
                    columnId: "status",
                    label: "Status",
                    options: [
                      {
                        value: "active",
                        label: "Active",
                        count: sampleTalentData.filter(
                          (t) => t.status === "active"
                        ).length,
                      },
                      {
                        value: "inactive",
                        label: "Inactive",
                        count: sampleTalentData.filter(
                          (t) => t.status === "inactive"
                        ).length,
                      },
                    ],
                  },
                  {
                    columnId: "level",
                    label: "Level",
                    options: [
                      {
                        value: "high",
                        label: "High Potential",
                        count: sampleTalentData.filter(
                          (t) => t.level === "high"
                        ).length,
                      },
                      {
                        value: "medium",
                        label: "Medium Potential",
                        count: sampleTalentData.filter(
                          (t) => t.level === "medium"
                        ).length,
                      },
                      {
                        value: "low",
                        label: "Low Potential",
                        count: sampleTalentData.filter((t) => t.level === "low")
                          .length,
                      },
                    ],
                  },
                ]}
                onDataChange={handleDataChange}
                onDeleteRows={handleDeleteRows}
                emptyMessage="No talent records found."
                customActions={customActions}
              />
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
