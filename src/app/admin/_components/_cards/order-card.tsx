import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const orders = [
  {
    id: "ORD-001",
    customer: "John Doe",
    status: "Амжилттай",
    total: 4300000,
  },
  {
    id: "ORD-002",
    customer: "Jane Smith",
    status: "Хүлээгдэж байгаа",
    total: 8200000,
  },
  {
    id: "ORD-003",
    customer: "Bob Johnson",
    status: "Цуцласан",
    total: 4000000,
  },
];

const OrderCard = () => {
  return (
    <Card className=" shadow-2xl">
      <CardHeader>
        <CardTitle>Захиалгын хэсэг</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Захиалгын ID</TableHead>
              <TableHead>Үйлчлүүлэгч</TableHead>
              <TableHead>Төлөв</TableHead>
              <TableHead>Нийт</TableHead>
              <TableHead>Үйлдэл</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order, idx) => (
              <TableRow key={idx}>
                <TableCell>{order.id}</TableCell>
                <TableCell>{order.customer}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      order.status === "Хүлээгдэж байгаа"
                        ? "default"
                        : order.status === "Цуцласан"
                          ? "destructive"
                          : "secondary"
                    }
                  >
                    {order.status}
                  </Badge>
                </TableCell>
                <TableCell>{order.total.toLocaleString()}</TableCell>
                <TableCell>
                  <Button
                    className=" cursor-pointer"
                    size="sm"
                    variant="outline"
                  >
                    Харах
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default OrderCard;
