import {
  Drone,
  DroneAdvantage,
  DroneBuyRequest,
  DroneCategory,
  DroneDescription,
  DroneInTheBox,
  DroneTech,
  GarminProduct,
  DronePayload,
  Image,
  rtkModule,
  Spec,
  SpecCategory,
  SpecDescription,
  User,
  Video,
  Specification,
  SurveyEquipment,
} from '@/generated/prisma';

export type ResponseType = { success: boolean; code: string; message: string; data: any };

export enum AdminSideBarOptions {
  products,
  images,
  DroneBuyRequest,
  ContactRequest,
  InstructionRequest,
}

export enum ProductTabOptions {
  features = 'features',
  specs = 'specs',
  accessories = 'accessories',
  reviews = 'reviews',
}

export enum SpecSideBarOptions {
  GENERAL,
  IMAGES,
  VIDEOS,
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
  rtk: CustomRTK | undefined;
};

export type CustomRTK = rtkModule & { video: Video };

export type CustomSpec = Spec & {
  image: Image[];
  vidoes: Video[];
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

export type CustomDroneBuyRequest = DroneBuyRequest & { drone: Drone; user: User };

export type CustomGarminProduct = GarminProduct & {
  images: Image[];
  specifications: Specification[];
};

export type CustomPayload = DronePayload & {
  images: Image[];
};

export type CustomSurveyEquipment = SurveyEquipment & {
  images: Image[];
  specifications: Specification[];
};

// client side types

export type CustomUserClient = User & { requests: CustomDroneBuyRequestClient[] };

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
  rtk: CustomRTK;
};

export type CustomSpecClient = Spec & {
  image: Image[];
  descriptions: SpecDescription[];
  videos: Video[];
};

export type CustomDroneBuyRequestClient = DroneBuyRequest & { drone: Drone };
