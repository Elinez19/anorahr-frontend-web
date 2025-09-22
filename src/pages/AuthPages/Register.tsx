import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { toast } from "sonner";
import AuthLayout from "@/layout/AuthLayout/AuthLayout";
import { useRegister } from "@/hooks/useAuth";
import type { IRegister } from "@/types/auth_types";
import {
  completeRegistrationSchema,
  type CompleteRegistrationFormData,
} from "@/helpers/auth.schemas";

const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const navigate = useNavigate();
  const {
    register: registerUser,
    reset,
    isLoading,
    isError,
    isSuccess,
    message,
  } = useRegister();

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm<CompleteRegistrationFormData>({
    resolver: zodResolver(completeRegistrationSchema),
    mode: "onChange",
  });

  const nextStep = async () => {
    if (currentStep === 1) {
      // Validate step 1 fields
      const isValid = await trigger([
        "companyName",
        "email",
        "password",
        "confirmPassword",
      ]);
      if (isValid) {
        setCurrentStep(2);
      }
    }
  };

  const prevStep = () => {
    setCurrentStep(1);
  };

  // Reset auth state on component mount
  useEffect(() => {
    reset();
  }, [reset]);

  // Handle successful registration
  useEffect(() => {
    if (isSuccess && message) {
      toast.success(message);
      navigate("/auth/registration-success");
    }
  }, [isSuccess, message, navigate]);

  // Handle registration errors
  useEffect(() => {
    if (isError && message) {
      toast.error(message);
    }
  }, [isError, message]);

  const onSubmit = async (data: CompleteRegistrationFormData) => {
    const registerData: IRegister = {
      companyName: data.companyName,
      email: data.email,
      password: data.password,
      confirmPassword: data.confirmPassword,
      phone: data.phone,
      address: data.address,
      logo: data.logo || undefined,
      website: data.website || undefined,
      primaryContact: {
        name: data.primaryContactName,
        phone: data.primaryContactPhone,
        email: data.primaryContactEmail,
      },
    };

    registerUser(registerData);
  };

  return (
    <AuthLayout>
      <div className="space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Create your free account
          </h1>
          <p className="text-gray-600">
            Enjoy a 30-day free trial, start right now
          </p>
        </div>

        {/* Social Sign-up Buttons */}
        <div className="space-y-3">
          <Button
            type="button"
            variant="outline"
            className="w-full h-12 bg-white border-gray-200 hover:bg-gray-50 text-gray-900"
            onClick={() => toast.info("Google sign-up coming soon!")}
          >
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 bg-red-500 rounded flex items-center justify-center">
                <span className="text-white text-xs font-bold">G</span>
              </div>
              Sign up with Google
            </div>
          </Button>

          <Button
            type="button"
            variant="outline"
            className="w-full h-12 bg-white border-gray-200 hover:bg-gray-50 text-gray-900"
            onClick={() => toast.info("X sign-up coming soon!")}
          >
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 bg-black rounded flex items-center justify-center">
                <span className="text-white text-xs font-bold">X</span>
              </div>
              Sign up with X
            </div>
          </Button>
        </div>

        {/* Separator */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">OR</span>
          </div>
        </div>

        {isError && message && (
          <Alert variant="destructive">
            <AlertDescription>{message}</AlertDescription>
          </Alert>
        )}

        {/* Step Indicator */}
        <div className="flex items-center justify-center space-x-4 mb-8">
          <div
            className={`flex items-center ${
              currentStep >= 1 ? "text-mint-600" : "text-gray-400"
            }`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                currentStep >= 1
                  ? "bg-mint-500 text-white"
                  : "bg-gray-200 text-gray-500"
              }`}
            >
              1
            </div>
            <span className="ml-2 text-sm font-medium">Account Details</span>
          </div>
          <div
            className={`w-8 h-0.5 ${
              currentStep >= 2 ? "bg-mint-500" : "bg-gray-200"
            }`}
          ></div>
          <div
            className={`flex items-center ${
              currentStep >= 2 ? "text-mint-600" : "text-gray-400"
            }`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                currentStep >= 2
                  ? "bg-mint-500 text-white"
                  : "bg-gray-200 text-gray-500"
              }`}
            >
              2
            </div>
            <span className="ml-2 text-sm font-medium">Company Info</span>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Step 1: Account Details */}
          {currentStep === 1 && (
            <>
              <div>
                <Label
                  htmlFor="companyName"
                  className="text-sm font-medium text-gray-700"
                >
                  Company Name
                </Label>
                <Input
                  id="companyName"
                  type="text"
                  placeholder="Enter your company name"
                  className="h-12 bg-gray-50 border-gray-200 focus:bg-white"
                  {...register("companyName")}
                  disabled={isLoading}
                />
                {errors.companyName && (
                  <p className="text-sm text-red-600 mt-1">
                    {errors.companyName.message}
                  </p>
                )}
              </div>

              <div>
                <Label
                  htmlFor="email"
                  className="text-sm font-medium text-gray-700"
                >
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  className="h-12 bg-gray-50 border-gray-200 focus:bg-white"
                  {...register("email")}
                  disabled={isLoading}
                />
                {errors.email && (
                  <p className="text-sm text-red-600 mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <Label
                  htmlFor="password"
                  className="text-sm font-medium text-gray-700"
                >
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a password"
                    className="h-12 bg-gray-50 border-gray-200 focus:bg-white pr-10"
                    {...register("password")}
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    disabled={isLoading}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-sm text-red-600 mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <div>
                <Label
                  htmlFor="confirmPassword"
                  className="text-sm font-medium text-gray-700"
                >
                  Confirm Password
                </Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    className="h-12 bg-gray-50 border-gray-200 focus:bg-white pr-10"
                    {...register("confirmPassword")}
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    disabled={isLoading}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-sm text-red-600 mt-1">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>

              <Button
                type="button"
                onClick={nextStep}
                className="w-full h-12 bg-mint-500 hover:bg-mint-600 text-white font-medium"
                disabled={isLoading}
              >
                Next Step
              </Button>
            </>
          )}

          {/* Step 2: Company Information */}
          {currentStep === 2 && (
            <>
              <div>
                <Label
                  htmlFor="phone"
                  className="text-sm font-medium text-gray-700"
                >
                  Company Phone
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+1 (555) 123-4567"
                  className="h-12 bg-gray-50 border-gray-200 focus:bg-white"
                  {...register("phone")}
                  disabled={isLoading}
                />
                {errors.phone && (
                  <p className="text-sm text-red-600 mt-1">
                    {errors.phone.message}
                  </p>
                )}
              </div>

              <div>
                <Label
                  htmlFor="address"
                  className="text-sm font-medium text-gray-700"
                >
                  Company Address
                </Label>
                <Input
                  id="address"
                  type="text"
                  placeholder="123 Business Avenue, Tech Park, Suite 500, New York, NY 10001"
                  className="h-12 bg-gray-50 border-gray-200 focus:bg-white"
                  {...register("address")}
                  disabled={isLoading}
                />
                {errors.address && (
                  <p className="text-sm text-red-600 mt-1">
                    {errors.address.message}
                  </p>
                )}
              </div>

              <div>
                <Label
                  htmlFor="logo"
                  className="text-sm font-medium text-gray-700"
                >
                  Company Logo URL (Optional)
                </Label>
                <Input
                  id="logo"
                  type="url"
                  placeholder="https://example.com/logos/company.png"
                  className="h-12 bg-gray-50 border-gray-200 focus:bg-white"
                  {...register("logo")}
                  disabled={isLoading}
                />
                {errors.logo && (
                  <p className="text-sm text-red-600 mt-1">
                    {errors.logo.message}
                  </p>
                )}
              </div>

              <div>
                <Label
                  htmlFor="website"
                  className="text-sm font-medium text-gray-700"
                >
                  Company Website (Optional)
                </Label>
                <Input
                  id="website"
                  type="url"
                  placeholder="https://company.com"
                  className="h-12 bg-gray-50 border-gray-200 focus:bg-white"
                  {...register("website")}
                  disabled={isLoading}
                />
                {errors.website && (
                  <p className="text-sm text-red-600 mt-1">
                    {errors.website.message}
                  </p>
                )}
              </div>

              <div>
                <Label
                  htmlFor="primaryContactName"
                  className="text-sm font-medium text-gray-700"
                >
                  Primary Contact Name
                </Label>
                <Input
                  id="primaryContactName"
                  type="text"
                  placeholder="John Smith"
                  className="h-12 bg-gray-50 border-gray-200 focus:bg-white"
                  {...register("primaryContactName")}
                  disabled={isLoading}
                />
                {errors.primaryContactName && (
                  <p className="text-sm text-red-600 mt-1">
                    {errors.primaryContactName.message}
                  </p>
                )}
              </div>

              <div>
                <Label
                  htmlFor="primaryContactPhone"
                  className="text-sm font-medium text-gray-700"
                >
                  Primary Contact Phone
                </Label>
                <Input
                  id="primaryContactPhone"
                  type="tel"
                  placeholder="+1 (555) 987-6543"
                  className="h-12 bg-gray-50 border-gray-200 focus:bg-white"
                  {...register("primaryContactPhone")}
                  disabled={isLoading}
                />
                {errors.primaryContactPhone && (
                  <p className="text-sm text-red-600 mt-1">
                    {errors.primaryContactPhone.message}
                  </p>
                )}
              </div>

              <div>
                <Label
                  htmlFor="primaryContactEmail"
                  className="text-sm font-medium text-gray-700"
                >
                  Primary Contact Email
                </Label>
                <Input
                  id="primaryContactEmail"
                  type="email"
                  placeholder="john.smith@company.com"
                  className="h-12 bg-gray-50 border-gray-200 focus:bg-white"
                  {...register("primaryContactEmail")}
                  disabled={isLoading}
                />
                {errors.primaryContactEmail && (
                  <p className="text-sm text-red-600 mt-1">
                    {errors.primaryContactEmail.message}
                  </p>
                )}
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="acceptTerms"
                  {...register("acceptTerms", {
                    setValueAs: (value) => value === "on" || value === true,
                  })}
                  disabled={isLoading}
                />
                <Label htmlFor="acceptTerms" className="text-sm text-gray-600">
                  I agree to the{" "}
                  <Link to="/terms" className="text-mint-600 hover:underline">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link to="/privacy" className="text-mint-600 hover:underline">
                    Privacy Policy
                  </Link>
                </Label>
              </div>
              {errors.acceptTerms && (
                <p className="text-sm text-red-600">
                  {errors.acceptTerms.message}
                </p>
              )}

              <div className="flex space-x-4">
                <Button
                  type="button"
                  onClick={prevStep}
                  variant="outline"
                  className="flex-1 h-12 border-gray-200 text-gray-700 hover:bg-gray-50"
                  disabled={isLoading}
                >
                  Previous
                </Button>
                <Button
                  type="submit"
                  className="flex-1 h-12 bg-mint-500 hover:bg-mint-600 text-white font-medium"
                  disabled={isLoading}
                >
                  {isLoading ? "Creating Account..." : "Sign up"}
                </Button>
              </div>
            </>
          )}
        </form>

        <div className="text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              to="/auth/login"
              className="text-mint-600 hover:underline font-medium"
            >
              Log in
            </Link>
          </p>
        </div>
      </div>
    </AuthLayout>
  );
};

export default RegisterPage;
