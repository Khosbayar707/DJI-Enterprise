import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Video } from "@/generated/prisma";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { EditDroneVideoDetailSchema } from "../../utils/edit-drone-video-detail-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import LoadingText from "@/app/_component/LoadingText";
import axios from "axios";
import { CustomSnackbar } from "@/app/admin/_components/snackbar";
import { ResponseType } from "@/lib/types";
type Props = {
  video: Video;
  setRefresh: Dispatch<SetStateAction<boolean>>;
};

const VideosCard = ({ video, setRefresh }: Props) => {
  const [waiting, setWaiting] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [deletingVideo, setDeletingVideo] = useState(false);
  const [response, setResponse] = useState<ResponseType>();

  const form = useForm<z.infer<typeof EditDroneVideoDetailSchema>>({
    resolver: zodResolver(EditDroneVideoDetailSchema),
    defaultValues: {
      name: video.name || "",
      detail: video.detail || "",
      priority: video.priority || 0,
    },
  });

  const onSubmit = async (
    values: z.infer<typeof EditDroneVideoDetailSchema>
  ) => {
    setWaiting(true);
    try {
      const res = await axios.patch("/api/product/drones/videos", {
        ...values,
        id: video.id,
      });
      setResponse(res.data);
      if (res.data.success) {
        setRefresh((prev) => !prev);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setWaiting(false);
    }
  };

  const handleDeleteVideo = async () => {
    try {
      setDeletingVideo(true);
      const res = await axios.delete(`/api/product/videos?id=${video.id}`);
      setResponse(res.data);
      if (res.data.success) {
        setRefresh((prev) => !prev);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setDeletingVideo(false);
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setConfirm(false);
      setResponse(undefined);
    }, 5000);
    return () => clearTimeout(timeout);
  }, [confirm, response]);

  return (
    <Dialog>
      <DialogTrigger>
        <div className="p-2">
          {response && <CustomSnackbar value={response} />}
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
        <div className="flex flex-col items-center gap-4">
          <div className="relative w-64 h-32 xl:w-128 xl:h-64 overflow-hidden rounded-md border border-gray-200 shrink-0">
            <video
              src={video.url}
              className="w-full h-full object-cover"
              controls
              aria-label={`Видео: ${video.name}`}
            />
          </div>
          <div className="w-full flex flex-col gap-4">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className=" flex flex-col gap-3">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <TextField
                            {...field}
                            label="Нэр"
                            variant="standard"
                            fullWidth
                            size="small"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="detail"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <TextField
                            {...field}
                            label="Дэлгэрэнгүй"
                            variant="standard"
                            fullWidth
                            size="small"
                            multiline
                            rows={3}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="priority"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Хэр чухал вэ?{" "}
                          <span className="text-xs italic">
                            *их тоотой нь хамгийн эхэнд харагдана
                          </span>
                        </FormLabel>
                        <FormControl>
                          <RadioGroup
                            {...field}
                            row
                            value={field.value || 0}
                            onChange={(e) =>
                              field.onChange(Number(e.target.value))
                            }
                            className=" flex justify-center gap-4"
                          >
                            {[0, 1, 2, 3, 4, 5].map((val) => (
                              <FormControlLabel
                                key={val}
                                label={val.toString()}
                                value={val}
                                control={<Radio color="primary" />}
                              />
                            ))}
                          </RadioGroup>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <Button
                    disabled={!form.formState.isValid || waiting}
                    className=" w-full"
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="small"
                  >
                    {waiting ? <LoadingText /> : "Хадгалах"}
                  </Button>
                </div>
              </form>
            </Form>
            <div className="text-xs text-gray-500 space-y-1 flex justify-between">
              <div>
                <p>
                  📅 <span className="font-medium">Үүсгэсэн:</span>{" "}
                  {new Date(video.createdAt).toLocaleString("mn-MN")}
                </p>
                <p>
                  🔄 <span className="font-medium">Шинэчилсэн:</span>{" "}
                  {new Date(video.updatedAt).toLocaleString("mn-MN")}
                </p>
              </div>
              <div>
                {confirm ? (
                  <Button color="warning" onClick={handleDeleteVideo}>
                    {deletingVideo ? <LoadingText /> : "Баталгаажуулах!"}
                  </Button>
                ) : (
                  <Button onClick={() => setConfirm(true)} color="warning">
                    {deletingVideo ? <LoadingText /> : "Устгах"}
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default VideosCard;
