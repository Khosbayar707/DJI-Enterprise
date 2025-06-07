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
    <section className="p-6 border rounded-lg shadow-sm w-full">
      {response && <CustomSnackbar value={response} />}
      <h2 className="text-xl font-semibold mb-4">🔐 Нууц үг солих</h2>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 flex flex-col gap-4 w-full"
        >
          <FormField
            disabled={form.formState.isSubmitting}
            control={form.control}
            name="currentPassword"
            render={({ field }) => (
              <TextField
                {...field}
                type="password"
                variant="standard"
                label="Хуучин нууц үг"
                className="w-full"
              />
            )}
          />
          <FormField
            disabled={form.formState.isSubmitting}
            control={form.control}
            name="password"
            render={({ field }) => (
              <TextField
                {...field}
                type="password"
                variant="standard"
                label="Шинэ нууц үг"
                className="w-full"
              />
            )}
          />
          <FormField
            disabled={form.formState.isSubmitting}
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <TextField
                {...field}
                type="password"
                variant="standard"
                label="Шинэ нууц үгээ ахин оруулна уу!"
                className="w-full"
              />
            )}
          />
          <button
            disabled={form.formState.isSubmitting}
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
          >
            {form.formState.isSubmitting ? 'Түр хүлээнэ үү!' : 'Нууц үг солих'}
          </button>
        </form>
      </Form>
    </section>
  );
};

export default UserProfileChangePassword;
