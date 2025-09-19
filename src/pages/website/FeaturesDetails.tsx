import React from "react";
import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  Check,
  Clock,
  Users,
  Code,
  Palette,
  TrendingUp,
  Users as UsersIcon,
} from "lucide-react";
import Container from "@/components/custom/Container";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import type { Service } from "@/types";

// Mock service data - in a real app, this would come from an API
const services: Record<string, Service> = {
  Recruitment: {
    id: 1,
    title: "Recruitment & Talent Acquisition",
    description:
      "Streamline your hiring process with our comprehensive recruitment solutions that help you find and attract top talent.",
    icon: <Users className="w-8 h-8 text-mint-600" />,
    features: [
      "Job posting and candidate sourcing",
      "Applicant tracking system (ATS)",
      "Resume screening and shortlisting",
      "Interview scheduling and management",
      "Background verification services",
      "Onboarding process automation",
      "Candidate communication tools",
      "Recruitment analytics and reporting",
    ],
    price: "Starting from ₦50,000/month",
  },
  Payroll: {
    id: 2,
    title: "Payroll Management",
    description:
      "Automate and streamline your payroll processes with our comprehensive payroll management system.",
    icon: <TrendingUp className="w-8 h-8 text-mint-600" />,
    features: [
      "Automated salary calculations",
      "Tax computation and deductions",
      "Pension fund administration",
      "Pay slip generation and distribution",
      "Bank transfer integration",
      "Overtime and bonus calculations",
      "Statutory compliance reporting",
      "Employee self-service portal",
    ],
    price: "Starting from ₦30,000/month",
  },
  "Performance Management": {
    id: 3,
    title: "Performance Management",
    description:
      "Drive employee performance and engagement with our comprehensive performance management system.",
    icon: <TrendingUp className="w-8 h-8 text-mint-600" />,
    features: [
      "Goal setting and tracking",
      "360-degree feedback system",
      "Performance appraisal workflows",
      "KPI monitoring and reporting",
      "Employee development planning",
      "Recognition and reward programs",
      "Performance analytics dashboard",
      "Career progression tracking",
    ],
    price: "Starting from ₦40,000/month",
  },
  "Leave Management": {
    id: 4,
    title: "Leave Management",
    description:
      "Simplify leave requests and approvals with our automated leave management system.",
    icon: <Clock className="w-8 h-8 text-mint-600" />,
    features: [
      "Leave request submission",
      "Automated approval workflows",
      "Leave balance tracking",
      "Holiday calendar management",
      "Leave policy configuration",
      "Manager dashboard and notifications",
      "Leave reports and analytics",
      "Mobile app access",
    ],
    price: "Starting from ₦25,000/month",
  },
  "Talent Management": {
    id: 5,
    title: "Talent Management",
    description:
      "Develop and retain your workforce with comprehensive talent management solutions.",
    icon: <UsersIcon className="w-8 h-8 text-mint-600" />,
    features: [
      "Succession planning tools",
      "Career development pathways",
      "Skills gap analysis",
      "Training and development tracking",
      "Employee engagement surveys",
      "Retention analytics",
      "Talent pipeline management",
      "Leadership development programs",
    ],
    price: "Starting from ₦60,000/month",
  },
  "E-Learning": {
    id: 6,
    title: "E-Learning & Training",
    description:
      "Empower your workforce with comprehensive learning and development solutions.",
    icon: <Code className="w-8 h-8 text-mint-600" />,
    features: [
      "Learning management system (LMS)",
      "Course creation and management",
      "Progress tracking and reporting",
      "Certification and compliance training",
      "Interactive learning modules",
      "Assessment and quiz tools",
      "Mobile learning access",
      "Learning analytics dashboard",
    ],
    price: "Starting from ₦35,000/month",
  },
};

const processSteps = [
  {
    step: 1,
    title: "HR Assessment & Planning",
    description:
      "We analyze your current HR processes, identify pain points, and develop a customized implementation strategy.",
    icon: <Users className="w-6 h-6" />,
  },
  {
    step: 2,
    title: "System Configuration",
    description:
      "Configure the HR modules according to your company policies, workflows, and compliance requirements.",
    icon: <Palette className="w-6 h-6" />,
  },
  {
    step: 3,
    title: "Data Migration & Setup",
    description:
      "Safely migrate your existing HR data and set up employee records, organizational structure, and policies.",
    icon: <Code className="w-6 h-6" />,
  },
  {
    step: 4,
    title: "Testing & Validation",
    description:
      "Thorough testing of all HR processes to ensure accuracy and compliance with regulations.",
    icon: <Check className="w-6 h-6" />,
  },
  {
    step: 5,
    title: "Training & Go-Live",
    description:
      "Train your HR team and employees on the new system, then launch with full support.",
    icon: <TrendingUp className="w-6 h-6" />,
  },
  {
    step: 6,
    title: "Ongoing Support",
    description:
      "Continuous support, system updates, and HR process optimization to ensure smooth operations.",
    icon: <Clock className="w-6 h-6" />,
  },
];

const FeaturesDetails: React.FC = () => {
  const { serviceSlug } = useParams<{ serviceSlug: string }>();

  // In a real app, you would fetch the service based on the serviceSlug
  const service = services[serviceSlug || "Recruitment"];

  if (!service) {
    return (
      <>
        <main className="pt-20">
          <Container>
            <div className="text-center py-20">
              <h1 className="text-3xl font-bold text-midnight-900 mb-4">
                Feature Not Found
              </h1>
              <p className="text-midnight-600 mb-8">
                The feature you're looking for doesn't exist.
              </p>
              <Link
                to="/features"
                className="text-mint-600 hover:text-mint-700 font-medium"
              >
                ← Back to Features
              </Link>
            </div>
          </Container>
        </main>
      </>
    );
  }

  return (
    <>
      <main className="pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-midnight-900 to-mint-600 text-white py-20">
          <Container>
            <div className="max-w-4xl mx-auto">
              <Link
                to="/features"
                className="inline-flex items-center text-mint-100 hover:text-white mb-6 transition-colors"
              >
                <ArrowLeft size={16} className="mr-2" />
                Back to Features
              </Link>

              <div className="text-center mb-8">
                <div className="flex justify-center mb-6">{service.icon}</div>
                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                  {service.title}
                </h1>
                <p className="text-xl text-mint-100 mb-8 max-w-3xl mx-auto">
                  {service.description}
                </p>
                <div className="text-2xl font-bold text-mint-200">
                  {service.price}
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* Features Section */}
        <section className="py-20">
          <Container>
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-midnight-900 mb-12 text-center">
                What's Included
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {service.features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-mint-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-4 h-4 text-mint-600" />
                    </div>
                    <p className="text-midnight-700">{feature}</p>
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </section>

        {/* Process Section */}
        <section className="bg-midnight-50 py-20">
          <Container>
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-midnight-900 mb-12 text-center">
                Our Process
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {processSteps.map((step) => (
                  <Card key={step.step} className="text-center">
                    <div className="w-16 h-16 bg-mint-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <div className="text-mint-600">{step.icon}</div>
                    </div>
                    <div className="text-sm text-mint-600 font-medium mb-2">
                      Step {step.step}
                    </div>
                    <h3 className="text-xl font-bold text-midnight-900 mb-3">
                      {step.title}
                    </h3>
                    <p className="text-midnight-600">{step.description}</p>
                  </Card>
                ))}
              </div>
            </div>
          </Container>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <Container>
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-midnight-900 mb-6">
                Ready to Transform Your HR Operations?
              </h2>
              <p className="text-xl text-midnight-600 mb-8">
                Let's discuss your HR challenges and create a customized
                solution that streamlines your workforce management.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg">
                  <Link to="/contact">Schedule HR Consultation</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to="/features">Explore All HR Solutions</Link>
                </Button>
              </div>
            </div>
          </Container>
        </section>
      </main>
    </>
  );
};

export default FeaturesDetails;
