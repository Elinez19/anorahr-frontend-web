import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface AuthLayoutProps {
  children: ReactNode;
  showBackButton?: boolean;
  backTo?: string;
  backLabel?: string;
}

const AuthLayout = ({
  children,
  showBackButton = true,
  backTo = "/",
  backLabel = "Back to Home",
}: AuthLayoutProps) => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[600px]">
            {/* Left Column - Auth Form */}
            <div className="p-8 lg:p-12 flex flex-col justify-center">
              {/* Header */}
              <div className="mb-8">
                {showBackButton && (
                  <Button
                    variant="ghost"
                    size="sm"
                    asChild
                    className="text-gray-600 hover:text-gray-900 mb-4"
                  >
                    <Link to={backTo} className="flex items-center gap-2">
                      <ArrowLeft size={16} />
                      {backLabel}
                    </Link>
                  </Button>
                )}
              </div>

              {/* Auth Content */}
              <div className="max-w-md mx-auto w-full">{children}</div>
            </div>

            {/* Right Column - Decorative Graphic */}
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 relative overflow-hidden">
              {/* Logo */}
              <div className="absolute top-8 left-8">
                <Link to="/" className="flex items-center gap-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                    <span className="text-lg font-bold">A</span>
                  </div>
                  <span className="text-xl font-bold text-gray-900">
                    AnoraHR
                  </span>
                </Link>
              </div>

              {/* Decorative Graphic */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-full h-full relative">
                  {/* Abstract flowing lines */}
                  <div className="w-full h-full bg-gradient-to-br from-blue-50 to-purple-50"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-gray-600">
          <p>
            Need help?{" "}
            <Link
              to="/contact"
              className="text-mint-600 hover:text-mint-700 font-medium"
            >
              Contact Support
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
