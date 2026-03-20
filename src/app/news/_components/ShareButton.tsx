'use client';

import { Share2 } from 'lucide-react';

export default function ShareButton({
  title,
  summary,
  slug,
}: {
  title: string;
  summary?: string;
  slug: string;
}) {
  const handleShare = async () => {
    const url = `${window.location.origin}/news/${slug}`;

    try {
      if (navigator.share) {
        await navigator.share({
          title,
          text: summary || '',
          url,
        });
      } else {
        await navigator.clipboard.writeText(url);
        alert('Link copied to clipboard!');
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <button
      onClick={handleShare}
      className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
    >
      <Share2 className="w-5 h-5 text-gray-600 dark:text-gray-400" />
    </button>
  );
}
