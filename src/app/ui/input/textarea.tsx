import { cn } from "lazy-cn";
import { useImperativeHandle, useLayoutEffect, useRef, type ComponentPropsWithRef } from "react";

const resizeTextArea = (textarea: HTMLTextAreaElement | null) => {
  if (!textarea) throw new Error("Textarea is not mounted")
  textarea.style.height = "auto"
  textarea.style.height = textarea.scrollHeight + "px"
}

export function Textarea(
  { className, onChangeCapture, ref, ...props }: ComponentPropsWithRef<"textarea">
) {
  const internalRef = useRef<HTMLTextAreaElement>(null)
  useImperativeHandle(ref, () => ({ ...internalRef.current! }))

  useLayoutEffect(() => {
    resizeTextArea(internalRef.current)
  }, [props.value])

  return (<>
    <textarea
      ref={internalRef}
      onChangeCapture={onChangeCapture ?? (({ currentTarget: textarea }) => {
        textarea.style.height = "auto"
        textarea.style.height = textarea.scrollHeight + "px"
      })}
      {...props}
      className={
        cn(
          "w-full",
          "p-2 px-3",
          "rounded-md",
          "bg-black/10",
          "dark:bg-black/30",
          "text-foreground antialiased",
          "transition-all duration-100",
          "outline outline-2 outline-transparent",
          "focus-visible:outline-2 ",
          "focus-visible:outline-discord-button/80",
          "focus-visible:shadow-md",
          className
        )
      }
    />
  </>
  )
}