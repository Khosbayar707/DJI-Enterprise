"use client";
import { Snackbar } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";

const AdminLayout = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      try {
        const res = await axios.get("/api/auth");
        if (res.data.success) {
          if (res.data.code === "USER") {
            router.push("/");
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
    <div className="min-h-screen">
      <Snackbar
        open={loading}
        message={"Админы эрхийг шалгаж байна!"}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      />
      {children}
    </div>
  );
};

export default AdminLayout;
