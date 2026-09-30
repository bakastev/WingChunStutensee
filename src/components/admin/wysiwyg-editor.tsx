"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Underline from "@tiptap/extension-underline";
import Placeholder from "@tiptap/extension-placeholder";
import TextAlign from "@tiptap/extension-text-align";
import CharacterCount from "@tiptap/extension-character-count";
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  Heading2,
  Heading3,
  ImageIcon,
  Italic,
  Link2,
  List,
  ListOrdered,
  Quote,
  Redo2,
  Strikethrough,
  Underline as UnderlineIcon,
  Undo2,
} from "lucide-react";
import { useCallback, useEffect } from "react";
import { Button } from "@/components/ui/shadcn-button";
import { cn } from "@/lib/cn";

type WysiwygEditorProps = {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
  className?: string;
  onUploadImage?: () => Promise<string | null>;
};

export function WysiwygEditor({
  value,
  onChange,
  placeholder = "Text schreiben…",
  className,
  onUploadImage,
}: WysiwygEditorProps) {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3] },
      }),
      Underline,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      CharacterCount,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: { class: "text-yellow-700 underline" },
      }),
      Image.configure({
        HTMLAttributes: { class: "rounded-lg max-w-full h-auto my-4" },
      }),
      Placeholder.configure({ placeholder }),
    ],
    content: value || "",
    editorProps: {
      attributes: {
        class:
          "prose prose-zinc max-w-none min-h-[280px] px-4 py-3 focus:outline-none text-[0.95rem] leading-7",
      },
    },
    onUpdate: ({ editor: ed }) => {
      onChange(ed.getHTML());
    },
  });

  useEffect(() => {
    if (!editor) return;
    const current = editor.getHTML();
    if (value !== current && value !== editor.getText()) {
      editor.commands.setContent(value || "", { emitUpdate: false });
    }
  }, [editor, value]);

  const setLink = useCallback(() => {
    if (!editor) return;
    const prev = editor.getAttributes("link").href as string | undefined;
    const url = window.prompt("Link-URL", prev ?? "https://");
    if (url === null) return;
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  }, [editor]);

  const addImage = useCallback(async () => {
    if (!editor) return;
    if (onUploadImage) {
      const url = await onUploadImage();
      if (url) editor.chain().focus().setImage({ src: url }).run();
      return;
    }
    const { pickMedia } = await import("@/components/admin/media-picker");
    const urls = await pickMedia({ title: "Bild einfügen" });
    if (urls[0]) editor.chain().focus().setImage({ src: urls[0] }).run();
  }, [editor, onUploadImage]);

  if (!editor) {
    return (
      <div className="min-h-[320px] rounded-xl border border-zinc-200 bg-zinc-50" />
    );
  }

  const chars = editor.storage.characterCount?.characters?.() ?? 0;
  const words = editor.storage.characterCount?.words?.() ?? 0;

  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm",
        className,
      )}
    >
      <div className="flex flex-wrap gap-1 border-b border-zinc-200 bg-zinc-50 p-2">
        <Tool
          active={editor.isActive("bold")}
          onClick={() => editor.chain().focus().toggleBold().run()}
          label="Fett"
        >
          <Bold className="h-4 w-4" />
        </Tool>
        <Tool
          active={editor.isActive("italic")}
          onClick={() => editor.chain().focus().toggleItalic().run()}
          label="Kursiv"
        >
          <Italic className="h-4 w-4" />
        </Tool>
        <Tool
          active={editor.isActive("underline")}
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          label="Unterstrichen"
        >
          <UnderlineIcon className="h-4 w-4" />
        </Tool>
        <Tool
          active={editor.isActive("strike")}
          onClick={() => editor.chain().focus().toggleStrike().run()}
          label="Durchgestrichen"
        >
          <Strikethrough className="h-4 w-4" />
        </Tool>
        <Sep />
        <Tool
          active={editor.isActive("heading", { level: 2 })}
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          label="Überschrift 2"
        >
          <Heading2 className="h-4 w-4" />
        </Tool>
        <Tool
          active={editor.isActive("heading", { level: 3 })}
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          label="Überschrift 3"
        >
          <Heading3 className="h-4 w-4" />
        </Tool>
        <Sep />
        <Tool
          active={editor.isActive("bulletList")}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          label="Liste"
        >
          <List className="h-4 w-4" />
        </Tool>
        <Tool
          active={editor.isActive("orderedList")}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          label="Nummerierte Liste"
        >
          <ListOrdered className="h-4 w-4" />
        </Tool>
        <Tool
          active={editor.isActive("blockquote")}
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          label="Zitat"
        >
          <Quote className="h-4 w-4" />
        </Tool>
        <Sep />
        <Tool
          active={editor.isActive({ textAlign: "left" })}
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
          label="Links"
        >
          <AlignLeft className="h-4 w-4" />
        </Tool>
        <Tool
          active={editor.isActive({ textAlign: "center" })}
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
          label="Zentriert"
        >
          <AlignCenter className="h-4 w-4" />
        </Tool>
        <Tool
          active={editor.isActive({ textAlign: "right" })}
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
          label="Rechts"
        >
          <AlignRight className="h-4 w-4" />
        </Tool>
        <Sep />
        <Tool active={editor.isActive("link")} onClick={setLink} label="Link">
          <Link2 className="h-4 w-4" />
        </Tool>
        <Tool onClick={addImage} label="Bild">
          <ImageIcon className="h-4 w-4" />
        </Tool>
        <Sep />
        <Tool onClick={() => editor.chain().focus().undo().run()} label="Rückgängig">
          <Undo2 className="h-4 w-4" />
        </Tool>
        <Tool onClick={() => editor.chain().focus().redo().run()} label="Wiederholen">
          <Redo2 className="h-4 w-4" />
        </Tool>
      </div>
      <EditorContent editor={editor} />
      <div className="flex justify-end gap-3 border-t border-zinc-100 px-3 py-1.5 text-[0.7rem] text-zinc-400">
        <span>{words} Wörter</span>
        <span>{chars} Zeichen</span>
      </div>
    </div>
  );
}

function Sep() {
  return <span aria-hidden className="mx-0.5 hidden h-6 w-px bg-zinc-200 sm:block" />;
}

function Tool({
  children,
  onClick,
  active,
  label,
}: {
  children: React.ReactNode;
  onClick: () => void;
  active?: boolean;
  label: string;
}) {
  return (
    <Button
      type="button"
      size="icon"
      variant={active ? "accent" : "ghost"}
      className="h-8 w-8"
      onClick={onClick}
      aria-label={label}
      title={label}
    >
      {children}
    </Button>
  );
}
