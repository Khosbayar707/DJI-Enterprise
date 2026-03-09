'use client';
import { CustomSnackbar } from '@/app/admin/_components/snackbar';
import { CustomUserClient, ResponseType } from '@/lib/types';
import { TextField } from '@mui/material';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import UserProfileConfirmPassword from '../_components/confirm-password';

type Props = {
  user: CustomUserClient;
  setRefresh: Dispatch<SetStateAction<boolean>>;
};
const UserProfileChangeEmail = ({ user, setRefresh }: Props) => {
  const [email, setEmail] = useState(user.email);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<ResponseType>();

  useEffect(() => {
    const timeout = setTimeout(() => {
      setResponse(undefined);
    }, 3000);

    return () => clearTimeout(timeout);
  }, [response]);

  return (
    <section className="p-6 border rounded-lg shadow-sm w-full dark:border-gray-700 dark:bg-gray-800 dark:shadow-gray-900/50">
      {response && <CustomSnackbar value={response} />}
      <h2 className="text-xl font-semibold mb-4 dark:text-gray-100">📧 И-мэйл солих</h2>
      <div className="flex flex-col gap-4 w-full">
        <TextField
          disabled={loading}
          type="email"
          placeholder="Шинэ и-мэйл"
          variant="standard"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
            '& .MuiInput-placeholder': {
              color: 'var(--text-secondary)',
              opacity: 1,
            },
            '& .Mui-disabled': {
              color: 'var(--text-disabled)',
              WebkitTextFillColor: 'var(--text-disabled)',
            },
          }}
        />
        <UserProfileConfirmPassword
          email={email}
          setRefresh={setRefresh}
          setLoading={setLoading}
          setResponse={setResponse}
          loading={loading}
        />
      </div>

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

export default UserProfileChangeEmail;
