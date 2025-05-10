import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ProductCard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Бүтээгдэхүүн хэсэг</CardTitle>
      </CardHeader>
      <CardContent>
        <Accordion type="multiple" className="w-full">
          {["Mavic 3", "Phantom 4", "Inspire 2"].map((product, idx) => (
            <AccordionItem key={idx} value={`product-${idx}`}>
              <AccordionTrigger>{product}</AccordionTrigger>
              <AccordionContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Basic info about {product} here...
                </p>
                <Accordion type="single" collapsible>
                  <AccordionItem value={`spec-${idx}`}>
                    <AccordionTrigger>Specs</AccordionTrigger>
                    <AccordionContent>
                      <ul className="list-disc list-inside text-sm space-y-2">
                        <li>Camera: 20MP Hasselblad</li>
                        <li>Flight Time: 46 minutes</li>
                        <li>Range: 15 km</li>
                        <li>Weight: 895g</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
                <div className="mt-4 flex gap-2">
                  <Button size="sm">Засах</Button>
                  <Button size="sm" variant="destructive">
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
