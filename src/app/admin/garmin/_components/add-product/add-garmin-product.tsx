import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import GraminProductCreateForm from './garmin-product-create-form';
import { Dispatch, SetStateAction } from 'react';

type Props = {
  setRefresh: Dispatch<SetStateAction<boolean>>;
};
const AddGarminProduct = ({ setRefresh }: Props) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-blue-600 hover:bg-blue-700">+ Шинэ бүтээгдэхүүн нэмэх</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Бүтээгдэхүүн нэмэх</DialogTitle>
        <GraminProductCreateForm setRefresh={setRefresh} />
      </DialogContent>
    </Dialog>
  );
};

export default AddGarminProduct;
