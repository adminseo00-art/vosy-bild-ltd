export interface Review {
  id: string;
  author: string;
  rating: number; // 1-5
  title: string;
  content: string;
  date: string;
  isVerified: boolean;
  reply?: {
    author: string;
    content: string;
    date: string;
  };
}

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  serviceType: string;
  dimensions?: number; // m2
  materialClass?: 'standard' | 'premium' | 'luxury';
  estimatedCost?: number;
  message: string;
  status: 'Received' | 'In Progress' | 'Estimated' | 'Contacted';
  date: string;
}

export interface Service {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  iconName: string; // Lucide icon identifier
  startingPrice: string;
  features: string[];
  galleryImages: string[];
}

export interface Project {
  id: string;
  title: string;
  category: string;
  location: string;
  description: string;
  completionDate: string;
  imageUrl: string;
  specs: { label: string; value: string }[];
}
