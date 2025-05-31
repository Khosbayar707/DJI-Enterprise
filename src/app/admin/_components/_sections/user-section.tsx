"use client";
import { useEffect, useState } from "react";
import UserCard from "../_cards/user-card";
import { ContactRequest } from "@/generated/prisma";
import axios from "axios";
import LoadingText from "../loading";
import { CustomContactRequest } from "@/lib/types";

const UserSection = () => {
  const [requests, setRequests] = useState<CustomContactRequest[]>([]);
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/api/users/contact-requests");
        if (res.data.success) {
          setRequests(res.data.data.users);
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
    <div className=" flex flex-col gap-6">
      {loading ? (
        <LoadingText />
      ) : (
        <UserCard requests={requests} setRefresh={setRefresh} />
      )}
    </div>
  );
};

export default UserSection;
