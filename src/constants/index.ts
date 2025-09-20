import type {
  NavItem,
  MegaMenuItem,
  CaseStudy,
  BlogPost,
  Testimonial,
  FAQItem,
} from "../types";

// Route constants
export const ROUTES = {
  HOME: "/",
  FEATURES: "/features",
  PORTFOLIO: "/how-it-works",
  BLOG: "/blog",
  TESTIMONIALS: "/testimonials",
  ABOUT: "/about",
  CONTACT: "/contact",
  FAQ: "/faq",
  DASHBOARD: "/dashboard",
  DASHBOARD_ROLES: "/dashboard/roles",
  DASHBOARD_EMPLOYEES: "/dashboard/employees",
  DASHBOARD_LEAVES: "/dashboard/leaves",
  DASHBOARD_PAYROLL: "/dashboard/payroll",
  DASHBOARD_PERFORMANCE: "/dashboard/performance",
  DASHBOARD_TALENT: "/dashboard/talent",
  DASHBOARD_ADD_EMPLOYEE: "/dashboard/employees/add",
  DASHBOARD_ADD_ROLE: "/dashboard/roles/add",
  DASHBOARD_REQUEST_LEAVE: "/dashboard/leaves/request",
  DASHBOARD_ADD_PERFORMANCE: "/dashboard/performance/add",
  DASHBOARD_ADD_TALENT: "/dashboard/talent/add",
} as const;

// Navigation items for the main menu
export const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: ROUTES.HOME },
  { label: "Features", href: ROUTES.FEATURES },
  { label: "HowItWorks", href: ROUTES.PORTFOLIO },
  { label: "Blog", href: ROUTES.BLOG },
  { label: "About", href: ROUTES.ABOUT },
  { label: "Contact", href: ROUTES.CONTACT },
];

// Mega menu items
export const MEGA_MENU_ITEMS: MegaMenuItem[] = [
  {
    title: "Features",
    items: [
      {
        label: "Recruitment",
        href: "/features/recruitment",
        description:
          "From creating and publishing job adverts, down to employee onboarding, Recruitment on AnoraHR is a 360 degree recruitment solution.",
      },
      {
        label: "Payroll",
        href: "/features/payroll",
        description:
          "Payroll shouldn’t take hours. No matter the size of your team; run your payroll seamlessly and pay your employees in real-time with AnoraHR.",
      },
      {
        label: "Performance Management",
        href: "/features/performance-management",
        description:
          "With the AnoraHR Performance feature, you get actionable insights, making it easier than ever to identify areas for employee improvement.",
      },
      {
        label: "Leave Management",
        href: "/features/leave-management",
        description:
          "Affords organizations of any size, industry or sector the platform to manage leave application and approval without any hassle.",
      },
      {
        label: "Talent Management",
        href: "/features/talent-management",
        description:
          "AnoraHR succession planning feature helps you develop potential successors to take up key roles in the organization.",
      },
      {
        label: "E-Learning",
        href: "/features/e-learning",
        description:
          "A platform to learn and grow. We have over 100 free courses, and you are free to upload courses of your choice to suit your needs.",
      },
    ],
  },
  {
    title: "How AnoraHR Works",
    items: [
      {
        label: "Recruitment",
        href: "/how-anorahr-works/recruitment",
        description:
          "From creating and publishing job adverts, down to employee onboarding, Recruitment on AnoraHR is a 360 degree recruitment solution.",
      },
      {
        label: "Payroll",
        href: "/how-anorahr-works/payroll",
        description:
          "Payroll shouldn’t take hours. No matter the size of your team; run your payroll seamlessly and pay your employees in real-time with AnoraHR.",
      },
      {
        label: "Performance Management",
        href: "/how-anorahr-works/performance-management",
        description:
          "With the AnoraHR Performance feature, you get actionable insights, making it easier than ever to identify areas for employee improvement.",
      },
      {
        label: "Leave Management",
        href: "/how-anorahr-works/leave-management",
        description:
          "Affords organizations of any size, industry or sector the platform to manage leave application and approval without any hassle.",
      },
      {
        label: "Talent Management",
        href: "/how-anorahr-works/talent-management",
        description:
          "AnoraHR succession planning feature helps you develop potential successors to take up key roles in the organization.",
      },
      {
        label: "E-Learning",
        href: "/how-anorahr-works/e-learning",
        description:
          "A platform to learn and grow. We have over 100 free courses, and you are free to upload courses of your choice to suit your needs.",
      },
    ],
  },
  {
    title: "Company",
    items: [
      {
        label: "About Us",
        href: "/about",
        description: "Learn about our team and mission",
      },
      {
        label: "Our Team",
        href: "/about/team",
        description: "Meet our talented team members",
      },
      {
        label: "Careers",
        href: "/about/careers",
        description: "Join our growing team",
      },
      {
        label: "Contact",
        href: "/contact",
        description: "Get in touch with us",
      },
    ],
  },
  {
    title: "Resources",
    items: [
      {
        label: "Blog",
        href: "/blog",
        description: "Latest insights and articles",
      },
      { label: "FAQ", href: "/faq", description: "Frequently asked questions" },
      {
        label: "Testimonials",
        href: "/testimonials",
        description: "What our clients say",
      },
      {
        label: "Support",
        href: "/support",
        description: "Technical support and help",
      },
    ],
  },
];

// Services data
export const SERVICES_DATA = [
  {
    id: 1,
    title: "Recruitment",
    description:
      "From creating and publishing job adverts, down to employee onboarding, Recruitment on AnoraHR is a 360 degree recruitment solution.",
    iconName: "Users",
    features: [
      "Job posting & management",
      "Candidate screening & tracking",
      "Interview scheduling",
      "Background verification",
      "Onboarding automation",
      "Recruitment analytics",
    ],
    price: "Starting from $50/month",
  },
  {
    id: 2,
    title: "Payroll",
    description:
      "Payroll shouldn't take hours. No matter the size of your team; run your payroll seamlessly and pay your employees in real-time with AnoraHR.",
    iconName: "TrendingUp",
    features: [
      "Automated salary calculations",
      "Tax compliance & reporting",
      "Direct bank transfers",
      "Payslip generation",
      "Overtime & bonus management",
      "Payroll audit trails",
    ],
    price: "Starting from $30/month",
  },
  {
    id: 3,
    title: "Performance Management",
    description:
      "With the AnoraHR Performance feature, you get actionable insights, making it easier than ever to identify areas for employee improvement.",
    iconName: "BarChart",
    features: [
      "Goal setting & tracking",
      "360-degree feedback",
      "Performance reviews",
      "KPI monitoring",
      "Development planning",
      "Performance analytics",
    ],
    price: "Starting from $25/month",
  },
  {
    id: 4,
    title: "Leave Management",
    description:
      "Affords organizations of any size, industry or sector the platform to manage leave application and approval without any hassle.",
    iconName: "Calendar",
    features: [
      "Leave request & approval",
      "Leave balance tracking",
      "Holiday calendar management",
      "Leave policies configuration",
      "Manager notifications",
      "Leave reports & analytics",
    ],
    price: "Starting from $20/month",
  },
  {
    id: 5,
    title: "Talent Management",
    description:
      "AnoraHR succession planning feature helps you develop potential successors to take up key roles in the organization.",
    iconName: "Target",
    features: [
      "Succession planning",
      "Career development paths",
      "Skills gap analysis",
      "Talent pipeline management",
      "Leadership development",
      "Talent retention strategies",
    ],
    price: "Starting from $40/month",
  },
  {
    id: 6,
    title: "E-Learning",
    description:
      "A platform to learn and grow. We have over 100 free courses, and you are free to upload courses of your choice to suit your needs.",
    iconName: "BookOpen",
    features: [
      "Course creation & management",
      "Progress tracking",
      "Certification programs",
      "Skill assessments",
      "Learning paths",
      "Training analytics",
    ],
    price: "Starting from $35/month",
  },
];

// Portfolio data
export const FEATURES_DATA: CaseStudy[] = [
  {
    id: 1,
    title: "Healthcare HR Transformation",
    description:
      "Implemented comprehensive HR management system for a leading healthcare provider, streamlining recruitment, payroll, and performance management across 500+ employees.",
    image:
      "https://images.pexels.com/photos/7579831/pexels-photo-7579831.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    tag: "Healthcare",
    link: "/features/healthcare-hr-transformation",
  },
  {
    id: 2,
    title: "Manufacturing Payroll Automation",
    description:
      "Automated payroll processes for a manufacturing company with 1000+ employees, reducing processing time by 80% and eliminating manual errors.",
    image:
      "https://images.pexels.com/photos/7821488/pexels-photo-7821488.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    tag: "Manufacturing",
    link: "/features/manufacturing-payroll-automation",
  },
  {
    id: 3,
    title: "Banking Performance Management",
    description:
      "Deployed advanced performance management system for a regional bank, enabling real-time KPI tracking and employee development planning.",
    image:
      "https://images.pexels.com/photos/6801874/pexels-photo-6801874.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    tag: "Banking",
    link: "/features/banking-performance-management",
  },
  {
    id: 4,
    title: "Education Leave Management",
    description:
      "Streamlined leave management for a university system with 2000+ staff members, implementing automated approval workflows and policy compliance.",
    image:
      "https://images.pexels.com/photos/5940841/pexels-photo-5940841.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    tag: "Education",
    link: "/features/education-leave-management",
  },
  {
    id: 5,
    title: "Tech Talent Pipeline",
    description:
      "Built comprehensive talent management system for a growing tech startup, focusing on succession planning and leadership development programs.",
    image:
      "https://images.pexels.com/photos/6801874/pexels-photo-6801874.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    tag: "Technology",
    link: "/features/tech-talent-pipeline",
  },
  {
    id: 6,
    title: "Corporate Learning Platform",
    description:
      "Developed enterprise learning management system with 500+ courses, serving 10,000+ employees across multiple organizations.",
    image:
      "https://images.pexels.com/photos/5940841/pexels-photo-5940841.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    tag: "Corporate",
    link: "/features/corporate-learning-platform",
  },
];

export const FEATURES_CATEGORIES = [
  "All",
  "Healthcare",
  "Manufacturing",
  "Banking",
  "Education",
  "Technology",
  "Corporate",
];

// Blog data
export const BLOG_DATA: BlogPost[] = [
  {
    id: 1,
    title: "The Future of HR Technology: AI-Powered Recruitment",
    excerpt:
      "Discover how artificial intelligence is revolutionizing recruitment processes and transforming the way organizations find and hire talent.",
    content: "Full content here...",
    author: "Sarah Johnson",
    date: "2024-01-15",
    image:
      "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=600&h=400&fit=crop",
    tags: ["HR Technology", "AI", "Recruitment"],
    slug: "future-hr-technology-ai-recruitment",
  },
  {
    id: 2,
    title: "Building Effective Performance Management Systems",
    excerpt:
      "Learn the best practices for creating comprehensive performance management systems that drive employee engagement and productivity.",
    content: "Full content here...",
    author: "Mike Chen",
    date: "2024-01-10",
    image:
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&h=400&fit=crop",
    tags: [
      "Performance Management",
      "Employee Engagement",
      "HR Best Practices",
    ],
    slug: "building-effective-performance-management-systems",
  },
  {
    id: 3,
    title: "Modern Payroll Management: Automation and Compliance",
    excerpt:
      "Essential strategies for automating payroll processes while maintaining compliance with local and international regulations.",
    content: "Full content here...",
    author: "Emily Davis",
    date: "2024-01-05",
    image:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=400&fit=crop",
    tags: ["Payroll Management", "Automation", "Compliance"],
    slug: "modern-payroll-management-automation-compliance",
  },
  {
    id: 4,
    title: "Remote Work Trends: Managing Distributed Teams",
    excerpt:
      "Explore the latest trends in remote work and how HR professionals can effectively manage distributed teams.",
    content: "Full content here...",
    author: "David Wilson",
    date: "2023-12-28",
    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&h=400&fit=crop",
    tags: ["Remote Work", "Team Management", "HR Trends"],
    slug: "remote-work-trends-managing-distributed-teams",
  },
  {
    id: 5,
    title: "Employee Retention Strategies for 2024",
    excerpt:
      "Learn how to improve employee retention rates and create a workplace culture that attracts and keeps top talent.",
    content: "Full content here...",
    author: "Lisa Thompson",
    date: "2023-12-20",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
    tags: ["Employee Retention", "Workplace Culture", "Talent Management"],
    slug: "employee-retention-strategies-2024",
  },
  {
    id: 6,
    title: "Digital Transformation in HR: A Complete Guide",
    excerpt:
      "Understanding how digital transformation is reshaping HR processes and the benefits of modern HR technology solutions.",
    content: "Full content here...",
    author: "Alex Rodriguez",
    date: "2023-12-15",
    image:
      "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=600&h=400&fit=crop",
    tags: ["Digital Transformation", "HR Technology", "Modern HR"],
    slug: "digital-transformation-hr-complete-guide",
  },
];

// Testimonials data
export const TESTIMONIALS_DATA: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    position: "HR Director, MedTech Solutions",
    role: "HR Director, MedTech Solutions",
    company: "MedTech Solutions",
    quote:
      "AnoraHR transformed our HR processes completely. The recruitment module helped us reduce hiring time by 60%, and the payroll automation eliminated all manual errors. Our team productivity has increased significantly.",
    content:
      "AnoraHR transformed our HR processes completely. The recruitment module helped us reduce hiring time by 60%, and the payroll automation eliminated all manual errors. Our team productivity has increased significantly.",
    avatar:
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    image:
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    rating: 5,
  },
  {
    id: 2,
    name: "Michael Chen",
    position: "CEO, HealthCare Plus",
    role: "CEO, HealthCare Plus",
    company: "HealthCare Plus",
    quote:
      "Working with AnoraHR was a game-changer for our healthcare organization. Their understanding of HR compliance requirements and the intuitive platform helped us streamline operations across 500+ employees.",
    content:
      "Working with AnoraHR was a game-changer for our healthcare organization. Their understanding of HR compliance requirements and the intuitive platform helped us streamline operations across 500+ employees.",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    rating: 5,
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    position: "People Operations Manager, GreenTech Corp",
    role: "People Operations Manager, GreenTech Corp",
    company: "GreenTech Corp",
    quote:
      "The AnoraHR platform perfectly aligns with our company values. The performance management system has revolutionized how we track employee development, and the user experience is outstanding.",
    content:
      "The AnoraHR platform perfectly aligns with our company values. The performance management system has revolutionized how we track employee development, and the user experience is outstanding.",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    rating: 5,
  },
  {
    id: 4,
    name: "David Kim",
    position: "CHRO, FinanceFirst Bank",
    role: "CHRO, FinanceFirst Bank",
    company: "FinanceFirst Bank",
    quote:
      "AnoraHR's payroll and compliance features helped us create a secure and efficient HR system. Their attention to financial regulations and data security was impressive for our banking environment.",
    content:
      "AnoraHR's payroll and compliance features helped us create a secure and efficient HR system. Their attention to financial regulations and data security was impressive for our banking environment.",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    rating: 5,
  },
  {
    id: 5,
    name: "Lisa Thompson",
    position: "Learning & Development Director, EduTech Academy",
    role: "Learning & Development Director, EduTech Academy",
    company: "EduTech Academy",
    quote:
      "The AnoraHR learning management system has revolutionized how we deliver training to our 2000+ employees. The course creation tools and progress tracking are exactly what we needed.",
    content:
      "The AnoraHR learning management system has revolutionized how we deliver training to our 2000+ employees. The course creation tools and progress tracking are exactly what we needed.",
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
    rating: 5,
  },
  {
    id: 6,
    name: "Alex Wilson",
    position: "VP of Human Resources, SmartManufacturing Inc",
    role: "VP of Human Resources, SmartManufacturing Inc",
    company: "SmartManufacturing Inc",
    quote:
      "AnoraHR's talent management expertise helped us create a comprehensive succession planning system. Their innovative approach to HR technology was invaluable to our organization's growth.",
    content:
      "AnoraHR's talent management expertise helped us create a comprehensive succession planning system. Their innovative approach to HR technology was invaluable to our organization's growth.",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    rating: 5,
  },
];

// FAQ data
export const FAQ_DATA: FAQItem[] = [
  {
    id: 1,
    question: "What HR services does AnoraHR offer?",
    answer:
      "We offer comprehensive HR management solutions including recruitment, payroll processing, performance management, leave management, talent management, and e-learning platforms. Our cloud-based system is designed to streamline all HR processes for organizations of any size.",
  },
  {
    id: 2,
    question: "How quickly can we get started with AnoraHR?",
    answer:
      "Implementation typically takes 2-4 weeks depending on your organization's size and requirements. We provide data migration assistance, staff training, and ongoing support to ensure a smooth transition. Our team works closely with your HR department throughout the setup process.",
  },
  {
    id: 3,
    question: "What is your implementation process?",
    answer:
      "Our process includes needs assessment, system configuration, data migration, staff training, testing, and go-live support. We maintain regular communication and provide progress updates throughout each phase to ensure successful implementation.",
  },
  {
    id: 4,
    question: "Do you provide ongoing support and training?",
    answer:
      "Yes, we offer comprehensive support packages including 24/7 technical support, regular system updates, security patches, staff training sessions, and HR best practices consulting. We ensure your HR team can maximize the platform's potential.",
  },
  {
    id: 5,
    question: "Is AnoraHR compliant with local labor laws?",
    answer:
      "Yes, AnoraHR is designed to comply with Nigerian labor laws and regulations. We regularly update our system to reflect changes in legislation and provide compliance reporting tools to help you stay current with legal requirements.",
  },
  {
    id: 6,
    question: "How do you handle data security and privacy?",
    answer:
      "We maintain the highest security standards with encrypted data storage, secure data transmission, regular security audits, and compliance with data protection regulations. Your employee data is protected with enterprise-grade security measures.",
  },
  {
    id: 7,
    question: "What is your pricing structure?",
    answer:
      "Our pricing is subscription-based and scales with your organization size. We offer flexible monthly or annual plans with no setup fees. Pricing depends on the number of employees and selected modules. Contact us for a customized quote.",
  },
  {
    id: 8,
    question: "Do you work with small businesses and startups?",
    answer:
      "Absolutely! We work with organizations of all sizes, from startups with 10 employees to large enterprises with thousands of staff. Our scalable platform grows with your business, and we offer special pricing for small businesses.",
  },
  {
    id: 9,
    question: "Can you integrate with our existing systems?",
    answer:
      "Yes, AnoraHR offers API integrations with popular accounting software, time tracking systems, and other business applications. We can help migrate data from your existing HR systems and ensure seamless integration with your current workflow.",
  },
  {
    id: 10,
    question: "What makes AnoraHR different from other HR platforms?",
    answer:
      "We combine deep HR expertise with modern technology, focus on user experience, provide localized support for Nigerian businesses, and offer comprehensive training. Our platform is designed specifically for African business needs and compliance requirements.",
  },
];

// Social media links
export const SOCIAL_LINKS = {
  facebook: "https://facebook.com/anora-hr",
  twitter: "https://twitter.com/anora-hr",
  linkedin: "https://linkedin.com/company/anora-hr",
  instagram: "https://instagram.com/anora-hr",
  github: "https://github.com/anora-hr",
} as const;

// Contact information
export const CONTACT_INFO = {
  email: "hello@anorahr.com",
  phone: "+234 (0) 812 345 6789",
  address: "Plot 1234, Central Business District, Abuja, FCT, Nigeria",
  locations: {
    abuja: {
      address: "Plot 1234, Central Business District, Abuja, FCT, Nigeria",
      phone: "+234 (0) 812 345 6789",
    },
    adoEkiti: {
      address: "15 Iworoko Road, Ado Ekiti, Ekiti State, Nigeria",
      phone: "+234 (0) 813 456 7890",
    },
  },
} as const;

// Company information
export const COMPANY_INFO = {
  name: "AnoraHR",
  tagline: "Empowering People, Transforming Organizations",
  description:
    "We are a leading HR technology company specializing in comprehensive human resource management solutions, payroll processing, and talent development platforms.",
  founded: 2020,
} as const;

// Chat configuration
export const CHAT_CONFIG = {
  jivoWidgetId: import.meta.env.VITE_JIVO_WIDGET_ID || "f8Fb1u752i",
  enabled: import.meta.env.VITE_JIVO_ENABLED !== "false", // Enabled by default
} as const;
