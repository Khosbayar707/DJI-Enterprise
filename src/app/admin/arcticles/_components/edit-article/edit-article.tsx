'use client';

import { useState } from 'react';
import axios from 'axios';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
import { Button } from '@/components/ui/button';
import { CustomArticle } from '@/lib/types';

type Props = {
  article: CustomArticle;
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
  onClose: () => void;
};

export default function EditArticleDialog({ article, setRefresh, onClose }: Props) {
  const [title, setTitle] = useState(article.title);
  const [summary, setSummary] = useState(article.summary);
  const [content, setContent] = useState(article.content);

  const handleUpdate = async () => {
    try {
      const res = await axios.patch(`/api/articles/${article.id}`, {
        title,
        summary,
        content,
      });

      if (res.data.success) {
        setRefresh((prev) => !prev);
        onClose();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Dialog open={true} onClose={onClose} fullWidth>
      <DialogTitle>Нийтлэл засах</DialogTitle>

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
          multiline
          rows={5}
          fullWidth
        />
      </DialogContent>

      <DialogActions>
        <Button variant="outline" onClick={onClose}>
          Болих
        </Button>

        <Button onClick={handleUpdate}>Хадгалах</Button>
      </DialogActions>
    </Dialog>
  );
}
