import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Building, MapPin, Phone, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { toast } from "sonner";
import AuthLayout from "@/layout/AuthLayout/AuthLayout";
import authService from "@/services/features/auth/authService";

const verifyCompanySchema = z.object({
  companyName: z.string().min(2, "Company name must be at least 2 characters"),
  companyAddress: z.string().min(10, "Please provide a complete address"),
  phoneNumber: z.string().min(10, "Please provide a valid phone number"),
  industry: z.string().min(2, "Please specify your industry"),
  companySize: z.string().min(1, "Please select company size"),
  description: z.string().optional(),
});

type VerifyCompanyFormData = z.infer<typeof verifyCompanySchema>;

const VerifyCompany = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<VerifyCompanyFormData>({
    resolver: zodResolver(verifyCompanySchema),
  });

  const onSubmit = async (data: VerifyCompanyFormData) => {
    setIsLoading(true);
    setError(null);

    try {
      await authService.VerifyOrganization(data);
      setIsSuccess(true);
      toast.success("Company verification submitted successfully!");
    } catch (err: any) {
      const errorMessage =
        err?.response?.data?.message ||
        "Failed to submit verification. Please try again.";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <AuthLayout showBackButton={false}>
        <div className="space-y-6 text-center">
          <div className="flex justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-foreground">
              Verification Submitted
            </h1>
            <p className="text-muted-foreground">
              Thank you for providing your company details. Our team will review
              and verify your information within 24 hours.
            </p>
          </div>

          <Alert>
            <AlertDescription>
              You'll receive an email notification once your company
              verification is complete. In the meantime, you can continue to
              explore AnoraHR.
            </AlertDescription>
          </Alert>

          <Button asChild className="w-full">
            <Link to="/auth/login">Continue to Dashboard</Link>
          </Button>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout>
      <div className="space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground">
            Verify Company Details
          </h1>
          <p className="text-muted-foreground mt-2">
            Help us verify your company information to get started with AnoraHR
          </p>
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="companyName">Company Name</Label>
            <div className="relative">
              <Building className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="companyName"
                type="text"
                placeholder="Your Company Ltd"
                className="pl-10"
                {...register("companyName")}
                disabled={isLoading}
              />
            </div>
            {errors.companyName && (
              <p className="text-sm text-destructive">
                {errors.companyName.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="companyAddress">Company Address</Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Textarea
                id="companyAddress"
                placeholder="Enter your complete company address"
                className="pl-10 min-h-[80px]"
                {...register("companyAddress")}
                disabled={isLoading}
              />
            </div>
            {errors.companyAddress && (
              <p className="text-sm text-destructive">
                {errors.companyAddress.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="phoneNumber">Phone Number</Label>
            <div className="relative">
              <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="phoneNumber"
                type="tel"
                placeholder="+234 (0) 812 345 6789"
                className="pl-10"
                {...register("phoneNumber")}
                disabled={isLoading}
              />
            </div>
            {errors.phoneNumber && (
              <p className="text-sm text-destructive">
                {errors.phoneNumber.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="industry">Industry</Label>
            <div className="relative">
              <Building className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="industry"
                type="text"
                placeholder="e.g., Technology, Healthcare, Finance"
                className="pl-10"
                {...register("industry")}
                disabled={isLoading}
              />
            </div>
            {errors.industry && (
              <p className="text-sm text-destructive">
                {errors.industry.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="companySize">Company Size</Label>
            <select
              id="companySize"
              className="w-full px-3 py-2 border border-input bg-background rounded-md text-sm"
              {...register("companySize")}
              disabled={isLoading}
            >
              <option value="">Select company size</option>
              <option value="1-10">1-10 employees</option>
              <option value="11-50">11-50 employees</option>
              <option value="51-200">51-200 employees</option>
              <option value="201-500">201-500 employees</option>
              <option value="500+">500+ employees</option>
            </select>
            {errors.companySize && (
              <p className="text-sm text-destructive">
                {errors.companySize.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Company Description (Optional)</Label>
            <Textarea
              id="description"
              placeholder="Brief description of your company and what you do"
              className="min-h-[100px]"
              {...register("description")}
              disabled={isLoading}
            />
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Submitting..." : "Submit Verification"}
          </Button>
        </form>

        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            Skip for now?{" "}
            <Link
              to="/auth/login"
              className="text-primary hover:text-primary/80 font-medium"
            >
              Continue to Dashboard
            </Link>
          </p>
        </div>
      </div>
    </AuthLayout>
  );
};

export default VerifyCompany;
