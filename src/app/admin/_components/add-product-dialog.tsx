"use client";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { AddProductSchema } from "@/lib/zod-schemas/add-product-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import z from "zod";

const AddProductDialog = () => {
  const form = useForm<z.infer<typeof AddProductSchema>>({
    resolver: zodResolver(AddProductSchema),
    defaultValues: {
      name: "",
    },
    mode: "onChange",
  });

  const onSubmit = (values: z.infer<typeof AddProductSchema>) => {
    console.log(values);
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="contained">Бүтээгдэхүүн нэмэх</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Шинэ бүтээгдэхүүн нэмэх хэсэг</DialogTitle>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-4">
              <FormField
                name="name"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <TextField
                        {...field}
                        color={form.formState.isValid ? "primary" : "error"}
                        variant="standard"
                        label="Бүтээгдэхүүны нэр"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                disabled={!form.formState.isValid}
                type="submit"
                className=" w-full"
              >
                Нэмэх
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
export default AddProductDialog;
