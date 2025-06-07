'use client';

import { ResponseType } from '@/lib/types';
import axios from 'axios';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { CustomSnackbar } from '../../snackbar';
import { Loader2 } from 'lucide-react';

type Props = {
  id: string;
  featured: boolean;
  setRefresh: Dispatch<SetStateAction<boolean>>;
};

const FeatureDrone = ({ id, featured, setRefresh }: Props) => {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<ResponseType>();

  const handleFeatureClick = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const res = await axios.post('/api/product/drones/feature', { id });
      if (res.data.success) {
        setRefresh((prev) => !prev);
      }
      setResponse(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!response) return;
    const timeout = setTimeout(() => setResponse(undefined), 3000);
    return () => clearTimeout(timeout);
  }, [response]);

  const buttonText = featured ? 'Нүүр хуудас дээр харуулахаа болих' : 'Нүүр хуудас дээр харуулах';

  return (
    <div className="flex justify-center">
      {response && <CustomSnackbar value={response} />}
      <button
        onClick={handleFeatureClick}
        disabled={loading}
        className={`flex items-center gap-2 px-6 py-2 rounded-2xl text-sm font-medium shadow-md transition duration-200
          ${featured ? 'bg-gray-500 hover:bg-gray-600' : 'bg-blue-600 hover:bg-blue-700'}
          text-white ${loading ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer'}`}
      >
        {loading && <Loader2 className="w-4 h-4 animate-spin" />}
        {buttonText}
      </button>
    </div>
  );
};

export default FeatureDrone;
