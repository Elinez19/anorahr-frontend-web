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
import { RiPaypalLine } from "@remixicon/react";
import { HRStatsGrid, sampleHRStats } from "@/components/custom/hr-stats-grid";
import { ReusableTable } from "@/components/custom/reusable-table";
import {
  getPayrollColumns,
  samplePayrollData,
} from "@/components/custom/payroll-table-columns";
import { Plus, Download } from "lucide-react";

export default function PayrollPage() {
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

  const handleEditPayroll = (payroll: any) => {
    console.log("Edit payroll:", payroll);
  };

  const handleDeletePayroll = (payroll: any) => {
    console.log("Delete payroll:", payroll);
  };

  const handleViewPayroll = (payroll: any) => {
    console.log("View payroll:", payroll);
  };

  const handleDataChange = (newData: any[]) => {
    // Handle data changes
  };

  const handleDeleteRows = (rows: any[]) => {
    // Handle bulk delete
  };

  const columns = getPayrollColumns(
    handleEditPayroll,
    handleDeletePayroll,
    handleViewPayroll
  );

  const customActions = (
    <>
      <Button variant="outline" size="sm">
        <Download className="w-4 h-4 mr-2" />
        Export
      </Button>
      <Button size="sm">
        <Plus className="w-4 h-4 mr-2" />
        Process Payroll
      </Button>
    </>
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
                      <RiPaypalLine size={22} aria-hidden="true" />
                      <span className="sr-only">Payroll</span>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="hidden md:block" />
                  <BreadcrumbItem>
                    <BreadcrumbPage>Payroll Management</BreadcrumbPage>
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
                <h1 className="text-2xl font-semibold">Payroll Management</h1>
                <p className="text-sm text-muted-foreground">
                  Process and manage employee salaries, benefits, and
                  deductions.
                </p>
              </div>
              <Button className="px-3">
                <Plus className="w-4 h-4 mr-2" />
                Process Payroll
              </Button>
            </div>

            {/* Payroll Stats */}
            <HRStatsGrid stats={sampleHRStats} />

            {/* Payroll Table */}
            <div className="min-h-[100vh] flex-1 md:min-h-min">
              <ReusableTable
                data={samplePayrollData}
                columns={columns}
                searchPlaceholder="Search payroll..."
                searchColumn="employeeName"
                filterColumns={[
                  {
                    columnId: "status",
                    label: "Status",
                    options: [
                      {
                        value: "processed",
                        label: "Processed",
                        count: samplePayrollData.filter(
                          (p) => p.status === "processed"
                        ).length,
                      },
                      {
                        value: "pending",
                        label: "Pending",
                        count: samplePayrollData.filter(
                          (p) => p.status === "pending"
                        ).length,
                      },
                      {
                        value: "failed",
                        label: "Failed",
                        count: samplePayrollData.filter(
                          (p) => p.status === "failed"
                        ).length,
                      },
                    ],
                  },
                ]}
                onDataChange={handleDataChange}
                onDeleteRows={handleDeleteRows}
                emptyMessage="No payroll records found."
                customActions={customActions}
              />
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
