"use client";

import { useEffect, useState } from "react";
import VideosCard from "../cards/videos-card";
import { useParams } from "next/navigation";
import { CustomDrone, CustomImage } from "@/lib/types";
import { Drone, Video } from "@/generated/prisma";
import axios from "axios";
import LoadingText from "@/app/_component/LoadingText";
import VideoUploadAccordion from "../accordions/video-upload-accordian";

const VideosSection = () => {
  const params = useParams();
  const { id } = params as { id: string };
  const [videos, setVideos] = useState<Video[]>([]);
  const [drone, setDrone] = useState<CustomDrone>();
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);

  const fetchVideos = async () => {
    try {
      const res = await axios.get(`/api/product/drones/item?id=${id}`);
      if (res.data.success) {
        setVideos(res.data.data.drone.videos);
        setDrone(res.data.data.drone);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, [refresh]);

  return (
    <div className=" flex flex-col gap-6">
      {!loading && drone && <div>{drone.name}</div>}
      <div className=" flex justify-center">
        <VideoUploadAccordion id={id} setRefresh={setRefresh} />
      </div>
      {loading ? (
        <LoadingText />
      ) : videos.length > 0 && drone ? (
        videos.map((video) => (
          <VideosCard key={video.id} video={video} setRefresh={setRefresh} />
        ))
      ) : (
        <div>Бичлэг алга</div>
      )}
    </div>
  );
};

export default VideosSection;
