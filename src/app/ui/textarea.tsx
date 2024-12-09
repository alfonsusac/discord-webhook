import { cn } from "lazy-cn";
import { useEffect, useImperativeHandle, useRef, type ComponentProps } from "react";

export function Textarea(
  { className, onChangeCapture, ref, ...props }: ComponentProps<"textarea">
) {

  return (<>
    <textarea
      ref={ref}
      onChangeCapture={onChangeCapture ?? (({ currentTarget: textarea }) => {
        textarea.style.height = "auto"
        textarea.style.height = textarea.scrollHeight + "px"
      })}
      {...props}
      className={
        cn(
          "w-full",
          "p-2 px-3 mt-2",
          "rounded-md",
          "bg-black/30",
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


export function useTextarea() {
  const textAreaRef = useRef<HTMLTextAreaElement>(null)

  function resizeTextArea(value?: string) {
    const textArea = textAreaRef.current
    if (!textArea) return
    if (value !== undefined) return textArea.value = value
    textArea.style.height = "auto"
    textArea.style.height = textArea.scrollHeight + "px"
  }

  return [textAreaRef, resizeTextArea] as const
}