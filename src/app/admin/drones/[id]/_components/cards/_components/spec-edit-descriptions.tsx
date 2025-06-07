'use client';

import { SpecDescriptionSchema } from '@/app/admin/specs/[id]/utils/editSpecGeneralInfo';
import { TabsContent } from '@/components/ui/tabs';
import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';
import { useForm } from 'react-hook-form';
import { CustomSpec, ResponseType } from '@/lib/types';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Button, TextField } from '@mui/material';
import PriorityForm from '@/app/_component/priority-form';
import axios from 'axios';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { CustomSnackbar } from '@/app/admin/_components/snackbar';

const SpecAddDescription = ({
  spec,
  setRefresh,
}: {
  spec: CustomSpec;
  setRefresh: Dispatch<SetStateAction<boolean>>;
}) => {
  const [response, setResponse] = useState<ResponseType>();
  const form = useForm<z.infer<typeof SpecDescriptionSchema>>({
    resolver: zodResolver(SpecDescriptionSchema),
    defaultValues: {
      highlight: '',
      description: '',
      priority: 0,
    },
  });

  const onSubmit = async (values: z.infer<typeof SpecDescriptionSchema>) => {
    try {
      const res = await axios.post('/api/product/specs/item/spec-desc', {
        id: spec.id,
        ...values,
      });
      setResponse(res.data);
      if (res.data.success) {
        setRefresh((prev) => !prev);
        form.reset();
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setResponse(undefined);
    }, 3000);
    return () => clearTimeout(timeout);
  }, [response]);

  return (
    <TabsContent value="add-description">
      {response && <CustomSnackbar value={response} />}
      <Form {...form}>
        <form
          className="flex flex-col gap-6 p-2"
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit(onSubmit)(e);
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="highlight"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <TextField variant="standard" label="Гарчиг" fullWidth {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <TextField variant="standard" label="Инфо" fullWidth {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <PriorityForm form={form} />

          <div className="flex justify-center">
            <Button
              type="submit"
              variant="contained"
              disabled={!form.formState.isValid || form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? 'Нэмэж байна...' : 'Нэмэх'}
            </Button>
          </div>
        </form>
      </Form>
    </TabsContent>
  );
};

export default SpecAddDescription;
