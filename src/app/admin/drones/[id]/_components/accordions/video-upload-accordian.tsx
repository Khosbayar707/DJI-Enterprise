import LinearDeterminate from "@/app/_component/LinearProgress";
import LoadingText from "@/app/_component/LoadingText";
import { CustomSnackbar } from "@/app/admin/_components/snackbar";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ResponseType } from "@/lib/types";
import { Button } from "@mui/material";
import axios from "axios";
import Image from "next/image";
import { ChangeEvent, Dispatch, SetStateAction, useRef, useState } from "react";
import { GrUploadOption } from "react-icons/gr";

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

  const VideoUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    setVideoUploading(true);
    try {
      const file = event.target.files[0];
      const response1 = await axios.get(
        `/api/auth/cloudinary-sign?folder=Drone/Videos`
      );
      if (!response1.data.success) {
        return;
      }
      const { timestamp, signature, api_key } = response1.data.data;

      const data = new FormData();
      data.append("file", file);
      data.append("timestamp", timestamp.toString());
      data.append("signature", signature);
      data.append("api_key", api_key);
      data.append("resource_type", "video");
      data.append("folder", "Drone/Videos");

      const response2 = await axios.post(
        `https://api.cloudinary.com/v1_1/doluiuzq8/video/upload`,
        data,
        {
          onUploadProgress: (progress) => {
            if (progress.total) {
              const percent = Math.round(
                (progress.loaded * 100) / progress.total
              );
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
      console.error(err, "server error");
    } finally {
      setVideoUploading(false);
    }
  };

  const handleSubmit = async () => {
    try {
      setVideoUploading(true);
      const res = await axios.post("/api/product/drones/videos", {
        VideoPreview,
        publicId,
        id,
      });
      if (res.data.success) {
        setVideoPreview("");
        setPublicId("");
        setRefresh((p) => !p);
      }
      setResponse(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setVideoUploading(false);
    }
  };

  return (
    <Accordion type="multiple">
      {response && <CustomSnackbar value={response} />}
      <AccordionItem key={`imageUpload`} value="imageupload">
        <AccordionTrigger className=" cursor-pointer">
          Бичлэг оруулах
        </AccordionTrigger>
        <AccordionContent>
          <div className="flex flex-col items-center justify-center gap-4 py-6 bg-secondary p-7">
            <div
              onClick={() => inputRef.current?.click()}
              className="w-full max-w-md h-40 cursor-pointer rounded-2xl border-2 border-dashed border-gray-300 hover:border-blue-500 bg-white hover:bg-blue-50 flex flex-col items-center justify-center transition-all"
            >
              <GrUploadOption className="text-4xl text-gray-500 hover:text-blue-500" />
              <p className="mt-2 text-sm text-gray-600">
                Энд дарж бичлэг оруулна уу!
              </p>
            </div>
            <p className="text-xs text-gray-500">
              Зөвшөөрөгдөх өргөтгөлүүд: .mp4
            </p>

            {progress > 0 && (
              <div className="w-full max-w-md">
                <div className="mb-1 text-sm text-gray-700 font-medium">
                  Оруулж байна... {progress}%
                </div>
                <LinearDeterminate progress={progress} />
              </div>
            )}
            {VideoPreview && (
              <video className="relative w-48 h-48 rounded-lg overflow-hidden shadow-sm border border-gray-200"></video>
            )}

            <Button
              disabled={VideoUploading}
              onClick={handleSubmit}
              className=" w-full"
            >
              {VideoUploading ? <LoadingText /> : "Нэмэх"}
            </Button>
            <input
              ref={inputRef}
              onChange={VideoUpload}
              accept="video/mp4"
              type="file"
              multiple
              className="hidden"
            />
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default VideoUploadAccordion;
