import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Dispatch, SetStateAction } from 'react';
import SurveyEquipmentCreateForm from './equipment-product-create-form';

type Props = {
  setRefresh: Dispatch<SetStateAction<boolean>>;
};
const AddSurveyEquipment = ({ setRefresh }: Props) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-blue-600 hover:bg-blue-700">+ Шинэ бүтээгдэхүүн нэмэх</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Багаж нэмэх</DialogTitle>
        <SurveyEquipmentCreateForm setRefresh={setRefresh} />
      </DialogContent>
    </Dialog>
  );
};

export default AddSurveyEquipment;
