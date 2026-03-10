'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Placeholder from '@tiptap/extension-placeholder';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export default function TipTapEditor({ value, onChange }: Props) {
  const editor = useEditor({
    immediatelyRender: false,

    extensions: [
      StarterKit,
      Image,
      Placeholder.configure({
        placeholder: 'Нийтлэлийн агуулга бичнэ үү...',
      }),
    ],

    content: value,

    editorProps: {
      attributes: {
        class: 'min-h-[200px] border rounded-md p-4 focus:outline-none prose max-w-none',
      },
    },

    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
  });

  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value);
    }
  }, [value, editor]);

  if (!editor) return null;

  const addImage = () => {
    const url = window.prompt('Image URL');

    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  return (
    <div className="space-y-2">
      {/* Toolbar */}
      <div className="flex flex-wrap gap-2 border rounded-md p-2 bg-gray-50">
        <Button
          size="sm"
          type="button"
          variant="outline"
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          Bold
        </Button>

        <Button
          size="sm"
          type="button"
          variant="outline"
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          Italic
        </Button>

        <Button
          size="sm"
          type="button"
          variant="outline"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        >
          H2
        </Button>

        <Button
          size="sm"
          type="button"
          variant="outline"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        >
          Bullet List
        </Button>

        <Button
          size="sm"
          type="button"
          variant="outline"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        >
          Numbered List
        </Button>

        <Button
          size="sm"
          type="button"
          variant="outline"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
        >
          Quote
        </Button>

        <Button
          size="sm"
          type="button"
          variant="outline"
          onClick={() => editor.chain().focus().undo().run()}
        >
          Undo
        </Button>

        <Button
          size="sm"
          type="button"
          variant="outline"
          onClick={() => editor.chain().focus().redo().run()}
        >
          Redo
        </Button>
      </div>

      <EditorContent editor={editor} />
    </div>
  );
}
