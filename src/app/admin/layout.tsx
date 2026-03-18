'use client';

import { Snackbar } from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { ReactNode, useEffect, useState } from 'react';

const AdminLayout = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const html = document.documentElement;
    const wasDark = html.classList.contains('dark');
    if (wasDark) {
      html.setAttribute('data-was-dark', 'true');
    }

    html.classList.remove('dark');
    html.setAttribute('data-admin', 'true');

    const checkUser = async () => {
      try {
        await axios.get('/api/auth/refresh-token');
        const res = await axios.get('/api/auth');
        if (res.data.success) {
          if (res.data.code === 'USER') {
            router.push('/');
          }
        } else {
          router.push('/auth/login');
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    checkUser();

    return () => {
      html.removeAttribute('data-admin');

      if (html.getAttribute('data-was-dark') === 'true') {
        html.classList.add('dark');
      }
      html.removeAttribute('data-was-dark');
    };
  }, [router]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Snackbar
        open={loading}
        message={'Админы эрхийг шалгаж байна!'}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      />
      {children}
    </div>
  );
};

export default AdminLayout;
