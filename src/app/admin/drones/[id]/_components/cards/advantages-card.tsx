'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CustomDrone, ResponseType } from '@/lib/types';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AddDroneAdvantageSchema } from '../../utils/add-drone-advantage-schema';
import z from 'zod';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import axios from 'axios';
import { CustomSnackbar } from '@/app/admin/_components/snackbar';
import { Input } from '@/components/ui/input';
import { Sparkles } from 'lucide-react';

type Props = {
  drone: CustomDrone;
  setRefresh: Dispatch<SetStateAction<boolean>>;
  refresh: boolean;
  id: string;
};

const DroneAdvantagesCard = ({ drone, setRefresh, id }: Props) => {
  const [response, setResponse] = useState<ResponseType>();
  const form = useForm<z.infer<typeof AddDroneAdvantageSchema>>({
    resolver: zodResolver(AddDroneAdvantageSchema),
    defaultValues: {
      detail: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof AddDroneAdvantageSchema>) => {
    try {
      const res = await axios.post('/api/product/drones/advantage', {
        ...values,
        id,
      });
      if (res.data.success) {
        setRefresh((prev) => !prev);
        form.reset(); // clear input
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
    <Card className="shadow-2xl bg-white rounded-2xl border border-gray-200">
      <CardHeader>
        {response && <CustomSnackbar value={response} />}
        <CardTitle>
          <div className="flex items-center justify-between">
            <div className="text-lg font-bold text-gray-800 flex items-center gap-2">
              <Sparkles className="text-yellow-500 w-5 h-5" />
              Үндсэн онцлогууд
            </div>
          </div>
        </CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col gap-6">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col md:flex-row gap-4 items-start"
          >
            <FormField
              control={form.control}
              name="detail"
              render={({ field }) => (
                <FormItem className="w-full md:flex-1">
                  <FormControl>
                    <Input
                      {...field}
                      disabled={form.formState.isSubmitting}
                      placeholder="Жишээ: 45 минут нислэгийн хугацаа"
                      className="text-sm"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>

        <div className="flex flex-wrap gap-2">
          {drone.advantages.length > 0 ? (
            drone.advantages.map((advantage) => (
              <div
                key={advantage.id}
                className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium shadow-sm hover:bg-blue-200 transition-all"
              >
                {advantage.detail}
              </div>
            ))
          ) : (
            <div className="text-gray-500 italic">Одоогоор давуу тал алга</div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default DroneAdvantagesCard;
