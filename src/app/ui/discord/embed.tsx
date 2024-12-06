import { cn } from "lazy-cn";
import type { DetailedHTMLProps, HTMLAttributes } from "react";
import { Div } from "../div";

export function Embed(
  props: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
) {
  return (
    <Div
      {...props}
      className={cn(
        "bg-black/20",
        "rounded",
        "p-3",
        props.className
      )}
      props={{
        style: {
          borderLeft: "5px solid var(--discord-rgb-button)",
        }
      }}
    />
  );
}

export function EmbedTitle(
  props: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
) {
  return (
    <div
      {...props}
      className={cn(
        "font-semibold",
        props.className
      )}

    />
  );
}

export function EmbedText(
  props: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
) {
  return (
    <div
      {...props}
      className={cn(
        "text-sm whitespace-pre-line",
        props.className
      )}
    />
  );
}