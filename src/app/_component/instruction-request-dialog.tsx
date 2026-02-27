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
      {/* TRIGGER BUTTON */}
      <DialogTrigger asChild>
        <Button
          className="
            py-5 sm:py-6
            px-6 sm:px-8
            text-sm sm:text-base font-bold
            text-white
            rounded-2xl
            bg-gradient-to-r
            from-blue-600 to-indigo-700
            hover:from-indigo-700 hover:to-blue-600
            dark:from-blue-500 dark:to-indigo-600
            transition-all duration-300 ease-in-out
            shadow-[0_10px_25px_rgba(37,99,235,0.35)]
            hover:shadow-[0_18px_40px_rgba(37,99,235,0.45)]
            active:scale-95
          "
        >
          Сургалтанд бүртгүүлэх
        </Button>
      </DialogTrigger>

      {/* MODAL */}
      <DialogContent
        className="
          w-[95vw] sm:w-full
          max-w-md
          p-6 sm:p-8
          rounded-3xl
          border
          border-gray-200
          dark:border-slate-800
          bg-white/95
          dark:bg-slate-900/95
          backdrop-blur-2xl
          shadow-2xl
          dark:shadow-[0_20px_60px_rgba(0,0,0,0.6)]
          transition-all duration-300
        "
      >
        {/* subtle gradient border glow in dark */}
        <div className="absolute inset-0 rounded-3xl pointer-events-none dark:bg-gradient-to-br dark:from-blue-500/5 dark:via-transparent dark:to-indigo-500/5" />

        <DialogHeader>
          <DialogTitle
            className="
              relative
              text-xl sm:text-2xl
              font-extrabold
              text-center
              mb-5
              bg-clip-text
              text-transparent
              bg-gradient-to-r
              from-gray-900 to-gray-600
              dark:from-white dark:to-slate-400
            "
          >
            Хүсэлт илгээх
          </DialogTitle>
        </DialogHeader>

        <div className="relative mt-2">
          <InstructionRequestForm />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default InstructionRequestDialog;
