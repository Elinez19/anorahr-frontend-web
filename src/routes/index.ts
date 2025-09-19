import { ROUTES } from "@/constants";

// Route path constants
export const ROUTE_PATHS = {
  HOME: ROUTES.HOME,
  FEATURES: ROUTES.FEATURES,
  PORTFOLIO: ROUTES.PORTFOLIO,
  BLOG: ROUTES.BLOG,
  TESTIMONIALS: ROUTES.TESTIMONIALS,
  ABOUT: ROUTES.ABOUT,
  CONTACT: ROUTES.CONTACT,
  FAQ: ROUTES.FAQ,
  DASHBOARD: ROUTES.DASHBOARD,
  // Detail routes
  FEATURES_DETAILS: "/features/:featureSlug",
  SERVICES_ABUJA: "/services/abuja",
  SERVICES_ADO_EKITI: "/services/ado-ekiti",
  HOW_IT_WORKS_DETAILS: "/how-it-works/:projectSlug",
  BLOG_DETAILS: "/blog/:slug",
  // Additional routes for HR platform
  HOW_IT_WORKS: "/how-it-works",
} as const;

// Route metadata for SEO and navigation
export const ROUTE_METADATA = {
  [ROUTE_PATHS.HOME]: {
    title: "AnoraHR - All-in-One HR Software",
    description:
      "Leading HR technology company specializing in recruitment, payroll, performance management, and comprehensive HR solutions.",
    keywords: [
      "HR software",
      "recruitment",
      "payroll",
      "performance management",
      "HR solutions",
    ],
  },
  [ROUTE_PATHS.FEATURES]: {
    title: "Our HR Features - AnoraHR",
    description:
      "Comprehensive HR features including recruitment, payroll, performance management, and more.",
    keywords: [
      "recruitment",
      "payroll",
      "performance management",
      "HR features",
      "HR software",
    ],
  },
  [ROUTE_PATHS.PORTFOLIO]: {
    title: "How AnoraHR Works - AnoraHR",
    description:
      "Discover how AnoraHR's comprehensive HR platform works and transforms your organization.",
    keywords: ["how it works", "HR platform", "HR features", "implementation"],
  },
  [ROUTE_PATHS.BLOG]: {
    title: "AnoraHR Blog - HR Insights & Best Practices",
    description:
      "Latest insights, tips, and industry trends in HR technology, talent management, and workplace innovation.",
    keywords: [
      "HR blog",
      "HR insights",
      "talent management",
      "HR best practices",
      "workplace trends",
    ],
  },
  [ROUTE_PATHS.TESTIMONIALS]: {
    title: "Client Testimonials - AnoraHR",
    description:
      "Hear from our satisfied clients about their experience working with AnoraHR.",
    keywords: ["testimonials", "clients", "reviews", "success stories"],
  },
  [ROUTE_PATHS.ABOUT]: {
    title: "About Us - AnoraHR",
    description: "Learn about our team, mission, and the story behind AnoraHR.",
    keywords: ["about", "team", "mission", "company"],
  },
  [ROUTE_PATHS.CONTACT]: {
    title: "Contact Us - AnoraHR",
    description:
      "Get in touch with us to discuss your HR needs and start your HR transformation journey.",
    keywords: ["contact", "HR consultation", "get demo", "HR support"],
  },
  [ROUTE_PATHS.FAQ]: {
    title: "FAQ - AnoraHR",
    description:
      "Find answers to frequently asked questions about our services and process.",
    keywords: ["FAQ", "questions", "services", "process"],
  },
  [ROUTE_PATHS.DASHBOARD]: {
    title: "Dashboard - AnoraHR",
    description:
      "Access your HR dashboard to manage contacts, view analytics, and oversee your organization's HR operations.",
    keywords: [
      "dashboard",
      "HR management",
      "contacts",
      "analytics",
      "HR operations",
    ],
  },
  "/services/abuja": {
    title: "HR Software in Abuja - AnoraHR",
    description:
      "Top-rated HR software in Abuja, FCT. Expert HR features, payroll, and performance management serving Central Business District, Maitama, Wuse, Garki.",
    keywords: [
      "HR software Abuja",
      "HR features Abuja",
      "payroll Abuja",
      "performance management Abuja",
    ],
  },
  "/services/ado-ekiti": {
    title: "HR Software in Ado Ekiti - AnoraHR",
    description:
      "Leading HR software in Ado Ekiti, Ekiti State. Professional HR features, payroll, and performance management serving Ado Ekiti and surrounding areas.",
    keywords: [
      "HR software Ado Ekiti",
      "HR features Ado Ekiti",
      "payroll Ado Ekiti",
      "performance management Ado Ekiti",
    ],
  },
} as const;

// Route groups for navigation
export const NAVIGATION_ROUTES = {
  MAIN: [
    { path: ROUTE_PATHS.HOME, label: "Home" },
    { path: ROUTE_PATHS.FEATURES, label: "Features" },
    { path: ROUTE_PATHS.PORTFOLIO, label: "How It Works" },
    { path: ROUTE_PATHS.BLOG, label: "Blog" },
    { path: ROUTE_PATHS.ABOUT, label: "About" },
    { path: ROUTE_PATHS.CONTACT, label: "Contact" },
  ],
  FOOTER: [
    { path: ROUTE_PATHS.ABOUT, label: "About Us" },
    { path: ROUTE_PATHS.FEATURES, label: "Features" },
    { path: ROUTE_PATHS.PORTFOLIO, label: "How It Works" },
    { path: ROUTE_PATHS.BLOG, label: "Blog" },
    { path: ROUTE_PATHS.TESTIMONIALS, label: "Testimonials" },
    { path: ROUTE_PATHS.FAQ, label: "FAQ" },
    { path: ROUTE_PATHS.CONTACT, label: "Contact" },
  ],
} as const;

// Helper function to get route metadata
export const getRouteMetadata = (path: string) => {
  return (
    ROUTE_METADATA[path as keyof typeof ROUTE_METADATA] || {
      title: "AnoraHR",
      description: "Leading HR software",
      keywords: [
        "HR software",
        "HR features",
        "payroll",
        "performance management",
      ],
    }
  );
};
