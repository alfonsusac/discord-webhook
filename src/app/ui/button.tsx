import { cn } from "lazy-cn";
import type { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

export function Button(
  { className, ...props }: DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
) {
  return (
    <button
      {...props}
      className={cn(
        "px-6 py-2 rounded-[0.3rem]",
        "bg-discord-button",
        "text-[0.85rem] tracking-tight font-bold text-white",
        "shadow-sm",
        "hover:shadow-md",
        "hover:brightness-90",
        "transition-all duration-100",
        `focus-visible:outline-2 focus-visible:outline-blue-400`,
        "disabled:opacity-60",
        "disabled:saturate-[0.7]",
        "disabled:pointer-events-none",
        className,
      )}
    />
  )
}