'use client';

import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Snackbar, Alert } from '@mui/material';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import Image from 'next/image';
import axios from 'axios';
import { DronePayloadSchema, DronePayloadSchemaType } from '../../utils/add-pauload-schema';

type Props = {
  setRefresh: Dispatch<SetStateAction<boolean>>;
};

export default function DronePayloadCreateForm({ setRefresh }: Props) {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');
  const [uploading, setUploading] = useState(false);

  const form = useForm<DronePayloadSchemaType>({
    resolver: zodResolver(DronePayloadSchema),
    defaultValues: {
      name: '',
      type: 'ZENMUSE',
      description: '',
      imageUrl: '',
    },
  });

  const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const signRes = await axios.get('/api/auth/cloudinary-sign?folder=DronePayloads');
      const { timestamp, signature, api_key } = signRes.data.data;

      const formData = new FormData();
      formData.append('file', file);
      formData.append('timestamp', timestamp.toString());
      formData.append('signature', signature);
      formData.append('api_key', api_key);
      formData.append('folder', 'DronePayloads');

      const uploadRes = await axios.post(
        `https://api.cloudinary.com/v1_1/doluiuzq8/image/upload`,
        formData
      );

      form.setValue('imageUrl', uploadRes.data.secure_url);
    } catch (err) {
      setSnackbarSeverity('error');
      setSnackbarMessage('Зураг хуулахад алдаа гарлаа');
      setSnackbarOpen(true);
    } finally {
      setUploading(false);
    }
  };

  const onSubmit = async (data: DronePayloadSchemaType) => {
    try {
      const res = await axios.post('/api/payloads', data);
      if (res.data.success) {
        setSnackbarSeverity('success');
        setSnackbarMessage('Payload амжилттай үүслээ!');
        setRefresh((prev) => !prev);
        form.reset();
      } else {
        throw new Error();
      }
    } catch (err) {
      setSnackbarSeverity('error');
      setSnackbarMessage('Үүсгэхэд алдаа гарлаа');
    } finally {
      setSnackbarOpen(true);
    }
  };

  return (
    <Form {...form}>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity={snackbarSeverity}>{snackbarMessage}</Alert>
      </Snackbar>

      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 max-h-[calc(100vh-200px)] overflow-y-auto p-2"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Payload нэр</FormLabel>
              <FormControl>
                <Input {...field} disabled={form.formState.isSubmitting} />
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
              <FormLabel>Payload төрөл</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                disabled={form.formState.isSubmitting}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Төрөл сонгох" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="ZENMUSE">Zenmuse</SelectItem>
                  <SelectItem value="LIDAR">Lidar</SelectItem>
                  <SelectItem value="SPEAKER">Speaker</SelectItem>
                  <SelectItem value="SPOTLIGHT">Spotlight</SelectItem>
                  <SelectItem value="TETHER">Tether</SelectItem>
                  <SelectItem value="OTHER">Other</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="imageUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Зураг</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  accept="image/*"
                  disabled={uploading}
                  onChange={handleImageUpload}
                />
              </FormControl>
              {field.value && (
                <div className="mt-2">
                  <Image
                    src={field.value}
                    alt="payload"
                    width={120}
                    height={120}
                    className="rounded border"
                  />
                </div>
              )}
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Тайлбар</FormLabel>
              <FormControl>
                <Textarea rows={4} {...field} disabled={form.formState.isSubmitting} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? 'Үүсгэж байна...' : 'Үүсгэх'}
        </Button>
      </form>
    </Form>
  );
}
