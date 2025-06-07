'use client';
import { CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { DroneDescription } from '@/generated/prisma';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  DroneDescriptionSchema,
  DroneDescriptionSchemaType,
} from '../../utils/drone-description-schema';
import { TextField, Button } from '@mui/material';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import axios from 'axios';
import PriorityForm from '@/app/_component/priority-form';
import { ResponseType } from '@/lib/types';
import { CustomResponse } from '@/lib/next-responses';
import { CustomSnackbar } from '@/app/admin/_components/snackbar';

type Props = {
  description: DroneDescription;
  setRefresh: Dispatch<SetStateAction<boolean>>;
};

const DescriptionEditDialog = ({ description, setRefresh }: Props) => {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<ResponseType>();

  const form = useForm<DroneDescriptionSchemaType>({
    resolver: zodResolver(DroneDescriptionSchema),
    defaultValues: {
      highlight: description.highlight,
      description: description.description,
      priority: description.priority,
    },
  });

  const onSubmit = async (values: DroneDescriptionSchemaType) => {
    try {
      setLoading(true);
      const res = await axios.put(`/api/product/drones/additional-descriptions`, {
        ...values,
        id: description.id,
      });
      if (res.data.success) {
        setRefresh((prev) => !prev);
      }
      setResponse(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setResponse(undefined);
    }, 5000);

    return () => clearTimeout(timeout);
  }, [response]);

  return (
    <Dialog>
      {response && <CustomSnackbar value={response} />}
      <DialogTrigger>
        <DialogTitle>
          <CardTitle className="text-lg font-semibold text-gray-800">
            {description.highlight}
          </CardTitle>
        </DialogTitle>
      </DialogTrigger>
      <DialogContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="highlight"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <TextField label="Гарчиг" fullWidth size="small" {...field} />
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
                    <TextField
                      label="Тайлбар"
                      multiline
                      rows={4}
                      fullWidth
                      size="small"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <PriorityForm form={form} />
            <div className="flex justify-end">
              <Button type="submit" variant="contained" disabled={loading}>
                {loading ? 'Хадгалж байна...' : 'Хадгалах'}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default DescriptionEditDialog;
