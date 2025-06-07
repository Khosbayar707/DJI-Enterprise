'use client';
import { Dispatch, SetStateAction } from 'react';
import LoadingText from '@/app/_component/LoadingText';
import ImageDetailDialog from '../dialogs/image-detail-dialog';
import ImageUploadAccordion from '../accordions/image-upload-accordian';
import { CustomImage } from '@/lib/types';

type Props = {
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  images: CustomImage[];
  refresh: boolean;
  setRefresh: Dispatch<SetStateAction<boolean>>;
  id: string;
};

const ImagesCard = ({ loading, images, setRefresh, id }: Props) => {
  return (
    <div>
      <div className=" flex justify-center">
        <ImageUploadAccordion id={id} setRefresh={setRefresh} />
      </div>

      <div className=" ">
        <div className="  flex flex-col w-full gap-4">
          {loading ? (
            <LoadingText />
          ) : images.length > 0 ? (
            images.map((image) => (
              <ImageDetailDialog key={image.id} image={image} id={id} setRefresh={setRefresh} />
            ))
          ) : (
            <div>Зураг алга</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImagesCard;
