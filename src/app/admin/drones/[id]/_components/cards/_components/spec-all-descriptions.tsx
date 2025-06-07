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
  const [deleting, setDeleting] = useState(false);
  const [deletingId, setId] = useState('');
  const handleDelete = async (id: string) => {
    try {
      setDeleting(true);
      const res = await axios.delete(`/api/product/specs/item/spec-desc?id=${id}`);
      if (res.data.success) {
        setRefresh((prev) => !prev);
      }
      setResponse(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setDeleting(false);
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
      <div>
        {spec.descriptions.length > 0 ? (
          spec.descriptions.map((sp, i) => (
            <div key={sp.id} className=" flex justify-between">
              <div>
                {i + 1}. <span className=" text-xl">{sp.highlight}</span> -{' '}
                <span className=" italic">{sp.highlight}</span> ({sp.priority}
                /5)
              </div>{' '}
              <Button
                disabled={deleting}
                onClick={() => {
                  handleDelete(sp.id);
                  setId(sp.id);
                }}
                variant="text"
              >
                {deleting && deletingId === sp.id ? 'Устгаж байна' : 'Устгах'}
              </Button>
            </div>
          ))
        ) : (
          <div>Дэлгэрэнгүй мэдээлэл алга!</div>
        )}
      </div>
    </TabsContent>
  );
};

export default SpecAllDescriptions;
