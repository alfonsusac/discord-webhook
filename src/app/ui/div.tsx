import { cn } from "lazy-cn";
import type { DetailedHTMLProps, HTMLAttributes } from "react";

export function Div(props: {
  children?: React.ReactNode
  className?: string
  row?: boolean
  typography?: boolean
  props?: Omit<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'children' | 'className'>
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-2",
        props.row && "flex-row",
        props.typography && "block",
        props.className
      )}
      {...props.props}
    >{props.children}</div>
  );
}