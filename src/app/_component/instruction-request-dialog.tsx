import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import InstructionRequestForm from './instruction-request-form';

const InstructionRequestDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="border-green-600 text-green-600 hover:bg-green-50 cursor-pointer"
        >
          Сургалтанд бүртгүүлэх
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Хүсэлт илгээх</DialogTitle>
        <InstructionRequestForm />
      </DialogContent>
    </Dialog>
  );
};

export default InstructionRequestDialog;
