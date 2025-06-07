'use client';
import { useEffect, useState } from 'react';
import UserProfileChangeEmail from './_featured/user-profile-change-email';
import UserProfileChangePassword from './_featured/user-profile-change-password';
import UserProfileDroneBuyRequests from './_featured/user-profile-drone-buy-requests';
import axios from 'axios';
import { CustomUserClient } from '@/lib/types';
import UserProfileSkeleton from './_components/skeleton';

export default function ProfilePage() {
  const [user, setUser] = useState<CustomUserClient>();
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('/api/auth/current-user');
        if (res.data.success) {
          setUser(res.data.data.user);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [refresh]);

  return (
    <main className="max-w-4xl w-full mx-auto px-4 py-10 space-y-10 flex flex-col">
      {loading ? (
        <UserProfileSkeleton />
      ) : user ? (
        <>
          <section className="p-6 border rounded-lg shadow-sm w-full">
            <h2 className="text-xl font-semibold mb-4">👤 Хувийн мэдээлэл</h2>
            <p className="text-gray-700">
              <strong>И-мэйл: {user.email}</strong>
            </p>
          </section>
          <section className="p-6 border rounded-lg shadow-sm w-full">
            <UserProfileChangeEmail user={user} setRefresh={setRefresh} />
          </section>
          <section className="p-6 border rounded-lg shadow-sm w-full">
            <UserProfileChangePassword />
          </section>
          <section className="p-6 border rounded-lg shadow-sm w-full">
            <UserProfileDroneBuyRequests requests={user.requests} />
          </section>
        </>
      ) : (
        <div>Хэрэглэгч эхлээд нэвтрэх ёстой!</div>
      )}
    </main>
  );
}
