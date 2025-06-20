'use client';

import { Dispatch, SetStateAction, useState, ChangeEvent } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
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
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { Snackbar, Alert } from '@mui/material';
import Image from 'next/image';
import { DronePayloadSchema, DronePayloadSchemaType } from '../../utils/add-pauload-schema';

type Props = {
  payload: {
    id: string;
    name: string;
    type: string;
    description: string;
    imageUrl: string;
  };
  setRefresh: Dispatch<SetStateAction<boolean>>;
  onClose: () => void;
};

export default function EditPayloadForm({ payload, setRefresh, onClose }: Props) {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');
  const [uploading, setUploading] = useState(false);

  const form = useForm<DronePayloadSchemaType>({
    resolver: zodResolver(DronePayloadSchema),
    defaultValues: {
      name: payload.name,
      type: payload.type as DronePayloadSchemaType['type'],
      description: payload.description,
      imageUrl: payload.imageUrl,
    },
  });

  const imageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
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
      setSnackbarMessage('Зураг хуулахад алдаа гарлаа');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    } finally {
      setUploading(false);
    }
  };

  const onSubmit = async (data: DronePayloadSchemaType) => {
    try {
      const res = await axios.patch(`/api/payloads/payload?id=${payload.id}`, data);
      if (res.data.success) {
        setSnackbarMessage('Payload амжилттай шинэчлэгдлээ');
        setSnackbarSeverity('success');
        setRefresh((prev) => !prev);
        onClose();
      } else {
        throw new Error();
      }
    } catch (err) {
      setSnackbarMessage('Шинэчлэхэд алдаа гарлаа');
      setSnackbarSeverity('error');
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
        className="space-y-6 max-h-[70vh] overflow-y-auto p-2"
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
              <FormLabel>Төрөл</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                disabled={form.formState.isSubmitting}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Payload төрөл" />
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
                <Input type="file" accept="image/*" disabled={uploading} onChange={imageUpload} />
              </FormControl>
              {field.value && (
                <div className="mt-2">
                  <Image
                    src={field.value}
                    alt="payload image"
                    width={100}
                    height={100}
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

        <div className="flex justify-end gap-3">
          <Button type="button" variant="outline" onClick={onClose}>
            Болих
          </Button>
          <Button type="submit" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? 'Хадгалж байна...' : 'Хадгалах'}
          </Button>
        </div>
      </form>
    </Form>
  );
}
