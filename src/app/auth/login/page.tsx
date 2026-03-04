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
import { LoginSchema } from '@/lib/zod-schemas/login-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import z from 'zod';
import { FaGoogle } from 'react-icons/fa';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { ResponseType } from '@/lib/types';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { CustomSnackbar } from '@/app/admin/_components/snackbar';
import GoogleButton from '@/app/_component/google-button';
import { useTheme } from 'next-themes'; // Add this import

const Login = () => {
  const redir = useSearchParams().get('redir');
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<ResponseType>();
  const { theme } = useTheme(); // Add this hook

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof LoginSchema>) => {
    setLoading(true);
    try {
      const res = await axios.post('/api/auth/login', values);
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
    <main className="min-h-screen w-full flex items-start justify-end px-4 py-10 sm:py-24">
      <div className="w-full max-w-md sm:max-w-lg lg:max-w-md rounded-md bg-white/80 dark:bg-gray-800/80 backdrop-blur-md shadow-lg dark:shadow-gray-900/30 p-6 sm:p-9 text-sm sm:text-base mr-0 sm:mr-24 border border-gray-200 dark:border-gray-700">
        {response && <CustomSnackbar value={response} />}
        <div className="flex flex-col items-center gap-6">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">Нэвтрэх</h2>
          <GoogleButton />
          <div className="flex items-center w-full gap-3">
            <div className="flex-1 border-t border-gray-300 dark:border-gray-600"></div>
            <span className="text-xs font-medium text-gray-500 dark:text-gray-400">эсвэл</span>
            <div className="flex-1 border-t border-gray-300 dark:border-gray-600"></div>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4">
              <FormField
                name="email"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm text-gray-700 dark:text-gray-300">
                      Емайл
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="text-sm bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500"
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
                    <FormLabel className="text-sm text-gray-700 dark:text-gray-300">
                      Нууц үг
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="text-sm bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500"
                        {...field}
                        type="password"
                        placeholder="Нууц үгээ оруулна уу!"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-between items-center">
                <Link
                  href="/auth/reset-password"
                  className="text-xs text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
                >
                  Нууц үгээ мартсан уу?
                </Link>
              </div>
              <Button
                type="submit"
                disabled={!form.formState.isValid || form.formState.isSubmitting}
                className={`w-full text-sm cursor-pointer transition-colors ${
                  !form.formState.isValid || form.formState.isSubmitting
                    ? 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                    : 'bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 hover:bg-gray-700 dark:hover:bg-gray-300'
                }`}
              >
                {loading ? 'Түр хүлээнэ үү!' : 'Үргэлжлүүлэх'}
              </Button>
            </form>
          </Form>

          <p className="text-center text-sm text-gray-600 dark:text-gray-400">
            <Link
              className="text-blue-600 dark:text-blue-400 font-medium hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
              href={`/auth/register${redir ? `?redir=` + redir : ``}`}
            >
              Энд дарж
            </Link>{' '}
            бүртгүүлнэ үү!
          </p>
        </div>
      </div>
    </main>
  );
};

export default Login;
