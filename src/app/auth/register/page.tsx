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
import { useTheme } from 'next-themes';

const Register = () => {
  const redir = useSearchParams().get('redir');
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<ResponseType>();
  const { theme } = useTheme();

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
    <main className="min-h-screen w-full flex items-start justify-center sm:justify-end px-4 py-10 sm:py-24 bg-cover bg-center bg-no-repeat">
      <div className="relative w-full max-w-md rounded-md bg-white/90 dark:bg-gray-800/90 backdrop-blur-md shadow-lg dark:shadow-gray-900/30 p-6 sm:p-9 text-xs sm:text-sm mr-0 sm:mr-24 border border-gray-200 dark:border-gray-700">
        {response && <CustomSnackbar value={response} />}
        <div className="flex justify-center flex-col items-center gap-6">
          <div className="text-2xl font-semibold text-center text-gray-900 dark:text-gray-100">
            Бүртгүүлэх
          </div>
          <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4">
              <FormField
                name="email"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-light text-gray-700 dark:text-gray-300">
                      Емайл
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="text-xs sm:text-sm bg-white/90 dark:bg-gray-900/90 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 backdrop-blur-sm"
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
                    <FormLabel className="font-light text-gray-700 dark:text-gray-300">
                      Нууц үг
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="text-xs sm:text-sm bg-white/90 dark:bg-gray-900/90 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 backdrop-blur-sm"
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
                    <FormLabel className="font-light text-gray-700 dark:text-gray-300">
                      Нууц үгээ ахин оруулна уу!
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="text-xs sm:text-sm bg-white/90 dark:bg-gray-900/90 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 backdrop-blur-sm"
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
                      <Checkbox
                        {...field}
                        sx={{
                          color: theme === 'dark' ? '#9ca3af' : '#4b5563',
                          '&.Mui-checked': {
                            color: theme === 'dark' ? '#60a5fa' : '#2563eb',
                          },
                        }}
                      />
                    </FormControl>
                    <FormLabel className="text-xs font-light text-gray-600 dark:text-gray-400">
                      Энд дарж шинэ мэдээлэл цаг тухайд нь аваарай!
                    </FormLabel>
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                disabled={!form.formState.isValid || form.formState.isSubmitting}
                className={`w-full text-xs sm:text-sm transition-colors ${
                  !form.formState.isValid || form.formState.isSubmitting
                    ? 'bg-gray-200/90 dark:bg-gray-700/90 text-gray-500 dark:text-gray-400 cursor-not-allowed backdrop-blur-sm'
                    : 'bg-gray-900/90 dark:bg-gray-100/90 text-white dark:text-gray-900 hover:bg-gray-700 dark:hover:bg-gray-300 backdrop-blur-sm cursor-pointer'
                }`}
              >
                {loading ? 'Түр хүлээнэ үү!' : 'Үргэлжлүүлэх'}
              </Button>
            </form>
          </Form>

          <div className="text-center text-gray-600 dark:text-gray-400">
            Бүртгэлтэй хэрэглэгч{' '}
            <Link
              className="text-blue-600 dark:text-blue-400 font-medium hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
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
