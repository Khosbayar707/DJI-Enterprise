export interface Drone {
  id: string;
  name: string;
  price: number;
  discount?: number;
  stock: number;
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
  price: number;
  description: string;
  image: string;
}

export interface GarminProduct {
  id: string;
  name: string;
  category: string;
  type: 'SMARTWATCH' | 'GPS';
  price: number;
  discountPrice?: number;
  featured: boolean;
  description: string;
  features: string[];
  isNew: boolean;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  stock: number;
  createdAt: Date;
  updatedAt: Date;
  images: { url: string; public_id: string }[];
  specifications: { id: string; label: string; value: string }[];
}

export interface DronePayload {
  id: string;
  name: string;
  price: number;
  type:
    | 'ZENMUSE'
    | 'LIDAR'
    | 'SPEAKER'
    | 'SPOTLIGHT'
    | 'TETHER'
    | 'OTHER'
    | 'PROGRAM'
    | 'PAYLOAD_AND_CAMERA';
  description: string;
  features: string[];
  images: { url: string; public_id: string }[];
  stock: number;
  createdAt: Date;
  updatedAt: Date;
}

export type LoanProvider = { name: string; description: string; logo: string; link: string };
