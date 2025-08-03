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
        <Button className="py-3 px-4 text-sm sm:text-base font-semibold text-white rounded-lg bg-gradient-to-r from-blue-600 to-black hover:from-black hover:to-black transition-all duration-500 ease-in-out shadow-md hover:shadow-lg active:scale-[0.98]">
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
