"use client";
import { SpecDescriptionSchema } from "@/app/admin/specs/[id]/utils/editSpecGeneralInfo";
import { TabsContent } from "@/components/ui/tabs";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { useForm } from "react-hook-form";
import { CustomSpec } from "@/lib/types";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import {
  Button,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import PriorityForm from "@/app/_component/priority-form";

const SpecEditdescription = ({ spec }: { spec: CustomSpec }) => {
  const form = useForm<z.infer<typeof SpecDescriptionSchema>>({
    resolver: zodResolver(SpecDescriptionSchema),
    defaultValues: {
      highlight: "",
      description: "",
      priority: 0,
    },
  });

  const onSubmit = (values: z.infer<typeof SpecDescriptionSchema>) => {
    console.log({ id: spec.id, ...values });
  };
  return (
    <TabsContent value="descriptions">
      <Form {...form}>
        <form
          className=" flex flex-col gap-2"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className=" flex justify-around">
            {" "}
            <FormField
              control={form.control}
              name="highlight"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <TextField variant="standard" label="Гарчиг" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <TextField variant="standard" label="Инфо" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <PriorityForm form={form} />
          <Button type="submit">Нэмэх</Button>
        </form>
      </Form>
    </TabsContent>
  );
};

export default SpecEditdescription;
