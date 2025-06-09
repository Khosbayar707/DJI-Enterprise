import MediaCleanUp from '../_cards/clean-media-card';
import ImageCard from '../_cards/image-card';
import VideoCard from '../_cards/video-card';

const MediaSection = () => {
  return (
    <div className=" flex flex-col gap-6">
      <MediaCleanUp />
      <ImageCard />
      <VideoCard />
    </div>
  );
};
export default MediaSection;
