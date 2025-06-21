'use client';

import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Snackbar, Alert } from '@mui/material';
import Image from 'next/image';
import axios from 'axios';
import { Trash2 } from 'lucide-react';

import { DronePayloadSchema, DronePayloadSchemaType } from '../../utils/add-pauload-schema';
import { DronePayload } from '@/generated/prisma';

type Props = {
  payload: DronePayload & {
    images: { url: string; public_id: string }[];
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
      name: payload.name || '',
      price: payload.price || 0,
      type: payload.type || 'ZENMUSE',
      description: payload.description || '',
      images: payload.images || [],
      features: payload.features?.join('\n') || '',
    },
  });

  const { setValue, watch } = form;
  const images = watch('images');

  useEffect(() => {
    setValue('images', payload.images || []);
  }, [payload.images, setValue]);

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

      const newImage = {
        url: uploadRes.data.secure_url,
        public_id: uploadRes.data.public_id,
      };

      setValue('images', [...(form.getValues('images') || []), newImage]);
    } catch (err) {
      console.error(err);
      setSnackbarMessage('Зураг хуулахад алдаа гарлаа');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    } finally {
      setUploading(false);
    }
  };

  const removeImage = (index: number) => {
    const updated = images?.filter((_, i) => i !== index);
    setValue('images', updated);
  };

  const onSubmit = async (data: DronePayloadSchemaType) => {
    try {
      const cleaned = {
        ...data,
        features: data.features ? data.features.split('\n').filter((f) => f.trim() !== '') : [],
      };
      const res = await axios.put(`/api/payloads/payload?id=${payload.id}`, cleaned);
      if (res.data.success) {
        setSnackbarMessage('Payload амжилттай шинэчлэгдлээ');
        setSnackbarSeverity('success');
        setRefresh((prev) => !prev);
        onClose();
      } else {
        throw new Error();
      }
    } catch (err) {
      console.error(err);
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
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Үнэ ($)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  disabled={form.formState.isSubmitting}
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="images"
          render={() => (
            <FormItem>
              <FormLabel>Зураг</FormLabel>
              <FormControl>
                <Input type="file" accept="image/*" disabled={uploading} onChange={imageUpload} />
              </FormControl>
              <div className="flex flex-wrap gap-2 mt-2">
                {images?.map((img, idx) => (
                  <div key={idx} className="relative w-24 h-24">
                    <Image
                      src={img.url}
                      alt={`uploaded-${idx}`}
                      fill
                      className="object-cover rounded border"
                      sizes="96px"
                    />
                    <Button
                      type="button"
                      className="absolute top-0 right-0 bg-white/80 text-red-600 p-1 rounded-bl"
                      onClick={() => removeImage(idx)}
                    >
                      <Trash2 size={14} />
                    </Button>
                  </div>
                ))}
              </div>
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

        <FormField
          control={form.control}
          name="features"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Онцлогууд (мөрөөр тусгаарлан бичнэ үү)</FormLabel>
              <FormControl>
                <Textarea
                  disabled={form.formState.isSubmitting}
                  className="min-h-[100px]"
                  {...field}
                />
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
