'use client';
import PriorityForm from '@/app/_component/priority-form';
import { CustomSnackbar } from '@/app/admin/_components/snackbar';
import { EditSpecGeneralInfo } from '@/app/admin/specs/[id]/utils/editSpecGeneralInfo';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { TabsContent } from '@/components/ui/tabs';
import { Spec } from '@/generated/prisma';
import { ResponseType } from '@/lib/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, TextField } from '@mui/material';
import axios from 'axios';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import z from 'zod';

const SpecEditGeneralInfo = ({
  spec,
  setRefresh,
}: {
  spec: Spec;
  setRefresh: Dispatch<SetStateAction<boolean>>;
}) => {
  const [response, setResponse] = useState<ResponseType>();
  const form = useForm<z.infer<typeof EditSpecGeneralInfo>>({
    resolver: zodResolver(EditSpecGeneralInfo),
    defaultValues: {
      name: spec.name,
      detail: spec.detail,
      previewText: spec.previewText,
      priority: spec.priority,
    },
  });

  const onSubmit = async (values: z.infer<typeof EditSpecGeneralInfo>) => {
    try {
      const res = await axios.post('/api/product/specs/change-general-info', {
        id: spec.id,
        ...values,
      });
      if (res.data.success) {
        setRefresh((prev) => !prev);
      }
      setResponse(res.data);
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
    <TabsContent value="general">
      {response && <CustomSnackbar value={response} />}
      <Form {...form}>
        <form
          noValidate
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit(onSubmit)(e);
          }}
        >
          <div className=" flex flex-col gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <TextField label="Нэр" variant="standard" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="detail"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <TextField label="Дэлгэрэнгүй" variant="standard" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="previewText"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <TextField label="Preview" variant="standard" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <PriorityForm form={form} />
            <Button disabled={!form.formState.isValid || form.formState.isSubmitting} type="submit">
              Өөрчлөх
            </Button>
          </div>
        </form>
      </Form>
    </TabsContent>
  );
};

export default SpecEditGeneralInfo;
