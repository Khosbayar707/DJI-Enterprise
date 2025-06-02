"use client";
import { Dispatch, SetStateAction, useState } from "react";
import axios from "axios";

type Props = {
  setRefresh: Dispatch<SetStateAction<boolean>>;
  productId: string;
};

export default function DeleteGarmin({ productId, setRefresh }: Props) {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!confirm("Та энэ бүтээгдэхүүнийг устгахдаа итгэлтэй байна уу?")) return;
    setLoading(true);
    try {
      await axios.delete(`/api/garmins/garmin?id=${productId}`);
      setRefresh((prev) => !prev);
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Бүтээгдэхүүнийг устгахад алдаа гарлаа.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="group p-2 rounded-full bg-red-50 hover:bg-red-100 text-red-600 hover:text-red-800 disabled:opacity-50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
      title="Бүтээгдэхүүнийг устгах"
      aria-label="Бүтээгдэхүүнийг устгах"
    >
      {loading ? (
        <svg
          className="animate-spin h-5 w-5 text-red-600"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v8h8a8 8 0 01-16 0z"
          />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 group-hover:scale-110 transition-transform duration-200"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5-4h4a1 1 0 011 1v1H9V4a1 1 0 011-1z"
          />
        </svg>
      )}
    </button>
  );
}
