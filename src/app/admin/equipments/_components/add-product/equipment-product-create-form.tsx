'use client';

import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Snackbar, Alert } from '@mui/material';
import axios from 'axios';
import Image from 'next/image';
import { Trash2 } from 'lucide-react';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import CircularProgressWithLabel from '@/app/dji/utils/loading-circle';
import {
  AddSurveyEquipmentSchema,
  AddSurveyEquipmentSchemaType,
} from '../../utils/add-equipment-schema';

type Props = {
  setRefresh: Dispatch<SetStateAction<boolean>>;
};

const equipmentTypes = [
  { value: 'GNSS', label: 'GNSS' },
  { value: 'TOTAL_STATION', label: 'Тотал станц' },
  { value: 'THEODOLITE', label: 'Теодолит' },
  { value: 'AUTO_LEVEL', label: 'Авто нивелир' },
];

export default function SurveyEquipmentCreateForm({ setRefresh }: Props) {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');
  const [progress, setProgress] = useState(0);
  const [imageUploading, setImageUploading] = useState(false);

  const form = useForm<AddSurveyEquipmentSchemaType>({
    resolver: zodResolver(AddSurveyEquipmentSchema),
    defaultValues: {
      name: '',
      type: 'GNSS',
      brand: '',
      description: '',
      price: 0,
      features: '',
      images: [],
      specifications: [],
    },
  });

  const { setValue, watch } = form;
  const specifications = watch('specifications');

  const onSubmit = async (data: AddSurveyEquipmentSchemaType) => {
    try {
      const featuresArray = data.features
        ? data.features.split('\n').filter((f) => f.trim() !== '')
        : [];
      const payload = {
        ...data,
        features: featuresArray,
      };

      const response = await axios.post('/api/hitargets', payload);
      if (response.data.success) {
        setRefresh((prev) => !prev);
      }
      setSnackbarSeverity('success');
      setSnackbarMessage('Хэмжилтийн багаж амжилттай үүслээ');
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

  const addSpecification = () => {
    setValue('specifications', [...(specifications || []), { label: '', value: '' }]);
  };

  const removeSpecification = (index: number) => {
    setValue(
      'specifications',
      (specifications || []).filter((_, i) => i !== index)
    );
  };

  return (
    <Form {...form}>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity}>
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
                <FormLabel>Нэр *</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Жишээ: South Galaxy G7" />
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
                <FormLabel>Төрөл *</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Сонгох" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {equipmentTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="brand"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Брэнд</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Жишээ: South" />
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
                    placeholder="0"
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
              <FormLabel>Зураг</FormLabel>
              {progress > 0 && <CircularProgressWithLabel value={progress} />}
              <FormControl>
                <Input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={imageUpload}
                  disabled={imageUploading}
                />
              </FormControl>
              <div className="flex gap-2 flex-wrap mt-2">
                {field.value?.map((img, idx) => (
                  <div key={idx} className="relative w-24 h-24">
                    <Image
                      src={img.url}
                      alt={`image-${idx}`}
                      fill
                      sizes="96px"
                      className="rounded object-cover border"
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
                  {...field}
                  placeholder="Дэлгэрэнгүй мэдээлэл..."
                  className="min-h-[100px]"
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
              <FormLabel>Онцлог (мөр тус бүрт бичнэ үү)</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="-Bluetooth\n-WIFI\n-Урт батерей"
                  className="min-h-[100px]"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormItem>
          <FormLabel>Үзүүлэлтүүд</FormLabel>
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
                        <Input placeholder="Сувгийн тоо" {...field} />
                      </FormControl>
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
                        <Input placeholder="1408" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  onClick={() => removeSpecification(index)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
            <Button type="button" onClick={addSpecification} variant="outline">
              Үзүүлэлт нэмэх
            </Button>
          </div>
        </FormItem>
        <Button
          type="submit"
          disabled={form.formState.isSubmitting}
          className="w-full cursor-pointer"
        >
          {form.formState.isSubmitting ? 'Хадгалж байна...' : 'Хадгалах'}
        </Button>
      </form>
    </Form>
  );
}
