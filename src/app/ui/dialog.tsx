import { cn } from "lazy-cn";
import { useRef, type ComponentProps } from "react";
import { isPointerEventInsideRect } from "../utils/rect";

export function Dialog(
  { className, onClose, onClick, onPointerDown, ...props }:
    ComponentProps<"dialog"> & { onClose?: () => void }
) {
  const initialEventPos = useRef({ clientX: 0, clientY: 0 })
  return (
    <dialog
      onPointerDown={onPointerDown ?? ((event) => {
        initialEventPos.current = { clientX: event.clientX, clientY: event.clientY }
      })}
      onClick={onClick ?? ((event) => {
        const
          rect = event.currentTarget.getBoundingClientRect(),
          isMouseInsideMouseUp = isPointerEventInsideRect(rect, event),
          isMouseInsideMouseDown = isPointerEventInsideRect(rect, initialEventPos.current)

        if (!isMouseInsideMouseUp && !isMouseInsideMouseDown)
          onClose?.()
      })}
      className={cn(
        "hidden open:block group",
        "backdrop:bg-black/30 backdrop:animate-in backdrop:fade-in-80 animate-in zoom-in-75",
        "bg-discord-background text-discord-foreground",
        "p-5 rounded-md shadow-lg outline-none border-none",
        "w-full max-w-lg",
        "[&>header]:text-lg",
        "[&>header]:font-semibold",
        "[&>footer]:mt-5",
        "[&>footer]:-mx-5",
        "[&>footer]:-mb-5",
        "[&>footer]:p-5",
        "[&>footer]:bg-black/10",
        className,
      )}
      {...props}
    />
  )
}

export function useDialog(exitAnimation: {
  className: string,
  duration: number,
}) {
  const ref = useRef<HTMLDialogElement>(null)
  const openDialog = () => ref.current?.showModal()
  const closeDialog = () => {
    const dialog = ref.current
    if (!dialog) return
    const className = exitAnimation.className.split(" ")
    dialog.classList.add(...className)
    setTimeout(() => {
      dialog.close()
      dialog.classList.remove(...className)
    }, exitAnimation.duration)
  }
  return { ref, openDialog, closeDialog }
}