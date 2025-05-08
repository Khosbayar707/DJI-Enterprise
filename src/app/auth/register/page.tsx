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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import axios from "axios";
import { useEffect, useState } from "react";
import { response } from "@/lib/types";
import { RegisterSchema } from "@/lib/zod-schemas/register-schema";
import { Checkbox } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Login = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<response>();
  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      sub_news: false,
    },
  });

  const onSubmit = async (values: z.infer<typeof RegisterSchema>) => {
    setLoading(true);
    try {
      const res = await axios.post("/api/auth/register", values);
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
    <div className=" text-xs sm:text-sm rounded-sm p-18 bg-background sm:fixed sm:w-[450px] shadow-4xl min-h-screen flex flex-col items-center gap-7 justify-center  sm:min-h-auto sm:top-24 sm:right-24">
      <Snackbar
        open={!!response}
        message={response?.message}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      />
      <div className="flex justify-center flex-col items-center gap-6 shadow-2xl p-12 sm:shadow-none sm:p-4 sm:whitespace-nowrap">
        <div className="text-2xl font-semibold text-center">Бүртгүүлэх</div>
        <div className="w-full border-t border-border"></div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-4">
              <FormField
                name="email"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-light">Емайл</FormLabel>
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
                    <FormLabel className="font-light">Нууц үг</FormLabel>
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
              <FormField
                name="confirmPassword"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-light">
                      Нууц үгээ ахин оруулна уу!
                    </FormLabel>
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
              <FormField
                name="sub_news"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="flex items-center space-x-2">
                    <FormControl>
                      <Checkbox {...field} />
                    </FormControl>
                    <FormLabel className="text-xs font-light">
                      Энд дарж шинэ мэдээлэл цаг тухайд нь аваарай!
                    </FormLabel>
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                disabled={
                  !form.formState.isValid || form.formState.isSubmitting
                }
                className={`bg-secondary text-foreground text-xs sm:text-sm w-full ${
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
        <div>
          Бүртгэлтэй хэрэглэгч{" "}
          <Link className=" text-blue-800" href={"/auth/login"}>
            энд дарна
          </Link>{" "}
          уу!
        </div>
      </div>
    </div>
  );
};

export default Login;
