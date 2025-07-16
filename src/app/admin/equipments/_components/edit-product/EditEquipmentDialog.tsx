'use client';

import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import EditSurveyEquipmentForm from './edit-equipment-form'; // Make sure this file is renamed accordingly
import { CustomSurveyEquipment } from '@/lib/types'; // Replace with your actual custom type

type Props = {
  product: CustomSurveyEquipment;
  setRefresh: (value: React.SetStateAction<boolean>) => void;
  onClose: () => void;
};

export default function EditSurveyEquipmentDialog({ product, setRefresh, onClose }: Props) {
  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent>
        <DialogTitle>Та {product.name} хэмжилтийн багажийг засах гэж байна!</DialogTitle>
        <EditSurveyEquipmentForm product={product} setRefresh={setRefresh} onClose={onClose} />
      </DialogContent>
    </Dialog>
  );
}
