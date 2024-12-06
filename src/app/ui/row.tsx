import { cn } from "lazy-cn";
import type { DetailedHTMLProps, HTMLAttributes } from "react";

export function Row(props: {
  children?: React.ReactNode
  wrap?: boolean
  className?: string
  props?: Omit<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'children' | 'className'>
}) {
  return (
    <div
      className={cn(
        "flex flex-row gap-2",
        props.wrap && "flex-wrap",
        props.className
      )}
      {...props.props}
    >{props.children}</div>
  );
}