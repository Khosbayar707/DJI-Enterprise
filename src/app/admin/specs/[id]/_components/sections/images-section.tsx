'use client';
import axios from 'axios';
import ImagesCard from '../cards/images-card';
import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { CustomImage } from '@/lib/types';
import { Spec } from '@/generated/prisma';

const ImagesSection = () => {
  const params = useParams();
  const { id } = params as { id: string };
  const [images, setImages] = useState<CustomImage[]>([]);
  const [spec, setSpec] = useState<Spec>();
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);

  const fetchImages = useCallback(async () => {
    try {
      const res = await axios.get(`/api/product/specs/item?id=${id}`);
      if (res.data.success) {
        setImages(res.data.data.spec.image);
        setSpec(res.data.data.spec);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchImages();
  }, [refresh, fetchImages]);

  return (
    <div className=" flex flex-col gap-6">
      {!loading && spec && <div>{spec.name}</div>}
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
