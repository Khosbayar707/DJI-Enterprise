"use client";

import { useEffect, useState } from "react";
import DroneInfoCard from "../cards/general-card";
import { Drone } from "@/generated/prisma";
import axios from "axios";
import { useParams } from "next/navigation";

const GeneralSection = () => {
  const { id } = useParams();
  console.log(id);
  const [data, setData] = useState<Drone[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`/api/product/drones/item/?id=${id}`);
      console.log(res.data);
    };
    fetchData();
  }, []);
  return (
    <div className=" flex flex-col gap-6">
      <DroneInfoCard />
    </div>
  );
};

export default GeneralSection;
