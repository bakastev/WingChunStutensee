import { GalleryEditorForm } from "@/components/admin/gallery-editor-form";

export default function AdminGalerieNeuPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Neue Galerie</h1>
        <p className="mt-1 text-sm text-zinc-500">
          Event anlegen und Bilder hochladen.
        </p>
      </div>
      <GalleryEditorForm />
    </div>
  );
}
