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
import { RiUserStarLine } from "@remixicon/react";
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

const talentSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  position: z.string().min(2, "Position must be at least 2 characters"),
  department: z.string().min(1, "Please select a department"),
  level: z.enum(["high", "medium", "low"], {
    required_error: "Please select a potential level",
  }),
  skills: z.string().min(1, "Please enter at least one skill"),
  experience: z.number().min(0, "Experience must be 0 or more"),
  status: z.enum(["active", "inactive"], {
    required_error: "Please select a status",
  }),
  potential: z
    .number()
    .min(0, "Potential must be 0 or more")
    .max(100, "Potential must be 100 or less"),
  readiness: z
    .number()
    .min(0, "Readiness must be 0 or more")
    .max(100, "Readiness must be 100 or less"),
  lastReview: z.string().min(1, "Please select last review date"),
  careerGoals: z.string().optional(),
  developmentNeeds: z.string().optional(),
  notes: z.string().optional(),
});

type TalentFormData = z.infer<typeof talentSchema>;

const departments = [
  "Engineering",
  "Human Resources",
  "Marketing",
  "Finance",
  "Sales",
  "Operations",
  "Customer Service",
  "IT Support",
];

const positions = [
  "Software Developer",
  "Senior Developer",
  "Team Lead",
  "Manager",
  "Director",
  "Analyst",
  "Coordinator",
  "Specialist",
  "Consultant",
  "Executive",
];

const potentialLevels = [
  {
    value: "high",
    label: "High Potential",
    description: "Ready for senior roles and leadership",
  },
  {
    value: "medium",
    label: "Medium Potential",
    description: "Good performer with growth potential",
  },
  {
    value: "low",
    label: "Low Potential",
    description: "Basic performer, needs development",
  },
];

export default function AddTalentPage() {
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

  const form = useForm<TalentFormData>({
    resolver: zodResolver(talentSchema),
    defaultValues: {
      name: "",
      position: "",
      department: "",
      level: "medium",
      skills: "",
      experience: 0,
      status: "active",
      potential: 50,
      readiness: 50,
      lastReview: "",
      careerGoals: "",
      developmentNeeds: "",
      notes: "",
    },
  });

  const onSubmit = (data: TalentFormData) => {
    console.log("Talent data:", data);
    toast.success("Talent profile added successfully!");
    navigate("/dashboard/talent");
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
                    <BreadcrumbLink href="/dashboard/talent">
                      <RiUserStarLine size={22} aria-hidden="true" />
                      <span className="sr-only">Talent</span>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="hidden md:block" />
                  <BreadcrumbItem>
                    <BreadcrumbPage>Add Talent</BreadcrumbPage>
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
                onClick={() => navigate("/dashboard/talent")}
                className="gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Talent
              </Button>
            </div>

            {/* Page title */}
            <div className="space-y-1">
              <h1 className="text-2xl font-semibold">Add Talent Profile</h1>
              <p className="text-sm text-muted-foreground">
                Create a new talent profile to track potential and development.
              </p>
            </div>

            {/* Form */}
            <Card>
              <CardHeader>
                <CardTitle>Talent Profile Information</CardTitle>
                <CardDescription>
                  Enter the talent's details and assessment information.
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
                              <FormLabel>Name *</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Enter full name"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="position"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Position *</FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select position" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {positions.map((pos) => (
                                    <SelectItem key={pos} value={pos}>
                                      {pos}
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
                          name="department"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Department *</FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select department" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {departments.map((dept) => (
                                    <SelectItem key={dept} value={dept}>
                                      {dept}
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
                          name="experience"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Years of Experience *</FormLabel>
                              <FormControl>
                                <Input
                                  type="number"
                                  placeholder="0"
                                  {...field}
                                  onChange={(e) =>
                                    field.onChange(
                                      parseInt(e.target.value) || 0
                                    )
                                  }
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>

                    {/* Assessment Information */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Talent Assessment</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="level"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Potential Level *</FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select potential level" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {potentialLevels.map((level) => (
                                    <SelectItem
                                      key={level.value}
                                      value={level.value}
                                    >
                                      <div>
                                        <div className="font-medium">
                                          {level.label}
                                        </div>
                                        <div className="text-xs text-muted-foreground">
                                          {level.description}
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
                          name="potential"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Potential Score (%) *</FormLabel>
                              <FormControl>
                                <Input
                                  type="number"
                                  min="0"
                                  max="100"
                                  placeholder="50"
                                  {...field}
                                  onChange={(e) =>
                                    field.onChange(
                                      parseInt(e.target.value) || 0
                                    )
                                  }
                                />
                              </FormControl>
                              <FormDescription>
                                Rate the talent's potential from 0-100%
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="readiness"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Readiness Score (%) *</FormLabel>
                              <FormControl>
                                <Input
                                  type="number"
                                  min="0"
                                  max="100"
                                  placeholder="50"
                                  {...field}
                                  onChange={(e) =>
                                    field.onChange(
                                      parseInt(e.target.value) || 0
                                    )
                                  }
                                />
                              </FormControl>
                              <FormDescription>
                                Rate readiness for next role from 0-100%
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>

                    {/* Skills */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">
                        Skills & Competencies
                      </h3>
                      <FormField
                        control={form.control}
                        name="skills"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Skills *</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Enter skills and competencies (comma-separated)"
                                {...field}
                              />
                            </FormControl>
                            <FormDescription>
                              Separate multiple skills with commas
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* Development Information */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">
                        Development Information
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="lastReview"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Last Review Date *</FormLabel>
                              <FormControl>
                                <Input type="date" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <div></div>
                        <FormField
                          control={form.control}
                          name="careerGoals"
                          render={({ field }) => (
                            <FormItem className="md:col-span-2">
                              <FormLabel>Career Goals</FormLabel>
                              <FormControl>
                                <Textarea
                                  placeholder="Enter career aspirations and goals"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="developmentNeeds"
                          render={({ field }) => (
                            <FormItem className="md:col-span-2">
                              <FormLabel>Development Needs</FormLabel>
                              <FormControl>
                                <Textarea
                                  placeholder="Enter areas for development and improvement"
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
                            <FormLabel>Notes</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Enter any additional notes or observations"
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
                        onClick={() => navigate("/dashboard/talent")}
                      >
                        Cancel
                      </Button>
                      <Button type="submit">Add Talent Profile</Button>
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
