'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import z from 'zod';
import { ResetPasswordStep1Schema } from './utils/reset-password-schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Button, TextField } from '@mui/material';
import { ResponseType } from '@/lib/types';
import { CustomSnackbar } from '@/app/admin/_components/snackbar';
import axios from 'axios';
import { useTheme } from 'next-themes';
import { useRouter } from 'next/navigation';

const ResetPassword = () => {
  const [response, setResponse] = useState<ResponseType>();
  const [loading, setLoading] = useState(false);
  const { theme } = useTheme();
  const router = useRouter();

  const form = useForm<z.infer<typeof ResetPasswordStep1Schema>>({
    resolver: zodResolver(ResetPasswordStep1Schema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof ResetPasswordStep1Schema>) => {
    try {
      setLoading(true);
      const res = await axios.post('/api/auth/reset-password', values);
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
    '& .Mui-disabled': {
      '& .MuiInputLabel-root': {
        color: theme === 'dark' ? '#4b5563' : '#9ca3af',
      },
      '& .MuiInputBase-root': {
        color: theme === 'dark' ? '#6b7280' : '#9ca3af',
      },
      '& .MuiInput-underline:before': {
        borderBottomColor: theme === 'dark' ? '#374151' : '#e5e7eb',
      },
    },
  };

  return (
    <main className="min-h-screen w-full flex items-center justify-center px-4 py-10 sm:py-24 bg-cover bg-center bg-no-repeat">
      <div className="relative w-full max-w-md rounded-md bg-white/90 dark:bg-gray-800/90 backdrop-blur-md shadow-lg dark:shadow-gray-900/30 p-6 sm:p-9 text-sm sm:text-base border border-gray-200 dark:border-gray-700">
        {response && <CustomSnackbar value={response} />}

        <h2 className="text-2xl font-semibold text-center mb-4 text-gray-900 dark:text-gray-100">
          Нууц үгээ сэргээх
        </h2>

        <Form {...form}>
          <form className="flex flex-col gap-4" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm text-gray-700 dark:text-gray-300">Емайл</FormLabel>
                  <FormControl>
                    <TextField
                      fullWidth
                      disabled={response?.success}
                      variant="standard"
                      label="Мэйл хаягаа оруулна уу!"
                      {...field}
                      sx={textFieldStyles}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {response?.message && (
              <div
                className={`text-sm p-3 rounded-md ${
                  response.success
                    ? 'text-green-700 dark:text-green-400 bg-green-50 dark:bg-green-900/20'
                    : 'text-red-700 dark:text-red-400 bg-red-50 dark:bg-red-900/20'
                }`}
              >
                {response.message}
              </div>
            )}

            <Button
              type="submit"
              disabled={!form.formState.isValid || form.formState.isSubmitting || response?.success}
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
              {loading ? 'Түр хүлээнэ үү!' : 'Үргэлжлүүлэх'}
            </Button>
          </form>
        </Form>

        <div className="mt-4 text-center">
          <button
            onClick={() => router.push('/auth/login')}
            className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
          >
            Нэвтрэх хуудас руу буцах
          </button>
        </div>

        <div className="mt-4 text-xs text-center text-gray-500 dark:text-gray-400">
          Бүртгэлтэй имэйл хаягаа оруулна уу. Бид нууц үг сэргээх холбоосыг имэйлээр илгээх болно.
        </div>
      </div>
    </main>
  );
};

export default ResetPassword;
