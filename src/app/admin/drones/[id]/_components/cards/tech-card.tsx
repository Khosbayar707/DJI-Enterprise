import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DroneTech } from '@/generated/prisma';
import { zodResolver } from '@hookform/resolvers/zod';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { EditDroneTechInfoSchema } from '../../utils/edit-tech-info-schema';
import z from 'zod';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Button, TextField } from '@mui/material';
import axios from 'axios';
import LoadingText from '@/app/_component/LoadingText';
import { ResponseType } from '@/lib/types';
import { CustomSnackbar } from '@/app/admin/_components/snackbar';

type Props = {
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  tech: DroneTech;
  refresh: boolean;
  setRefresh: Dispatch<SetStateAction<boolean>>;
  id: string;
};

const DroneTechCard = ({ tech, id, setRefresh }: Props) => {
  const [response, setResponse] = useState<ResponseType>();
  const form = useForm<z.infer<typeof EditDroneTechInfoSchema>>({
    resolver: zodResolver(EditDroneTechInfoSchema),
    defaultValues: {
      weight: tech?.weight || '',
      maxSpeed: tech?.maxSpeed || '',
      operatingTemperature: tech?.operatingTemperature || '',
      dimensions: tech?.dimensions || '',
      maxWindResistance: tech?.maxWindResistance || '',
      Battery: tech?.Battery || '',
    },
  });

  const onSubmit = async (values: z.infer<typeof EditDroneTechInfoSchema>) => {
    try {
      const res = await axios.post('/api/product/drones/tech-info', {
        ...values,
        droneId: id,
      });
      setResponse(res.data);
      if (res.data.success) {
        setRefresh((prev) => !prev);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setResponse(undefined);
    }, 3000);

    return () => clearTimeout(timeout);
  }, [response]);
  return (
    <Card className="shadow-2xl">
      <CardHeader>
        {response && <CustomSnackbar value={response} />}
        <CardTitle>
          <div className="flex items-center justify-between w-full">
            <span>Техникийн үзүүлэлт</span>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { name: 'weight', label: 'Жин' },
                { name: 'Battery', label: 'Батерей' },
                { name: 'dimensions', label: 'Хэмжээ' },
                { name: 'maxSpeed', label: 'Дээд хурд' },
                { name: 'maxWindResistance', label: 'Салхины эсэргүүцэл' },
                { name: 'operatingTemperature', label: 'Орчны темпратур' },
              ].map(({ name, label }) => (
                <FormField
                  key={name}
                  control={form.control}
                  name={name as keyof z.infer<typeof EditDroneTechInfoSchema>}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <TextField {...field} variant="standard" fullWidth label={label} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
            </div>
            <Button
              type="submit"
              disabled={form.formState.isSubmitting || !form.formState.isValid}
              className="w-full mt-6"
            >
              {form.formState.isSubmitting ? <LoadingText /> : 'Хадгалах'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default DroneTechCard;
