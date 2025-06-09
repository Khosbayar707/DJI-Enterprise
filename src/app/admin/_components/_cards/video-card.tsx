'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';

type VideoType = {
  id: string;
  name: string;
  detail: string;
  url: string;
  priority: number;
  createdAt: string;
  drone?: { id: string; name: string } | null;
  spec?: { id: string; name: string } | null;
};

const VideoCard = () => {
  const [videos, setVideos] = useState<VideoType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await axios.get('/api/videos');
        setVideos(res.data.data.videos);
      } catch (err) {
        console.error('Failed to fetch videos:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  if (loading) return <div className="text-center py-10">Уншиж байна...</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Бичлэгүүд</h1>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {videos.map((video) => (
          <div
            key={video.id}
            className="group bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border relative"
          >
            <div className="relative w-full aspect-video overflow-hidden">
              <video
                controls
                src={video.url}
                className="w-full h-full object-cover rounded-t-xl"
                preload="metadata"
              />

              {video.drone && (
                <Link
                  target="_blank"
                  href={`/admin/drones/${video.drone.id}`}
                  className="absolute top-2 left-2 z-10"
                >
                  <Badge className="bg-blue-600 text-white hover:underline">Дрон</Badge>
                </Link>
              )}
              {video.spec && (
                <Link
                  target="_blank"
                  href={`/admin/specs/${video.spec.id}`}
                  className="absolute top-2 left-2 z-10"
                >
                  <Badge className="bg-green-600 text-white hover:underline">Эд анги</Badge>
                </Link>
              )}

              {video.priority > 0 && (
                <div className="absolute top-2 right-2">
                  <Badge className="bg-indigo-600 text-white">Тэргүүлэх {video.priority}</Badge>
                </div>
              )}
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold">{video.name}</h3>
              <p className="text-sm text-gray-600 mt-1">{video.detail}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoCard;
