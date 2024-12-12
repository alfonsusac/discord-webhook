import type { ComponentProps } from "react";
import { Div } from "./div";
import { cn } from "lazy-cn";

export function HelperTextBox(
  { className, ...props }: ComponentProps<"div">
) {
  return (
    <Div
      className={cn(
        "min-h-4 overflow-hidden text-xs font-semibold mt-1",
        className)}
      {...props}
    />
  )
}
export function SuccessHelperText({ className, ...props }: ComponentProps<"span">) {
  return (<span className={cn("text-green-500", className)} {...props} />)
}
export function ErrorHelperText({ className, ...props }: ComponentProps<"span">) {
  return (<span className={cn("dark:text-red-400 text-red-600", className)} {...props} />)
}
