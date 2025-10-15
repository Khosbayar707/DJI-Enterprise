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
import CircularProgressWithLabel from '@/app/dji/utils/loading-circle';

type Props = {
  setRefresh: Dispatch<SetStateAction<boolean>>;
};

export default function DronePayloadCreateForm({ setRefresh }: Props) {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const form = useForm<DronePayloadSchemaType>({
    resolver: zodResolver(DronePayloadSchema),
    defaultValues: {
      name: '',
      price: 0,
      stock: 0,
      type: 'ZENMUSE',
      description: '',
      images: [],
      features: '',
    },
  });

  const { setValue } = form;

  const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setUploading(true);

    try {
      const files = Array.from(e.target.files);
      const signRes = await axios.get('/api/auth/cloudinary-sign?folder=DronePayloads');
      const { timestamp, signature, api_key } = signRes.data.data;

      const uploadedImageUrls: string[] = [];
      const uploadedImagePublicIds: string[] = [];

      for (const file of files) {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('timestamp', timestamp.toString());
        formData.append('signature', signature);
        formData.append('api_key', api_key);
        formData.append('folder', 'DronePayloads');

        const uploadRes = await axios.post(
          `https://api.cloudinary.com/v1_1/doluiuzq8/image/upload`,
          formData,
          {
            onUploadProgress: (progressEvent) => {
              if (progressEvent.total) {
                const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                setProgress(percent);
              }
            },
          }
        );

        if (uploadRes.data) {
          uploadedImageUrls.push(uploadRes.data.secure_url);
          uploadedImagePublicIds.push(uploadRes.data.public_id);
        }
      }
      const combined = uploadedImageUrls.map((url, i) => ({
        url,
        public_id: uploadedImagePublicIds[i],
      }));
      setValue('images', combined);
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
      const features = data.features
        ? data.features.split('\n').filter((line) => line.trim() !== '')
        : [];

      const res = await axios.post('/api/payloads', {
        ...data,
        features,
      });

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
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Үнэ ($)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  disabled={form.formState.isSubmitting}
                  placeholder="0.00"
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
                  disabled={form.formState.isSubmitting}
                  placeholder="0"
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
          render={({ field }) => (
            <FormItem>
              <div className="flex justify-between">
                <FormLabel>Бүтээгдэхүүний зураг</FormLabel>
                {progress > 0 && <CircularProgressWithLabel value={progress} />}
              </div>
              <FormControl>
                <Input
                  type="file"
                  accept="image/*"
                  multiple
                  disabled={uploading || form.formState.isSubmitting}
                  onChange={handleImageUpload}
                />
              </FormControl>

              <div className="flex flex-wrap gap-2 mt-2">
                {field.value?.map((img, idx) => (
                  <div key={idx} className="relative w-24 h-24">
                    <Image
                      src={img.url}
                      alt={`uploaded-${idx}`}
                      fill
                      className="object-cover rounded border"
                      sizes="96px"
                    />
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
              <FormLabel>Онцлогууд (мөрөөр бичнэ үү)</FormLabel>
              <FormControl>
                <Textarea
                  disabled={form.formState.isSubmitting}
                  placeholder="20MP Zoom Camera\n1200m LRF\nThermal Camera"
                  className="min-h-[100px]"
                  {...field}
                />
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
