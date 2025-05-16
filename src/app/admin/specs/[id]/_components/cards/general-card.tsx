"use client";
import AddCategoryDialog from "@/app/admin/_components/_dialogs/add-category-dialog";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@mui/material";

const SpecInfoCard = () => {
  return (
    <Card className="shadow-2xl">
      <CardHeader>
        <CardTitle>
          <div className=" flex items-center w-full justify-between">
            <div>spec name</div>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Input />
      </CardContent>
    </Card>
  );
};
export default SpecInfoCard;
