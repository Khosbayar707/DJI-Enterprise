"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CustomDroneBuyRequest, ResponseType } from "@/lib/types";
import axios from "axios";
import { format } from "date-fns";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { CustomSnackbar } from "../snackbar";
import LoadingText from "../loading";
import _ from "lodash";

type Props = {
  requests: CustomDroneBuyRequest[];
  setRefresh: Dispatch<SetStateAction<boolean>>;
};

const DroneBuyRequestCard = ({ requests, setRefresh }: Props) => {
  const [changing, setChanging] = useState(false);
  const [response, setResponse] = useState<ResponseType>();
  const [sorted, setSorted] = useState<CustomDroneBuyRequest[]>(requests);

  const [sortConfig, setSortConfig] = useState<{
    key: "status" | "createdAt";
    order: "asc" | "desc";
  }>({
    key: "status",
    order: "asc",
  });

  useEffect(() => {
    const sortedData = _.orderBy(
      requests,
      [
        (item) => {
          if (sortConfig.key === "status") return item;
          if (sortConfig.key === "createdAt")
            return new Date(item.createdAt).getTime();
          return _.get(item, sortConfig.key);
        },
      ],
      [sortConfig.order]
    );
    setSorted(sortedData);
  }, [requests, sortConfig]);

  const toggleSort = (key: "status" | "createdAt") => {
    setSortConfig((prev) =>
      prev?.key === key
        ? { key, order: prev.order === "asc" ? "desc" : "asc" }
        : { key, order: "asc" }
    );
  };

  const handleButton = async (id: string) => {
    setChanging(true);
    try {
      const res = await axios.patch("/api/users/drone-buy-request", { id });
      setResponse(res.data);
      if (res.data.success) {
        setRefresh((prev) => !prev);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setChanging(false);
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => setResponse(undefined), 5000);
    return () => clearTimeout(timeout);
  }, [response]);

  return (
    <Card className="shadow-2xl">
      {response && <CustomSnackbar value={response} />}
      <CardHeader>
        <CardTitle>Хэрэглэгчийн хүсэлтүүд</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Нэр</TableHead>
                <TableHead>Емайл</TableHead>
                <TableHead>Утас</TableHead>
                <TableHead>Дрон</TableHead>
                <TableHead
                  className="cursor-pointer"
                  onClick={() => toggleSort("createdAt")}
                >
                  Огноо{" "}
                  {sortConfig.key === "createdAt" &&
                    (sortConfig.order === "asc" ? "↑" : "↓")}
                </TableHead>
                <TableHead
                  className="cursor-pointer"
                  onClick={() => toggleSort("status")}
                >
                  Төлөв{" "}
                  {sortConfig.key === "status" &&
                    (sortConfig.order === "asc" ? "↑" : "↓")}
                </TableHead>
                <TableHead>Үйлдэл</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sorted.length > 0 ? (
                sorted.map((request) => (
                  <TableRow key={request.id}>
                    <TableCell>{request.name}</TableCell>
                    <TableCell>{request.user.email}</TableCell>
                    <TableCell>{request.phone}</TableCell>
                    <TableCell>{request.drone.name}</TableCell>
                    <TableCell>
                      {format(
                        new Date(request.createdAt),
                        "yyyy-MM-dd HH:mm:ss"
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={request.resolved ? "default" : "destructive"}
                      >
                        {request.resolved
                          ? "Холбоо барьсан"
                          : "Холбоо бариагүй"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button
                        disabled={changing}
                        className="cursor-pointer"
                        size="sm"
                        variant="outline"
                        onClick={() => handleButton(request.id)}
                      >
                        {changing ? <LoadingText /> : "Төлөв өөрчлөх"}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-4">
                    Холбоо барих хүсэлт алга!
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default DroneBuyRequestCard;
