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
import { RiLeafLine } from "@remixicon/react";
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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";

const leaveSchema = z
  .object({
    employeeId: z.string().min(1, "Please select an employee"),
    employeeName: z.string().min(2, "Employee name is required"),
    leaveType: z.enum(
      ["annual", "sick", "maternity", "paternity", "emergency"],
      {
        required_error: "Please select a leave type",
      }
    ),
    startDate: z.string().min(1, "Please select a start date"),
    endDate: z.string().min(1, "Please select an end date"),
    reason: z.string().min(10, "Reason must be at least 10 characters"),
    emergencyContact: z.string().optional(),
    emergencyPhone: z.string().optional(),
    notes: z.string().optional(),
  })
  .refine(
    (data) => {
      const startDate = new Date(data.startDate);
      const endDate = new Date(data.endDate);
      return endDate >= startDate;
    },
    {
      message: "End date must be after or equal to start date",
      path: ["endDate"],
    }
  );

type LeaveFormData = z.infer<typeof leaveSchema>;

const employees = [
  { id: "EMP001", name: "John Doe" },
  { id: "EMP002", name: "Sarah Johnson" },
  { id: "EMP003", name: "Michael Brown" },
  { id: "EMP004", name: "Emily Davis" },
  { id: "EMP005", name: "David Wilson" },
  { id: "EMP006", name: "Lisa Anderson" },
];

const leaveTypes = [
  {
    value: "annual",
    label: "Annual Leave",
    description: "Planned vacation time",
  },
  {
    value: "sick",
    label: "Sick Leave",
    description: "Illness or medical appointments",
  },
  {
    value: "maternity",
    label: "Maternity Leave",
    description: "For expecting mothers",
  },
  {
    value: "paternity",
    label: "Paternity Leave",
    description: "For new fathers",
  },
  {
    value: "emergency",
    label: "Emergency Leave",
    description: "Urgent personal matters",
  },
];

export default function RequestLeavePage() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<{
    id: string;
    name: string;
  } | null>(null);
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

  const form = useForm<LeaveFormData>({
    resolver: zodResolver(leaveSchema),
    defaultValues: {
      employeeId: "",
      employeeName: "",
      leaveType: "annual",
      startDate: "",
      endDate: "",
      reason: "",
      emergencyContact: "",
      emergencyPhone: "",
      notes: "",
    },
  });

  const onSubmit = (data: LeaveFormData) => {
    console.log("Leave request data:", data);
    toast.success("Leave request submitted successfully!");
    navigate("/dashboard/leaves");
  };

  const calculateDuration = () => {
    const startDate = form.getValues("startDate");
    const endDate = form.getValues("endDate");
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const diffTime = Math.abs(end.getTime() - start.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
      return diffDays;
    }
    return 0;
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
                    <BreadcrumbLink href="/dashboard/leaves">
                      <RiLeafLine size={22} aria-hidden="true" />
                      <span className="sr-only">Leaves</span>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="hidden md:block" />
                  <BreadcrumbItem>
                    <BreadcrumbPage>Request Leave</BreadcrumbPage>
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
                onClick={() => navigate("/dashboard/leaves")}
                className="gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Leaves
              </Button>
            </div>

            {/* Page title */}
            <div className="space-y-1">
              <h1 className="text-2xl font-semibold">Request Leave</h1>
              <p className="text-sm text-muted-foreground">
                Submit a leave request for yourself or an employee.
              </p>
            </div>

            {/* Form */}
            <Card>
              <CardHeader>
                <CardTitle>Leave Request Details</CardTitle>
                <CardDescription>
                  Fill in the details for the leave request.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                  >
                    {/* Employee Selection */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">
                        Employee Information
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="employeeId"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Employee *</FormLabel>
                              <Select
                                onValueChange={(value) => {
                                  field.onChange(value);
                                  const employee = employees.find(
                                    (emp) => emp.id === value
                                  );
                                  if (employee) {
                                    setSelectedEmployee(employee);
                                    form.setValue(
                                      "employeeName",
                                      employee.name
                                    );
                                  }
                                }}
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select employee" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {employees.map((employee) => (
                                    <SelectItem
                                      key={employee.id}
                                      value={employee.id}
                                    >
                                      {employee.name} ({employee.id})
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <div className="flex items-center">
                          <div className="text-sm text-muted-foreground">
                            {selectedEmployee && (
                              <span>Selected: {selectedEmployee.name}</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Leave Details */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Leave Details</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="leaveType"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Leave Type *</FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select leave type" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {leaveTypes.map((type) => (
                                    <SelectItem
                                      key={type.value}
                                      value={type.value}
                                    >
                                      <div>
                                        <div className="font-medium">
                                          {type.label}
                                        </div>
                                        <div className="text-xs text-muted-foreground">
                                          {type.description}
                                        </div>
                                      </div>
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <div className="flex items-center">
                          <div className="text-sm text-muted-foreground">
                            Duration: {calculateDuration()} day
                            {calculateDuration() !== 1 ? "s" : ""}
                          </div>
                        </div>
                        <FormField
                          control={form.control}
                          name="startDate"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Start Date *</FormLabel>
                              <FormControl>
                                <Input
                                  type="date"
                                  {...field}
                                  onChange={(e) => {
                                    field.onChange(e);
                                    // Reset end date if it's before start date
                                    const endDate = form.getValues("endDate");
                                    if (
                                      endDate &&
                                      new Date(e.target.value) >
                                        new Date(endDate)
                                    ) {
                                      form.setValue("endDate", e.target.value);
                                    }
                                  }}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="endDate"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>End Date *</FormLabel>
                              <FormControl>
                                <Input
                                  type="date"
                                  {...field}
                                  min={form.getValues("startDate")}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>

                    {/* Reason */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Reason & Details</h3>
                      <FormField
                        control={form.control}
                        name="reason"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Reason for Leave *</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Please provide a detailed reason for the leave request"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* Emergency Contact */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Emergency Contact</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="emergencyContact"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Emergency Contact Name</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Enter emergency contact name"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="emergencyPhone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Emergency Contact Phone</FormLabel>
                              <FormControl>
                                <Input
                                  type="tel"
                                  placeholder="Enter emergency contact phone"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>

                    {/* Additional Notes */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">
                        Additional Information
                      </h3>
                      <FormField
                        control={form.control}
                        name="notes"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Additional Notes</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Any additional information or special instructions"
                                {...field}
                              />
                            </FormControl>
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
                        onClick={() => navigate("/dashboard/leaves")}
                      >
                        Cancel
                      </Button>
                      <Button type="submit">Submit Leave Request</Button>
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
