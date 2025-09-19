export interface NavItem {
  label: string;
  href: string;
}

export interface MegaMenuItem {
  title: string;
  items: {
    label: string;
    href: string;
    description: string;
  }[];
}

export interface Feature {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
}

export interface Testimonial {
  id: number;
  name: string;
  position: string;
  role: string;
  company: string;
  quote: string;
  content: string;
  avatar: string;
  image: string;
  rating: number;
}

export interface CaseStudy {
  id: number;
  title: string;
  description: string;
  image: string;
  tag: string;
  link: string;
}

export interface TeamMember {
  id: number;
  name: string;
  position: string;
  bio: string;
  image: string;
}

export interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  image: string;
  tags: string[];
  slug: string;
}

export interface Service {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  features: string[];
  price?: string;
}