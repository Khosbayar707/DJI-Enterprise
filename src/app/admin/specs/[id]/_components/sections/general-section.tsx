"use client";

import { useParams } from "next/navigation";
import SpecInfoCard from "../cards/general-card";
import { useEffect, useState } from "react";
import { Drone, SpecCategory } from "@/generated/prisma";
import { CustomSpec } from "@/lib/types";
import axios from "axios";
import LoadingText from "@/app/_component/LoadingText";

const GeneralSection = () => {
  const params = useParams();
  const { id } = params as { id: string };
  const [spec, setSpec] = useState<CustomSpec>();
  const [loading, setLoading] = useState(true);
  const [specCategories, setSpecCategories] = useState<SpecCategory[]>([]);
  const [drones, setDrones] = useState<Drone[]>([]);
  const [waitingCategories, setWaitingCategories] = useState(true);

  const fetchCategories = async () => {
    try {
      const speccat = await axios.get("/api/categories/specs");
      const drones = await axios.get("/api/product/drones");
      if (speccat.data.success) {
        setSpecCategories(speccat.data.data.categories);
      }
      if (drones.data.success) {
        setDrones(drones.data.data.drones);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setWaitingCategories(false);
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
          waitingCategories={waitingCategories}
          id={id}
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
