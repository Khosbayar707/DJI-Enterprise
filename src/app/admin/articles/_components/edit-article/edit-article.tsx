'use client';

import { useState, ChangeEvent } from 'react';
import axios from 'axios';
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@mui/material';
import Image from 'next/image';
import TipTapEditor from '../editor/tiptap-editor';
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
  const [featured, setFeatured] = useState(article.featured);
  const [published, setPublished] = useState(article.published);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [removeImage, setRemoveImage] = useState(false);

  type ArticleImage = {
    url: string;
    public_id: string;
  } | null;

  const [image, setImage] = useState<ArticleImage>(
    article.image
      ? {
          url: article.image.url,
          public_id: article.image.public_id,
        }
      : null
  );

  const handleUpdate = async () => {
    try {
      setSaving(true);

      const res = await axios.patch(`/api/articles/${article.id}`, {
        title,
        summary,
        content,
        featured,
        published,
        image,
        removeImage,
      });

      if (res.data.success) {
        setRefresh((prev) => !prev);
        onClose();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const imageUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;

    try {
      setUploading(true);

      const file = event.target.files[0];

      const sign = await axios.get('/api/auth/cloudinary-sign?folder=Articles');

      const { timestamp, signature, api_key } = sign.data.data;

      const formData = new FormData();
      formData.append('file', file);
      formData.append('timestamp', timestamp);
      formData.append('signature', signature);
      formData.append('api_key', api_key);
      formData.append('folder', 'Articles');

      const upload = await axios.post(
        'https://api.cloudinary.com/v1_1/doluiuzq8/image/upload',
        formData
      );

      setImage({
        url: upload.data.secure_url,
        public_id: upload.data.public_id,
      });
    } catch (err) {
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <Dialog open onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>Нийтлэл засах</DialogTitle>

      <DialogContent className="flex flex-col gap-6 pt-4">
        {/* TITLE */}
        <div>
          <label className="text-sm font-medium">Гарчиг</label>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="DJI Dock 3 Released"
          />
        </div>

        {/* SUMMARY */}
        <div>
          <label className="text-sm font-medium">Товч тайлбар</label>
          <textarea
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            className="w-full border rounded-md p-3 min-h-[90px]"
          />
        </div>

        {/* CONTENT */}
        <div>
          <label className="text-sm font-medium">Агуулга</label>
          <TipTapEditor value={content} onChange={setContent} />
        </div>

        {/* IMAGE */}
        <div>
          <label className="text-sm font-medium">Нийтлэлийн зураг</label>

          <Input type="file" accept="image/*" disabled={uploading} onChange={imageUpload} />

          {image?.url && (
            <div className="mt-3 relative w-[220px]">
              <Image
                src={image.url}
                alt="article"
                width={220}
                height={140}
                className="rounded border"
              />

              <button
                onClick={() => {
                  setImage(null);
                  setRemoveImage(true);
                }}
                className="absolute top-1 right-1 bg-red-500 text-white text-xs px-2 py-1 rounded"
              >
                Delete
              </button>
            </div>
          )}
        </div>

        {/* FEATURED */}
        <div className="flex items-center gap-3">
          <Checkbox checked={featured} onChange={(e) => setFeatured(e.target.checked)} />
          <span>Featured Article</span>
        </div>

        {/* PUBLISHED */}
        <div className="flex items-center gap-3">
          <Checkbox checked={published} onChange={(e) => setPublished(e.target.checked)} />
          <span>Нийтлэх</span>
        </div>
      </DialogContent>

      <DialogActions>
        <Button variant="outline" onClick={onClose}>
          Болих
        </Button>

        <Button disabled={saving || uploading} onClick={handleUpdate}>
          {saving ? 'Saving...' : 'Хадгалах'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
