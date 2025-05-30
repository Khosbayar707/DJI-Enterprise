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
import { useEffect, useState } from "react";
import axios from "axios";
import LoadingText from "../loading";
import { CustomSpec, ResponseType } from "@/lib/types";
import AddSpecDialog from "../_dialogs/add-spec-category";
import Link from "next/link";
import { CustomSnackbar } from "../snackbar";

const SpecCard = () => {
  const [specs, setSpecs] = useState<CustomSpec[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [response, setResponse] = useState<ResponseType>();

  const fetchData = async () => {
    try {
      const res = await axios.get("/api/product/specs");
      if (res.data.success) {
        setSpecs(res.data.data.specs);
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

  const deleteItem = async (id: string) => {
    setDeleting(true);
    try {
      const res = await axios.delete(`/api/product/specs?id=${id}`);
      if (res.data.success) {
        setRefresh((prev) => !prev);
      }
      setResponse(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setDeleting(false);
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setResponse(undefined);
    }, 5000);
    return () => clearTimeout(timeout);
  }, [response]);
  useEffect(() => {
    fetchData();
  }, [refresh]);

  return (
    <div className=" flex flex-col gap-10">
      {response && <CustomSnackbar value={response} />}
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
                          disabled={deleting}
                          onClick={() => deleteItem(spec.id)}
                          color="error"
                          variant="contained"
                          className="cursor-pointer"
                        >
                          {deleting ? <LoadingText /> : "Устгах"}
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
