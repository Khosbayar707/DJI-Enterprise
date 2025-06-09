'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { CustomSnackbar } from '../snackbar';
import { ResponseType } from '@/lib/types';
import { Loader2, Trash2 } from 'lucide-react';

const MediaCleanUp = () => {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<ResponseType>();

  const deleteMedia = async () => {
    setLoading(true);
    try {
      const res = await axios.delete('/api/images/cleanup');
      setResponse(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!response) return;
    const timeout = setTimeout(() => {
      setResponse(undefined);
    }, 5000);
    return () => clearTimeout(timeout);
  }, [response]);

  return (
    <div className="bg-white border border-gray-200 shadow-md rounded-xl p-6 space-y-4">
      {response && <CustomSnackbar value={response} />}

      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-gray-800">Медиа цэвэрлэгээ</h2>
        <p className="text-gray-700">Энэ хэсэгт таны сайтын бүх зураг болон бичлэг хадгалагдана.</p>
        <p className="text-sm text-gray-600">
          Ашиглагдахгүй байгаа медиаг доорх{' '}
          <span className="font-semibold text-red-600">Цэвэрлэх</span> товчоор устгах боломжтой. Бид
          7 хоногт 1 удаа цэвэрлэгээ хийхийг зөвлөж байна.
        </p>
      </div>

      <Button
        disabled={loading}
        onClick={deleteMedia}
        className="bg-red-600 hover:bg-red-700 text-white flex items-center gap-2 cursor-pointer"
      >
        {loading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Цэвэрлэж байна...
          </>
        ) : (
          <>
            <Trash2 className="h-4 w-4" />
            Цэвэрлэх
          </>
        )}
      </Button>
    </div>
  );
};

export default MediaCleanUp;
