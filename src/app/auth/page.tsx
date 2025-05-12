"use client";
import { Snackbar } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Auth = () => {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      try {
        const res = await axios.get("/api/auth");
        if (res.data.success) {
          if (res.data.code === "USER") {
            router.push("/");
          } else {
            router.push("/admin");
          }
        } else {
          router.push("/auth/login");
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    checkUser();
  }, [router]);

  return (
    <Snackbar
      open={loading}
      message={"Түр хүлээнэ үү!"}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    />
  );
};
export default Auth;
