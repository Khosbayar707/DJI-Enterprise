'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  InstructionRequestSchema,
  InstructionRequestSchemaType,
} from './utils/instruction-request-schema';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { TextField } from '@mui/material';

const InstructionRequestForm = () => {
  const form = useForm({
    resolver: zodResolver(InstructionRequestSchema),
    defaultValues: {
      username: '',
      phone: '',
      email: '',
    },
  });

  const onSubmit = (values: InstructionRequestSchemaType) => {
    console.log(values);
  };
  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-4">
            {' '}
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <TextField {...field} label="Таны нэр?" />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <TextField {...field} label="Таны дугаар?" />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <TextField {...field} label="Таны майл?" />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </form>
      </Form>
    </div>
  );
};

export default InstructionRequestForm;
