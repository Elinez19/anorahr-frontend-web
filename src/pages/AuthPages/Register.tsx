import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { toast } from "sonner";
import AuthLayout from "@/layout/AuthLayout/AuthLayout";
import authService from "@/services/features/auth/authService";

const registerSchema = z.object({
  firstName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  acceptTerms: z
    .boolean()
    .refine((val) => val === true, "You must accept the terms and conditions"),
});

type RegisterFormData = z.infer<typeof registerSchema>;

const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true);
    setError(null);

    try {
      const registerData = {
        firstName: data.firstName,
        lastName: data.firstName, // Using firstName as lastName for simplicity
        email: data.email,
        companyName: "Default Company", // Default company name
        password: data.password,
      };

      await authService.Register(registerData);
      toast.success(
        "Registration successful! Please check your email to verify your account."
      );
      navigate("/auth/registration-success");
    } catch (err: any) {
      const errorMessage =
        err?.response?.data?.message ||
        "Registration failed. Please try again.";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
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

        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label
              htmlFor="firstName"
              className="text-sm font-medium text-gray-700"
            >
              Name
            </Label>
            <Input
              id="firstName"
              type="text"
              placeholder="Enter your name"
              className="h-12 bg-gray-50 border-gray-200 focus:bg-white"
              {...register("firstName")}
              disabled={isLoading}
            />
            {errors.firstName && (
              <p className="text-sm text-red-600 mt-1">
                {errors.firstName.message}
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

          <div className="flex items-center space-x-2">
            <Checkbox
              id="acceptTerms"
              {...register("acceptTerms")}
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
            <p className="text-sm text-red-600">{errors.acceptTerms.message}</p>
          )}

          <Button
            type="submit"
            className="w-full h-12 bg-mint-500 hover:bg-mint-600 text-white font-medium"
            disabled={isLoading}
          >
            {isLoading ? "Creating Account..." : "Sign up"}
          </Button>
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
