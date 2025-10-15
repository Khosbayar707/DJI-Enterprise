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
import CircularProgressWithLabel from '@/app/dji/utils/loading-circle';

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
  const [imageUploading, setImageUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const form = useForm<DronePayloadSchemaType>({
    resolver: zodResolver(DronePayloadSchema),
    defaultValues: {
      name: payload.name || '',
      price: payload.price || 0,
      type: payload.type || 'ZENMUSE',
      description: payload.description || '',
      images: payload.images || [],
      features: payload.features?.join('\n') || '',
      stock: payload.stock ?? 0,
    },
  });

  const { setValue, watch } = form;
  const images = watch('images');

  useEffect(() => {
    setValue('images', payload.images || []);
  }, [payload.images, setValue]);

  const imageUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    setImageUploading(true);
    try {
      const files = Array.from(event.target.files);
      const folder = `Garmin/${form.getValues('type')}`;
      const response1 = await axios.get(`/api/auth/cloudinary-sign?folder=${folder}`);
      if (!response1.data.success) return;

      const { timestamp, signature, api_key } = response1.data.data;
      const uploadedImageUrls: string[] = [];
      const uploadedImagePublicIds: string[] = [];

      for (const file of files) {
        const data = new FormData();
        data.append('file', file);
        data.append('timestamp', timestamp.toString());
        data.append('signature', signature);
        data.append('api_key', api_key);
        data.append('resource_type', 'image');
        data.append('folder', folder);

        const response2 = await axios.post(
          `https://api.cloudinary.com/v1_1/doluiuzq8/image/upload`,
          data,
          {
            onUploadProgress: (progress) => {
              if (progress.total) {
                const percent = Math.round((progress.loaded * 100) / progress.total);
                setProgress(percent);
              }
            },
          }
        );

        if (response2.data) {
          uploadedImageUrls.push(response2.data.secure_url);
          uploadedImagePublicIds.push(response2.data.public_id);
        }
      }

      const newImages = uploadedImageUrls.map((url, i) => ({
        url,
        public_id: uploadedImagePublicIds[i],
      }));

      const currentImages = form.getValues('images') || [];
      const updatedImages = [...currentImages, ...newImages];
      setValue('images', updatedImages);
    } catch (err) {
      console.error(err);
      setSnackbarSeverity('error');
      setSnackbarMessage('Зураг хуулахад алдаа гарлаа');
      setSnackbarOpen(true);
    } finally {
      setImageUploading(false);
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
          name="stock"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Үлдэгдэл (ш)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  inputMode="numeric"
                  min={0}
                  step={1}
                  disabled={form.formState.isSubmitting}
                  {...field}
                  onChange={(e) => {
                    const n = Math.max(0, Math.floor(Number(e.target.value || 0)));
                    field.onChange(n);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="images"
          render={({ field }) => (
            <FormItem>
              <div className="flex justify-between">
                <FormLabel>Бүтээгдэхүүний зургууд</FormLabel>
                {progress > 0 && <CircularProgressWithLabel value={progress} />}
              </div>
              <FormControl>
                <Input
                  type="file"
                  accept="image/*"
                  multiple
                  disabled={imageUploading || form.formState.isSubmitting}
                  onChange={imageUpload}
                />
              </FormControl>
              <div className="flex gap-2 flex-wrap mt-2">
                {field.value?.map((img, i) => (
                  <div key={i} className="relative w-24 h-24">
                    <Image
                      src={img.url}
                      alt="uploaded"
                      fill
                      className="object-cover border rounded"
                      sizes="96px"
                    />
                    <Button
                      type="button"
                      onClick={() => removeImage(i)}
                      className="absolute top-0 right-0 p-1 bg-white bg-opacity-70 rounded-full hover:bg-opacity-100"
                    >
                      <Trash2 className="w-4 h-4 text-red-600" />
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
