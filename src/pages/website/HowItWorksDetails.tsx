import React from "react";
import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  ExternalLink,
  Github,
  Calendar,
  Users,
  Code,
  Smartphone,
  Globe,
  Database,
  Cloud,
  Check,
} from "lucide-react";
import Container from "@/components/custom/Container";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import type { CaseStudy } from "@/types";

// Mock portfolio project data - in a real app, this would come from an API
const howItWorksProjects: Record<
  string,
  CaseStudy & {
    fullDescription: string;
    technologies: string[];
    teamSize: number;
    duration: string;
    client: string;
    challenges: string[];
    solutions: string[];
    results: string[];
    images: string[];
    liveUrl?: string;
    githubUrl?: string;
  }
> = {
  "hr-platform": {
    id: 1,
    title: "HR Platform",
    description:
      "A modern HR platform built with React and Node.js, featuring advanced search, payment integration, and admin dashboard.",
    fullDescription:
      "A comprehensive e-commerce solution designed for modern retail businesses. The platform features a responsive design, advanced product search and filtering, secure payment processing, inventory management, and a powerful admin dashboard for business owners.",
    image:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=400&fit=crop",
    tag: "Web Development",
    link: "/how-it-works/hr-platform",
    technologies: ["React", "Node.js", "MongoDB", "Stripe", "AWS", "Redux"],
    teamSize: 6,
    duration: "4 months",
    client: "HR Platform for Beauty and Skincare Businesses",
    challenges: [
      "Complex inventory management system",
      "High-performance product search",
      "Secure payment processing",
      "Mobile-responsive design",
    ],
    solutions: [
      "Implemented advanced filtering and search algorithms",
      "Integrated Stripe for secure payments",
      "Used React for responsive frontend",
      "Deployed on AWS for scalability",
    ],
    results: [
      "40% increase in conversion rate",
      "60% faster page load times",
      "99.9% uptime achieved",
      "50% reduction in cart abandonment",
    ],
    images: [
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=400&fit=crop",
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=400&fit=crop",
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=400&fit=crop",
    ],
    liveUrl: "https://example-ecommerce.com",
    githubUrl: "https://github.com/example/ecommerce-platform",
  },
  "mobile-banking": {
    id: 2,
    title: "Mobile Banking App",
    description:
      "A secure mobile banking application with biometric authentication, real-time transactions, and financial analytics.",
    fullDescription:
      "A cutting-edge mobile banking application designed for modern financial institutions. The app features biometric authentication, real-time transaction processing, comprehensive financial analytics, and a user-friendly interface that makes banking accessible to everyone.",
    image:
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=400&fit=crop",
    tag: "Mobile Development",
    link: "/portfolio/mobile-banking",
    technologies: [
      "React Native",
      "Node.js",
      "PostgreSQL",
      "Firebase",
      "Biometric API",
    ],
    teamSize: 8,
    duration: "6 months",
    client: "Digital Bank",
    challenges: [
      "Biometric authentication implementation",
      "Real-time transaction processing",
      "Financial data security",
      "Cross-platform compatibility",
    ],
    solutions: [
      "Integrated native biometric APIs",
      "Implemented WebSocket for real-time updates",
      "Used end-to-end encryption",
      "Built with React Native for cross-platform",
    ],
    results: [
      "95% user satisfaction rate",
      "99.99% transaction accuracy",
      "50% faster login times",
      "30% increase in mobile transactions",
    ],
    images: [
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=400&fit=crop",
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=400&fit=crop",
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=400&fit=crop",
    ],
    liveUrl: "https://mobile-banking-app.com",
  },
  "healthcare-system": {
    id: 3,
    title: "Healthcare Management System",
    description:
      "Comprehensive healthcare management system with patient records, appointment scheduling, and telemedicine features.",
    fullDescription:
      "A comprehensive healthcare management system designed to streamline patient care, appointment scheduling, and telemedicine services. The system includes electronic health records, appointment management, telemedicine capabilities, and administrative tools for healthcare providers.",
    image:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=400&fit=crop",
    tag: "Web Development",
    link: "/portfolio/healthcare-system",
    technologies: [
      "React",
      "Python",
      "Django",
      "PostgreSQL",
      "WebRTC",
      "HIPAA",
    ],
    teamSize: 10,
    duration: "8 months",
    client: "Healthcare Network",
    challenges: [
      "HIPAA compliance requirements",
      "Real-time video conferencing",
      "Complex patient data management",
      "Integration with existing systems",
    ],
    solutions: [
      "Implemented HIPAA-compliant data handling",
      "Integrated WebRTC for video calls",
      "Built secure patient portal",
      "Created API for system integration",
    ],
    results: [
      "100% HIPAA compliance achieved",
      "80% reduction in appointment no-shows",
      "60% faster patient check-in process",
      "90% provider satisfaction rate",
    ],
    images: [
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=400&fit=crop",
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=400&fit=crop",
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=400&fit=crop",
    ],
    liveUrl: "https://healthcare-system.com",
  },
};

const HowItWorksDetails: React.FC = () => {
  const { projectSlug } = useParams<{ projectSlug: string }>();

  // In a real app, you would fetch the project based on the projectSlug
  const project = howItWorksProjects[projectSlug || "ecommerce-platform"];

  if (!project) {
    return (
      <>
        <main className="pt-20">
          <Container>
            <div className="text-center py-20">
              <h1 className="text-3xl font-bold text-midnight-900 mb-4">
                Project Not Found
              </h1>
              <p className="text-midnight-600 mb-8">
                The project you're looking for doesn't exist.
              </p>
              <Link
                to="/how-it-works"
                className="text-mint-600 hover:text-mint-700 font-medium"
              >
                ← Back to Portfolio
              </Link>
            </div>
          </Container>
        </main>
      </>
    );
  }

  const getTechnologyIcon = (tech: string) => {
    const techLower = tech.toLowerCase();
    if (techLower.includes("react")) return <Code className="w-5 h-5" />;
    if (techLower.includes("mobile") || techLower.includes("native"))
      return <Smartphone className="w-5 h-5" />;
    if (techLower.includes("web") || techLower.includes("html"))
      return <Globe className="w-5 h-5" />;
    if (techLower.includes("database") || techLower.includes("sql"))
      return <Database className="w-5 h-5" />;
    if (techLower.includes("cloud") || techLower.includes("aws"))
      return <Cloud className="w-5 h-5" />;
    return <Code className="w-5 h-5" />;
  };

  return (
    <>
      <main className="pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-midnight-900 to-mint-600 text-white py-20">
          <Container>
            <div className="max-w-4xl mx-auto">
              <Link
                to="/how-it-works"
                className="inline-flex items-center text-mint-100 hover:text-white mb-6 transition-colors"
              >
                <ArrowLeft size={16} className="mr-2" />
                Back to Portfolio
              </Link>

              <div className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-sm text-mint-100 bg-mint-600 px-3 py-1 rounded-full">
                    {project.tag}
                  </span>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                  {project.title}
                </h1>
                <p className="text-xl text-mint-100 mb-8">
                  {project.description}
                </p>

                <div className="flex flex-wrap items-center gap-6 text-mint-100">
                  <div className="flex items-center gap-2">
                    <Users size={16} />
                    <span>Team: {project.teamSize} people</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar size={16} />
                    <span>Duration: {project.duration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Globe size={16} />
                    <span>Client: {project.client}</span>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* Project Images */}
        <section className="py-20">
          <Container>
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-midnight-900 mb-12 text-center">
                Project Gallery
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {project.images.map((image, index) => (
                  <div key={index} className="group">
                    <img
                      src={image}
                      alt={`${project.title} - Image ${index + 1}`}
                      className="w-full h-64 object-cover rounded-lg shadow-lg group-hover:shadow-xl transition-shadow duration-300"
                    />
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </section>

        {/* Project Details */}
        <section className="py-20 bg-midnight-50">
          <Container>
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Main Content */}
                <div className="lg:col-span-2">
                  <Card className="mb-8">
                    <h3 className="text-2xl font-bold text-midnight-900 mb-6">
                      Project Overview
                    </h3>
                    <p className="text-lg text-midnight-700 leading-relaxed">
                      {project.fullDescription}
                    </p>
                  </Card>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Challenges */}
                    <Card>
                      <h4 className="text-xl font-bold text-midnight-900 mb-4">
                        Challenges
                      </h4>
                      <ul className="space-y-3">
                        {project.challenges.map((challenge, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-mint-600 rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-midnight-700">
                              {challenge}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </Card>

                    {/* Solutions */}
                    <Card>
                      <h4 className="text-xl font-bold text-midnight-900 mb-4">
                        Solutions
                      </h4>
                      <ul className="space-y-3">
                        {project.solutions.map((solution, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-mint-600 rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-midnight-700">
                              {solution}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </Card>
                  </div>

                  {/* Results */}
                  <Card className="mt-8">
                    <h4 className="text-xl font-bold text-midnight-900 mb-4">
                      Results & Impact
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {project.results.map((result, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <div className="w-6 h-6 bg-mint-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Check className="w-4 h-4 text-mint-600" />
                          </div>
                          <span className="text-midnight-700">{result}</span>
                        </div>
                      ))}
                    </div>
                  </Card>
                </div>

                {/* Sidebar */}
                <div className="lg:col-span-1">
                  {/* Technologies */}
                  <Card className="mb-8">
                    <h4 className="text-xl font-bold text-midnight-900 mb-4">
                      Technologies Used
                    </h4>
                    <div className="space-y-3">
                      {project.technologies.map((tech) => (
                        <div key={tech} className="flex items-center gap-3">
                          <div className="text-mint-600">
                            {getTechnologyIcon(tech)}
                          </div>
                          <span className="text-midnight-700">{tech}</span>
                        </div>
                      ))}
                    </div>
                  </Card>

                  {/* Project Links */}
                  <Card className="mb-8">
                    <h4 className="text-xl font-bold text-midnight-900 mb-4">
                      Project Links
                    </h4>
                    <div className="space-y-3">
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-3 text-mint-600 hover:text-mint-700 transition-colors"
                        >
                          <ExternalLink size={16} />
                          <span>Live Demo</span>
                        </a>
                      )}
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-3 text-midnight-700 hover:text-midnight-900 transition-colors"
                        >
                          <Github size={16} />
                          <span>View Code</span>
                        </a>
                      )}
                    </div>
                  </Card>

                  {/* Project Info */}
                  <Card>
                    <h4 className="text-xl font-bold text-midnight-900 mb-4">
                      Project Info
                    </h4>
                    <div className="space-y-4">
                      <div>
                        <div className="text-sm text-midnight-500 mb-1">
                          Client
                        </div>
                        <div className="font-medium text-midnight-900">
                          {project.client}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-midnight-500 mb-1">
                          Team Size
                        </div>
                        <div className="font-medium text-midnight-900">
                          {project.teamSize} people
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-midnight-500 mb-1">
                          Duration
                        </div>
                        <div className="font-medium text-midnight-900">
                          {project.duration}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-midnight-500 mb-1">
                          Category
                        </div>
                        <div className="font-medium text-midnight-900">
                          {project.tag}
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <Container>
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-midnight-900 mb-6">
                Ready to Start Your Project?
              </h2>
              <p className="text-xl text-midnight-600 mb-8">
                Let's create something amazing together. Get in touch to discuss
                your project requirements.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg">
                  <Link to="/contact">Start Your Project</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to="/how-it-works">View More Projects</Link>
                </Button>
              </div>
            </div>
          </Container>
        </section>
      </main>
    </>
  );
};

export default HowItWorksDetails;
