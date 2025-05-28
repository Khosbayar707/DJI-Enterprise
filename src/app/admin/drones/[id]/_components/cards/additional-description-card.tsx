"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Button as ButtonShadcn } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { AddDroneDescriptionSchema } from "../../utils/add-drone-description-schema";
import z from "zod";
import { Button, TextField } from "@mui/material";
import PriorityForm from "@/app/_component/priority-form";
import axios from "axios";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { CustomDrone, ResponseType } from "@/lib/types";
import { CustomSnackbar } from "@/app/admin/_components/snackbar";
import { Info } from "lucide-react";
import { motion } from "framer-motion";
import { formatDistanceToNow } from "date-fns";
import { mn } from "date-fns/locale";
import LoadingText from "@/app/_component/LoadingText";

const DroneAdditionalDescriptions = ({
  setRefresh,
  drone,
}: {
  drone: CustomDrone;
  setRefresh: Dispatch<SetStateAction<boolean>>;
}) => {
  const [response, setResponse] = useState<ResponseType>();
  const [deleting, setDeleting] = useState(false);
  const [id, setId] = useState("");
  const form = useForm<z.infer<typeof AddDroneDescriptionSchema>>({
    resolver: zodResolver(AddDroneDescriptionSchema),
    defaultValues: {
      highlight: "",
      description: "",
      priority: 5,
    },
  });

  const onSubmit = async (
    values: z.infer<typeof AddDroneDescriptionSchema>
  ) => {
    try {
      const res = await axios.post(
        "/api/product/drones/additional-descriptions",
        { ...values, id: drone.id }
      );
      setResponse(res.data);
      if (res.data.success) {
        setRefresh((prev) => !prev);
        form.reset();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    setDeleting(true);
    try {
      const res = await axios.delete(
        `/api/product/drones/additional-descriptions?id=${id}`
      );
      setResponse(res.data);
      if (res.data.success) {
        setRefresh((prev) => !prev);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setDeleting(false);
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setResponse(undefined);
    }, 3000);
    return () => clearTimeout(timeout);
  }, [response]);

  return (
    <Card className="shadow-2xl">
      {response && <CustomSnackbar value={response} />}
      <CardHeader>
        <CardTitle>
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-2 text-xl font-semibold">
              <Info className="w-5 h-5 text-blue-600" />
              Нэмэлт тайлбарууд
            </div>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-6 p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <FormField
                control={form.control}
                name="highlight"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <TextField
                        variant="standard"
                        label="Гарчиг"
                        fullWidth
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
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
                        variant="standard"
                        label="Инфо"
                        fullWidth
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <PriorityForm form={form} />
            </div>
            <div className="w-full md:w-auto">
              <Button
                disabled={form.formState.isSubmitting}
                type="submit"
                variant="contained"
                className="w-full"
              >
                {form.formState.isSubmitting ? <LoadingText /> : "Нэмэх"}
              </Button>
            </div>
          </form>
        </Form>

        {drone.descriptions.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {drone.descriptions.map((description) => (
              <motion.div
                key={description.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="border shadow-sm hover:shadow-md transition-all relative">
                  <ButtonShadcn
                    onClick={() => {
                      handleDelete(description.id);
                      setId(description.id);
                    }}
                    disabled={deleting}
                    className="bg-background text-foreground  hover:bg-foreground hover:text-background flex text-xs absolute top-1 right-1 cursor-pointer"
                  >
                    {deleting && id === description.id ? (
                      <LoadingText />
                    ) : (
                      "Устгах"
                    )}
                  </ButtonShadcn>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-semibold text-gray-800">
                      {description.highlight}
                    </CardTitle>
                    <span
                      className={`text-xs font-medium px-2 py-1 rounded w-max mt-1
                          ${
                            description.priority < 3
                              ? "bg-red-100 text-red-600"
                              : description.priority < 6
                                ? "bg-yellow-100 text-yellow-700"
                                : "bg-green-100 text-green-700"
                          }
                        `}
                    >
                      Priority {description.priority}
                    </span>
                  </CardHeader>
                  <CardContent className="text-sm text-gray-700">
                    <p>{description.description}</p>
                    <p className="mt-2 text-xs text-gray-400">
                      Үүсгэсэн:{" "}
                      {formatDistanceToNow(new Date(description.createdAt), {
                        addSuffix: true,
                        locale: mn,
                      })}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center text-gray-400 gap-2 py-8">
            <Info className="w-8 h-8" />
            <p>Тайлбар алга</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DroneAdditionalDescriptions;
