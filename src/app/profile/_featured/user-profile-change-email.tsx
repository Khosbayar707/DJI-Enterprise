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
    <section className="p-6 border rounded-lg shadow-sm w-full">
      {response && <CustomSnackbar value={response} />}
      <h2 className="text-xl font-semibold mb-4">📧 И-мэйл солих</h2>
      <div className="flex flex-col gap-4 w-full">
        <TextField
          disabled={loading}
          type="email"
          placeholder="Шинэ и-мэйл"
          variant="standard"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full"
        />
        <UserProfileConfirmPassword
          email={email}
          setRefresh={setRefresh}
          setLoading={setLoading}
          setResponse={setResponse}
          loading={loading}
        />
      </div>
    </section>
  );
};

export default UserProfileChangeEmail;
