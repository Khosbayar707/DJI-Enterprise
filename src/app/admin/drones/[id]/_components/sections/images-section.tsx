'use client';
import axios from 'axios';
import ImagesCard from '../cards/images-card';
import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { CustomImage } from '@/lib/types';
import { Drone } from '@/generated/prisma';

const ImagesSection = () => {
  const params = useParams();
  const { id } = params as { id: string };
  const [images, setImages] = useState<CustomImage[]>([]);
  const [drone, setDrone] = useState<Drone>();
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);

  const fetchImages = useCallback(async () => {
    try {
      const res = await axios.get(`/api/product/drones/item?id=${id}`);
      if (res.data.success) {
        setImages(res.data.data.drone.images);
        setDrone(res.data.data.drone);
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
      {!loading && drone && <div>{drone.name}</div>}
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
