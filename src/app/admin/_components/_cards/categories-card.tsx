"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DroneCategory, SpecCategory } from "@/generated/prisma";
import { Button, Chip } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import LoadingText from "../loading";
import { PlusCircle } from "lucide-react";
import AddCategoryDialog from "../_dialogs/add-category-dialog";

const CategoriesSection = () => {
  const [droneCategories, setDroneCategories] = useState<DroneCategory[]>([]);
  const [specCategories, setSpecCategories] = useState<SpecCategory[]>([]);
  const [waitingDrones, setWaitingD] = useState(true);
  const [waitingSpecs, setWaitingS] = useState(true);
  const [refresh, setRefresh] = useState(false);

  const fetchDroneCategories = async () => {
    try {
      const res = await axios.get("/api/categories/drones");
      if (res.data) {
        setDroneCategories(res.data.data.categories);
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.error(err.response?.data || err.message);
      } else {
        console.error(err);
      }
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
      if (axios.isAxiosError(err)) {
        console.error(err.response?.data || err.message);
      } else {
        console.error(err);
      }
    } finally {
      setWaitingS(false);
    }
  };
  useEffect(() => {
    fetchDroneCategories();
  }, [refresh]);
  useEffect(() => {
    fetchSpecCategories();
  }, [refresh]);

  return (
    <Card className="shadow-2xl">
      <CardHeader>
        <CardTitle>
          <div className=" flex items-center w-full justify-between">
            <div>Категоринууд</div>
            <AddCategoryDialog setRefresh={setRefresh} refresh={refresh} />
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div>
          <Accordion type="multiple" className="w-full">
            <AccordionItem key={`drone-categories`} value={`drone-categories`}>
              <AccordionTrigger className="cursor-pointer flex justify-between items-center font-extrabold">
                <div className="flex items-center justify-between w-full gap-7">
                  <div>Дроны категори</div>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className=" flex flex-wrap gap-4 items-center justify-center">
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
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <Accordion type="multiple" className="w-full">
            <AccordionItem key={`specs-categories`} value={`specs-categories`}>
              <AccordionTrigger className="cursor-pointer flex justify-between items-center font-extrabold">
                <div className="flex items-center gap-7">
                  <div> Эд ангийн категори</div>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className=" flex flex-wrap gap-4 items-center justify-center">
                  {waitingSpecs ? (
                    <LoadingText />
                  ) : specCategories.length > 0 ? (
                    specCategories.map((category) => (
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
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </CardContent>
    </Card>
  );
};
export default CategoriesSection;
