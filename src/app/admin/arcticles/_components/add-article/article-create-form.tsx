'use client';

import { Dispatch, SetStateAction, useState, ChangeEvent } from 'react';
import { useForm } from 'react-hook-form';
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

import axios from 'axios';
import { Snackbar, Alert, Checkbox } from '@mui/material';
import Image from 'next/image';
import TipTapEditor from '../editor/tiptap-editor';

type Props = {
  setRefresh: Dispatch<SetStateAction<boolean>>;
};

type ArticleFormType = {
  title: string;
  summary: string;
  content: string;
  featured: boolean;
  published: boolean;
  image?: {
    url: string;
    public_id: string;
  };
};

export default function ArticleCreateForm({ setRefresh }: Props) {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');

  const [uploading, setUploading] = useState(false);

  const form = useForm<ArticleFormType>({
    defaultValues: {
      title: '',
      summary: '',
      content: '',
      featured: false,
      published: true,
      image: undefined,
    },
  });

  const { setValue, watch } = form;
  const image = watch('image');

  const onSubmit = async (data: ArticleFormType) => {
    try {
      const response = await axios.post('/api/article', data);

      if (response.data.success) {
        setRefresh((prev) => !prev);
        form.reset();
      }

      setSnackbarSeverity('success');
      setSnackbarMessage('Нийтлэл амжилттай үүслээ');
      setSnackbarOpen(true);
    } catch (error) {
      setSnackbarSeverity('error');
      setSnackbarMessage('Алдаа гарлаа');
      setSnackbarOpen(true);
    }
  };

  const imageUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;

    try {
      setUploading(true);

      const file = event.target.files[0];

      const response1 = await axios.get(`/api/auth/cloudinary-sign?folder=Articles`);

      if (!response1.data.success) return;

      const { timestamp, signature, api_key } = response1.data.data;

      const data = new FormData();
      data.append('file', file);
      data.append('timestamp', timestamp.toString());
      data.append('signature', signature);
      data.append('api_key', api_key);
      data.append('folder', 'Articles');

      const response2 = await axios.post(
        `https://api.cloudinary.com/v1_1/doluiuzq8/image/upload`,
        data
      );

      if (response2.data) {
        setValue('image', {
          url: response2.data.secure_url,
          public_id: response2.data.public_id,
        });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setUploading(false);
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

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Гарчиг</FormLabel>
              <FormControl>
                <Input placeholder="DJI Dock 3 Released" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="summary"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Товч тайлбар</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Нийтлэлийн товч тайлбар..."
                  className="min-h-[80px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Агуулга</FormLabel>
              <FormControl>
                <TipTapEditor value={field.value} onChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormItem>
          <FormLabel>Нийтлэлийн зураг</FormLabel>

          <Input type="file" accept="image/*" disabled={uploading} onChange={imageUpload} />

          {image?.url && (
            <div className="mt-3">
              <Image
                src={image.url}
                alt="article image"
                width={200}
                height={120}
                className="rounded border"
              />
            </div>
          )}
        </FormItem>

        <FormField
          control={form.control}
          name="featured"
          render={({ field }) => (
            <FormItem className="flex items-center gap-3">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onChange={(_, checked) => field.onChange(checked)}
                />
              </FormControl>
              <FormLabel>Featured Article</FormLabel>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="published"
          render={({ field }) => (
            <FormItem className="flex items-center gap-3">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onChange={(_, checked) => field.onChange(checked)}
                />
              </FormControl>
              <FormLabel>Нийтлэх</FormLabel>
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          Нийтлэл үүсгэх
        </Button>
      </form>
    </Form>
  );
}
