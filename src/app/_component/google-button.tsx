'use client';
import { Button } from '@/components/ui/button';
import { FaGoogle } from 'react-icons/fa';
import { SessionProvider, signIn, signOut, useSession } from 'next-auth/react';

const GoogleButton = () => {
  return (
    <Button
      onClick={() => signIn('google')}
      className="bg-secondary text-foreground hover:bg-foreground hover:text-secondary w-full flex items-center justify-center gap-3 py-2 cursor-pointer"
    >
      <FaGoogle className="text-lg" />
      <span className="text-sm sm:text-base">Google -ээр нэвтрэх</span>
    </Button>
  );
};

export default GoogleButton;
