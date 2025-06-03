"use client";
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
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { GrUploadOption } from "react-icons/gr";

type Props = {
  setRefresh: Dispatch<SetStateAction<boolean>>;
  id: string;
};
const ImageUploadAccordion = ({ setRefresh, id }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [progress, setProgress] = useState(0);
  const [ImagePreview, setImagePreview] = useState<string[]>([]);
  const [publicIds, setPublicIds] = useState<string[]>([]);
  const [response, setResponse] = useState<ResponseType>();
  const [imageUploading, setImageUploading] = useState(false);

  const imageUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    setImageUploading(true);
    try {
      const files = Array.from(event.target.files);
      const response1 = await axios.get(
        `/api/auth/cloudinary-sign?folder=Smartwatch/Images`
      );
      if (!response1.data.success) {
        setResponse(response1.data);
        return;
      }
      const { timestamp, signature, api_key } = response1.data.data;

      const uploadedImageUrls: string[] = [];
      const uploadedImagePublicIds: string[] = [];

      for (const file of files) {
        const data = new FormData();
        data.append("file", file);
        data.append("timestamp", timestamp.toString());
        data.append("signature", signature);
        data.append("api_key", api_key);
        data.append("resource_type", "image");
        data.append("folder", "Smartwatch/Images");

        const response2 = await axios.post(
          `https://api.cloudinary.com/v1_1/doluiuzq8/image/upload`,
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
          uploadedImageUrls.push(response2.data.secure_url);
          uploadedImagePublicIds.push(response2.data.public_id);
        }
      }
      setImagePreview(uploadedImageUrls);
      setPublicIds(uploadedImagePublicIds);
    } catch (err) {
      console.error(err, "server error");
    } finally {
      setImageUploading(false);
    }
  };

  const handleSubmit = async () => {
    try {
      setImageUploading(true);
      const res = await axios.post("/api/garmins/garmin/image", {
        url: ImagePreview,
        public_id: publicIds,
        id,
      });
      if (res.data.success) {
        setImagePreview([]);
        setPublicIds([]);
        setRefresh((p) => !p);
      }
      setResponse(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setImageUploading(false);
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
        <AccordionTrigger className=" cursor-pointer">
          Зураг оруулах
        </AccordionTrigger>
        <AccordionContent>
          <div className="flex flex-col items-center justify-center gap-4 py-6 bg-secondary p-7">
            <div
              onClick={() => inputRef.current?.click()}
              className="w-full max-w-md h-40 cursor-pointer rounded-2xl border-2 border-dashed border-gray-300 hover:border-blue-500 bg-white hover:bg-blue-50 flex flex-col items-center justify-center transition-all"
            >
              <GrUploadOption className="text-4xl text-gray-500 hover:text-blue-500" />
              <p className="mt-2 text-sm text-gray-600">
                Энд дарж зураг оруулна уу!
              </p>
            </div>
            <p className="text-xs text-gray-500">
              Зөвшөөрөгдөх өргөтгөлүүд: .jpg, .jpeg, .png
            </p>

            {progress > 0 && (
              <div className="w-full max-w-md">
                <div className="mb-1 text-sm text-gray-700 font-medium">
                  Оруулж байна... {progress}%
                </div>
                <LinearDeterminate progress={progress} />
              </div>
            )}

            {ImagePreview.length > 0 && (
              <div className="w-full flex flex-wrap justify-center gap-4 mt-4">
                {ImagePreview.map((preview) => (
                  <div
                    key={preview}
                    className="relative w-48 h-48 rounded-lg overflow-hidden shadow-sm border border-gray-200"
                  >
                    <Image
                      alt="Preview"
                      src={preview}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
            <Button
              disabled={imageUploading}
              onClick={handleSubmit}
              className=" w-full"
            >
              {imageUploading ? <LoadingText /> : "Нэмэх"}
            </Button>
            <input
              ref={inputRef}
              onChange={imageUpload}
              accept="image/jpg, image/png, image/jpeg"
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

export default ImageUploadAccordion;
