export interface Drone {
  id: string;
  name: string;
  price: string;
  discountPrice?: string;
  mainImage: string;
  images: string[];
  description: string;
  features: string[];
  specifications: Record<string, string>;
  videoUrl: string;
  accessories: string[];
}

export interface Product {
  id: string;
  name: string;
  price: string;
  description: string;
  image: string;
}

export interface BreadcrumbItem {
  label: string;
  href: string;
}

export interface ContactInfoItemProps {
  icon: React.ReactNode;
  title: string;
  items: string[];
}

export interface GarminProduct {
  id: string;
  name: string;
  category: string;
  price: number;
  discountPrice?: number;
  description: string;
  specifications: { label: string; value: string }[];
  images: string[];
  features: string[];
  isNew?: boolean;
  rating: number;
  reviewCount: number;
  inStock: boolean;
}
