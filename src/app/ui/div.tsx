import { cn } from "lazy-cn";
import { useEffect, useImperativeHandle, useRef, useState, type ComponentProps, type ComponentPropsWithRef, type DetailedHTMLProps, type HTMLAttributes } from "react";

export function Div(
  { className, ref, onMount, ...props }: ComponentPropsWithRef<"div">
    & { onMount?: (node: HTMLDivElement) => void }
) {
  const _ref = useRef<HTMLDivElement>(null);
  useImperativeHandle(ref, () => _ref.current!);

  useEffect(() => {
    onMount?.(_ref.current!);
  }, [])

  return (
    <div ref={_ref} className={cn("flex flex-col gap-2", className)} {...props} />
  );
}