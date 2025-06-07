'use client';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import z from 'zod';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { ResponseType } from '@/lib/types';
import { RegisterSchema } from '@/lib/zod-schemas/register-schema';
import { Checkbox } from '@mui/material';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { CustomSnackbar } from '@/app/admin/_components/snackbar';

const Register = () => {
  const redir = useSearchParams().get('redir');
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<ResponseType>();

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
      sub_news: false,
    },
  });

  const onSubmit = async (values: z.infer<typeof RegisterSchema>) => {
    setLoading(true);
    try {
      const res = await axios.post('/api/auth/register', values);
      setResponse(res.data);
      if (res.data.success) {
        router.push(`${redir ? redir : `/auth`}`);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const checkUser = async () => {
      try {
        const res = await axios.get('/api/auth');
        if (res.data.success) {
          router.push(`${redir ? redir : `/auth`}`);
        }
      } catch (err) {
        console.error(err);
      }
    };
    checkUser();
  }, [router, redir]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setResponse(undefined);
    }, 5000);
    return () => clearTimeout(timeout);
  }, [response]);

  return (
    <main className="min-h-screen w-full flex items-start justify-center sm:justify-end px-4 py-10 sm:py-24">
      <div className="w-full max-w-md rounded-md bg-white/80 backdrop-blur-md shadow-lg p-6 sm:p-9 text-xs sm:text-sm mr-0 sm:mr-24">
        {response && <CustomSnackbar value={response} />}
        <div className="flex justify-center flex-col items-center gap-6">
          <div className="text-2xl font-semibold text-center">Бүртгүүлэх</div>
          <div className="w-full border-t border-border"></div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4">
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
                    <FormLabel className="font-light">Нууц үгээ ахин оруулна уу!</FormLabel>
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
                disabled={!form.formState.isValid || form.formState.isSubmitting}
                className={`bg-secondary text-foreground text-xs sm:text-sm w-full ${
                  !form.formState.isValid || form.formState.isSubmitting
                    ? 'text-foreground cursor-not-allowed'
                    : 'bg-foreground text-background cursor-pointer hover:text-foreground hover:bg-secondary'
                }`}
              >
                {loading ? 'Түр хүлээнэ үү!' : 'Үргэлжлүүлэх'}
              </Button>
            </form>
          </Form>
          <div className="text-center">
            Бүртгэлтэй хэрэглэгч{' '}
            <Link
              className="text-blue-800 font-medium"
              href={`/auth/login${redir ? `?redir=` + redir : ``}`}
            >
              энд дарна
            </Link>{' '}
            уу!
          </div>
        </div>
      </div>
    </main>
  );
};

export default Register;
