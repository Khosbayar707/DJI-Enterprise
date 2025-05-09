import { Drone, Image, Spec, Video } from "@/generated/prisma";
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
  categories,
}
export type CustomDrone = Drone & {
  images: Image[];
  videos: Video[];
  specs: Spec[];
  featuredVideo: Video;
};
