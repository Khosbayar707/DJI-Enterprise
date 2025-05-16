"use client";

import { useParams } from "next/navigation";
import SpecInfoCard from "../cards/general-card";
import { useEffect, useState } from "react";
import { Drone, SpecCategory } from "@/generated/prisma";
import { CustomSpec } from "@/lib/types";
import axios from "axios";
import LoadingText from "@/app/_component/LoadingText";

const GeneralSection = () => {
  const { id } = useParams();
  const [spec, setSpec] = useState<CustomSpec>();
  const [loading, setLoading] = useState(true);
  const [specCategories, setSpecCategories] = useState<SpecCategory[]>([]);
  const [drones, setDrones] = useState<Drone[]>([]);
  console.log({ id, spec, specCategories });
  const fetchCategories = async () => {
    const speccat = await axios.get("/api/product/specs");
    const drones = await axios.get("/api/product/drones");
    if (speccat.data.success) {
      setSpecCategories(speccat.data.data.categories);
    }
    if (drones.data.success) {
      setDrones(drones.data.data.drones);
    }
  };
  const fetchData = async () => {
    try {
      const res = await axios.get(`/api/product/specs/item/?id=${id}`);
      if (res.data.success) {
        setSpec(res.data.data.spec);
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.error(err.response?.data || err.message);
      } else {
        console.error(err);
      }
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
    fetchCategories();
  }, []);

  return (
    <div className=" flex flex-col gap-6">
      {loading ? (
        <LoadingText />
      ) : spec ? (
        <SpecInfoCard
          spec={spec}
          specCategories={specCategories}
          drones={drones}
        />
      ) : (
        <div>Дроны мэдээлэл татахад алдаа гарлаа!</div>
      )}
    </div>
  );
};

export default GeneralSection;
