import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, ArrowLeft, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { toast } from "sonner";
import AuthLayout from "@/layout/AuthLayout/AuthLayout";
import { useResendVerification } from "@/hooks/useAuth";
import type { IResendVerification } from "@/types/auth_types";
import {
  resendVerificationSchema,
  type ResendVerificationFormData,
} from "@/helpers/auth.schemas";

const ResendVerificationPage = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const {
    resendVerification,
    reset,
    isLoading,
    isError,
    isSuccess: authSuccess,
    message,
  } = useResendVerification();

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<ResendVerificationFormData>({
    resolver: zodResolver(resendVerificationSchema),
  });

  // Reset auth state on component mount
  useEffect(() => {
    reset();
  }, [reset]);

  // Handle successful resend verification
  useEffect(() => {
    if (authSuccess && message) {
      toast.success(message);
      setIsSuccess(true);
    }
  }, [authSuccess, message]);

  // Handle resend verification errors
  useEffect(() => {
    if (isError && message) {
      toast.error(message);
    }
  }, [isError, message]);

  const onSubmit = async (data: ResendVerificationFormData) => {
    const resendData: IResendVerification = { email: data.email };
    resendVerification(resendData);
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
              Email Sent Successfully
            </h1>
            <p className="text-muted-foreground">
              We've sent a new verification email to{" "}
              <span className="font-medium text-foreground">
                {getValues("email")}
              </span>
            </p>
          </div>

          <Alert>
            <AlertDescription>
              Please check your email and click the verification link to
              activate your account. Don't forget to check your spam folder if
              you don't see the email.
            </AlertDescription>
          </Alert>

          <div className="space-y-4">
            <Button asChild className="w-full">
              <Link to="/auth/login">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Login
              </Link>
            </Button>
          </div>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout>
      <div className="space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground">
            Resend Verification Email
          </h1>
          <p className="text-muted-foreground mt-2">
            Enter your email address and we'll send you a new verification link
          </p>
        </div>

        {isError && message && (
          <Alert variant="destructive">
            <AlertDescription>{message}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                placeholder="Enter your email address"
                className="pl-10"
                {...register("email")}
                disabled={isLoading}
              />
            </div>
            {errors.email && (
              <p className="text-sm text-destructive">{errors.email.message}</p>
            )}
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Sending..." : "Send Verification Email"}
          </Button>
        </form>

        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            Remember your password?{" "}
            <Link
              to="/auth/login"
              className="text-primary hover:text-primary/80 font-medium"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </AuthLayout>
  );
};

export default ResendVerificationPage;
