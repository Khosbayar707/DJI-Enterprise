'use client';

import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from 'react';
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
import { Checkbox } from '@/components/ui/checkbox';
import { Snackbar, Alert } from '@mui/material';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import axios from 'axios';
import {
  AddGarminProductSchema,
  AddGarminProductSchemaType,
} from '../../utlis/add-garmin-product-schema';
import { GarminProduct } from '@/generated/prisma';
import CircularProgressWithLabel from '@/app/dji/utils/loading-circle';
import Image from 'next/image';
import { Trash2 } from 'lucide-react';

type Props = {
  product: GarminProduct & {
    images: { url: string; public_id: string }[];
    specifications: { id: string; label: string; value: string }[];
  };
  setRefresh: Dispatch<SetStateAction<boolean>>;
  onClose: () => void;
};

export default function EditProductForm({ product, setRefresh, onClose }: Props) {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');
  const [imageUploading, setImageUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const form = useForm<AddGarminProductSchemaType>({
    resolver: zodResolver(AddGarminProductSchema),
    defaultValues: {
      name: product.name,
      type: product.type || 'SMARTWATCH',
      price: product.price,
      images: product.images || [],
      description: product.description || '',
      features: product.features?.join('\n') || '',
      isNew: product.isNew || false,
      rating: product.rating || 0,
      specifications: product.specifications || [],
    },
  });

  const { setValue, watch } = form;
  const specifications = watch('specifications');

  useEffect(() => {
    setValue('images', product.images);
    setValue('specifications', product.specifications);
  }, [product.images, product.specifications, setValue]);

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

  const addSpecification = () => {
    setValue('specifications', [...(specifications || []), { label: '', value: '' }]);
  };

  const removeSpecification = (index: number) => {
    setValue(
      'specifications',
      (specifications || []).filter((_, i) => i !== index)
    );
  };

  const onSubmit = async (data: AddGarminProductSchemaType) => {
    try {
      const featuresArray = data.features
        ? data.features.split('\n').filter((f) => f.trim() !== '')
        : [];

      const payload = {
        ...data,
        features: featuresArray,
      };

      const response = await axios.put(`/api/garmins/garmin?id=${product.id}`, payload);

      if (response.data.success) {
        setRefresh((prev) => !prev);
        onClose();
        setSnackbarSeverity('success');
        setSnackbarMessage('Бүтээгдэхүүн амжилттай шинэчлэгдлээ');
      } else {
        setSnackbarSeverity('error');
        setSnackbarMessage('Шинэчлэхэд алдаа гарлаа');
      }

      setSnackbarOpen(true);
    } catch (error) {
      console.error(error);
      setSnackbarSeverity('error');
      setSnackbarMessage('Алдаа гарлаа');
      setSnackbarOpen(true);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
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

      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6"
        style={{ maxHeight: 'calc(100vh - 200px)', overflowY: 'auto' }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Бүтээгдэхүүний нэр</FormLabel>
                <FormControl>
                  <Input disabled={form.formState.isSubmitting} {...field} />
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
                <FormLabel>Бүтээгдэхүүний төрөл</FormLabel>
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
                    <SelectItem value="SMARTWATCH">Ухаалаг цаг</SelectItem>
                    <SelectItem value="GPS">GPS</SelectItem>
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
            name="rating"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Үнэлгээ (0-5)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min={0}
                    max={5}
                    step={0.1}
                    disabled={form.formState.isSubmitting}
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
                  className="min-h-[100px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormItem>
          <FormLabel>Тодорхойлолтууд</FormLabel>
          <div className="space-y-4">
            {specifications?.map((_, index) => (
              <div key={index} className="flex gap-4 items-end">
                <FormField
                  control={form.control}
                  name={`specifications.${index}.label`}
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Нэр</FormLabel>
                      <FormControl>
                        <Input
                          disabled={form.formState.isSubmitting}
                          placeholder="Жишээ: Батерейны хугацаа"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`specifications.${index}.value`}
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Утга</FormLabel>
                      <FormControl>
                        <Input
                          disabled={form.formState.isSubmitting}
                          placeholder="Жишээ: 18 хоног"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  onClick={() => removeSpecification(index)}
                  disabled={form.formState.isSubmitting}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              onClick={addSpecification}
              disabled={form.formState.isSubmitting}
            >
              Тодорхойлолт нэмэх
            </Button>
          </div>
        </FormItem>

        <FormField
          control={form.control}
          name="isNew"
          render={({ field }) => (
            <FormItem className="flex items-center space-x-3">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  disabled={form.formState.isSubmitting}
                />
              </FormControl>
              <FormLabel>Шинэ бүтээгдэхүүн</FormLabel>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={onClose}>
            Болих
          </Button>
          <Button type="submit" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? 'Шинэчилж байна...' : 'Хадгалах'}
          </Button>
        </div>
      </form>
    </Form>
  );
}
