'use client';

import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { ImSpinner10 } from 'react-icons/im';
import { motion } from 'framer-motion';

export default function SignOutRedirect() {
  const router = useRouter();

  useEffect(() => {
    const timeout = setTimeout(() => {
      signOut();
      router.replace('/auth');
    }, 3000);

    return () => clearTimeout(timeout);
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-zinc-900">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center p-8 rounded-xl shadow-lg bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700"
      >
        <h1 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
          Бүртгэлгүй эсвэл идэвхигүй болсон хаяг байна
        </h1>
        <div className="flex items-center justify-center gap-2 text-green-700 dark:text-green-400">
          <ImSpinner10 className="text-2xl animate-spin" />
        </div>
      </motion.div>
    </div>
  );
}
