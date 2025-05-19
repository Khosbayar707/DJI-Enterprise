import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Video } from "@/generated/prisma";
import { Dispatch, SetStateAction } from "react";

type Props = {
  video: Video;
  setRefresh: Dispatch<SetStateAction<boolean>>;
};

const VideosCard = ({ video, setRefresh }: Props) => {
  return (
    <Dialog>
      <DialogTrigger>
        <div className="p-2">
          <div className="flex gap-4 rounded-lg border bg-white p-4 shadow-sm transition-all hover:bg-gray-50 cursor-pointer">
            <div className="relative w-128 h-64 overflow-hidden rounded-md border border-gray-200 shrink-0">
              <video
                src={video.url}
                className="w-full h-full object-cover"
                controls
                aria-label={`Видео: ${video.name}`}
              />
            </div>
            <div className="flex flex-col justify-around text-sm w-full">
              <div className="flex flex-col gap-2">
                <p className="text-gray-800 font-medium">
                  🏷️ <span className="font-semibold">Нэр:</span> {video.name}
                </p>
                <p className="text-gray-600 whitespace-pre-wrap">
                  📄 <span className="font-semibold">Дэлгэрэнгүй:</span>{" "}
                  {video.detail}
                </p>
              </div>

              <div className="mt-4 text-xs text-gray-400">
                <p>
                  Нэмэгдсэн: {new Date(video.createdAt).toLocaleString("mn-MN")}
                </p>
                <p>
                  Засагдсан: {new Date(video.updatedAt).toLocaleString("mn-MN")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>{video.name}</DialogTitle>
        <div>asdfasd</div>
      </DialogContent>
    </Dialog>
  );
};

export default VideosCard;
