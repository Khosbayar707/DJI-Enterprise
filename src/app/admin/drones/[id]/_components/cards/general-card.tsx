"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@mui/material";
import { useForm } from "react-hook-form";
import { EditDroneGeneralInfo } from "../../utils/edit-drone-form";

const DroneInfoCard = () => {
  const form = useForm({
    resolver: zodResolver(EditDroneGeneralInfo),
    defaultValues: {
      name: "",
      description: "",
    },
  });
  return (
    <Card className="shadow-2xl">
      <CardHeader>
        <CardTitle>
          <div className=" flex items-center w-full justify-between">
            <div>Дрон</div>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Input type="text" />
      </CardContent>
    </Card>
  );
};
export default DroneInfoCard;
