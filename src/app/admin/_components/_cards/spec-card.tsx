"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@mui/material";
import Image from "next/image";
import AddDroneDialog from "../_dialogs/add-drone-dialog";
import { useEffect, useState } from "react";
import axios from "axios";
import LoadingText from "../loading";
import { CustomSpec } from "@/lib/types";
import AddSpecDialog from "../_dialogs/add-spec-category";
import Link from "next/link";

const SpecCard = () => {
  const [specs, setSpecs] = useState<CustomSpec[]>([]);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);

  const fetchData = async () => {
    try {
      const res = await axios.get("/api/product/specs");
      if (res.data.success) {
        setSpecs(res.data.data.specs);
        console.log(res.data);
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
  }, [refresh]);

  return (
    <div className=" flex flex-col gap-10">
      <Card className="shadow-2xl">
        <CardHeader>
          <CardTitle>
            <div className=" flex justify-between">
              <div>Эд ангийн хэсэг</div>
              <AddSpecDialog refresh={refresh} setRefresh={setRefresh} />
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="multiple" className="w-full">
            {loading ? (
              <div className="w-full flex justify-center">
                <LoadingText />
              </div>
            ) : specs.length > 0 ? (
              specs.map((spec) => (
                <AccordionItem key={spec.id} value={`product-${spec.id}`}>
                  <AccordionTrigger className="cursor-pointer flex justify-between items-center">
                    <span>{spec.name}</span>
                    <div className="flex gap-2 text-xs text-muted-foreground w-1/2 justify-between">
                      <span>[{spec.detail}]</span>
                      <span>Зургийн тоо: {spec.image.length}</span>
                    </div>
                  </AccordionTrigger>

                  <AccordionContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      {spec.detail}
                    </p>
                    {/* zuragnuud */}
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold mb-2">Зурагнууд:</h4>
                      <div className="flex flex-wrap justify-center gap-4">
                        {spec.image.length > 0 ? (
                          spec.image.map((imgSrc) => (
                            <div
                              key={imgSrc.id}
                              className="relative w-full max-w-sm h-36 rounded-lg overflow-hidden shadow"
                            >
                              <Image
                                src={imgSrc.url}
                                alt={`${imgSrc.name}`}
                                fill
                                style={{ objectFit: "cover" }}
                                priority
                              />
                            </div>
                          ))
                        ) : (
                          <div>Зураг оруулаагүй байна!</div>
                        )}
                      </div>
                    </div>

                    {/* <Accordion type="single" collapsible>
                      <AccordionItem value={`spec-${spec.id}`}>
                        <AccordionTrigger className="cursor-pointer">
                          Эд анги
                        </AccordionTrigger>
                        <AccordionContent>
                          <ul className="list-disc list-inside text-sm space-y-2">
                            {spec.drone.length > 0 ? (
                              drone.specs.map((spec) => (
                                <li key={spec.id}>
                                  Нэр: {spec.name}
                                  Тайлбар: {spec.detail}
                                </li>
                              ))
                            ) : (
                              <div>Эд анги алга</div>
                            )}
                          </ul>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion> */}

                    <div className=" flex justify-between">
                      <div className="mt-4 flex gap-2 items-center">
                        <Link target="_blank" href={`/admin/specs/${spec.id}`}>
                          <Button
                            variant="contained"
                            className="cursor-pointer"
                          >
                            Засах
                          </Button>
                        </Link>
                        <Button
                          color="error"
                          variant="contained"
                          className="cursor-pointer"
                        >
                          Устгах
                        </Button>
                      </div>
                      <div className="mt-4 flex gap-2 items-center">
                        {spec.visible ? (
                          <>
                            <div className=" text-green-600">
                              Уг бүтээгдэхүүн нийтлэгдсэн байна!
                            </div>
                            <Button
                              color="error"
                              variant="contained"
                              className="cursor-pointer"
                            >
                              Драфт болгох
                            </Button>
                          </>
                        ) : (
                          <>
                            <div className=" text-rose-800">
                              Уг бүтээгдэхүүн нийтлэгдээгүй байна!
                            </div>
                            <Button
                              color="primary"
                              variant="contained"
                              className="cursor-pointer"
                            >
                              Нийтлэх
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))
            ) : (
              <div>Бүтээгдэхүүн алга</div>
            )}
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
};

export default SpecCard;
