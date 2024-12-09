import { cn } from "lazy-cn";
import type { DetailedHTMLProps, InputHTMLAttributes } from "react";

export function Input(
  { className, ...props }: DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
) {
  return (
    <input
      {...props}
      className={cn(
        "min-w-0",
        "px-3 py-2 rounded-md",
        "bg-black/30",
        "text-foreground antialiased",
        "transition-all duration-100",
        "outline outline-2 outline-transparent",
        "focus-visible:outline-2 ",
        "focus-visible:outline-discord-button/80",
        "focus-visible:shadow-md",
        className
      )}
    />
  );
}