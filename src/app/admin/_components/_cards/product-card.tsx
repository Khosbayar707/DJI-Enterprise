import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { theme } from "@/lib/theme";
import { Button, ThemeProvider } from "@mui/material";
import Image from "next/image";
import AddProductDialog from "../add-product-dialog";
import { useEffect, useState } from "react";
import axios from "axios";
import LoadingText from "../loading";
import { CustomDrone } from "@/lib/types";

const ProductCard = () => {
  const [products, setProducts] = useState<CustomDrone[]>();
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const res = await axios.get("/api/product");
      if (res.data.success) {
        setProducts(res.data.data.drones);
      }
    } catch (err) {
      console.error(err, "Серверийн алдаа!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Card className="shadow-2xl">
      <CardHeader>
        <CardTitle>
          <div className=" flex justify-between">
            <div>Бүтээгдэхүүн хэсэг</div>
            <AddProductDialog />
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Accordion type="multiple" className="w-full">
          {loading ? (
            <div className="w-full flex justify-center">
              <LoadingText />
            </div>
          ) : products ? (
            products.length > 0 ? (
              products.map((product, idx) => (
                <AccordionItem key={idx} value={`product-${idx}`}>
                  <AccordionTrigger className="cursor-pointer flex justify-between items-center">
                    <span>{product.name}</span>
                    <div className="flex gap-2 text-xs text-muted-foreground w-1/2 justify-between">
                      <span>Зурагнууд: {product.images.length}</span>
                      <span>Бичлэгнүүд: {product.videos.length}</span>
                      <span>
                        {product.visible ? (
                          <span className="text-green-500">Нийтлэгдсэн</span>
                        ) : (
                          <span className="text-red-500">Нийтлэгдээгүй</span>
                        )}
                      </span>
                    </div>
                  </AccordionTrigger>

                  <AccordionContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      {product.description}
                    </p>
                    {/* zuragnuud */}
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold mb-2">Зурагнууд:</h4>
                      <div className="flex flex-wrap justify-center gap-4">
                        {product.images.length > 0 ? (
                          product.images.map((imgSrc, imgIdx) => (
                            <div
                              key={imgIdx}
                              className="relative w-full max-w-sm h-36 rounded-lg overflow-hidden shadow"
                            >
                              <Image
                                src={"/image/placeholder.jpg"}
                                alt={`${product.name} image ${imgIdx + 1}`}
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
                        {product.featuredVideoId ? (
                          <div className="flex justify-center">
                            <div className="aspect-video w-full max-w-md rounded-lg overflow-hidden shadow ">
                              <iframe
                                width="100%"
                                height="100%"
                                src={product.videos[0].url}
                                title={`${product.name} featured video`}
                                allowFullScreen
                                className="rounded-lg"
                              />
                            </div>
                          </div>
                        ) : (
                          <div>Онцлох видео алга</div>
                        )}
                      </div>
                      <div className=" flex overflow-hidden">
                        <div className="mb-4 w-full">
                          <h4 className="text-sm font-semibold mb-2">
                            Видеонууд:
                          </h4>
                          <div className="flex flex-wrap justify-center gap-4">
                            {product.videos.length > 0 ? (
                              product.videos.map((videoSrc, vidIdx) => (
                                <div
                                  key={vidIdx}
                                  className="aspect-video w-full max-w-md rounded-lg overflow-hidden shadow"
                                >
                                  <iframe
                                    width="100%"
                                    height="100%"
                                    src={videoSrc.url}
                                    title={`${product.name} video ${vidIdx + 1}`}
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
                      <AccordionItem value={`spec-${idx}`}>
                        <AccordionTrigger className="cursor-pointer">
                          Эд анги
                        </AccordionTrigger>
                        <AccordionContent>
                          <ul className="list-disc list-inside text-sm space-y-2">
                            {product.specs.length > 0 ? (
                              product.specs.map((spec, i) => (
                                <li key={i}>
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
                        <Button variant="contained" className="cursor-pointer">
                          Засах
                        </Button>
                        <Button
                          color="error"
                          variant="contained"
                          className="cursor-pointer"
                        >
                          Устгах
                        </Button>
                      </div>
                      <div className="mt-4 flex gap-2 items-center">
                        {product.visible ? (
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
            )
          ) : (
            <div>Бүтээгдэхүүнүүдийг татаж авч чадсангүй!</div>
          )}
        </Accordion>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
