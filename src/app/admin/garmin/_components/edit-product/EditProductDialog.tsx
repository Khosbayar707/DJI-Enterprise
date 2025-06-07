'use client';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import EditProductForm from './edit-product-form';
import { CustomGarminProduct } from '@/lib/types';

type Props = {
  product: CustomGarminProduct;
  setRefresh: (value: React.SetStateAction<boolean>) => void;
  onClose: () => void;
};

export default function EditProductDialog({ product, setRefresh, onClose }: Props) {
  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="">
        <DialogTitle>Та бүтээгдэхүүн {product.name}-ыг засах гэж байна!</DialogTitle>
        <EditProductForm product={product} setRefresh={setRefresh} onClose={onClose} />
      </DialogContent>
    </Dialog>
  );
}
