import LinearDeterminate from '@/app/_component/LinearProgress';
import LoadingText from '@/app/_component/LoadingText';
import { CustomSnackbar } from '@/app/admin/_components/snackbar';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { ResponseType } from '@/lib/types';
import { Button } from '@mui/material';
import axios from 'axios';
import { ChangeEvent, Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { GrUploadOption } from 'react-icons/gr';

type Props = {
  id: string;
  setRefresh: Dispatch<SetStateAction<boolean>>;
};
const VideoUploadAccordion = ({ id, setRefresh }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [progress, setProgress] = useState(0);
  const [VideoPreview, setVideoPreview] = useState<string>();
  const [publicId, setPublicId] = useState<string>();
  const [response, setResponse] = useState<ResponseType>();
  const [VideoUploading, setVideoUploading] = useState(false);

  const MAX_VIDEO_SIZE = 100 * 1024 * 1024;

  const VideoUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || event.target.files.length === 0) return;

    const file = event.target.files[0];
    const isMP4 = file.type === 'video/mp4';
    const isUnderSizeLimit = file.size <= MAX_VIDEO_SIZE;

    if (!isMP4) {
      setResponse({
        success: false,
        code: '',
        message: 'Зөвхөн .mp4 өргөтгөлтэй бичлэг зөвшөөрнө.',
        data: null,
      });
      return;
    }

    if (!isUnderSizeLimit) {
      setResponse({
        success: false,
        code: '',
        message: 'Бичлэгийн хэмжээ 100MB-с бага байх ёстой!',
        data: null,
      });
      return;
    }

    setVideoUploading(true);
    try {
      const response1 = await axios.get(`/api/auth/cloudinary-sign?folder=Specs/Videos`);
      if (!response1.data.success) return;

      const { timestamp, signature, api_key } = response1.data.data;

      const data = new FormData();
      data.append('file', file);
      data.append('timestamp', timestamp.toString());
      data.append('signature', signature);
      data.append('api_key', api_key);
      data.append('resource_type', 'video');
      data.append('folder', 'Specs/Videos');

      const response2 = await axios.post(
        `https://api.cloudinary.com/v1_1/doluiuzq8/video/upload`,
        data,
        {
          onUploadProgress: (progressEvent) => {
            if (progressEvent.total) {
              const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
              setProgress(percent);
            }
          },
        }
      );

      if (response2.data) {
        setVideoPreview(response2.data.secure_url);
        setPublicId(response2.data.public_id);
      }
    } catch (err) {
      console.error(err, 'Upload error');
      setResponse({
        success: false,
        code: '',
        message: 'Сервер дээр алдаа гарлаа!',
        data: null,
      });
    } finally {
      setVideoUploading(false);
    }
  };

  const handleSubmit = async () => {
    try {
      setVideoUploading(true);
      const res = await axios.post('/api/product/specs/videos', {
        VideoPreview,
        publicId,
        id,
      });
      if (res.data.success) {
        setVideoPreview('');
        setPublicId('');
        setRefresh((p) => !p);
      }
      setResponse(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setVideoUploading(false);
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setResponse(undefined);
    }, 5000);
    return () => clearTimeout(timeout);
  }, [response]);

  return (
    <Accordion type="multiple">
      {response && <CustomSnackbar value={response} />}
      <AccordionItem key={`imageUpload`} value="imageupload">
        <AccordionTrigger className=" cursor-pointer">Бичлэг оруулах</AccordionTrigger>
        <AccordionContent>
          <div className="flex flex-col items-center justify-center gap-4 py-6 bg-secondary p-7">
            <div
              onClick={() => inputRef.current?.click()}
              onKeyDown={(e) => e.key === 'Enter' && inputRef.current?.click()}
              role="button"
              tabIndex={0}
              className="w-full max-w-md h-40 cursor-pointer rounded-2xl border-2 border-dashed border-gray-300 hover:border-blue-500 bg-white hover:bg-blue-50 flex flex-col items-center justify-center transition-all"
            >
              <GrUploadOption className="text-4xl text-gray-500 hover:text-blue-500" />
              <p className="mt-2 text-sm text-gray-600">Энд дарж бичлэг оруулна уу!</p>
            </div>

            <p className="text-xs text-gray-500">Зөвшөөрөгдөх өргөтгөлүүд: .mp4</p>

            {progress > 0 && (
              <div className="w-full max-w-md">
                <div className="mb-1 text-sm text-gray-700 font-medium">
                  Оруулж байна... {progress}%
                </div>
                <LinearDeterminate progress={progress} />
              </div>
            )}
            {VideoPreview && (
              <video
                src={VideoPreview}
                controls
                className="relative w-128 h-64 rounded-lg overflow-hidden shadow-sm border border-gray-200"
              >
                <track kind="captions" srcLang="mn" label="Mongolian captions" />
              </video>
            )}

            <Button disabled={VideoUploading} onClick={handleSubmit} className=" w-full">
              {VideoUploading ? <LoadingText /> : 'Нэмэх'}
            </Button>
            <input
              ref={inputRef}
              onChange={VideoUpload}
              accept="video/mp4"
              type="file"
              className="hidden"
            />
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default VideoUploadAccordion;
