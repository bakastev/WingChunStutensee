import { NewsEditorForm } from "@/components/admin/news-editor-form";

export default function AdminNewsNewPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Neuer Artikel</h1>
        <p className="mt-1 text-sm text-zinc-500">
          Mit WYSIWYG-Editor — Überschriften, Listen, Links und Bilder.
        </p>
      </div>
      <NewsEditorForm />
    </div>
  );
}
