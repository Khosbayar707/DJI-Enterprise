'use client';
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Form, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { ResponseType } from '@/lib/types';
import { AddCategorySchema } from '@/lib/zod-schemas/add-category-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, FormControl, FormControlLabel, Radio, RadioGroup, TextField } from '@mui/material';
import axios from 'axios';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import z from 'zod';
import { CustomSnackbar } from '../snackbar';
import LoadingText from '../loading';
const AddCategoryDialog = ({
  refresh,
  setRefresh,
}: {
  refresh: boolean;
  setRefresh: Dispatch<SetStateAction<boolean>>;
}) => {
  const [response, setResponse] = useState<ResponseType>();
  const form = useForm<z.infer<typeof AddCategorySchema>>({
    resolver: zodResolver(AddCategorySchema),
    defaultValues: {
      name: '',
      type: 'drone',
    },
    mode: 'onTouched',
  });
  const onSubmit = async (values: z.infer<typeof AddCategorySchema>) => {
    try {
      const res = await axios.post('/api/categories', values);
      setResponse(res.data);
      if (res.data.success) {
        form.reset();
        setRefresh(!refresh);
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.error(err.response?.data || err.message);
      } else {
        console.error(err);
      }
    }
  };
  useEffect(() => {
    const timeout = setTimeout(() => {
      setResponse(undefined);
    }, 5000);
    return () => clearTimeout(timeout);
  }, [response]);
  return (
    <>
      {response && <CustomSnackbar value={response} />}
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="contained">Категори нэмэх</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogTitle>Шинэ категори нэмэх хэсэг</DialogTitle>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div>
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <TextField
                          {...field}
                          color={form.formState.isValid ? 'primary' : 'error'}
                          variant="standard"
                          label="Категори нэр"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <RadioGroup
                          {...field}
                          row
                          value={field.value || ''}
                          onChange={(e) => field.onChange(e.target.value)}
                          className=" flex justify-center gap-4"
                        >
                          <FormControlLabel
                            label="Дрон"
                            value="drone"
                            control={<Radio color="primary" />}
                          />
                          <FormControlLabel
                            label="Эд анги"
                            value="spec"
                            control={<Radio color="primary" />}
                          />
                          <FormControlLabel
                            label="Модел"
                            value="model"
                            control={<Radio color="primary" />}
                          />
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button
                disabled={!form.formState.isValid || form.formState.isSubmitting}
                type="submit"
                className=" w-full"
              >
                {form.formState.isSubmitting ? <LoadingText /> : 'Нэмэх'}
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
};
export default AddCategoryDialog;
