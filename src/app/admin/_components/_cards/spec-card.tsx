"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@mui/material";
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
      console.error(err);
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
    <div className="flex flex-col gap-6">
      {response && <CustomSnackbar value={response} />}

      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Эд ангийн жагсаалт</h2>
        <AddSpecDialog refresh={refresh} setRefresh={setRefresh} />
      </div>

      {/* Specs List */}
      {loading ? (
        <div className="w-full flex justify-center">
          <LoadingText />
        </div>
      ) : specs.length > 0 ? (
        specs.map((spec) => (
          <Card key={spec.id} className="shadow-md">
            <CardHeader className="flex flex-row justify-between items-start">
              <div>
                <CardTitle>{spec.name}</CardTitle>
                <p className="text-sm text-muted-foreground">{spec.detail}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Зургийн тоо: {spec.image.length}
                </p>
              </div>
              <div className="flex gap-2">
                <Link href={`/admin/specs/${spec.id}`} target="_blank">
                  <Button variant="contained" size="small">
                    Засах
                  </Button>
                </Link>
                <Button
                  variant="contained"
                  color="error"
                  size="small"
                  onClick={() => deleteItem(spec.id)}
                  disabled={deleting}
                >
                  {deleting ? <LoadingText /> : "Устгах"}
                </Button>
              </div>
            </CardHeader>
            <CardContent />
          </Card>
        ))
      ) : (
        <div>Эд анги алга</div>
      )}
    </div>
  );
};

export default SpecCard;
