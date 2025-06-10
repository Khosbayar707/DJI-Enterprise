import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import InstructionRequestForm from './instruction-request-form';

const InstructionRequestDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="border-green-600 text-green-600 hover:bg-green-100 transition-all cursor-pointer"
        >
          Сургалтанд бүртгүүлэх
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md w-full p-6 rounded-xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-center mb-2">
            Хүсэлт илгээх
          </DialogTitle>
        </DialogHeader>
        <InstructionRequestForm />
      </DialogContent>
    </Dialog>
  );
};

export default InstructionRequestDialog;
