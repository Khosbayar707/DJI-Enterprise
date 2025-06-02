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

  useEffect(() => {
    const timeout = setTimeout(() => {
      setResponse(undefined);
    }, 5000);
    return () => clearTimeout(timeout);
  }, [response]);

  return (
    <main className="min-h-screen w-full flex items-center justify-center px-4 py-10 sm:py-24">
      <div className="w-full max-w-md rounded-md bg-white/80 backdrop-blur-md shadow-lg p-6 sm:p-9 text-sm sm:text-base">
        {response && <CustomSnackbar value={response} />}
        <h2 className="text-2xl font-semibold text-center mb-4">
          Нууц үгээ сэргээх
        </h2>
        <Form {...form}>
          <form
            className="flex flex-col gap-4"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm">Емайл</FormLabel>
                  <FormControl>
                    <TextField
                      fullWidth
                      disabled={response?.success}
                      variant="standard"
                      label="Мэйл хаягаа оруулна уу!"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {response?.message && (
              <div
                className={`text-sm ${
                  response.success ? "text-green-600" : "text-red-600"
                }`}
              >
                {response.message}
              </div>
            )}

            <Button
              type="submit"
              disabled={
                !form.formState.isValid ||
                form.formState.isSubmitting ||
                response?.success
              }
              variant="contained"
              fullWidth
            >
              {loading ? "Түр хүлээнэ үү!" : "Үргэлжлүүлэх"}
            </Button>
          </form>
        </Form>
      </div>
    </main>
  );
};

export default ResetPassword;
