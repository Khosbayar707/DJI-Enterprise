'use client';

import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { CustomSpec } from '@/lib/types';
import { Video } from '@/generated/prisma';
import VideosCard from '../cards/videos-card';
import VideoUploadAccordion from '../accordions/video-upload-accordian';
import LoadingText from '@/app/_component/LoadingText';

const VideosSection = () => {
  const params = useParams();
  const { id } = params as { id: string };
  const [videos, setVideos] = useState<Video[]>([]);
  const [spec, setSpec] = useState<CustomSpec>();
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);

  const fetchVideos = useCallback(async () => {
    try {
      const res = await axios.get(`/api/product/specs/item?id=${id}`);
      if (res.data.success) {
        setVideos(res.data.data.spec.videos);
        setSpec(res.data.data.spec);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchVideos();
  }, [refresh, fetchVideos]);

  return (
    <div className=" flex flex-col gap-6">
      {!loading && spec && <div>{spec.name}</div>}
      <div className=" flex justify-center">
        <VideoUploadAccordion id={id} setRefresh={setRefresh} />
      </div>
      {loading ? (
        <LoadingText />
      ) : videos.length > 0 && spec ? (
        videos.map((video) => <VideosCard key={video.id} video={video} setRefresh={setRefresh} />)
      ) : (
        <div>Бичлэг алга</div>
      )}
    </div>
  );
};

export default VideosSection;
