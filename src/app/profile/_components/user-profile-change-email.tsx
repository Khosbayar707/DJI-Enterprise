"use client";
import { CustomUserClient } from "@/lib/types";
import { TextField } from "@mui/material";
import axios from "axios";
import { useState } from "react";

type Props = {
  user: CustomUserClient;
};
const UserProfileChangeEmail = ({ user }: Props) => {
  const [email, setEmail] = useState(user.email);
  const [loading, setLoading] = useState(false);

  const handleChangeEmail = async () => {
    try {
      const res = await axios.post("/api/current-user/change-email", {
        email,
      });
      console.log(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <section className="p-6 border rounded-lg shadow-sm">
      <h2 className="text-xl font-semibold mb-4">📧 И-мэйл солих</h2>
      <div className="space-y-4 flex flex-col gap-2">
        <TextField
          disabled={loading}
          type="email"
          placeholder="Шинэ и-мэйл"
          variant="standard"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <button
          onClick={handleChangeEmail}
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Хадгалах
        </button>
      </div>
    </section>
  );
};

export default UserProfileChangeEmail;
