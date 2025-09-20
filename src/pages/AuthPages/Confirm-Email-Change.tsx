import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { CheckCircle, XCircle, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import AuthLayout from "@/layout/AuthLayout/AuthLayout";

const ConfirmEmailChange = () => {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );
  const [message, setMessage] = useState<string>("");

  const token = searchParams.get("token");
  const newEmail = searchParams.get("email");

  useEffect(() => {
    // Simulate email change confirmation process
    const confirmEmailChange = async () => {
      if (!token || !newEmail) {
        setStatus("error");
        setMessage(
          "Invalid confirmation link. Please request a new email change."
        );
        return;
      }

      try {
        // Here you would typically make an API call to confirm the email change
        // await authService.confirmEmailChange({ token, newEmail });

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 2000));

        setStatus("success");
        setMessage("Your email address has been successfully updated.");
      } catch (error) {
        setStatus("error");
        setMessage("Failed to confirm email change. Please try again.");
      }
    };

    confirmEmailChange();
  }, [token, newEmail]);

  if (status === "loading") {
    return (
      <AuthLayout showBackButton={false}>
        <div className="space-y-6 text-center">
          <div className="flex justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
              <Mail className="h-8 w-8 text-blue-600 animate-pulse" />
            </div>
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-foreground">
              Confirming Email Change
            </h1>
            <p className="text-muted-foreground">
              Please wait while we confirm your email address change...
            </p>
          </div>
        </div>
      </AuthLayout>
    );
  }

  if (status === "success") {
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
              Email Change Confirmed
            </h1>
            <p className="text-muted-foreground">{message}</p>
            {newEmail && (
              <p className="text-sm text-muted-foreground">
                Your new email address:{" "}
                <span className="font-medium text-foreground">{newEmail}</span>
              </p>
            )}
          </div>

          <Alert>
            <AlertDescription>
              You can now sign in with your new email address. Please update
              your email in any other services you use.
            </AlertDescription>
          </Alert>

          <Button asChild className="w-full">
            <Link to="/auth/login">Sign In with New Email</Link>
          </Button>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout showBackButton={false}>
      <div className="space-y-6 text-center">
        <div className="flex justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
            <XCircle className="h-8 w-8 text-red-600" />
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-foreground">
            Email Change Failed
          </h1>
          <p className="text-muted-foreground">{message}</p>
        </div>

        <Alert variant="destructive">
          <AlertDescription>
            The confirmation link may have expired or is invalid. Please request
            a new email change from your account settings.
          </AlertDescription>
        </Alert>

        <div className="space-y-4">
          <Button asChild className="w-full">
            <Link to="/auth/login">Sign In to Account</Link>
          </Button>

          <Button variant="outline" asChild className="w-full">
            <Link to="/contact">Contact Support</Link>
          </Button>
        </div>
      </div>
    </AuthLayout>
  );
};

export default ConfirmEmailChange;
