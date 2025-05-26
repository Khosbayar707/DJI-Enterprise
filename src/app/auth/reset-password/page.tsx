"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { ResetPasswordStep1Schema } from "./utils/reset-password-schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button, TextField } from "@mui/material";
import { ResponseType } from "@/lib/types";
import { CustomSnackbar } from "@/app/admin/_components/snackbar";
import axios from "axios";

const ResetPassword = () => {
  const [response, setResponse] = useState<ResponseType>();
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof ResetPasswordStep1Schema>>({
    resolver: zodResolver(ResetPasswordStep1Schema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof ResetPasswordStep1Schema>) => {
    try {
      setLoading(true);
      const res = await axios.post("/api/auth/reset-password", values);
      setResponse(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" flex justify-center min-h-screen items-center">
      <div className=" p-10 bg-background w-1/5 flex flex-col gap-5">
        <div className=" text-2xl">Нууц үгээ сэргээх</div>

        <Form {...form}>
          <form
            className=" flex flex-col gap-2"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <TextField
                      disabled={response?.success}
                      variant="standard"
                      label="Майл хаягаа оруулна уу!"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div
              className={`${response?.success ? "text-green-500" : "text-red-500"}`}
            >
              {response?.message && response?.message}
            </div>
            <Button
              disabled={
                !form.formState.isValid ||
                form.formState.isSubmitting ||
                response?.success
              }
              className="w-full"
              type="submit"
            >
              {loading ? "Түр хүлээнэ үү!" : "Үргэлжлүүлэх"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};
export default ResetPassword;
