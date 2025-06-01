import { SpecSideBarOptions } from "@/lib/types";
import GeneralSection from "./general-section";
import ImagesSection from "./images-section";
import VideosSection from "./videos-section";

export const SpecSectionComponents: Record<
  SpecSideBarOptions,
  React.ReactNode
> = {
  [SpecSideBarOptions.GENERAL]: <GeneralSection />,
  [SpecSideBarOptions.IMAGES]: <ImagesSection />,
  [SpecSideBarOptions.VIDEOS]: <VideosSection />,
};
