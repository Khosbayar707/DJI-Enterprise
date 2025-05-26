"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Drone, Spec, SpecCategory } from "@/generated/prisma";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import z from "zod";
import { EditSpecGeneralInfo } from "../../utils/editSpecGeneralInfo";
import axios from "axios";
import { Textarea } from "@/components/ui/textarea";
import LoadingText from "@/app/_component/LoadingText";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { CustomSpec, ResponseType } from "@/lib/types";
import { CustomSnackbar } from "@/app/admin/_components/snackbar";
type Props = {
  spec: CustomSpec;
  specCategories: SpecCategory[];
  drones: Drone[];
  id: string;
  waitingCategories: boolean;
  setRefresh: Dispatch<SetStateAction<boolean>>;
};
const SpecInfoCard = ({
  id,
  spec,
  specCategories,
  drones,
  setRefresh,
  waitingCategories,
}: Props) => {
  const [cat, setCat] = useState<SpecCategory[]>(spec.specCategories || []);
  const [drone, setDrone] = useState(spec.droneId || "");
  const [response, setResponse] = useState<ResponseType>();
  const form = useForm<z.infer<typeof EditSpecGeneralInfo>>({
    resolver: zodResolver(EditSpecGeneralInfo),
    defaultValues: {
      name: spec?.name,
      detail: spec?.detail,
    },
    mode: "onChange",
  });

  const onSubmit = async (values: z.infer<typeof EditSpecGeneralInfo>) => {
    try {
      const res = await axios.post("/api/product/specs/change-general-info", {
        ...values,
        cat,
        drone,
        id,
      });
      setResponse(res.data);
      if (res.data.success) {
        setRefresh((prev) => !prev);
      }
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
  }, []);

  return (
    <Card className="shadow-2xl">
      <CardHeader>
        <CardTitle>
          <div className=" flex items-center w-full justify-between">
            <div>Эд анги</div>
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
                name="detail"
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
                      {specCategories.length > 0 ? (
                        specCategories.map((category) => {
                          const isSelected = cat.some(
                            (item) => item.id === category.id
                          );
                          return (
                            <Badge
                              key={category.id}
                              onClick={() => {
                                setCat((prev) => {
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
                      Дрон{" "}
                      <span className=" text-xs text-gray-500 italic">
                        *нэгийг л сонгох боломжтой
                      </span>
                      {drone && (
                        <Button onClick={() => setDrone("")}>Арилгах</Button>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {drones.length > 0 ? (
                        drones.map((model) => {
                          const isSelected = model.id === drone;
                          return (
                            <Badge
                              key={model.id}
                              onClick={() => setDrone(model.id)}
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
export default SpecInfoCard;
