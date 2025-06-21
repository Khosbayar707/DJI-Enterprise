'use client';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import EditPayloadForm from './edit-payload-form';
import { DronePayload } from '@/generated/prisma';

type Props = {
  payload: DronePayload & {
    images: { url: string; public_id: string }[];
  };
  setRefresh: (value: React.SetStateAction<boolean>) => void;
  onClose: () => void;
};

export default function EditPayloadDialog({ payload, setRefresh, onClose }: Props) {
  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent>
        <DialogTitle>Та Payload {payload.name}-ыг засах гэж байна!</DialogTitle>
        <EditPayloadForm payload={payload} setRefresh={setRefresh} onClose={onClose} />
      </DialogContent>
    </Dialog>
  );
}
