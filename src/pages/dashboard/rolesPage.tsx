import { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";
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
import { RiUserLine } from "@remixicon/react";
import { HRStatsGrid, sampleHRStats } from "@/components/custom/hr-stats-grid";
import { ReusableTable } from "@/components/custom/reusable-table";
import {
  getRoleColumns,
  sampleRoleData,
} from "@/components/custom/role-table-columns";
import { Plus } from "lucide-react";

export default function RolesPage() {
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

  const handleEditRole = (role: {
    id: string;
    name: string;
    status: string;
  }) => {
    console.log("Edit role:", role);
  };

  const handleDeleteRole = (role: {
    id: string;
    name: string;
    status: string;
  }) => {
    console.log("Delete role:", role);
  };

  const handleViewRole = (role: {
    id: string;
    name: string;
    status: string;
  }) => {
    console.log("View role:", role);
  };

  const handleDataChange = (
    _newData: { id: string; name: string; status: string }[]
  ) => {
    // Handle data changes
  };

  const handleDeleteRows = (
    rows: { id: string; name: string; status: string }[]
  ) => {
    // Handle bulk delete
  };

  const columns = getRoleColumns(
    handleEditRole,
    handleDeleteRole,
    handleViewRole
  );

  const customActions = (
    <Button size="sm" asChild>
      <Link to="/dashboard/roles/add">
        <Plus className="w-4 h-4 mr-2" />
        Add Role
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
                      <RiUserLine size={22} aria-hidden="true" />
                      <span className="sr-only">Roles</span>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="hidden md:block" />
                  <BreadcrumbItem>
                    <BreadcrumbPage>Roles Management</BreadcrumbPage>
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
                <h1 className="text-2xl font-semibold">Roles Management</h1>
                <p className="text-sm text-muted-foreground">
                  Manage organizational roles and permissions. Create, edit, and
                  assign roles to employees.
                </p>
              </div>
              <Button className="px-3" asChild>
                <Link to="/dashboard/roles/add">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Role
                </Link>
              </Button>
            </div>

            {/* Roles Stats */}
            <HRStatsGrid stats={sampleHRStats} />

            {/* Roles Table */}
            <div className="min-h-[100vh] flex-1 md:min-h-min">
              <ReusableTable
                data={sampleRoleData}
                columns={columns}
                searchPlaceholder="Search roles..."
                searchColumn="name"
                filterColumns={[
                  {
                    columnId: "status",
                    label: "Status",
                    options: [
                      {
                        value: "active",
                        label: "Active",
                        count: sampleRoleData.filter(
                          (r) => r.status === "active"
                        ).length,
                      },
                      {
                        value: "inactive",
                        label: "Inactive",
                        count: sampleRoleData.filter(
                          (r) => r.status === "inactive"
                        ).length,
                      },
                    ],
                  },
                ]}
                onDataChange={handleDataChange}
                onDeleteRows={handleDeleteRows}
                emptyMessage="No roles found."
                customActions={customActions}
              />
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
