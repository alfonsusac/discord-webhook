import { cn } from "lazy-cn";
import type { ComponentProps } from "react";

export function Checkbox(
  { className, ...props }: ComponentProps<"input">
) {
  return (
    <input
      type="checkbox"
      className={cn(
        "w-5 h-5 rounded-md appearance-none cursor-pointer",
        "bg-black/5",
        "dark:bg-black/20",
        "checked:bg-discord-button",
        "outline outline-2 outline-transparent outline-offset-2",
        "focus:outline-2",
        "focus:outline-discord-button/80",
        "focus:shadow-md",
        "transition-all",
        "disabled:opacity-40",
        "checked:bg-checkboxtick",
        "bg-no-repeat",
        "bg-center",
        className
      )}
      {...props}
    />
  )
}