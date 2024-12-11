import { cn } from "lazy-cn";
import type { ComponentProps } from "react";

export function HoverActionGroup(
  {className, ...props}: ComponentProps<"div">
) {
  return (
    <div
      className={cn(
        "h-9 p-0.5  rounded-lg",
        "flex border",
        "bg-discord-background border-foreground/10",
        "sticky top-4",
        "transition-all",
        "hover:shadow-xl",
        "hover:border-foreground/20",
        "gap-0.5 self-end flex-initial",

        "opacity-0 group-hover:opacity-100",
        className,
      )}
      {...props}
    />
  )
}

export function HoverActionButton(
  {className, ...props}: ComponentProps<"div">
) {
  return (
    <div
      className={cn(
        "h-full aspect-square p-1 text-foreground/80",
        "transition-all",
        "hover:bg-foreground/5",
        "hover:text-foreground",
        "hover:scale-105",
        "rounded-md cursor-pointer",
        "[&>svg]:w-full",
        "[&>svg]:h-full",
        className,
      )}
      {...props}
    />
  )
}