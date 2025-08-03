'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  InstructionRequestSchema,
  InstructionRequestSchemaType,
} from './utils/instruction-request-schema';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { ResponseType } from '@/lib/types';
import { CustomSnackbar } from '../admin/_components/snackbar';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const InstructionRequestForm = () => {
  const [response, setResponse] = useState<ResponseType>();
  const form = useForm<InstructionRequestSchemaType>({
    resolver: zodResolver(InstructionRequestSchema),
    defaultValues: {
      username: '',
      phone: '',
      email: '',
      instructionType: undefined,
    },
  });

  const onSubmit = async (values: InstructionRequestSchemaType) => {
    try {
      const res = await axios.post('/api/users/instruction-request', values);
      setResponse(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setResponse(undefined);
    }, 5000);

    return () => clearTimeout(timeout);
  }, [response]);

  return (
    <div className=" p-6 bg-white rounded-xl shadow-md">
      {response && <CustomSnackbar value={response} />}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Таны нэр</FormLabel>
                <FormControl>
                  <Input placeholder="Нэр" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Таны дугаар</FormLabel>
                <FormControl>
                  <Input placeholder="Жишээ: 88112233" {...field} type="number" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Таны майл</FormLabel>
                <FormControl>
                  <Input placeholder="Жишээ: example@gmail.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="instructionType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Сургалтын төрөл</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Сургалтын төрөл сонгоно уу" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="HOBBY_DRONE">Сонирхогчийн дрон</SelectItem>
                    <SelectItem value="PROFESSIONAL_DRONE">Мэргэжлийн дрон</SelectItem>
                    <SelectItem value="AERIAL_MAPPING">Агаарын зураглал</SelectItem>
                    <SelectItem value="AGRICULTURAL_DRONE">Хөдөө аж ахуй</SelectItem>
                    <SelectItem value="FORESTRY_DRONE">Ойн салбар</SelectItem>
                    <SelectItem value="MINING_DRONE">Уул уурхайн салбар</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            disabled={form.formState.isSubmitting}
            type="submit"
            className="w-full mt-4 py-2 rounded-md hover:bg-gray-800 transition cursor-pointer"
          >
            {form.formState.isSubmitting ? 'Түр хүлээнэ үү!' : 'Илгээх'}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default InstructionRequestForm;
