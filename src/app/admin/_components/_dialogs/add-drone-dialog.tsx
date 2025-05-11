"use client";
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
  FormMessage,
} from "@/components/ui/form";
import { AddDroneSchema } from "@/lib/zod-schemas/add-drone-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import z from "zod";
import LoadingText from "../loading";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { ResponseType } from "@/lib/types";
import { CustomSnackbar } from "../snackbar";

const AddDroneDialog = ({
  refresh,
  setRefresh,
}: {
  refresh: boolean;
  setRefresh: Dispatch<SetStateAction<boolean>>;
}) => {
  const [response, setResponse] = useState<ResponseType>();
  const form = useForm<z.infer<typeof AddDroneSchema>>({
    resolver: zodResolver(AddDroneSchema),
    defaultValues: {
      name: "",
      description: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (values: z.infer<typeof AddDroneSchema>) => {
    try {
      const res = await axios.post("/api/product/drones", values);
      if (res.data) {
        setResponse(res.data);
        form.reset();
        setRefresh(!refresh);
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
  }, [response]);

  return (
    <Dialog>
      {response && <CustomSnackbar value={response} />}
      <DialogTrigger asChild>
        <Button variant="contained">Бүтээгдэхүүн нэмэх</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Шинэ бүтээгдэхүүн нэмэх хэсэг</DialogTitle>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-4">
              <FormField
                name="name"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <TextField
                        {...field}
                        color={form.formState.isValid ? "primary" : "error"}
                        variant="standard"
                        label="Бүтээгдэхүүны нэр"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="description"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Бүтээгдэхүүны талаар</FormLabel>
                    <FormControl>
                      <Textarea {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                disabled={
                  !form.formState.isValid || form.formState.isSubmitting
                }
                type="submit"
                className=" w-full"
              >
                {form.formState.isSubmitting ? <LoadingText /> : "Нэмэх"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
export default AddDroneDialog;
