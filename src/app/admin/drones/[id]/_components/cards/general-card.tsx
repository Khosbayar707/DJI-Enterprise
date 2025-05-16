"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, FormControl, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { EditDroneGeneralInfo } from "../../utils/edit-drone-form";
import { CustomDrone, ResponseType } from "@/lib/types";
import { Form, FormField, FormItem, FormLabel } from "@/components/ui/form";
import z from "zod";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import LoadingText from "@/app/_component/LoadingText";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { CustomSnackbar } from "@/app/admin/_components/snackbar";
import { DroneCategory, DroneModel, Spec } from "@/generated/prisma";
import { Badge } from "@/components/ui/badge";

type Props = {
  drone: CustomDrone | undefined;
  droneCategories: DroneCategory[];
  specs: Spec[];
  droneModels: DroneModel[];
  waitingCategories: boolean;
};
const DroneInfoCard = ({
  drone,
  droneCategories,
  droneModels,
  waitingCategories,
  specs,
}: Props) => {
  const [response, setResponse] = useState<ResponseType>();
  const [cat1, setcat1] = useState<DroneCategory[]>(drone?.categories || []);
  const [cat2, setcat2] = useState<Spec[]>(drone?.specs || []);
  const [currentModel, setModel] = useState(drone?.modelId || "");
  const params = useParams();
  const { id } = params;
  const form = useForm<z.infer<typeof EditDroneGeneralInfo>>({
    resolver: zodResolver(EditDroneGeneralInfo),
    defaultValues: {
      name: drone?.name,
      description: drone?.description,
    },
    mode: "onChange",
  });

  const onSubmit = async (values: z.infer<typeof EditDroneGeneralInfo>) => {
    try {
      const res = await axios.post("/api/product/drones/change-general-info", {
        ...values,
        id,
        cat1,
        cat2,
        currentModel,
      });
      setResponse(res.data);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.error(err.response?.data || err.message);
      } else {
        console.error(err);
      }
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setResponse(undefined);
    }, 5000);
    return () => clearTimeout(timeout);
  }, [response]);

  return (
    <Card className="shadow-2xl">
      <CardHeader>
        <CardTitle>
          <div className=" flex items-center w-full justify-between">
            <div>Дрон</div>
          </div>
        </CardTitle>
      </CardHeader>
      {response && <CustomSnackbar value={response} />}
      <CardContent className=" flex flex-col gap-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className=" flex flex-col gap-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <TextField
                        variant="standard"
                        label="Дроны нэр"
                        {...field}
                        type="text"
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
                    <FormLabel>Дроны тухай дэлгэрэнгүй мэдээлэл</FormLabel>
                    <FormControl>
                      <Textarea {...field} rows={50} />
                    </FormControl>
                  </FormItem>
                )}
              />
              {waitingCategories ? (
                <LoadingText />
              ) : (
                <div className=" flex flex-col gap-4">
                  <div className=" flex flex-col gap-3">
                    <div>
                      Категори
                      <span className=" text-xs text-gray-500 italic">
                        *олныг сонгох боломжтой
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {droneCategories.length > 0 ? (
                        droneCategories.map((category) => {
                          const isSelected = cat1.some(
                            (item) => item.id === category.id
                          );
                          return (
                            <Badge
                              key={category.id}
                              onClick={() => {
                                setcat1((prev) => {
                                  const exists = prev.some(
                                    (item) => item.id === category.id
                                  );
                                  if (exists) {
                                    return prev.filter(
                                      (item) => item.id !== category.id
                                    );
                                  } else {
                                    return [...prev, category];
                                  }
                                });
                              }}
                              className={`text-xs cursor-pointer transition-all duration-200 ${
                                isSelected
                                  ? "bg-green-600 text-white"
                                  : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                              }`}
                            >
                              {category.name}
                            </Badge>
                          );
                        })
                      ) : (
                        <div>Категори алга</div>
                      )}
                    </div>
                  </div>
                  <div className=" flex flex-col gap-3">
                    <div>
                      Модел{" "}
                      <span className=" text-xs text-gray-500 italic">
                        *нэгийг л сонгох боломжтой
                      </span>
                      <Button onClick={() => setModel("")}>Арилгах</Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {droneModels.length > 0 ? (
                        droneModels.map((model) => {
                          const isSelected = model.id === currentModel;
                          return (
                            <Badge
                              key={model.id}
                              onClick={() => setModel(model.id)}
                              className={`text-xs cursor-pointer transition-all duration-200 ${
                                isSelected
                                  ? "bg-purple-600 text-white"
                                  : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                              }`}
                            >
                              {model.name}
                            </Badge>
                          );
                        })
                      ) : (
                        <div>Модел алга</div>
                      )}
                    </div>
                  </div>
                  <div className=" flex flex-col gap-3">
                    <div>
                      Эд ангиуд{" "}
                      <span className=" text-xs text-gray-500 italic">
                        *олныг сонгох боломжтой
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {specs.length > 0 ? (
                        specs.map((spec) => {
                          const isSelected = cat2.some(
                            (item) => item.id === spec.id
                          );
                          return (
                            <Badge
                              onClick={() => {
                                setcat2((prev) => {
                                  const exists = prev.some(
                                    (item) => item.id === spec.id
                                  );
                                  if (exists) {
                                    return prev.filter(
                                      (item) => item.id !== spec.id
                                    );
                                  } else {
                                    return [...prev, spec];
                                  }
                                });
                              }}
                              key={spec.id}
                              className={`text-xs cursor-pointer transition-all duration-200 ${
                                isSelected
                                  ? "bg-blue-600 text-white"
                                  : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                              }`}
                            >
                              {spec.name}: {spec.detail}
                            </Badge>
                          );
                        })
                      ) : (
                        <div>Категори алга</div>
                      )}
                    </div>
                  </div>
                </div>
              )}
              <Button
                type="submit"
                className=" w-full"
                disabled={
                  !form.formState.isValid || form.formState.isSubmitting
                }
              >
                {form.formState.isSubmitting ? <LoadingText /> : "Өөрчлөх"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
export default DroneInfoCard;
