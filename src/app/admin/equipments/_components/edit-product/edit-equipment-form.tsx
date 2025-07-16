'use client';

import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  AddSurveyEquipmentSchema,
  AddSurveyEquipmentSchemaType,
} from '../../utils/add-equipment-schema';
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
import { Snackbar, Alert } from '@mui/material';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Trash2 } from 'lucide-react';
import Image from 'next/image';
import axios from 'axios';
import CircularProgressWithLabel from '@/app/dji/utils/loading-circle';
import { SurveyEquipment } from '@/generated/prisma';

interface Props {
  product: SurveyEquipment & {
    images: { url: string; public_id: string }[];
    specifications: { id: string; label: string; value: string }[];
  };
  setRefresh: Dispatch<SetStateAction<boolean>>;
  onClose: () => void;
}

const equipmentTypes = [
  { value: 'GNSS', label: 'GNSS' },
  { value: 'TOTAL_STATION', label: 'Тотал станц' },
  { value: 'THEODOLITE', label: 'Теодолит' },
  { value: 'AUTO_LEVEL', label: 'Авто нивелир' },
];

export default function EditSurveyEquipmentForm({ product, setRefresh, onClose }: Props) {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');
  const [imageUploading, setImageUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const form = useForm<AddSurveyEquipmentSchemaType>({
    resolver: zodResolver(AddSurveyEquipmentSchema),
    defaultValues: {
      name: product.name,
      price: product.price,
      type: product.type || 'GNSS',
      brand: product.brand || '',
      images: product.images || [],
      description: product.description || '',
      features: product.features?.join('\n') || '',
      specifications: product.specifications || [],
    },
  });

  const { setValue, watch } = form;
  const specifications = watch('specifications');

  useEffect(() => {
    setValue('images', product.images);
    setValue('specifications', product.specifications);
  }, [product.images, product.specifications, setValue]);

  const handleSnackbarClose = () => setSnackbarOpen(false);

  const imageUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    setImageUploading(true);
    try {
      const files = Array.from(event.target.files);
      const response1 = await axios.get(`/api/auth/cloudinary-sign?folder=SurveyEquipment`);
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
        data.append('folder', 'SurveyEquipment');

        const res = await axios.post(
          'https://api.cloudinary.com/v1_1/doluiuzq8/image/upload',
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

        if (res.data) {
          uploadedImageUrls.push(res.data.secure_url);
          uploadedImagePublicIds.push(res.data.public_id);
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

  const addSpecification = () =>
    setValue('specifications', [...(specifications || []), { label: '', value: '' }]);

  const removeSpecification = (index: number) =>
    setValue(
      'specifications',
      (specifications || []).filter((_, i) => i !== index)
    );

  const onSubmit = async (data: AddSurveyEquipmentSchemaType) => {
    try {
      const featuresArray = data.features
        ? data.features.split('\n').filter((f) => f.trim() !== '')
        : [];

      const payload = {
        ...data,
        features: featuresArray,
      };

      const response = await axios.put(`/api/hitargets/hitarget?id=${product.id}`, payload);

      if (response.data.success) {
        setSnackbarSeverity('success');
        setSnackbarMessage('Амжилттай шинэчлэгдлээ');
        setRefresh((prev) => !prev);
        onClose();
      } else {
        throw new Error(response.data.message || 'Шинэчлэхэд алдаа гарлаа');
      }
    } catch (error: any) {
      console.error(error);
      setSnackbarSeverity('error');
      setSnackbarMessage(error.message || 'Алдаа гарлаа');
    } finally {
      setSnackbarOpen(true);
    }
  };

  return (
    <Form {...form}>
      <Snackbar open={snackbarOpen} autoHideDuration={3000} onClose={handleSnackbarClose}>
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
                <FormLabel>Нэр</FormLabel>
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
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Төрөл сонгох" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {equipmentTypes.map((t) => (
                      <SelectItem key={t.value} value={t.value}>
                        {t.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Тайлбар</FormLabel>
              <FormControl>
                <Textarea {...field} disabled={form.formState.isSubmitting} />
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
              <FormLabel>Үнэ (₮)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                  disabled={form.formState.isSubmitting}
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
              <div className="flex justify-between items-center">
                <FormLabel>Зураг</FormLabel>
                {progress > 0 && <CircularProgressWithLabel value={progress} />}
              </div>
              <FormControl>
                <Input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={imageUpload}
                  disabled={imageUploading}
                />
              </FormControl>
              <div className="flex gap-2 mt-2 flex-wrap">
                {field.value?.map((img, idx) => (
                  <div key={idx} className="relative w-24 h-24">
                    <Image
                      src={img.url}
                      alt={`img-${idx}`}
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
                        <Input {...field} disabled={form.formState.isSubmitting} />
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
                        <Input {...field} disabled={form.formState.isSubmitting} />
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

        <Button type="submit" disabled={form.formState.isSubmitting} className="w-full">
          {form.formState.isSubmitting ? 'Шинэчилж байна...' : 'Хадгалах'}
        </Button>
      </form>
    </Form>
  );
}
