"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Drone, Spec, SpecCategory } from "@/generated/prisma";
import { Input } from "@mui/material";

type Props = {
  spec: Spec;
  specCategories: SpecCategory[];
  drones: Drone[];
};
const SpecInfoCard = ({ spec }: Props) => {
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
