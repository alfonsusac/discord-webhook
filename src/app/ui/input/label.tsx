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
        "text-xs font-bold dark:text-foreground/60 uppercase tracking-tight",
        "text-foreground",
        className
      )}
    />
  )
}