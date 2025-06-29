'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import axios from 'axios';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';

type ImageType = {
  id: string;
  name: string;
  description: string;
  url: string;
  priority: number;
  createdAt: string;
  drone?: { id: string; name: string } | null;
  spec?: { id: string; name: string } | null;
};

const ImageCard = () => {
  const [images, setImages] = useState<ImageType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await axios.get('/api/images');
        setImages(res.data.data.images);
      } catch (err) {
        console.error('Failed to fetch images:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  if (loading) return <div className="text-center py-10">Уншиж байна...</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Зурагнууд</h1>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {images.map((image) => (
          <div
            key={image.id}
            className="group bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border relative"
          >
            <div className="relative w-full h-52 overflow-hidden">
              <Image
                src={image.url}
                alt={image.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />

              {image.drone && (
                <Link
                  target="_blank"
                  href={`/admin/drones/${image.drone.id}`}
                  className="absolute top-2 left-2 z-10"
                >
                  <Badge className="bg-blue-600 text-white hover:underline">Дрон</Badge>
                </Link>
              )}
              {image.spec && (
                <Link
                  target="_blank"
                  href={`/admin/specs/${image.spec.id}`}
                  className="absolute top-2 left-2 z-10"
                >
                  <Badge className="bg-green-600 text-white hover:underline">Эд анги</Badge>
                </Link>
              )}

              {image.priority > 0 && (
                <div className="absolute top-2 right-2">
                  <Badge className="bg-amber-500 text-white">Тэргүүлэх {image.priority}</Badge>
                </div>
              )}
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold">{image.name}</h3>
              <p className="text-sm text-gray-600 mt-1">{image.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageCard;
