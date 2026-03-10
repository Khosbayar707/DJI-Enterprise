'use client';

import axios from 'axios';
import { Button } from '@/components/ui/button';

type Props = {
  articleId: string;
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function DeleteArticle({ articleId, setRefresh }: Props) {
  const handleDelete = async () => {
    const confirmDelete = confirm('Энэ нийтлэлийг устгах уу?');

    if (!confirmDelete) return;

    try {
      const res = await axios.delete(`/api/articles/${articleId}`);

      if (res.data.success) {
        setRefresh((prev) => !prev);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Button variant="destructive" size="sm" onClick={handleDelete}>
      Устгах
    </Button>
  );
}
