export type ProjectCategory = 
  | 'All'
  | 'Business Website'
  | 'Booking Website'
  | 'Restaurant'
  | 'Real Estate'
  | 'E-commerce'
  | 'Dashboard UI';

export interface Project {
  id: string;
  title: string;
  category: Exclude<ProjectCategory, 'All'>;
  description: string;
  tags: string[];
  thumbnail: string;
  previewVideoUrl?: string;
  liveDemoUrl: string;
  githubUrl?: string;
  problem: string;
  solution: string;
  features: string[];
  screenshots: string[];
  client: string;
  duration: string;
  impactMetrics?: { label: string; value: string }[];
}

export interface Service {
  id: string;
  title: string;
  description: string;
  iconName: string;
  highlights: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  businessType: string;
  rating: number;
  quote: string;
  avatar: string;
  location: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  price: string;
  subtitle: string;
  features: string[];
  isRecommended: boolean;
  serviceCategory: string;
  turnaroundTime: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}
