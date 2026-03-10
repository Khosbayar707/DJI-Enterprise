'use client';

import axios from 'axios';
import { Button } from '@/components/ui/button';

type Props = {
  articleId: string;
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function DeleteArticle({ articleId, setRefresh }: Props) {
  const handleDelete = async () => {
    if (!confirm('Энэ нийтлэлийг устгах уу?')) return;

    try {
      const res = await axios.delete(`/api/articles/${articleId}`);

      if (res.data?.success) {
        setRefresh((prev) => !prev);
      } else {
        alert('Устгах үед алдаа гарлаа');
      }
    } catch (err) {
      console.error(err);
      alert('Server алдаа гарлаа');
    }
  };

  return (
    <Button variant="destructive" size="sm" onClick={handleDelete}>
      Устгах
    </Button>
  );
}
