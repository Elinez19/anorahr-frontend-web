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
import { RiBarChartLine } from "@remixicon/react";
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

const performanceSchema = z.object({
  employeeId: z.string().min(1, "Please select an employee"),
  employeeName: z.string().min(2, "Employee name is required"),
  reviewPeriod: z.string().min(1, "Please enter review period"),
  rating: z
    .number()
    .min(1, "Rating must be at least 1")
    .max(5, "Rating must be at most 5"),
  reviewerId: z.string().min(1, "Please select a reviewer"),
  reviewerName: z.string().min(2, "Reviewer name is required"),
  reviewDate: z.string().min(1, "Please select a review date"),
  goals: z.string().min(1, "Please enter at least one goal"),
  achievements: z.string().min(1, "Please enter at least one achievement"),
  nextSteps: z.string().min(1, "Please enter next steps"),
  comments: z.string().min(10, "Comments must be at least 10 characters"),
});

type PerformanceFormData = z.infer<typeof performanceSchema>;

const employees = [
  { id: "EMP001", name: "John Doe" },
  { id: "EMP002", name: "Sarah Johnson" },
  { id: "EMP003", name: "Michael Brown" },
  { id: "EMP004", name: "Emily Davis" },
  { id: "EMP005", name: "David Wilson" },
  { id: "EMP006", name: "Lisa Anderson" },
];

const reviewers = [
  { id: "REV001", name: "Sarah Johnson" },
  { id: "REV002", name: "Michael Brown" },
  { id: "REV003", name: "Emily Davis" },
  { id: "REV004", name: "David Wilson" },
];

const ratingOptions = [
  { value: 1, label: "1 - Poor", description: "Below expectations" },
  { value: 2, label: "2 - Below Average", description: "Needs improvement" },
  { value: 3, label: "3 - Average", description: "Meets basic expectations" },
  { value: 4, label: "4 - Good", description: "Exceeds expectations" },
  { value: 5, label: "5 - Excellent", description: "Outstanding performance" },
];

export default function AddPerformancePage() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<{
    id: string;
    name: string;
  } | null>(null);
  const [selectedReviewer, setSelectedReviewer] = useState<{
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

  const form = useForm<PerformanceFormData>({
    resolver: zodResolver(performanceSchema),
    defaultValues: {
      employeeId: "",
      employeeName: "",
      reviewPeriod: "",
      rating: 3,
      reviewerId: "",
      reviewerName: "",
      reviewDate: "",
      goals: "",
      achievements: "",
      nextSteps: "",
      comments: "",
    },
  });

  const onSubmit = (data: PerformanceFormData) => {
    console.log("Performance review data:", data);
    toast.success("Performance review added successfully!");
    navigate("/dashboard/performance");
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
                    <BreadcrumbLink href="/dashboard/performance">
                      <RiBarChartLine size={22} aria-hidden="true" />
                      <span className="sr-only">Performance</span>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="hidden md:block" />
                  <BreadcrumbItem>
                    <BreadcrumbPage>Add Performance Review</BreadcrumbPage>
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
                onClick={() => navigate("/dashboard/performance")}
                className="gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Performance
              </Button>
            </div>

            {/* Page title */}
            <div className="space-y-1">
              <h1 className="text-2xl font-semibold">Add Performance Review</h1>
              <p className="text-sm text-muted-foreground">
                Conduct a performance review for an employee.
              </p>
            </div>

            {/* Form */}
            <Card>
              <CardHeader>
                <CardTitle>Performance Review Details</CardTitle>
                <CardDescription>
                  Fill in the performance review details and ratings.
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
                      <h3 className="text-lg font-medium">
                        Review Information
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
                        <FormField
                          control={form.control}
                          name="reviewerId"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Reviewer *</FormLabel>
                              <Select
                                onValueChange={(value) => {
                                  field.onChange(value);
                                  const reviewer = reviewers.find(
                                    (rev) => rev.id === value
                                  );
                                  if (reviewer) {
                                    setSelectedReviewer(reviewer);
                                    form.setValue(
                                      "reviewerName",
                                      reviewer.name
                                    );
                                  }
                                }}
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select reviewer" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {reviewers.map((reviewer) => (
                                    <SelectItem
                                      key={reviewer.id}
                                      value={reviewer.id}
                                    >
                                      {reviewer.name} ({reviewer.id})
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="reviewPeriod"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Review Period *</FormLabel>
                              <FormControl>
                                <Input placeholder="e.g., Q4 2023" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="reviewDate"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Review Date *</FormLabel>
                              <FormControl>
                                <Input type="date" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>

                    {/* Rating */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Overall Rating</h3>
                      <FormField
                        control={form.control}
                        name="rating"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Performance Rating *</FormLabel>
                            <Select
                              onValueChange={(value) =>
                                field.onChange(parseInt(value))
                              }
                              defaultValue={field.value.toString()}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select rating" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {ratingOptions.map((option) => (
                                  <SelectItem
                                    key={option.value}
                                    value={option.value.toString()}
                                  >
                                    <div>
                                      <div className="font-medium">
                                        {option.label}
                                      </div>
                                      <div className="text-xs text-muted-foreground">
                                        {option.description}
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
                    </div>

                    {/* Goals */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">
                        Goals & Objectives
                      </h3>
                      <FormField
                        control={form.control}
                        name="goals"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Goals *</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Enter goals and objectives (one per line)"
                                {...field}
                              />
                            </FormControl>
                            <FormDescription>
                              List each goal on a separate line
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* Achievements */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Achievements</h3>
                      <FormField
                        control={form.control}
                        name="achievements"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Achievements *</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Enter achievements and accomplishments (one per line)"
                                {...field}
                              />
                            </FormControl>
                            <FormDescription>
                              List each achievement on a separate line
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* Next Steps */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Development Plan</h3>
                      <FormField
                        control={form.control}
                        name="nextSteps"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Next Steps *</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Enter development goals and next steps (one per line)"
                                {...field}
                              />
                            </FormControl>
                            <FormDescription>
                              List each next step on a separate line
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* Comments */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">
                        Additional Comments
                      </h3>
                      <FormField
                        control={form.control}
                        name="comments"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Comments *</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Provide detailed feedback and comments"
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
                        onClick={() => navigate("/dashboard/performance")}
                      >
                        Cancel
                      </Button>
                      <Button type="submit">Add Performance Review</Button>
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
