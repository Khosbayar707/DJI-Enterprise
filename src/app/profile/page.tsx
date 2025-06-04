"use client";
import { useEffect, useState } from "react";
import UserProfileChangeEmail from "./_components/user-profile-change-email";
import UserProfileChangePassword from "./_components/user-profile-change-password";
import UserProfileDroneBuyRequests from "./_components/user-profile-drone-buy-requests";
import { DroneBuyRequest, User } from "@/generated/prisma";
import axios from "axios";
import LoadingText from "../_component/LoadingText";
import { CustomUserClient } from "@/lib/types";

const mockUser = {
  email: "adiya@example.com",
};
type CustomUser = User & {
  requests: DroneBuyRequest[];
};
export default function ProfilePage() {
  const [user, setUser] = useState<CustomUserClient>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/api/auth/current-user");
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
  }, []);

  return (
    <main className="max-w-3xl mx-auto px-4 py-10 space-y-10">
      {loading ? (
        <LoadingText />
      ) : user ? (
        <>
          <section className="p-6 border rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4">👤 Хувийн мэдээлэл</h2>
            <p className="text-gray-700">
              <strong>И-мэйл: {user.email}</strong>
            </p>
          </section>
          <UserProfileChangeEmail user={user} />
          <UserProfileChangePassword />
          <UserProfileDroneBuyRequests requests={user.requests} />
        </>
      ) : (
        <div>Хэрэглэгч эхлээд нэвтрэх ёстой!</div>
      )}
    </main>
  );
}
