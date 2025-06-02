"use client";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { GarminProduct } from "@/generated/prisma";
import EditProductForm from "./edit-product-form";

type Props = {
  product: GarminProduct;
  setRefresh: (value: React.SetStateAction<boolean>) => void;
  onClose: () => void;
};

export default function EditProductDialog({
  product,
  setRefresh,
  onClose,
}: Props) {
  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="">
        <DialogTitle>
          Та бүтээгдэхүүн {product.name}-ыг засах гэж байна!
        </DialogTitle>
        <EditProductForm
          product={product}
          setRefresh={setRefresh}
          onClose={onClose}
        />
      </DialogContent>
    </Dialog>
  );
}
