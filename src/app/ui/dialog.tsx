import { cn } from "lazy-cn";
import { useId, useRef, type ComponentProps, type SVGProps } from "react";
import { isPointerEventInsideRect } from "../utils/rect";
import { addBodyOverflowHidden, removeBodyOverflowHidden } from "../utils/body";

export function Dialog(
  { className, onClose, onClick, onPointerDown, ...props }:
    ComponentProps<"dialog"> & { onClose?: () => void }
) {
  const initialEventPos = useRef({ clientX: 0, clientY: 0 })
  const id = useId()
  return (
    <>
      <dialog
        id={id}
        onClose={() => {
          removeBodyOverflowHidden('dialog' + id)
        }}
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
          "flex flex-col pointer-events-none open:pointer-events-auto",

          "transition-all",
          "opacity-0 open:opacity-100",
          "scale-75 open:scale-100",

          "backdrop:transition-all backdrop:duration-500",
          "backdrop:opacity-0 open:backdrop:opacity-100",

          "backdrop:bg-black/30 backdrop:animate-in backdrop:fade-in-80",


          "bg-discord-background text-discord-foreground",
          "p-5 shadow-lg outline-none border-none",
          "rounded-none mobile:rounded-md",
          "m-0 mobile:m-auto",
          "w-full max-w-mobile",

          "h-[100svh] mobile:h-min",
          "max-h-none mobile:max-h-[calc(100svh_-_2rem)]",

          "[&>header]:text-lg",
          "[&>header]:font-semibold",
          "[&>header]:pb-3",
          "[&>header]:shrink-0",

          "overflow-y-auto",
          "[&>header]:sticky",
          "[&>header]:top-0",

          "[&>footer]:mt-5",
          "[&>footer]:-mx-5",
          "[&>footer]:-mb-5",
          "[&>footer]:p-5",
          "[&>footer]:bg-black/10",
          className,
        )}
        {...props}
      />
    </>
  )
}

export function useDialog(callback?: {
  onOpen?: () => void,
}) {
  const ref = useRef<HTMLDialogElement>(null)
  const open = () => {
    if (!ref.current) return
    ref.current.showModal()
    addBodyOverflowHidden('dialog' + ref.current.id)
    callback?.onOpen?.()
  }
  const close = () => {
    const dialog = ref.current
    if (!dialog) return
    dialog.close()
  }
  const resize = (height: number) => {
    // const dialog = ref.current
    // if (!dialog) return
    // // dialog.style.height = height + 'px'
    // // dialog.style.minHeight = height + 'px'
  }
  return [ref, open, close, resize] as const
}

export function DialogCircleButton(props: ComponentProps<"div">) {
  return (
    <div
      {...props}
      className={cn(
        "rounded-full hover:bg-black/10 cursor-pointer w-10 h-10 p-2 [&>svg]:w-full [&>svg]:h-full",
        // "focus-visible:outline-discord-button focus-visible:outline-2 focus-visible:outline",
        props.className
      )}
    />
  )
}

export function DialogBack({ className, ...props }: ComponentProps<"div">) {
  return (
    <DialogCircleButton {...props} className={cn("-ml-2 p-2.5 mobile:hidden", className)}>
      <MaterialSymbolsArrowBackIosNew />
    </DialogCircleButton>
  )
}
const MaterialSymbolsArrowBackIosNew = (props: SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}><path fill="currentColor" d="M16 22L6 12L16 2l1.775 1.775L9.55 12l8.225 8.225z"></path></svg>

export function DialogClose({ className, ...props }: ComponentProps<"div">) {
  return (
    <DialogCircleButton {...props} className={cn("", className)}>
      <MaterialSymbolsClose />
    </DialogCircleButton>
  )
}
const MaterialSymbolsClose = (props: SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}><path fill="currentColor" d="M6.4 19L5 17.6l5.6-5.6L5 6.4L6.4 5l5.6 5.6L17.6 5L19 6.4L13.4 12l5.6 5.6l-1.4 1.4l-5.6-5.6z"></path></svg>

export function DialogMenu({ className, ...props }: ComponentProps<"div">) {
  return (
    <DialogCircleButton {...props} className={cn("", className)}>
      <MdiDotsVertical />
    </DialogCircleButton>
  )
}
const MdiDotsVertical = (props: SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}><path fill="currentColor" d="M12 16a2 2 0 0 1 2 2a2 2 0 0 1-2 2a2 2 0 0 1-2-2a2 2 0 0 1 2-2m0-6a2 2 0 0 1 2 2a2 2 0 0 1-2 2a2 2 0 0 1-2-2a2 2 0 0 1 2-2m0-6a2 2 0 0 1 2 2a2 2 0 0 1-2 2a2 2 0 0 1-2-2a2 2 0 0 1 2-2"></path></svg>

