'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import z from 'zod';
import { ResetPasswordStep2Schema } from '../utils/reset-password-schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Button, TextField } from '@mui/material';
import { ResponseType } from '@/lib/types';
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';
import LoadingText from '@/app/_component/LoadingText';
import { useTheme } from 'next-themes';

const ResetPassword = () => {
  const params = useParams();
  const router = useRouter();
  const { otp } = params as { otp: string };
  const [response, setResponse] = useState<ResponseType>();
  const [response2, setResponse2] = useState<ResponseType>();
  const [loading, setLoading] = useState(true);
  const [changing, setChanging] = useState(false);
  const { theme } = useTheme();

  const form = useForm<z.infer<typeof ResetPasswordStep2Schema>>({
    resolver: zodResolver(ResetPasswordStep2Schema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof ResetPasswordStep2Schema>) => {
    setChanging(true);
    try {
      const res = await axios.patch('/api/auth/reset-password', {
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
        router.push('/auth');
      }, 3000);
    }
    return () => clearTimeout(timeout);
  }, [response2, router]);

  // MUI text field styles for dark mode
  const textFieldStyles = {
    '& .MuiInputLabel-root': {
      color: theme === 'dark' ? '#9ca3af' : '#4b5563',
    },
    '& .MuiInputLabel-root.Mui-focused': {
      color: theme === 'dark' ? '#60a5fa' : '#2563eb',
    },
    '& .MuiInputBase-root': {
      color: theme === 'dark' ? '#e5e7eb' : '#1f2937',
    },
    '& .MuiInput-underline:before': {
      borderBottomColor: theme === 'dark' ? '#4b5563' : '#d1d5db',
    },
    '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
      borderBottomColor: theme === 'dark' ? '#9ca3af' : '#6b7280',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: theme === 'dark' ? '#60a5fa' : '#2563eb',
    },
  };

  return (
    <main className="min-h-screen w-full flex items-center justify-center sm:justify-center px-4 py-10 sm:py-24 bg-cover bg-center bg-no-repeat">
      <div className="relative w-full max-w-md rounded-md bg-white/90 dark:bg-gray-800/90 backdrop-blur-md shadow-lg dark:shadow-gray-900/30 p-6 sm:p-9 text-sm sm:text-base border border-gray-200 dark:border-gray-700">
        <h2 className="text-2xl font-semibold text-center mb-4 text-gray-900 dark:text-gray-100">
          Нууц үгээ сэргээх
        </h2>

        {loading ? (
          <div className="flex justify-center">
            <LoadingText />
          </div>
        ) : !response?.success || response2 ? (
          <div
            className={`text-center text-sm p-4 rounded-md ${
              response2?.success
                ? 'text-green-700 dark:text-green-400 bg-green-50 dark:bg-green-900/20'
                : 'text-red-700 dark:text-red-400 bg-red-50 dark:bg-red-900/20'
            }`}
          >
            {response2?.message ?? response?.message}
          </div>
        ) : (
          <Form {...form}>
            <form className="flex flex-col gap-4" onSubmit={form.handleSubmit(onSubmit)}>
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
                        sx={textFieldStyles}
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
                        sx={textFieldStyles}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                disabled={!form.formState.isValid || form.formState.isSubmitting || changing}
                variant="contained"
                fullWidth
                sx={{
                  backgroundColor: theme === 'dark' ? '#e5e7eb' : '#1f2937',
                  color: theme === 'dark' ? '#1f2937' : '#ffffff',
                  '&:hover': {
                    backgroundColor: theme === 'dark' ? '#d1d5db' : '#374151',
                  },
                  '&:disabled': {
                    backgroundColor: theme === 'dark' ? '#374151' : '#e5e7eb',
                    color: theme === 'dark' ? '#9ca3af' : '#6b7280',
                  },
                  marginTop: '1rem',
                  padding: '0.75rem',
                  textTransform: 'none',
                  fontWeight: 500,
                }}
              >
                {changing ? 'Түр хүлээнэ үү!' : 'Үргэлжлүүлэх'}
              </Button>
            </form>
          </Form>
        )}

        {!loading && !response2?.success && (
          <div className="mt-4 text-center">
            <button
              onClick={() => router.push('/auth/login')}
              className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
            >
              Нэвтрэх хуудас руу буцах
            </button>
          </div>
        )}
      </div>
    </main>
  );
};

export default ResetPassword;
