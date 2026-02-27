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
      form.reset();
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
    <div
      className="
        p-5 sm:p-6
        rounded-2xl
        bg-white
        dark:bg-slate-900
        border border-gray-200
        dark:border-slate-800
        shadow-sm dark:shadow-black/40
        transition-colors duration-300
      "
    >
      {response && <CustomSnackbar value={response} />}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          {/* NAME */}
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700 dark:text-gray-300">Таны нэр</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Нэр"
                    {...field}
                    className="
                      bg-gray-50 dark:bg-slate-800
                      border-gray-300 dark:border-slate-700
                      focus-visible:ring-2
                      focus-visible:ring-blue-500
                      dark:focus-visible:ring-blue-400
                    "
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* PHONE */}
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700 dark:text-gray-300">Таны дугаар</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Жишээ: 88112233"
                    {...field}
                    type="tel"
                    className="
                      bg-gray-50 dark:bg-slate-800
                      border-gray-300 dark:border-slate-700
                      focus-visible:ring-2
                      focus-visible:ring-blue-500
                      dark:focus-visible:ring-blue-400
                    "
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* EMAIL */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700 dark:text-gray-300">Таны майл</FormLabel>
                <FormControl>
                  <Input
                    placeholder="example@gmail.com"
                    {...field}
                    type="email"
                    className="
                      bg-gray-50 dark:bg-slate-800
                      border-gray-300 dark:border-slate-700
                      focus-visible:ring-2
                      focus-visible:ring-blue-500
                      dark:focus-visible:ring-blue-400
                    "
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* SELECT */}
          <FormField
            control={form.control}
            name="instructionType"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700 dark:text-gray-300">Сургалтын төрөл</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger
                      className="
                        bg-gray-50 dark:bg-slate-800
                        border-gray-300 dark:border-slate-700
                        focus:ring-2 focus:ring-blue-500
                        dark:focus:ring-blue-400
                      "
                    >
                      <SelectValue placeholder="Сургалтын төрөл сонгоно уу" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-white dark:bg-slate-900 border-gray-200 dark:border-slate-700">
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

          {/* BUTTON */}
          <Button
            disabled={form.formState.isSubmitting}
            type="submit"
            className="
              w-full
              py-3
              rounded-xl
              font-semibold
              bg-gradient-to-r
              from-blue-600 to-indigo-700
              hover:from-indigo-700 hover:to-blue-600
              dark:from-blue-500 dark:to-indigo-600
              text-white
              transition-all duration-300
              active:scale-95
            "
          >
            {form.formState.isSubmitting ? 'Түр хүлээнэ үү...' : 'Илгээх'}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default InstructionRequestForm;
