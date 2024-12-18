import { cn } from "lazy-cn";
import type { ComponentProps } from "react";

export function Row(
  {
    children,
    className,
    ...props
  }: ComponentProps<"div">
) {
  return (
    <div
      className={cn(
        "flex flex-row gap-2",
        className
      )}
      {...props}
    >{children}</div>
  );
}