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
import { CustomDrone } from "@/lib/types";
import Link from "next/link";

const DroneCard = () => {
  const [drones, setProducts] = useState<CustomDrone[]>([]);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);

  const fetchData = async () => {
    try {
      const res = await axios.get("/api/product/drones");
      if (res.data.success) {
        setProducts(res.data.data.drones);
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
              <div>Дрон хэсэг</div>
              <AddDroneDialog refresh={refresh} setRefresh={setRefresh} />
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="multiple" className="w-full">
            {loading ? (
              <div className="w-full flex justify-center">
                <LoadingText />
              </div>
            ) : drones.length > 0 ? (
              drones.map((drone) => (
                <AccordionItem key={drone.id} value={`product-${drone.id}`}>
                  <AccordionTrigger className="cursor-pointer flex justify-between items-center">
                    <span>{drone.name}</span>
                    <div className="flex gap-2 text-xs text-muted-foreground w-1/2 justify-between">
                      <span>Зурагнууд: {drone.images.length}</span>
                      <span>Бичлэгнүүд: {drone.videos.length}</span>
                      <span>
                        {drone.visible ? (
                          <span className="text-green-500">Нийтлэгдсэн</span>
                        ) : (
                          <span className="text-red-500">Нийтлэгдээгүй</span>
                        )}
                      </span>
                    </div>
                  </AccordionTrigger>

                  <AccordionContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      {drone.description}
                    </p>
                    {/* zuragnuud */}
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold mb-2">Зурагнууд:</h4>
                      <div className="flex flex-wrap justify-center gap-4">
                        {drone.images.length > 0 ? (
                          drone.images.map((imgSrc) => (
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
                    {/* bichlegnuud */}
                    <div className="flex flex-col gap-6">
                      <div className="mb-4">
                        <h4 className="text-sm font-semibold mb-2">
                          Онцлох Видео:
                        </h4>
                        {drone.featuredVideo ? (
                          <div className="flex justify-center">
                            <div className="aspect-video w-full max-w-md rounded-lg overflow-hidden shadow ">
                              <iframe
                                width="100%"
                                height="100%"
                                src={drone.featuredVideo.url}
                                title={`featured video`}
                                allowFullScreen
                                className="rounded-lg"
                              />
                            </div>
                          </div>
                        ) : (
                          <div className="flex justify-center">
                            Онцлох видео алга
                          </div>
                        )}
                      </div>
                      <div className=" flex overflow-hidden">
                        <div className="mb-4 w-full">
                          <h4 className="text-sm font-semibold mb-2">
                            Видеонууд:
                          </h4>
                          <div className="flex flex-wrap justify-center gap-4">
                            {drone.videos.length > 0 ? (
                              drone.videos.map((videoSrc) => (
                                <div
                                  key={videoSrc.id}
                                  className="aspect-video w-full max-w-md rounded-lg overflow-hidden shadow"
                                >
                                  <iframe
                                    width="100%"
                                    height="100%"
                                    src={videoSrc.url}
                                    title={`${videoSrc.id}`}
                                    allowFullScreen
                                    className="rounded-lg"
                                  />
                                </div>
                              ))
                            ) : (
                              <div>Видео алга</div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    <Accordion type="single" collapsible>
                      <AccordionItem value={`spec-${drone.id}`}>
                        <AccordionTrigger className="cursor-pointer">
                          Эд анги
                        </AccordionTrigger>
                        <AccordionContent>
                          <ul className="list-disc list-inside text-sm space-y-2">
                            {drone.specs.length > 0 ? (
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
                    </Accordion>

                    <div className=" flex justify-between">
                      <div className="mt-4 flex gap-2 items-center">
                        <Link
                          target="_blank"
                          href={`/admin/drones/${drone.id}`}
                        >
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
                        {drone.visible ? (
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

export default DroneCard;
