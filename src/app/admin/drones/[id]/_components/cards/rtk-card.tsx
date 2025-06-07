'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import {
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
  LinearProgress,
  Button as MuiButton,
} from '@mui/material';
import { Dispatch, SetStateAction, useState, ChangeEvent, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { CustomRTK, ResponseType } from '@/lib/types';
import { CustomSnackbar } from '@/app/admin/_components/snackbar';

const RTKSchema = z.object({
  title: z.string().min(1, 'Гарчиг шаардлагатай'),
  briefDescription: z.string().optional(),
  description: z.string().min(1, 'Дэлгэрэнгүй тайлбар шаардлагатай'),
  public_id: z.string().min(1, 'Видео ID шаардлагатай'),
  droneId: z.string(),
  videoURL: z.string().url(),
});

type FormValues = z.infer<typeof RTKSchema>;

type Props = {
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  RTK: CustomRTK | undefined;
  refresh: boolean;
  setRefresh: Dispatch<SetStateAction<boolean>>;
  id: string;
};

const MAX_VIDEO_SIZE = 100 * 1024 * 1024;

const RTKModuleCard = ({ RTK, id, setRefresh }: Props) => {
  const [hasRTK, setHasRTK] = useState(RTK ? 'yes' : 'no');
  const [videoUploading, setVideoUploading] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const [progress, setProgress] = useState(0);
  const [response, setResponse] = useState<ResponseType>();
  const [publicId, setPublicId] = useState<string>(RTK?.video.public_id || '');

  const form = useForm<FormValues>({
    resolver: zodResolver(RTKSchema),
    defaultValues: {
      title: RTK?.title || '',
      briefDescription: RTK?.briefDescription || '',
      description: RTK?.description || '',
      public_id: RTK?.video.public_id || '',
      droneId: id,
      videoURL: RTK?.video.url || '',
    },
  });

  const watchedVideoURL = form.watch('videoURL');

  const handleToggleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setHasRTK(value);

    if (value === 'no') {
      form.reset();
      setPublicId('');
      setProgress(0);
    }
  };

  const VideoUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || event.target.files.length === 0) return;

    const file = event.target.files[0];
    const isMP4 = file.type === 'video/mp4';
    const isUnderSizeLimit = file.size <= MAX_VIDEO_SIZE;

    if (!isMP4) {
      setResponse({
        success: false,
        code: '',
        message: 'Зөвхөн .mp4 өргөтгөлтэй бичлэг зөвшөөрнө.',
        data: null,
      });
      return;
    }

    if (!isUnderSizeLimit) {
      setResponse({
        success: false,
        code: '',
        message: 'Бичлэгийн хэмжээ 100MB-с бага байх ёстой!',
        data: null,
      });
      return;
    }

    setVideoUploading(true);
    try {
      const response1 = await axios.get(`/api/auth/cloudinary-sign?folder=Drone/Videos/RTK`);
      if (!response1.data.success) return;

      const { timestamp, signature, api_key } = response1.data.data;

      const data = new FormData();
      data.append('file', file);
      data.append('timestamp', timestamp.toString());
      data.append('signature', signature);
      data.append('api_key', api_key);
      data.append('resource_type', 'video');
      data.append('folder', 'Drone/Videos/RTK');

      const response2 = await axios.post(
        `https://api.cloudinary.com/v1_1/doluiuzq8/video/upload`,
        data,
        {
          onUploadProgress: (progressEvent) => {
            if (progressEvent.total) {
              const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
              setProgress(percent);
            }
          },
        }
      );

      if (response2.data) {
        const publicId = response2.data.public_id;
        const secureUrl = response2.data.secure_url;

        setPublicId(publicId);
        form.setValue('public_id', publicId, {
          shouldDirty: true,
          shouldTouch: true,
          shouldValidate: true,
        });
        form.setValue('videoURL', secureUrl, {
          shouldDirty: true,
          shouldTouch: true,
          shouldValidate: true,
        });
      }
    } catch (err) {
      console.error(err, 'Upload error');
      setResponse({
        success: false,
        code: '',
        message: 'Сервер дээр алдаа гарлаа!',
        data: null,
      });
    } finally {
      setVideoUploading(false);
    }
  };

  const handleDelete = async () => {
    if (!RTK?.id) return;
    setDeleting(true);
    try {
      const res = await axios.delete(`/api/product/drones/rtk-module?id=${RTK.id}`);
      setResponse(res.data);
      if (res.data.success) {
        setRefresh((prev) => !prev);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setDeleting(false);
    }
  };

  const handleSubmit = async (values: z.infer<typeof RTKSchema>) => {
    try {
      const res = await axios.post('/api/product/drones/rtk-module', values);
      if (res.data.success) {
        setRefresh((prev) => !prev);
      }
      setResponse(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setResponse(undefined);
    }, 5000);

    return () => clearTimeout(timeout);
  }, [response]);

  return (
    <Card className="shadow-2xl">
      <CardHeader>
        {response && <CustomSnackbar value={response} />}
        <CardTitle>
          <div className="flex items-center justify-between w-full">
            <span>RTK Модуль</span>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <RadioGroup row value={hasRTK} onChange={handleToggleChange} name="hasRTK">
            <FormControlLabel value="yes" control={<Radio />} label="RTK модультай" />
            <FormControlLabel value="no" control={<Radio />} label="RTK модульгүй" />
          </RadioGroup>
        </div>
        {hasRTK === 'yes' && (
          <Form {...form}>
            <form className="space-y-6" onSubmit={form.handleSubmit(handleSubmit)}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <TextField {...field} variant="standard" fullWidth label="Гарчиг" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="briefDescription"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <TextField {...field} variant="standard" fullWidth label="Товч тайлбар" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem className="md:col-span-2 lg:col-span-3">
                      <FormControl>
                        <TextField
                          {...field}
                          variant="standard"
                          fullWidth
                          label="Дэлгэрэнгүй тайлбар"
                          multiline
                          rows={3}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="space-y-4">
                  <MuiButton component="label" variant="outlined" disabled={videoUploading}>
                    {videoUploading ? 'Хуулагдаж байна...' : 'Бичлэг оруулах'}
                    <input type="file" accept="video/mp4" hidden onChange={VideoUpload} />
                  </MuiButton>
                  {videoUploading && <LinearProgress variant="determinate" value={progress} />}
                </div>

                <div className="flex gap-2">
                  <MuiButton
                    type="submit"
                    color="warning"
                    variant="outlined"
                    disabled={!form.formState.isValid || !publicId || videoUploading}
                  >
                    {videoUploading ? 'Түр хүлээнэ үү...' : 'Хадгалах'}
                  </MuiButton>
                  <MuiButton
                    variant="outlined"
                    color="inherit"
                    onClick={() => {
                      form.reset({
                        title: RTK?.title || '',
                        briefDescription: RTK?.briefDescription || '',
                        description: RTK?.description || '',
                        public_id: RTK?.video.public_id || '',
                        droneId: id,
                        videoURL: RTK?.video.url || '',
                      });
                      setPublicId(RTK?.video.public_id || '');
                      setProgress(0);
                    }}
                  >
                    Анхны утгад сэргээх
                  </MuiButton>
                  <MuiButton
                    variant="outlined"
                    color="error"
                    onClick={handleDelete}
                    disabled={videoUploading || deleting}
                  >
                    {deleting ? 'Устгаж байна!' : 'Устгах'}
                  </MuiButton>
                </div>
              </div>

              {watchedVideoURL && (
                <video key={watchedVideoURL} controls width="50%" className="rounded shadow">
                  <source src={watchedVideoURL} type="video/mp4" />
                  <track kind="captions" srcLang="mn" label="Mongolian captions" />
                  Таны браузер видео тоглуулахыг дэмжихгүй байна.
                </video>
              )}
            </form>
          </Form>
        )}
      </CardContent>
    </Card>
  );
};

export default RTKModuleCard;
