"use client";
import { useEffect, useState } from "react";
import ContactRequestCard from "../_cards/contact-request";
import { ContactRequest } from "@/generated/prisma";
import axios from "axios";
import LoadingText from "../loading";

const ContactRequestSection = () => {
  const [requests, setRequests] = useState<ContactRequest[]>([]);
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/api/users/contact-request");
        if (res.data.success) {
          setRequests(res.data.data.requests);
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
        <ContactRequestCard requests={requests} setRefresh={setRefresh} />
      )}
    </div>
  );
};

export default ContactRequestSection;
