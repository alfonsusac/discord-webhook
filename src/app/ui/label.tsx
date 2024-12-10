import { cn } from "lazy-cn";
import type { DetailedHTMLProps, LabelHTMLAttributes } from "react";

export function Label(
  { className, ...props }: DetailedHTMLProps<LabelHTMLAttributes<HTMLLabelElement>, HTMLLabelElement>
) {
  return (
    <label
      {...props}
      className={cn(
        "block mb-2",
        "text-white text-xs font-bold text-foreground/60 uppercase tracking-tight",
        className
      )}
    />
  )
}