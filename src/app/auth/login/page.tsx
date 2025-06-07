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

const Login = () => {
  const redir = useSearchParams().get('redir');
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<ResponseType>();

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
      <div className="w-full max-w-md sm:max-w-lg lg:max-w-md rounded-md bg-white/80 backdrop-blur-md shadow-lg p-6 sm:p-9 text-sm sm:text-base mr-0 sm:mr-24">
        {response && <CustomSnackbar value={response} />}
        <div className="flex flex-col items-center gap-6">
          <h2 className="text-2xl font-semibold">Нэвтрэх</h2>
          <GoogleButton />
          <div className="flex items-center w-full gap-3">
            <div className="flex-1 border-t border-border"></div>
            <span className="text-xs font-medium text-muted-foreground">эсвэл</span>
            <div className="flex-1 border-t border-border"></div>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4">
              <FormField
                name="email"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm">Емайл</FormLabel>
                    <FormControl>
                      <Input
                        className="text-sm"
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
                    <FormLabel className="text-sm">Нууц үг</FormLabel>
                    <FormControl>
                      <Input
                        className="text-sm"
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
                <Link href="/auth/reset-password" className="text-xs text-gray-500">
                  Нууц үгээ мартсан уу?
                </Link>
              </div>
              <Button
                type="submit"
                disabled={!form.formState.isValid || form.formState.isSubmitting}
                className={`w-full text-sm cursor-pointer ${
                  !form.formState.isValid || form.formState.isSubmitting
                    ? 'bg-secondary text-foreground cursor-not-allowed'
                    : 'bg-foreground text-background hover:bg-secondary hover:text-foreground'
                }`}
              >
                {loading ? 'Түр хүлээнэ үү!' : 'Үргэлжлүүлэх'}
              </Button>
            </form>
          </Form>

          <p className="text-center text-sm">
            <Link
              className="text-blue-800 font-medium"
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
