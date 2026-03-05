'use client';

import { ResponseType } from '@/lib/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  UserProfileChangePasswordSchema,
  UserProfileChangePasswordSchemaType,
} from '../utils/change-password-schema';
import { Form, FormField } from '@/components/ui/form';
import { CustomSnackbar } from '@/app/admin/_components/snackbar';
import axios from 'axios';

const UserProfileChangePassword = () => {
  const [response, setResponse] = useState<ResponseType>();

  useEffect(() => {
    const timeout = setTimeout(() => {
      setResponse(undefined);
    }, 3000);

    return () => clearTimeout(timeout);
  }, [response]);

  const form = useForm({
    resolver: zodResolver(UserProfileChangePasswordSchema),
    defaultValues: {
      currentPassword: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (values: UserProfileChangePasswordSchemaType) => {
    try {
      const res = await axios.post('/api/auth/current-user/change-password', values);
      setResponse(res.data);
      if (res.data.success) {
        form.reset();
      }
    } catch (Err) {
      console.error(Err);
    }
  };

  return (
    <section className="p-6 border rounded-lg shadow-sm w-full dark:border-gray-700 dark:bg-gray-800 dark:shadow-gray-900/50">
      {response && <CustomSnackbar value={response} />}
      <h2 className="text-xl font-semibold mb-4 dark:text-gray-100">🔐 Нууц үг солих</h2>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 flex flex-col gap-4 w-full"
        >
          <FormField
            control={form.control}
            name="currentPassword"
            render={({ field }) => (
              <TextField
                {...field}
                type="password"
                variant="standard"
                label="Хуучин нууц үг"
                className="w-full"
                sx={{
                  '& .MuiInput-root': {
                    color: 'var(--text-primary)',
                    '&:before': {
                      borderBottomColor: 'var(--border-color)',
                    },
                    '&:hover:not(.Mui-disabled):before': {
                      borderBottomColor: 'var(--border-hover)',
                    },
                    '&.Mui-focused:after': {
                      borderBottomColor: 'var(--primary-color)',
                    },
                  },
                  '& .MuiInput-input': {
                    color: 'var(--text-primary)',
                  },
                  '& .MuiInputLabel-root': {
                    color: 'var(--text-secondary)',
                  },
                  '& .MuiInputLabel-root.Mui-focused': {
                    color: 'var(--primary-color)',
                  },
                  '& .Mui-disabled': {
                    color: 'var(--text-disabled)',
                    WebkitTextFillColor: 'var(--text-disabled)',
                  },
                }}
              />
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <TextField
                {...field}
                type="password"
                variant="standard"
                label="Шинэ нууц үг"
                className="w-full"
                sx={{
                  '& .MuiInput-root': {
                    color: 'var(--text-primary)',
                    '&:before': {
                      borderBottomColor: 'var(--border-color)',
                    },
                    '&:hover:not(.Mui-disabled):before': {
                      borderBottomColor: 'var(--border-hover)',
                    },
                    '&.Mui-focused:after': {
                      borderBottomColor: 'var(--primary-color)',
                    },
                  },
                  '& .MuiInput-input': {
                    color: 'var(--text-primary)',
                  },
                  '& .MuiInputLabel-root': {
                    color: 'var(--text-secondary)',
                  },
                  '& .MuiInputLabel-root.Mui-focused': {
                    color: 'var(--primary-color)',
                  },
                  '& .Mui-disabled': {
                    color: 'var(--text-disabled)',
                    WebkitTextFillColor: 'var(--text-disabled)',
                  },
                }}
              />
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <TextField
                {...field}
                type="password"
                variant="standard"
                label="Шинэ нууц үгээ ахин оруулна уу!"
                className="w-full"
                sx={{
                  '& .MuiInput-root': {
                    color: 'var(--text-primary)',
                    '&:before': {
                      borderBottomColor: 'var(--border-color)',
                    },
                    '&:hover:not(.Mui-disabled):before': {
                      borderBottomColor: 'var(--border-hover)',
                    },
                    '&.Mui-focused:after': {
                      borderBottomColor: 'var(--primary-color)',
                    },
                  },
                  '& .MuiInput-input': {
                    color: 'var(--text-primary)',
                  },
                  '& .MuiInputLabel-root': {
                    color: 'var(--text-secondary)',
                  },
                  '& .MuiInputLabel-root.Mui-focused': {
                    color: 'var(--primary-color)',
                  },
                  '& .Mui-disabled': {
                    color: 'var(--text-disabled)',
                    WebkitTextFillColor: 'var(--text-disabled)',
                  },
                }}
              />
            )}
          />
          <button
            disabled={form.formState.isSubmitting}
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full dark:bg-blue-700 dark:hover:bg-blue-800 dark:disabled:bg-blue-900 dark:disabled:text-gray-300 transition-colors"
          >
            {form.formState.isSubmitting ? 'Түр хүлээнэ үү!' : 'Нууц үг солих'}
          </button>
        </form>
      </Form>

      <style jsx global>{`
        :root {
          --text-primary: #1f2937;
          --text-secondary: #6b7280;
          --text-disabled: #9ca3af;
          --border-color: #d1d5db;
          --border-hover: #9ca3af;
          --primary-color: #3b82f6;
        }

        .dark {
          --text-primary: #f3f4f6;
          --text-secondary: #9ca3af;
          --text-disabled: #6b7280;
          --border-color: #4b5563;
          --border-hover: #6b7280;
          --primary-color: #60a5fa;
        }
      `}</style>
    </section>
  );
};

export default UserProfileChangePassword;
