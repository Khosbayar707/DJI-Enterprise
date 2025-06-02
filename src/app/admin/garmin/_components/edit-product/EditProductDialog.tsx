import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { GarminProduct } from "@/generated/prisma";
import EditProductFrom from "../edit-product-form";
import { formatPrice } from "../../utlis/format-price";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const EditProductDialog = ({ product }: { product: GarminProduct }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-800">
              {product.name}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="text-sm text-gray-600">
                <span className="font-medium">Категори:</span>{" "}
                {product.category}
              </p>
              <p className="text-sm text-gray-900">
                <span className="font-medium">Үнэ:</span>{" "}
                {formatPrice(product.price)}
              </p>
              <p className="text-sm">
                W<span className="font-medium">Бэлэн байдал:</span>{" "}
                <span
                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    product.inStock
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {product.inStock ? "Бэлэн" : "Дууссан"}
                </span>
              </p>
            </div>
          </CardContent>
        </Card>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>
          Та бүтээгдэхүүн {product.name} -ыг засах гэж байна!
        </DialogTitle>
        <EditProductFrom product={product} />
      </DialogContent>
    </Dialog>
  );
};

export default EditProductDialog;
