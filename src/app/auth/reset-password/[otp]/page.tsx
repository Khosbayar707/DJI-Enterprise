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
  const { otp } = params;
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
  }, []);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (response2?.success) {
      timeout = setTimeout(() => {
        router.push("/auth");
      }, 3000);
    }
    return () => clearTimeout(timeout);
  }, [response2]);
  return (
    <div className=" flex justify-center min-h-screen items-center">
      <div className=" p-10 bg-background w-1/5 flex flex-col gap-5">
        <div className=" text-2xl">Нууц үгээ сэргээх</div>{" "}
        {loading ? (
          <LoadingText />
        ) : !response?.success || response2 ? (
          <div
            className={`${response2?.success ? "text-green-500" : "text-red-500"}`}
          >
            {response2?.message ?? response?.message}
          </div>
        ) : (
          <Form {...form}>
            <form
              className=" flex flex-col gap-2"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <FormField
                name="password"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <TextField
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
                disabled={
                  !form.formState.isValid || form.formState.isSubmitting
                }
                className="w-full"
                type="submit"
              >
                {changing ? "Түр хүлээнэ үү!" : "Үргэлжлүүлэх"}
              </Button>
            </form>
          </Form>
        )}
      </div>
    </div>
  );
};
export default ResetPassword;
