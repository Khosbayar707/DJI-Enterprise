import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const InstructionRequestCard = () => {
  return (
    <Card className="shadow-2xl">
      <CardHeader>
        <CardTitle>Зөвлөгөө авах хүсэлтүүд</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Нэр</TableHead>
                <TableHead>Емайл</TableHead>
                <TableHead>Утас</TableHead>
                <TableHead className="cursor-pointer"></TableHead>
                <TableHead className="cursor-pointer"></TableHead>
                <TableHead>Үйлдэл</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody></TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default InstructionRequestCard;
