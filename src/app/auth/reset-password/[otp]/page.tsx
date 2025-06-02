"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { ResetPasswordStep2Schema } from "../utils/reset-password-schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Button, TextField } from "@mui/material";
import { ResponseType } from "@/lib/types";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import LoadingText from "@/app/_component/LoadingText";

const ResetPassword = () => {
  const params = useParams();
  const router = useRouter();
  const { otp } = params as { otp: string };
  const [response, setResponse] = useState<ResponseType>();
  const [response2, setResponse2] = useState<ResponseType>();
  const [loading, setLoading] = useState(true);
  const [changing, setChanging] = useState(false);

  const form = useForm<z.infer<typeof ResetPasswordStep2Schema>>({
    resolver: zodResolver(ResetPasswordStep2Schema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof ResetPasswordStep2Schema>) => {
    setChanging(true);
    try {
      const res = await axios.patch("/api/auth/reset-password", {
        password: values.password,
        otp,
      });
      setResponse2(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setChanging(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/api/auth/reset-password?otp=${otp}`);
        setResponse(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [otp]);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (response2?.success) {
      timeout = setTimeout(() => {
        router.push("/auth");
      }, 3000);
    }
    return () => clearTimeout(timeout);
  }, [response2, router]);

  return (
    <main className="min-h-screen w-full flex items-center justify-center sm:justify-center px-4 py-10 sm:py-24">
      <div className="w-full max-w-md rounded-md bg-white/80 backdrop-blur-md shadow-lg p-6 sm:p-9 text-sm sm:text-base mr-0 sm:mr-24">
        <h2 className="text-2xl font-semibold text-center mb-4">
          Нууц үгээ сэргээх
        </h2>

        {loading ? (
          <LoadingText />
        ) : !response?.success || response2 ? (
          <div
            className={`text-center text-sm ${
              response2?.success ? "text-green-600" : "text-red-600"
            }`}
          >
            {response2?.message ?? response?.message}
          </div>
        ) : (
          <Form {...form}>
            <form
              className="flex flex-col gap-4"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <FormField
                name="password"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <TextField
                        fullWidth
                        type="password"
                        variant="standard"
                        label="Нууц үгээ оруулна уу!"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="confirmPassword"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <TextField
                        fullWidth
                        type="password"
                        variant="standard"
                        label="Нууц үгээ ахин оруулна уу!"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                disabled={
                  !form.formState.isValid ||
                  form.formState.isSubmitting ||
                  changing
                }
                variant="contained"
                fullWidth
              >
                {changing ? "Түр хүлээнэ үү!" : "Үргэлжлүүлэх"}
              </Button>
            </form>
          </Form>
        )}
      </div>
    </main>
  );
};

export default ResetPassword;
