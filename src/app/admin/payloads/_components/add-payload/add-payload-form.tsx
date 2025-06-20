import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Dispatch, SetStateAction } from 'react';
import DronePayloadCreateForm from './add-payload';

type Props = {
  setRefresh: Dispatch<SetStateAction<boolean>>;
};

const AddDronePayload = ({ setRefresh }: Props) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-blue-600 hover:bg-blue-700">+ Payload нэмэх</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Payload нэмэх</DialogTitle>
        <DronePayloadCreateForm setRefresh={setRefresh} />
      </DialogContent>
    </Dialog>
  );
};

export default AddDronePayload;
