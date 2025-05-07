"use client";
import { Button } from "@/components/ui/button";
import Snackbar from "@mui/material/Snackbar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LoginSchema } from "@/lib/zod-schemas/login-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import { FaGoogle } from "react-icons/fa";
import axios from "axios";
import { useEffect, useState } from "react";
import { response } from "@/lib/types";
import Link from "next/link";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<response>();
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof LoginSchema>) => {
    setLoading(true);
    try {
      const res = await axios.post("/api/auth/login", values);
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
    <div className="rounded-sm p-18 bg-background sm:fixed min-h-screen sm:w-[450px]  flex flex-col items-center gap-7 justify-center  sm:min-h-auto top-24 right-24">
      <div className=" flex justify-center flex-col gap-5 items-center">
        <div>Нэвтрэх</div>
        <div>
          <Button className={`bg-secondary text-foreground w-full`}>
            <FaGoogle />
            <div>Google -ээр нэвтрэх</div>
          </Button>
        </div>
      </div>
      <Snackbar
        open={!!response}
        message={response?.message}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      />

      <div className="flex justify-between items-center w-full">
        <div className=" border-b w-1/3"></div>
        <div className=" text-xs font-medium">эсвэл</div>
        <div className=" border-b w-1/3"></div>
      </div>
      <div className="flex flex-col items-center gap-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-3">
              <FormField
                name="email"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Емайл</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="email"
                        placeholder="Емайл хаягаа оруулна уу!"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="password"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Нууц үг</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="password"
                        placeholder="Нууц үгээ оруулна уу!"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                disabled={
                  !form.formState.isValid || form.formState.isSubmitting
                }
                className={`bg-secondary text-foreground ${
                  !form.formState.isValid || form.formState.isSubmitting
                    ? "text-foreground cursor-not-allowed"
                    : "bg-foreground text-background cursor-pointer hover:text-foreground hover:bg-secondary"
                }`}
              >
                {loading ? "Түр хүлээнэ үү!" : "Үргэлжлүүлэх"}
              </Button>
              <div>
                <Link className=" text-blue-800" href={"/auth/register"}>
                  Энд дарж
                </Link>{" "}
                бүртгүүлнэ үү!
              </div>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Login;
