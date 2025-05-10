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

const UserCard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Хэрэглэгчийн хэсэг</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Нэр</TableHead>
              <TableHead>Емайл</TableHead>
              <TableHead>Төлөв</TableHead>
              <TableHead>Үйлдэл</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[
              {
                name: "John Doe",
                email: "john@example.com",
                status: "Идэвхитэй",
              },
              {
                name: "Jane Smith",
                email: "jane@example.com",
                status: "Блоклосон",
              },
            ].map((user, idx) => (
              <TableRow key={idx}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      user.status === "Блоклосон" ? "destructive" : "default"
                    }
                  >
                    {user.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Button
                    className=" cursor-pointer"
                    size="sm"
                    variant="outline"
                  >
                    {user.status === "Блоклосон" ? "Блок гаргах" : "Блоклох"}
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

export default UserCard;
