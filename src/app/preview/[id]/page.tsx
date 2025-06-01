"use client";
import HeroSection from "../_components/HeroSection";
import FeaturesSection from "../_components/FeaturesSection";
import DetailSection from "../_components/DetailSection";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { CustomDroneClient } from "@/lib/types";
import axios from "axios";
import LoadingText from "@/app/_component/LoadingText";

export default function HomePage() {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);
  const [drone, setDrone] = useState<CustomDroneClient>();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/api/client/products/drone?id=${id}`);
        if (res.data.success) {
          setDrone(res.data.data.drone);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  return (
    <main className="bg-black text-white">
      {loading ? (
        <div className=" flex justify-center min-h-screen items-center">
          {" "}
          <LoadingText />
        </div>
      ) : drone ? (
        <>
          <HeroSection drone={drone} />
          <FeaturesSection drone={drone} />
          {drone.specs.length > 0 ? (
            drone.specs.map((spec) => (
              <DetailSection spec={spec} key={spec.id} />
            ))
          ) : (
            <div className=" flex justify-center italic">
              Эд ангийн showcase алга
            </div>
          )}
        </>
      ) : (
        <div>Холбоос буруу</div>
      )}
    </main>
  );
}
