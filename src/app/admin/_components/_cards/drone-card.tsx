"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@mui/material";
import AddDroneDialog from "../_dialogs/add-drone-dialog";
import { useEffect, useState } from "react";
import axios from "axios";
import LoadingText from "../loading";
import { CustomDrone, ResponseType } from "@/lib/types";
import Link from "next/link";
import { CustomSnackbar } from "../snackbar";

const DroneCard = () => {
  const [drones, setProducts] = useState<CustomDrone[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [response, setResponse] = useState<ResponseType>();

  const fetchData = async () => {
    try {
      const res = await axios.get("/api/product/drones");
      if (res.data.success) {
        setProducts(res.data.data.drones);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const deleteItem = async (id: string) => {
    setDeleting(true);
    try {
      const res = await axios.delete(`/api/product/drones?id=${id}`);
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

  const handlePublish = async (id: string) => {
    setPublishing(true);
    try {
      const res = await axios.delete(`/api/product/drones/publish?id=${id}`);
      if (res.data.success) {
        setRefresh((prev) => !prev);
      }
      setResponse(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setPublishing(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [refresh]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setResponse(undefined);
    }, 5000);
    return () => clearTimeout(timeout);
  }, [response]);

  return (
    <div className="flex flex-col gap-6">
      {response && <CustomSnackbar value={response} />}

      {/* Header with Add button */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Дрон жагсаалт</h2>
        <AddDroneDialog refresh={refresh} setRefresh={setRefresh} />
      </div>

      {/* Drone Cards */}
      {loading ? (
        <div className="w-full flex justify-center">
          <LoadingText />
        </div>
      ) : drones.length > 0 ? (
        drones.map((drone) => (
          <Card key={drone.id} className="shadow-md">
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>{drone.name}</span>
                <div className="flex gap-3 text-sm text-muted-foreground">
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
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                {drone.description}
              </p>

              <div>
                <h4 className="text-sm font-semibold mb-2">Эд анги:</h4>
                <ul className="list-disc list-inside text-sm space-y-2">
                  {drone.specs.length > 0 ? (
                    drone.specs.map((spec) => (
                      <li key={spec.id}>
                        Нэр: {spec.name} — Тайлбар: {spec.detail}
                      </li>
                    ))
                  ) : (
                    <div>Эд анги алга</div>
                  )}
                </ul>
              </div>

              <div className="flex justify-between flex-wrap gap-4">
                <div className="flex gap-2 items-center">
                  <Link href={`/admin/drones/${drone.id}`} target="_blank">
                    <Button variant="contained">Засах</Button>
                  </Link>
                  <Button
                    disabled={deleting}
                    onClick={() => deleteItem(drone.id)}
                    color="error"
                    variant="contained"
                  >
                    {deleting ? <LoadingText /> : "Устгах"}
                  </Button>
                </div>
                <div className="flex gap-2 items-center">
                  {drone.visible ? (
                    <>
                      <div className="text-green-600">
                        Уг бүтээгдэхүүн нийтлэгдсэн байна!
                      </div>
                      <Button
                        disabled={publishing}
                        onClick={() => handlePublish(drone.id)}
                        color="error"
                        variant="contained"
                      >
                        Буцаах
                      </Button>
                    </>
                  ) : (
                    <>
                      <div className="text-rose-800">
                        Уг бүтээгдэхүүн нийтлэгдээгүй байна!
                      </div>
                      <Button
                        disabled={publishing}
                        onClick={() => handlePublish(drone.id)}
                        color="primary"
                        variant="contained"
                      >
                        Нийтлэх
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))
      ) : (
        <div>Бүтээгдэхүүн алга</div>
      )}
    </div>
  );
};

export default DroneCard;
