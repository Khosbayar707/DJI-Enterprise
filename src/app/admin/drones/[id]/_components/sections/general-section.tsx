"use client";
import { useEffect, useState } from "react";
import DroneInfoCard from "../cards/general-card";
import axios from "axios";
import { useParams } from "next/navigation";
import { CustomDrone, CustomSpec } from "@/lib/types";
import LoadingText from "@/app/_component/LoadingText";
import { DroneCategory, DroneModel, Spec } from "@/generated/prisma";
import { Snackbar } from "@mui/material";
import DroneAdditionalDescriptions from "../cards/additional-description-card";
import DroneTechCard from "../cards/tech-card";
import AccessoryCard from "../cards/accessory-card";

const GeneralSection = () => {
  const { id } = useParams() as { id: string };
  const [drone, setDrone] = useState<CustomDrone>();
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);
  const [waitingCategories, setWaitingCategories] = useState(true);
  const [droneCategories, setDroneCategories] = useState<DroneCategory[]>([]);
  const [specs, setSpecs] = useState<CustomSpec[]>([]);
  const [droneModels, setDroneModels] = useState<DroneModel[]>([]);
  const [waiting, setWaiting] = useState(false);

  const fetchCategories = async () => {
    try {
      setWaiting(true);
      const drone = await axios.get("/api/categories/drones");
      const model = await axios.get("/api/categories/models");
      const specs = await axios.get("/api/product/specs");
      if (drone.data.success) {
        setDroneCategories(drone.data.data.categories);
      }
      if (model.data.success) {
        setDroneModels(model.data.data.models);
      }
      if (specs.data.success) {
        setSpecs(specs.data.data.specs);
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.error(err.response?.data || err.message);
      } else {
        console.error(err);
      }
    } finally {
      setWaitingCategories(false);
      setWaiting(false);
    }
  };
  const fetchData = async () => {
    try {
      const res = await axios.get(`/api/product/drones/item/?id=${id}`);
      if (res.data.success) {
        setDrone(res.data.data.drone);
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.error(err.response?.data || err.message);
      } else {
        console.error(err);
      }
    } finally {
      setLoading(false);
      fetchCategories();
    }
  };
  useEffect(() => {
    fetchData();
  }, [refresh]);

  return (
    <div className=" flex flex-col gap-6">
      {waiting && (
        <Snackbar
          open={waiting}
          message={"Мэдээлэл шинэчилж байна!"}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        />
      )}
      {loading ? (
        <LoadingText />
      ) : drone ? (
        <>
          <DroneInfoCard
            setRefresh={setRefresh}
            refresh={refresh}
            waitingCategories={waitingCategories}
            drone={drone}
            droneCategories={droneCategories}
            specs={specs}
            droneModels={droneModels}
          />

          <DroneTechCard
            tech={drone.tech}
            loading={loading}
            setLoading={setLoading}
            refresh={refresh}
            setRefresh={setRefresh}
            id={id}
          />
          <AccessoryCard
            accessories={drone.inTheBox}
            loading={loading}
            setLoading={setLoading}
            refresh={refresh}
            setRefresh={setRefresh}
            id={id}
          />
          <DroneAdditionalDescriptions drone={drone} setRefresh={setRefresh} />
        </>
      ) : (
        <div>Дроны мэдээлэл татахад алдаа гарлаа!</div>
      )}
    </div>
  );
};

export default GeneralSection;
