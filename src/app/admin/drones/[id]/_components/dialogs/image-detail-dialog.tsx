"use client";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CustomImage } from "@/lib/types";
import Image from "next/image";
import { TextField, Button, FormControl } from "@mui/material";
import { useForm } from "react-hook-form";
import z from "zod";
import { EditDroneImageDetailSchema } from "../../utils/edit-drone-image-detail-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField, FormItem } from "@/components/ui/form";
import axios from "axios";
import { Dispatch, SetStateAction } from "react";

type Props = {
  image: CustomImage;
  id: string;
  setRefresh: Dispatch<SetStateAction<boolean>>;
};

const ImageDetailDialog = ({ image, setRefresh }: Props) => {
  const form = useForm<z.infer<typeof EditDroneImageDetailSchema>>({
    resolver: zodResolver(EditDroneImageDetailSchema),
    defaultValues: {
      name: image.name || "",
      description: image.description || "",
    },
  });

  const onSubmit = async (
    values: z.infer<typeof EditDroneImageDetailSchema>
  ) => {
    const res = await axios.patch("/api/product/drones/image", {
      ...values,
      id: image.id,
    });
    if (res.data.success) {
      setRefresh((prev) => !prev);
    }
    console.log(res.data);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="bg-white hover:bg-gray-50 p-4 rounded-lg border shadow-sm cursor-pointer transition-all flex gap-4 items-start">
          <div className="relative w-32 h-32 rounded-md overflow-hidden border border-gray-200">
            <Image
              src={image.url ?? "/auth/banner.webp"}
              alt="drone image"
              fill
              className="object-cover"
            />
          </div>
          <div className="flex flex-col justify-between gap-1 text-sm">
            <p className="text-gray-800 font-medium">
              🏷️ <span className="font-semibold">Нэр:</span> {image.name}
            </p>
            <p className="text-gray-600">
              📄 <span className="font-semibold">Дэлгэрэнгүй:</span>{" "}
              {image.description}
            </p>
            <p className="text-gray-400 text-xs mt-2">
              Нэмэгдсэн: {new Date(image.createdAt).toLocaleString("mn-MN")}
            </p>
            <p className="text-gray-400 text-xs">
              Засагдсан: {new Date(image.updatedAt).toLocaleString("mn-MN")}
            </p>
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogTitle className="mb-4 text-lg font-semibold">
          Зургийн мэдээлэл засах
        </DialogTitle>
        <div className="flex flex-col items-center gap-4">
          <div className="relative w-64 h-64 rounded-lg overflow-hidden border shadow">
            <Image
              src={image.url ?? "/auth/banner.webp"}
              alt="Drone Image Preview"
              fill
              className="object-cover"
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
                    name="description"
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
                  <Button
                    className=" w-full"
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="small"
                  >
                    Хадгалах
                  </Button>
                </div>
              </form>
            </Form>
            <div className="text-xs text-gray-500 space-y-1">
              <p>
                📅 <span className="font-medium">Үүсгэсэн:</span>{" "}
                {new Date(image.createdAt).toLocaleString("mn-MN")}
              </p>
              <p>
                🔄 <span className="font-medium">Шинэчилсэн:</span>{" "}
                {new Date(image.updatedAt).toLocaleString("mn-MN")}
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ImageDetailDialog;
