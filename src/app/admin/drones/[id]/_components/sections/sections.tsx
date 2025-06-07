import { DroneSideBarOptions } from '@/lib/types';
import GeneralSection from './general-section';
import ImagesSection from './images-section';
import VideosSection from './videos-section';

export const DroneSectionComponents: Record<DroneSideBarOptions, React.ReactNode> = {
  [DroneSideBarOptions.GENERAL]: <GeneralSection />,
  [DroneSideBarOptions.IMAGES]: <ImagesSection />,
  [DroneSideBarOptions.VIDEOS]: <VideosSection />,
};
