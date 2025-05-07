"use client";
import { useRouter } from "next/navigation";

const Auth = () => {
  const router = useRouter();
  router.push("/auth/login");
};
export default Auth;
