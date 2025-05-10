import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

const ProductCard = () => {
  const products = [
    {
      name: "Mavic 3",
      description: "Professional drone with advanced camera and long range.",
      image: "",
      video: "https://www.youtube.com/embed/VIDEO_ID_1",
      featuredVideo: "https://www.youtube.com/embed/FEATURED_VIDEO_ID_1",
      specs: [
        { label: "Camera", value: "20MP Hasselblad" },
        { label: "Flight Time", value: "46 minutes" },
        { label: "Range", value: "15 km" },
        { label: "Weight", value: "895g" },
      ],
    },
    {
      name: "Phantom 4",
      description: "Reliable and robust drone for mapping and surveying.",
      image: "", // Example of missing image to test placeholder
      video: "https://www.youtube.com/embed/VIDEO_ID_2",
      featuredVideo: "https://www.youtube.com/embed/FEATURED_VIDEO_ID_2",
      specs: [
        { label: "Camera", value: "12MP" },
        { label: "Flight Time", value: "30 minutes" },
        { label: "Range", value: "5 km" },
        { label: "Weight", value: "1380g" },
      ],
    },
  ];

  return (
    <Card className="shadow-2xl">
      <CardHeader>
        <CardTitle>Бүтээгдэхүүн хэсэг</CardTitle>
      </CardHeader>
      <CardContent>
        <Accordion type="multiple" className="w-full">
          {products.map((product, idx) => (
            <AccordionItem key={idx} value={`product-${idx}`}>
              <AccordionTrigger className="cursor-pointer">
                {product.name}
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-sm text-muted-foreground mb-4">
                  {product.description}
                </p>
                {/* zuragnuud */}
                <div className="mb-4">
                  <h4 className="text-sm font-semibold mb-2">Зурагнууд:</h4>
                  <div className=" flex flex-wrap justify-center">
                    <div className="relative w-full max-w-sm h-36 rounded-lg overflow-hidden shadow">
                      <Image
                        src={
                          product.image
                            ? product.image
                            : "/image/placeholder.jpg"
                        }
                        alt={product.name}
                        fill
                        style={{ objectFit: "cover" }}
                        priority
                      />
                    </div>
                    <div className="relative w-full max-w-sm h-36 rounded-lg overflow-hidden shadow">
                      <Image
                        src={
                          product.image
                            ? product.image
                            : "/image/placeholder.jpg"
                        }
                        alt={product.name}
                        fill
                        style={{ objectFit: "cover" }}
                        priority
                      />
                    </div>
                    <div className="relative w-full max-w-sm h-36 rounded-lg overflow-hidden shadow">
                      <Image
                        src={
                          product.image
                            ? product.image
                            : "/image/placeholder.jpg"
                        }
                        alt={product.name}
                        fill
                        style={{ objectFit: "cover" }}
                        priority
                      />
                    </div>
                    <div className="relative w-full max-w-sm h-36 rounded-lg overflow-hidden shadow">
                      <Image
                        src={
                          product.image
                            ? product.image
                            : "/image/placeholder.jpg"
                        }
                        alt={product.name}
                        fill
                        style={{ objectFit: "cover" }}
                        priority
                      />
                    </div>
                    <div className="relative w-full max-w-sm h-36 rounded-lg overflow-hidden shadow">
                      <Image
                        src={
                          product.image
                            ? product.image
                            : "/image/placeholder.jpg"
                        }
                        alt={product.name}
                        fill
                        style={{ objectFit: "cover" }}
                        priority
                      />
                    </div>
                    <div className="relative w-full max-w-sm h-36 rounded-lg overflow-hidden shadow">
                      <Image
                        src={
                          product.image
                            ? product.image
                            : "/image/placeholder.jpg"
                        }
                        alt={product.name}
                        fill
                        style={{ objectFit: "cover" }}
                        priority
                      />
                    </div>
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
                          src={product.featuredVideo}
                          title={`${product.name} featured video`}
                          allowFullScreen
                          className="rounded-lg"
                        />
                      </div>
                    </div>
                  </div>
                  <div className=" flex overflow-hidden">
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold mb-2">Видеонууд:</h4>
                      <div className=" flex justify-center flex-wrap gap-4">
                        <div className="aspect-video w-full max-w-md rounded-lg overflow-hidden shadow">
                          <iframe
                            width="100%"
                            height="100%"
                            src={product.video}
                            title={`${product.name} video`}
                            allowFullScreen
                            className="rounded-lg"
                          />
                        </div>
                        <div className="aspect-video w-full max-w-md rounded-lg overflow-hidden shadow">
                          <iframe
                            width="100%"
                            height="100%"
                            src={product.video}
                            title={`${product.name} video`}
                            allowFullScreen
                            className="rounded-lg"
                          />
                        </div>
                        <div className="aspect-video w-full max-w-md rounded-lg overflow-hidden shadow">
                          <iframe
                            width="100%"
                            height="100%"
                            src={product.video}
                            title={`${product.name} video`}
                            allowFullScreen
                            className="rounded-lg"
                          />
                        </div>
                        <div className="aspect-video w-full max-w-md rounded-lg overflow-hidden shadow">
                          <iframe
                            width="100%"
                            height="100%"
                            src={product.video}
                            title={`${product.name} video`}
                            allowFullScreen
                            className="rounded-lg"
                          />
                        </div>
                        <div className="aspect-video w-full max-w-md rounded-lg overflow-hidden shadow">
                          <iframe
                            width="100%"
                            height="100%"
                            src={product.video}
                            title={`${product.name} video`}
                            allowFullScreen
                            className="rounded-lg"
                          />
                        </div>
                        <div className="aspect-video w-full max-w-md rounded-lg overflow-hidden shadow">
                          <iframe
                            width="100%"
                            height="100%"
                            src={product.video}
                            title={`${product.name} video`}
                            allowFullScreen
                            className="rounded-lg"
                          />
                        </div>
                        <div className="aspect-video w-full max-w-md rounded-lg overflow-hidden shadow">
                          <iframe
                            width="100%"
                            height="100%"
                            src={product.video}
                            title={`${product.name} video`}
                            allowFullScreen
                            className="rounded-lg"
                          />
                        </div>
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

                <div className="mt-4 flex gap-2">
                  <Button className="cursor-pointer" size="sm">
                    Засах
                  </Button>
                  <Button
                    className="cursor-pointer"
                    size="sm"
                    variant="destructive"
                  >
                    Устгах
                  </Button>
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
