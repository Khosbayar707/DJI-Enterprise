'use client';

import { CustomSnackbar } from '@/app/admin/_components/snackbar';
import { TabsContent } from '@/components/ui/tabs';
import { CustomSpec, ResponseType } from '@/lib/types';
import { Button } from '@mui/material';
import axios from 'axios';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

const SpecAllDescriptions = ({
  spec,
  setRefresh,
}: {
  spec: CustomSpec;
  setRefresh: Dispatch<SetStateAction<boolean>>;
}) => {
  const [response, setResponse] = useState<ResponseType>();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    try {
      setDeletingId(id);
      const res = await axios.delete(`/api/product/specs/item/spec-desc?id=${id}`);
      if (res.data.success) {
        setRefresh((prev) => !prev);
      }
      setResponse(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setDeletingId(null);
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setResponse(undefined);
    }, 3000);
    return () => clearTimeout(timeout);
  }, [response]);

  return (
    <TabsContent value="descriptions">
      {response && <CustomSnackbar value={response} />}
      <div className="flex flex-col gap-4 px-2 py-2">
        {spec.descriptions.length > 0 ? (
          spec.descriptions.map((sp, i) => (
            <div key={sp.id} className="flex justify-between items-start gap-4 border-b pb-3">
              <div className="flex-1 text-sm">
                <div className="font-medium text-base">
                  {i + 1}. {sp.highlight}
                </div>
                <div className="italic text-gray-600 mt-1">{sp.description}</div>
                <div className="text-xs text-gray-500 mt-1">Эрэмбэ: {sp.priority}/5</div>
              </div>
              <Button
                disabled={!!deletingId}
                onClick={() => handleDelete(sp.id)}
                variant="outlined"
                size="small"
              >
                {deletingId === sp.id ? 'Устгаж байна...' : 'Устгах'}
              </Button>
            </div>
          ))
        ) : (
          <div className="text-sm text-gray-500">Дэлгэрэнгүй мэдээлэл алга!</div>
        )}
      </div>
    </TabsContent>
  );
};

export default SpecAllDescriptions;
