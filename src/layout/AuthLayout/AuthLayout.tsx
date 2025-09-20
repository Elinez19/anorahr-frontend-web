import { ReactNode } from "react";
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
                  <svg
                    className="w-full h-full"
                    viewBox="0 0 400 600"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <defs>
                      <linearGradient
                        id="waveGradient"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="100%"
                      >
                        <stop
                          offset="0%"
                          stopColor="#3B82F6"
                          stopOpacity="0.3"
                        />
                        <stop
                          offset="50%"
                          stopColor="#8B5CF6"
                          stopOpacity="0.4"
                        />
                        <stop
                          offset="100%"
                          stopColor="#6366F1"
                          stopOpacity="0.5"
                        />
                      </linearGradient>
                    </defs>

                    {/* Wave patterns */}
                    <path
                      d="M0,150 Q100,100 200,150 T400,150 L400,200 Q300,180 200,200 T0,200 Z"
                      fill="url(#waveGradient)"
                      opacity="0.6"
                    />
                    <path
                      d="M0,250 Q150,200 300,250 T400,250 L400,300 Q250,280 100,300 T0,300 Z"
                      fill="url(#waveGradient)"
                      opacity="0.4"
                    />
                    <path
                      d="M0,350 Q120,320 240,350 T400,350 L400,400 Q280,380 160,400 T0,400 Z"
                      fill="url(#waveGradient)"
                      opacity="0.5"
                    />
                    <path
                      d="M0,450 Q80,420 160,450 T400,450 L400,500 Q320,480 240,500 T0,500 Z"
                      fill="url(#waveGradient)"
                      opacity="0.3"
                    />

                    {/* Additional flowing lines */}
                    <path
                      d="M50,100 Q150,80 250,100 T350,100"
                      stroke="url(#waveGradient)"
                      strokeWidth="2"
                      fill="none"
                      opacity="0.7"
                    />
                    <path
                      d="M30,200 Q130,180 230,200 T330,200"
                      stroke="url(#waveGradient)"
                      strokeWidth="2"
                      fill="none"
                      opacity="0.6"
                    />
                    <path
                      d="M70,300 Q170,280 270,300 T370,300"
                      stroke="url(#waveGradient)"
                      strokeWidth="2"
                      fill="none"
                      opacity="0.5"
                    />
                    <path
                      d="M20,400 Q120,380 220,400 T320,400"
                      stroke="url(#waveGradient)"
                      strokeWidth="2"
                      fill="none"
                      opacity="0.4"
                    />
                  </svg>
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
