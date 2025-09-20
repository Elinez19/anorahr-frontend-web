import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Moon, Sun, ArrowLeft } from "lucide-react";
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
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";

const roleSchema = z.object({
  name: z.string().min(2, "Role name must be at least 2 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  status: z.enum(["active", "inactive"], {
    required_error: "Please select a status",
  }),
  permissions: z
    .array(z.string())
    .min(1, "Please select at least one permission"),
});

type RoleFormData = z.infer<typeof roleSchema>;

const availablePermissions = [
  { id: "read", label: "Read", description: "View data and information" },
  { id: "write", label: "Write", description: "Create and modify data" },
  { id: "delete", label: "Delete", description: "Remove data and records" },
  { id: "admin", label: "Admin", description: "Full administrative access" },
  {
    id: "user_management",
    label: "User Management",
    description: "Manage users and accounts",
  },
  {
    id: "system_config",
    label: "System Configuration",
    description: "Configure system settings",
  },
  {
    id: "employee_management",
    label: "Employee Management",
    description: "Manage employee records",
  },
  {
    id: "recruitment",
    label: "Recruitment",
    description: "Handle hiring and recruitment",
  },
  { id: "reports", label: "Reports", description: "Generate and view reports" },
  { id: "finance", label: "Finance", description: "Access financial data" },
  {
    id: "payroll",
    label: "Payroll",
    description: "Process and manage payroll",
  },
  {
    id: "team_management",
    label: "Team Management",
    description: "Manage team members",
  },
];

export default function AddRolePage() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const navigate = useNavigate();

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

  const form = useForm<RoleFormData>({
    resolver: zodResolver(roleSchema),
    defaultValues: {
      name: "",
      description: "",
      status: "active",
      permissions: [],
    },
  });

  const onSubmit = (data: RoleFormData) => {
    console.log("Role data:", data);
    toast.success("Role added successfully!");
    navigate("/dashboard/roles");
  };

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
                    <BreadcrumbLink href="/dashboard/roles">
                      <RiUserLine size={22} aria-hidden="true" />
                      <span className="sr-only">Roles</span>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="hidden md:block" />
                  <BreadcrumbItem>
                    <BreadcrumbPage>Add Role</BreadcrumbPage>
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
            {/* Page header */}
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate("/dashboard/roles")}
                className="gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Roles
              </Button>
            </div>

            {/* Page title */}
            <div className="space-y-1">
              <h1 className="text-2xl font-semibold">Add New Role</h1>
              <p className="text-sm text-muted-foreground">
                Create a new role with specific permissions and access levels.
              </p>
            </div>

            {/* Form */}
            <Card>
              <CardHeader>
                <CardTitle>Role Information</CardTitle>
                <CardDescription>
                  Define the role details and assign appropriate permissions.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                  >
                    {/* Basic Information */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Basic Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Role Name *</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Enter role name"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="status"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Status *</FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select status" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="active">Active</SelectItem>
                                  <SelectItem value="inactive">
                                    Inactive
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="description"
                          render={({ field }) => (
                            <FormItem className="md:col-span-2">
                              <FormLabel>Description *</FormLabel>
                              <FormControl>
                                <Textarea
                                  placeholder="Enter role description"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>

                    {/* Permissions */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Permissions</h3>
                      <FormField
                        control={form.control}
                        name="permissions"
                        render={() => (
                          <FormItem>
                            <div className="mb-4">
                              <FormLabel className="text-base">
                                Select Permissions *
                              </FormLabel>
                              <FormDescription>
                                Choose the permissions that this role should
                                have.
                              </FormDescription>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              {availablePermissions.map((permission) => (
                                <FormField
                                  key={permission.id}
                                  control={form.control}
                                  name="permissions"
                                  render={({ field }) => {
                                    return (
                                      <FormItem
                                        key={permission.id}
                                        className="flex flex-row items-start space-x-3 space-y-0"
                                      >
                                        <FormControl>
                                          <Checkbox
                                            checked={field.value?.includes(
                                              permission.id
                                            )}
                                            onCheckedChange={(checked) => {
                                              return checked
                                                ? field.onChange([
                                                    ...field.value,
                                                    permission.id,
                                                  ])
                                                : field.onChange(
                                                    field.value?.filter(
                                                      (value) =>
                                                        value !== permission.id
                                                    )
                                                  );
                                            }}
                                          />
                                        </FormControl>
                                        <div className="space-y-1 leading-none">
                                          <FormLabel className="font-normal">
                                            {permission.label}
                                          </FormLabel>
                                          <FormDescription className="text-xs">
                                            {permission.description}
                                          </FormDescription>
                                        </div>
                                      </FormItem>
                                    );
                                  }}
                                />
                              ))}
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* Form Actions */}
                    <div className="flex justify-end gap-3 pt-6">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => navigate("/dashboard/roles")}
                      >
                        Cancel
                      </Button>
                      <Button type="submit">Add Role</Button>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
