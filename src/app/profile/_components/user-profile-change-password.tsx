"use client";

import { useState } from "react";

const UserProfileChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  return (
    <section className="p-6 border rounded-lg shadow-sm">
      <h2 className="text-xl font-semibold mb-4">🔐 Нууц үг солих</h2>
      <div className="space-y-4">
        <input
          type="password"
          placeholder="Хуучин нууц үг"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <input
          type="password"
          placeholder="Шинэ нууц үг"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <button
          onClick={() => {
            setOldPassword("");
            setNewPassword("");
            alert("Mock: Password changed");
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Нууц үг солих
        </button>
      </div>
    </section>
  );
};

export default UserProfileChangePassword;
