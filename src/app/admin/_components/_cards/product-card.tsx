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

const ProductCard = () => {
  const products = [
    {
      name: "Mavic 3",
      description: "Professional drone with advanced camera and long range.",
      images: [
        "/path/to/image1.jpg",
        "/path/to/image2.jpg",
        "/path/to/image3.jpg",
      ],
      videos: [
        "https://www.youtube.com/embed/VIDEO_ID_1",
        "https://www.youtube.com/embed/VIDEO_ID_2",
      ],
      isVisible: true,
      specs: [
        { label: "Camera", value: "20MP Hasselblad" },
        { label: "Flight Time", value: "46 minutes" },
      ],
    },
    {
      name: "Mavic 3",
      description: "Professional drone with advanced camera and long range.",
      images: [
        "/path/to/image1.jpg",
        "/path/to/image2.jpg",
        "/path/to/image3.jpg",
      ],
      videos: [
        "https://www.youtube.com/embed/VIDEO_ID_1",
        "https://www.youtube.com/embed/VIDEO_ID_2",
      ],
      isVisible: false,
      specs: [
        { label: "Camera", value: "20MP Hasselblad" },
        { label: "Flight Time", value: "46 minutes" },
      ],
    },
  ];

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
          {products.map((product, idx) => (
            <AccordionItem key={idx} value={`product-${idx}`}>
              <AccordionTrigger className="cursor-pointer flex justify-between items-center">
                <span>{product.name}</span>
                <div className="flex gap-2 text-xs text-muted-foreground w-1/2 justify-between">
                  <span>Зурагнууд: {product.images.length}</span>
                  <span>Бичлэгнүүд: {product.videos.length}</span>
                  <span>
                    {product.isVisible ? (
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
                    {product.images.map((imgSrc, imgIdx) => (
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
                    ))}
                  </div>
                </div>
                {/* bichlegnuud */}
                <div className="flex flex-col gap-6">
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold mb-2">
                      Онцлох Видео:
                    </h4>
                    <div className="flex justify-center">
                      <div className="aspect-video w-full max-w-md rounded-lg overflow-hidden shadow ">
                        <iframe
                          width="100%"
                          height="100%"
                          src={product.videos[0]}
                          title={`${product.name} featured video`}
                          allowFullScreen
                          className="rounded-lg"
                        />
                      </div>
                    </div>
                  </div>
                  <div className=" flex overflow-hidden">
                    <div className="mb-4 w-full">
                      <h4 className="text-sm font-semibold mb-2">Видеонууд:</h4>
                      <div className="flex flex-wrap justify-center gap-4">
                        {product.videos.map((videoSrc, vidIdx) => (
                          <div
                            key={vidIdx}
                            className="aspect-video w-full max-w-md rounded-lg overflow-hidden shadow"
                          >
                            <iframe
                              width="100%"
                              height="100%"
                              src={videoSrc}
                              title={`${product.name} video ${vidIdx + 1}`}
                              allowFullScreen
                              className="rounded-lg"
                            />
                          </div>
                        ))}
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
                        {product.specs.map((spec, i) => (
                          <li key={i}>
                            {spec.label}: {spec.value}
                          </li>
                        ))}
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
                    {product.isVisible ? (
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
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
