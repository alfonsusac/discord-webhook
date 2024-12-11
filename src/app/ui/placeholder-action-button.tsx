import { cn } from "lazy-cn";
import type { ComponentProps } from "react";

export function PlaceholderActionButton({className, ...props}: ComponentProps<"button">) {

  return (
    <button className={cn(
      "h-9 flex items-center px-2 -mx-2 rounded-md hover:bg-foreground/10 text-foreground/40 cursor-pointer",
      className,
    )} {...props} />
  )
}