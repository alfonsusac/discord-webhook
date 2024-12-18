import { cn } from "lazy-cn";
import { useEffect, useId, useImperativeHandle, useRef, type ComponentProps, type ComponentPropsWithRef, type SVGProps } from "react";
import { isPointerEventInsideRect } from "../utils/rect";
import { addBodyOverflowHidden, removeBodyOverflowHidden } from "../utils/body";

function openDialogNode(node: HTMLDialogElement | null) {
  if (!node) throw new Error("Dialog is not mounted")
  if (node.open) return
  node.showModal()
  addBodyOverflowHidden('dialog' + node.id)
}

function closeDialogNode(node: HTMLDialogElement | null, cleanupDelay: number) {
  if (!node) throw new Error("Dialog is not mounted")
  if (!node.open) return
  node.close()
  setTimeout(() => removeBodyOverflowHidden('dialog' + node.id), cleanupDelay)
}

export function Dialog(
  { className, open, onClose, onOpenChange, onClick, onPointerDown, closeAnimationDuration, ref, ...props }:
    ComponentPropsWithRef<"dialog"> & {
      onOpenChange?: (open: boolean) => void,
      closeAnimationDuration?: number,
    }
) {
  const cleanupDelay = closeAnimationDuration ?? 150

  const openDialogImperative = () => {
    if (onOpenChange) onOpenChange(true)
    else openDialogNode(innerRef.current)
  }

  const closeDialogImperative = () => {
    if (onOpenChange) onOpenChange(false)
    else closeDialogNode(innerRef.current, cleanupDelay)
  }

  const innerRef = useRef<HTMLDialogElement>(null)
  useImperativeHandle(ref, () => ({
    ...innerRef.current!,
    openDialog: openDialogImperative,
    closeDialog: closeDialogImperative,
  }))

  useEffect(() => {
    if (open === true) openDialogNode(innerRef.current)
    else if (open === false) closeDialogNode(innerRef.current, cleanupDelay)
  }, [open, closeAnimationDuration, cleanupDelay])

  const initialEventPos = useRef({ clientX: 0, clientY: 0 })
  const id = useId()

  return (
    <dialog
      id={id} ref={innerRef}
      onClose={(e) => {
        const node = e.target as HTMLDialogElement
        setTimeout(() => removeBodyOverflowHidden('dialog' + node.id), cleanupDelay)
      }}
      onPointerDown={(event) => {
        initialEventPos.current = { clientX: event.clientX, clientY: event.clientY }
        onPointerDown?.(event)
      }}
      onClick={(event) => {
        const
          rect = event.currentTarget.getBoundingClientRect(),
          isMouseUpInsideDialog = isPointerEventInsideRect(rect, event),
          isMouseDownInsideDialog = isPointerEventInsideRect(rect, initialEventPos.current)

        if (!isMouseUpInsideDialog && !isMouseDownInsideDialog) {
          closeDialogImperative()
        }
        onClick?.(event)
      }}
      className={cn(
        "flex flex-col pointer-events-none open:pointer-events-auto",
        "select-none",

        "fixed top-0 left-0 -right-2 bottom-0",

        "transition-all",
        "opacity-0 open:opacity-100",
        "scale-75 open:scale-100",

        "backdrop:transition-all backdrop:duration-500",
        "backdrop:opacity-0 open:backdrop:opacity-100",

        "backdrop:bg-black/30 backdrop:animate-in backdrop:fade-in-80",

        "bg-discord-background text-discord-foreground",
        "p-4 shadow-lg outline-none border-none",
        "rounded-none mobile:rounded-md",
        "m-0 mobile:m-auto",
        "w-full max-w-mobile",

        "h-[100svh] mobile:h-min",
        "max-h-none mobile:max-h-[calc(100svh_-_2rem)]",

        "overflow-visible",


        "[&>header]:text-lg",
        "[&>header]:font-semibold",
        "[&>header]:pb-3",
        "[&>header]:shrink-0",
        "[&>header]:flex",
        "[&>header]:items-center",
        "[&>header]:w-full",
        "[&>header]:gap-1",
        "[&>header]:min-h-8",

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

export function useDialog() {
  const ref = useRef<HTMLDialogElement & {
    openDialog: () => void,
    closeDialog: () => void,
  }>(null)
  return {
    ref,
    open: () => ref.current?.openDialog(),
    close: () => ref.current?.closeDialog(),
  } as const
}

export function DialogCircleButton(props: ComponentProps<"div">) {
  return (
    <div
      {...props}
      className={cn(
        "rounded-full hover:bg-black/10 cursor-pointer w-10 h-10 p-2 [&>svg]:w-full [&>svg]:h-full shrink-0",
        props.className
      )}
    />
  )
}

export function DialogBack({ className, ...props }: ComponentProps<"div">) {
  return (
    <DialogCircleButton {...props} className={cn("p-2.5 -order-1 mobile:order-last", className)}>
      <MaterialSymbolsArrowBackIosNew className="mobile:hidden" />
      <MaterialSymbolsClose className="hidden mobile:block" />
    </DialogCircleButton>
  )
}
const MaterialSymbolsArrowBackIosNew = (props: SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}><path fill="currentColor" d="M16 22L6 12L16 2l1.775 1.775L9.55 12l8.225 8.225z"></path></svg>

// export function DialogClose({ className, ...props }: ComponentProps<"div">) {
//   return (
//     <DialogCircleButton {...props} className={cn("hidden mobile:block", className)}>
//       <MaterialSymbolsClose />
//     </DialogCircleButton>
//   )
// }
const MaterialSymbolsClose = (props: SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}><path fill="currentColor" d="M6.4 19L5 17.6l5.6-5.6L5 6.4L6.4 5l5.6 5.6L17.6 5L19 6.4L13.4 12l5.6 5.6l-1.4 1.4l-5.6-5.6z"></path></svg>

export function DialogMenu({ className, ...props }: ComponentProps<"div">) {
  return (
    <DialogCircleButton {...props} className={cn("", className)}>
      <MdiDotsVertical />
    </DialogCircleButton>
  )
}
const MdiDotsVertical = (props: SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}><path fill="currentColor" d="M12 16a2 2 0 0 1 2 2a2 2 0 0 1-2 2a2 2 0 0 1-2-2a2 2 0 0 1 2-2m0-6a2 2 0 0 1 2 2a2 2 0 0 1-2 2a2 2 0 0 1-2-2a2 2 0 0 1 2-2m0-6a2 2 0 0 1 2 2a2 2 0 0 1-2 2a2 2 0 0 1-2-2a2 2 0 0 1 2-2"></path></svg>
