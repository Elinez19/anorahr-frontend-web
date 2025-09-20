import { Link } from "react-router-dom";
import { Mail, CheckCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import AuthLayout from "@/layout/AuthLayout/AuthLayout";

const RegistrationSuccess = () => {
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
            Registration Successful!
          </h1>
          <p className="text-muted-foreground">
            Welcome to AnoraHR! We've sent a verification email to your inbox.
          </p>
        </div>

        <Alert>
          <Mail className="h-4 w-4" />
          <AlertDescription>
            Please check your email and click the verification link to activate
            your account. Don't forget to check your spam folder if you don't
            see the email.
          </AlertDescription>
        </Alert>

        <div className="space-y-4">
          <Button asChild className="w-full">
            <Link to="/auth/login">
              Continue to Sign In
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>

          <Button variant="outline" asChild className="w-full">
            <Link to="/auth/verify-company">Verify Company Details</Link>
          </Button>
        </div>

        <div className="text-sm text-muted-foreground">
          <p>
            Didn't receive the email?{" "}
            <Link
              to="/auth/resend-verification"
              className="text-primary hover:text-primary/80 font-medium"
            >
              Resend verification email
            </Link>
          </p>
        </div>
      </div>
    </AuthLayout>
  );
};

export default RegistrationSuccess;
