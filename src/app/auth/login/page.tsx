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
import { ResponseType } from "@/lib/types";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CustomSnackbar } from "@/app/admin/_components/snackbar";

const Login = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<ResponseType>();
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
      if (res.data.success) {
        router.push("/auth");
      }
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
    <div className="rounded-sm p-9 text-xs sm:text-sm bg-background sm:fixed min-h-screen sm:w-[450px] shadow-4xl flex flex-col items-center gap-7 justify-center z-51  sm:min-h-auto sm:top-24 sm:right-24">
      {response && <CustomSnackbar value={response} />}
      <div className="flex flex-col items-center gap-6 justify-center shadow-2xl p-10 sm:shadow-none sm:p-0 w-full">
        <div className="flex flex-col gap-4">
          <div className=" flex flex-col justify-center  gap-5 items-center">
            <div className="text-2xl">Нэвтрэх</div>
            <div className=" border-b w-full"></div>
            <div>
              <Button className="bg-secondary text-foreground hover:bg-foreground hover:text-secondary w-full flex items-center justify-center gap-3 py-2 cursor-pointer">
                <FaGoogle className="text-lg" />
                <span className="text-sm sm:text-base">
                  Google -ээр нэвтрэх
                </span>
              </Button>
            </div>
          </div>
          <div className="flex items-center w-full gap-3">
            <div className="flex-1 border-t border-border"></div>
            <span className="text-xs font-medium text-muted-foreground">
              эсвэл
            </span>
            <div className="flex-1 border-t border-border"></div>
          </div>
        </div>
        <div className="flex flex-col gap-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-4">
                <FormField
                  name="email"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs sm:text-sm">
                        Емайл
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="text-xs sm:text-sm"
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
                      <div className=" flex justify-between items-end">
                        <FormLabel className="text-xs sm:text-sm">
                          Нууц үг
                        </FormLabel>
                        <Link
                          href={`/auth/reset-password`}
                          className=" text-xs text-gray-500"
                        >
                          Нууц үгээ мартсан уу?
                        </Link>
                      </div>
                      <FormControl>
                        <Input
                          className="text-xs sm:text-sm"
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
                  className={`bg-secondary text-foreground text-xs sm:text-sm ${
                    !form.formState.isValid || form.formState.isSubmitting
                      ? "text-foreground cursor-not-allowed"
                      : "bg-foreground text-background cursor-pointer hover:text-foreground hover:bg-secondary"
                  }`}
                >
                  {loading ? "Түр хүлээнэ үү!" : "Үргэлжлүүлэх"}
                </Button>
              </div>
            </form>
          </Form>
        </div>
        <div>
          <Link className=" text-blue-800" href={"/auth/register"}>
            Энд дарж
          </Link>{" "}
          бүртгүүлнэ үү!
        </div>
      </div>
    </div>
  );
};

export default Login;
