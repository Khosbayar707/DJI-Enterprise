"use client";

import axios from "axios";
import ImagesCard from "../cards/images-card";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { CustomImage } from "@/lib/types";

const ImagesSection = () => {
  const params = useParams();
  const { id } = params as { id: string };
  const [images, setImages] = useState<CustomImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);

  const fetchImages = async () => {
    try {
      const res = await axios.get(`/api/product/specs/item?id=${id}`);
      if (res.data.success) {
        setImages(res.data.data.spec.image);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, [refresh]);
  return (
    <div className=" flex flex-col gap-6">
      <ImagesCard
        id={id}
        images={images}
        loading={loading}
        setLoading={setLoading}
        setRefresh={setRefresh}
        refresh={refresh}
      />
    </div>
  );
};

export default ImagesSection;
