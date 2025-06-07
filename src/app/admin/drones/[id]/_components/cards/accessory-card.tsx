'use client';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { DroneInTheBox } from '@/generated/prisma';
import { zodResolver } from '@hookform/resolvers/zod';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { AddAccessorySchema } from '../../utils/add-accessory-schema';
import z from 'zod';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { PuzzlePieceIcon } from '@heroicons/react/24/solid';
import axios from 'axios';
import { ResponseType } from '@/lib/types';
import { CustomSnackbar } from '@/app/admin/_components/snackbar';
import { TextField } from '@mui/material';
import { TrashIcon } from 'lucide-react';

type Props = {
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  accessories: DroneInTheBox[];
  refresh: boolean;
  setRefresh: Dispatch<SetStateAction<boolean>>;
  id: string;
};

const AccessoryCard = ({ accessories, id, setRefresh }: Props) => {
  const [response, setResponse] = useState<ResponseType>();
  const [deleting, setDeleting] = useState(false);
  const form = useForm<z.infer<typeof AddAccessorySchema>>({
    resolver: zodResolver(AddAccessorySchema),
    defaultValues: { name: '' },
  });

  const onSubmit = async (values: z.infer<typeof AddAccessorySchema>) => {
    try {
      const res = await axios.post('/api/product/drones/accessory', {
        ...values,
        id,
      });
      setResponse(res.data);
      if (res.data.success) {
        setRefresh((prev) => !prev);
      }
    } catch (err) {
      console.error(err);
    } finally {
      form.reset();
    }
  };

  const handleDelete = async (id: string) => {
    setDeleting(true);
    try {
      const res = await axios.delete(`/api/product/drones/accessory?id=${id}`);
      if (res.data.success) {
        setRefresh((prev) => !prev);
      }
      setResponse(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setDeleting(false);
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setResponse(undefined);
    }, 3000);

    return () => clearTimeout(timeout);
  }, [response]);
  return (
    <Card className="shadow-2xl border border-gray-200">
      {response && <CustomSnackbar value={response} />}
      <CardHeader className="bg-gray-50 border-b">
        <CardTitle className="text-lg font-semibold text-gray-800 flex items-center gap-2">
          <PuzzlePieceIcon className="w-5 h-5 text-blue-500" />
          Дагалдах хэрэгсэл
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6 p-6">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col sm:flex-row items-center gap-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <TextField
                      disabled={form.formState.isSubmitting || deleting}
                      label="Нэр"
                      variant="standard"
                      {...field}
                      placeholder="Жишээ: Пропеллер, Батарей"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>

        {accessories.length > 0 ? (
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            {accessories.map((item) => (
              <li
                key={item.id}
                className="relative bg-white border rounded-xl px-4 py-3 shadow-sm hover:shadow-md transition"
              >
                <div className="text-gray-800 font-medium pr-8">{item.name}</div>

                <button
                  onClick={() => handleDelete(item.id)}
                  disabled={deleting}
                  title="Устгах"
                  className={`absolute top-2 right-2 p-1 rounded-full bg-red-50 hover:bg-red-100 hover:text-red-700 transition cursor-pointer ${deleting ? 'text-secondary' : 'text-red-600 '}`}
                >
                  <TrashIcon className="w-5 h-5" />
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <div className="flex flex-col items-center justify-center py-10 text-center text-gray-500">
            <PuzzlePieceIcon className="w-12 h-12 text-gray-300 mb-3" />
            <p className="text-lg">Дагалдах хэрэгсэл алга</p>
            <p className="text-sm">Нэр оруулаад Enter дарна уу!</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AccessoryCard;
