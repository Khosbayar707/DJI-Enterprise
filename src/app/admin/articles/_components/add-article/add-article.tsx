'use client';

import { useState } from 'react';
import { Dialog, DialogTitle, DialogContent } from '@mui/material';
import { Button } from '@/components/ui/button';
import ArticleCreateForm from './article-create-form';

type Props = {
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function AddArticle({ setRefresh }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Нийтлэл нэмэх</Button>

      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="md">
        <DialogTitle>Шинэ нийтлэл</DialogTitle>

        <DialogContent className="pt-4">
          <ArticleCreateForm setRefresh={setRefresh} />
        </DialogContent>
      </Dialog>
    </>
  );
}
