'use client';

import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Snackbar, Alert, Checkbox } from '@mui/material';
import {
  AddGarminProductSchema,
  AddGarminProductSchemaType,
} from '../../utlis/add-garmin-product-schema';
import axios from 'axios';
import CircularProgressWithLabel from '@/app/dji/utils/loading-circle';
import Image from 'next/image';

type Props = {
  setRefresh: Dispatch<SetStateAction<boolean>>;
};

export default function GraminProductCreateForm({ setRefresh }: Props) {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');
  const [progress, setProgress] = useState(0);
  const [imageUploading, setImageUploading] = useState(false);
  const form = useForm<AddGarminProductSchemaType>({
    resolver: zodResolver(AddGarminProductSchema),
    defaultValues: {
      name: '',
      category: '',
      price: 0,
      images: [],
      description: '',
      features: '',
      isNew: false,
      rating: 0,
    },
  });

  const { setValue } = form;

  const onSubmit = async (data: AddGarminProductSchemaType) => {
    try {
      const featuresArray = data.features
        ? data.features.split('\n').filter((f) => f.trim() !== '')
        : [];
      const payload = {
        ...data,
        features: featuresArray,
      };
      const response = await axios.post('/api/garmins', payload);
      if (response.data.success) {
        setRefresh((prev) => !prev);
      }
      setSnackbarSeverity('success');
      setSnackbarMessage('Бүтээгдэхүүн амжилттай үүслээ');
      setSnackbarOpen(true);
      form.reset();
    } catch (error) {
      setSnackbarSeverity('error');
      setSnackbarMessage(error instanceof Error ? error.message : 'Алдаа гарлаа');
      setSnackbarOpen(true);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const imageUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    setImageUploading(true);
    try {
      const files = Array.from(event.target.files);

      const response1 = await axios.get(`/api/auth/cloudinary-sign?folder=Garmin/Smartwatch`);
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
        data.append('folder', 'Garmin/Smartwatch');

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

      const combined = uploadedImageUrls.map((url, i) => ({
        url,
        public_id: uploadedImagePublicIds[i],
      }));
      setValue('images', combined);
    } catch (err) {
      console.error(err, 'server error');
    } finally {
      setImageUploading(false);
    }
  };

  return (
    <Form {...form}>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Бүтээгдэхүүний нэр</FormLabel>
                <FormControl>
                  <Input
                    disabled={form.formState.isSubmitting}
                    placeholder="Жишээ: Garmin Fenix 7X"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ангилал</FormLabel>
                <FormControl>
                  <Input
                    disabled={form.formState.isSubmitting}
                    placeholder="Жишээ: Ухаалаг цаг"
                    {...field}
                  />
                </FormControl>
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
            name="rating"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Үнэлгээ (0-5)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    disabled={form.formState.isSubmitting}
                    placeholder="4.5"
                    min={0}
                    max={5}
                    step={0.1}
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="images"
          render={({ field }) => (
            <FormItem>
              <div className=" flex justify-between">
                <FormLabel>Бүтээгдэхүүний зураг</FormLabel>
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
                <Textarea
                  disabled={form.formState.isSubmitting}
                  placeholder="Дэлгэрэнгүй тайлбар..."
                  className="min-h-[100px]"
                  {...field}
                />
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
                  placeholder="-Нарны цэнэглэгч\n-32GB санах ой\n-Олон сувагт GNSS"
                  className="min-h-[100px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="isNew"
          render={({ field }) => (
            <FormItem className="flex items-center space-x-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onChange={field.onChange}
                  disabled={form.formState.isSubmitting}
                />
              </FormControl>
              <FormLabel>Шинэ бүтээгдэхүүн гэж тэмдэглэх</FormLabel>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          disabled={form.formState.isSubmitting}
          className="w-full cursor-pointer"
        >
          {form.formState.isSubmitting ? 'Хадгалж байна...' : 'Үүсгэх'}
        </Button>
      </form>
    </Form>
  );
}
