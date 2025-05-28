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
import { AddNewSchema } from "@/lib/zod-schemas/add-new-spec-schema";
import PriorityForm from "@/app/_component/priority-form";

const AddSpecDialog = ({
  refresh,
  setRefresh,
}: {
  refresh: boolean;
  setRefresh: Dispatch<SetStateAction<boolean>>;
}) => {
  const [response, setResponse] = useState<ResponseType>();
  const form = useForm<z.infer<typeof AddNewSchema>>({
    resolver: zodResolver(AddNewSchema),
    defaultValues: {
      name: "",
      detail: "",
      priority: 0,
    },
    mode: "onChange",
  });

  const onSubmit = async (values: z.infer<typeof AddNewSchema>) => {
    try {
      const res = await axios.post("/api/product/specs", values);
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
        <Button variant="contained">Эд анги нэмэх</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Шинэ эд анги нэмэх хэсэг</DialogTitle>
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
                        label="Эд ангийн нэр"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="detail"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Эд ангийн талаар</FormLabel>
                    <FormControl>
                      <Textarea rows={50} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <PriorityForm form={form} />
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
export default AddSpecDialog;
