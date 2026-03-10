'use client';

import { useState } from 'react';
import axios from 'axios';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
import { Button } from '@/components/ui/button';

type Props = {
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function AddArticle({ setRefresh }: Props) {
  const [open, setOpen] = useState(false);

  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async () => {
    try {
      const res = await axios.post('/api/articles', {
        title,
        summary,
        content,
      });

      if (res.data.success) {
        setRefresh((prev) => !prev);
        setOpen(false);
        setTitle('');
        setSummary('');
        setContent('');
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Button onClick={() => setOpen(true)}>Нийтлэл нэмэх</Button>

      <Dialog open={open} onClose={() => setOpen(false)} fullWidth>
        <DialogTitle>Шинэ нийтлэл</DialogTitle>

        <DialogContent className="flex flex-col gap-4 pt-4">
          <TextField
            label="Гарчиг"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
          />

          <TextField
            label="Товч тайлбар"
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            fullWidth
          />

          <TextField
            label="Агуулга"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            fullWidth
            multiline
            rows={5}
          />
        </DialogContent>

        <DialogActions>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Болих
          </Button>

          <Button onClick={handleSubmit}>Хадгалах</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
