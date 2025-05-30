import {
  ContactRequest,
  Drone,
  DroneAdvantage,
  DroneCategory,
  DroneDescription,
  DroneInTheBox,
  DroneTech,
  Image,
  Spec,
  SpecCategory,
  SpecDescription,
  User,
  Video,
} from "@/generated/prisma";

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
  descriptions: DroneDescription[];
  tech: DroneTech;
  inTheBox: DroneInTheBox[];
  advantages: DroneAdvantage[];
};

export type CustomSpec = Spec & {
  image: Image[];
  drone: Drone;
  specCategories: SpecCategory[];
  descriptions: SpecDescription[];
};

export type CustomImage = Image & {
  drone: Drone;
  spec: Spec;
  DroneFeaturedImage: Drone;
  createdAt: string;
  updatedAt: string;
};

export type CustomContactRequest = ContactRequest & {
  drone: Drone;
  user: User;
};

// client side types

export type CustomDroneClient = Drone & {
  images: Image[];
  videos: Video[];
  specs: CustomSpecClient[];
  featuredVideo: Video;
  categories: DroneCategory[];
  descriptions: DroneDescription[];
  advantages: DroneAdvantage[];
  tech: DroneTech;
  inTheBox: DroneInTheBox[];
};

export type CustomSpecClient = Spec & {
  image: Image[];
  descriptions: SpecDescription[];
};
