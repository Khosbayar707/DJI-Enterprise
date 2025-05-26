import {
  Drone,
  DroneCategory,
  Image,
  Spec,
  SpecCategory,
  SpecDescription,
  Video,
} from "@/generated/prisma";
import z from "zod";
import { AddCategorySchema } from "./zod-schemas/add-category-schema";

export type ResponseType = {
  success: boolean;
  code: string;
  message: string;
  data: any;
};

export enum AdminSideBarOptions {
  products,
  users,
  orders,
  images,
}

export enum ProductTabOptions {
  features = "features",
  specs = "specs",
  accessories = "accessories",
  reviews = "reviews",
}

export enum SpecSideBarOptions {
  GENERAL,
  IMAGES,
}

export enum DroneSideBarOptions {
  GENERAL,
  IMAGES,
  VIDEOS,
}

export type CustomDrone = Drone & {
  images: Image[];
  videos: Video[];
  specs: Spec[];
  featuredVideo: Video;
  categories: DroneCategory[];
};

export type CustomSpec = Spec & {
  image: Image[];
  drone: Drone;
  specCategories: SpecCategory[];
  SpecDescription: SpecDescription[];
};

export type CustomImage = Image & {
  drone: Drone;
  spec: Spec;
  DroneFeaturedImage: Drone;
  createdAt: string;
  updatedAt: string;
};
