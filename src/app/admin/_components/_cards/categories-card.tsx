"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DroneCategory, DroneModel, SpecCategory } from "@/generated/prisma";
import { Chip } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import LoadingText from "../loading";
import AddCategoryDialog from "../_dialogs/add-category-dialog";

const CategoriesSection = () => {
  const [droneCategories, setDroneCategories] = useState<DroneCategory[]>([]);
  const [specCategories, setSpecCategories] = useState<SpecCategory[]>([]);
  const [models, setModels] = useState<DroneModel[]>([]);

  const [waitingDrones, setWaitingD] = useState(true);
  const [waitingSpecs, setWaitingS] = useState(true);
  const [waitingModels, setWaitingM] = useState(true);

  const [refresh, setRefresh] = useState(false);

  const fetchDroneCategories = async () => {
    try {
      const res = await axios.get("/api/categories/drones");
      if (res.data) {
        setDroneCategories(res.data.data.categories);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setWaitingD(false);
    }
  };

  const fetchSpecCategories = async () => {
    try {
      const res = await axios.get("/api/categories/specs");
      if (res.data) {
        setSpecCategories(res.data.data.categories);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setWaitingS(false);
    }
  };

  const fetchDroneModels = async () => {
    try {
      const res = await axios.get("/api/categories/models");
      if (res.data) {
        setModels(res.data.data.models);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setWaitingM(false);
    }
  };

  useEffect(() => {
    fetchDroneCategories();
    fetchSpecCategories();
    fetchDroneModels();
  }, [refresh]);

  return (
    <Card className="shadow-2xl">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Категоринууд</span>
          <AddCategoryDialog setRefresh={setRefresh} refresh={refresh} />
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="font-bold text-lg mb-2">Дроны категори</h3>
          <div className="flex flex-wrap gap-4">
            {waitingDrones ? (
              <LoadingText />
            ) : droneCategories.length > 0 ? (
              droneCategories.map((category) => (
                <Chip
                  key={category.id}
                  variant="filled"
                  label={category.name}
                />
              ))
            ) : (
              <div>Категори алга</div>
            )}
          </div>
        </div>
        <div>
          <h3 className="font-bold text-lg mb-2">Дроны моделүүд</h3>
          <div className="flex flex-wrap gap-4">
            {waitingModels ? (
              <LoadingText />
            ) : models.length > 0 ? (
              models.map((model) => (
                <Chip key={model.id} variant="filled" label={model.name} />
              ))
            ) : (
              <div>Модел алга</div>
            )}
          </div>
        </div>
        <div>
          <h3 className="font-bold text-lg mb-2">Эд ангийн категори</h3>
          <div className="flex flex-wrap gap-4">
            {waitingSpecs ? (
              <LoadingText />
            ) : specCategories.length > 0 ? (
              specCategories.map((spec) => (
                <Chip key={spec.id} variant="filled" label={spec.name} />
              ))
            ) : (
              <div>Категори алга</div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CategoriesSection;
