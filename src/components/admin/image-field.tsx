"use client";

import { useState } from "react";
import { ImagePlus, Trash2 } from "lucide-react";
import { MediaPicker } from "@/components/admin/media-picker";
import { Button } from "@/components/ui/shadcn-button";
import { Label } from "@/components/admin/ui";
import { cn } from "@/lib/cn";

type ImageFieldProps = {
  label: string;
  hint?: string;
  value: string;
  onChange: (url: string) => void;
  className?: string;
};

export function ImageField({
  label,
  hint,
  value,
  onChange,
  className,
}: ImageFieldProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className={cn("space-y-3", className)}>
      <div>
        <Label className="text-[0.925rem] text-zinc-900">{label}</Label>
        {hint ? (
          <p className="mt-1 text-[0.8rem] leading-relaxed text-zinc-500">
            {hint}
          </p>
        ) : null}
      </div>

      <div className="overflow-hidden rounded-xl border border-zinc-200 bg-zinc-100">
        {value ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={value} alt="" className="max-h-56 w-full object-cover" />
        ) : (
          <div className="flex h-40 flex-col items-center justify-center gap-2 text-sm text-zinc-400">
            <ImagePlus className="h-7 w-7" strokeWidth={1.5} />
            Kein Bild gewählt
          </div>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        <Button type="button" variant="accent" size="sm" onClick={() => setOpen(true)}>
          <ImagePlus className="h-4 w-4" strokeWidth={1.75} />
          {value ? "Bild wechseln" : "Aus Medien wählen"}
        </Button>
        {value ? (
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => onChange("")}
          >
            <Trash2 className="h-4 w-4" strokeWidth={1.75} />
            Entfernen
          </Button>
        ) : null}
      </div>

      {value ? (
        <p className="truncate font-mono text-[0.7rem] text-zinc-400">{value}</p>
      ) : null}

      <MediaPicker
        open={open}
        onOpenChange={setOpen}
        title={`${label} wählen`}
        onSelect={(urls) => {
          if (urls[0]) onChange(urls[0]);
        }}
      />
    </div>
  );
}
