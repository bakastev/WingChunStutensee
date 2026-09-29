import type { TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/cn";
import { controlClass } from "@/components/ui/input";

export function Textarea({
  className,
  ...props
}: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={cn(controlClass, "min-h-36 resize-y", className)}
      {...props}
    />
  );
}
