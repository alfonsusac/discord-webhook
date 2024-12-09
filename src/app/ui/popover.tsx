import { cn } from "lazy-cn";
import { useId, type ComponentProps, type MouseEvent } from "react";
import { isPointerEventInsideRect } from "../utils/rect";
import { addBodyOverflowHidden, removeBodyOverflowHidden } from "../utils/body";

export function PopoverMenu({ className, ...props }: ComponentProps<"ul">) {
  const _id = useId()
  const id = props.id ?? _id
  return (
    <>
      <div
        id={id + '-backdrop'}
        className="backdrop fixed inset-0 hidden data-[open]:block"
        onClick={(ev) => {
          const popover = document.getElementById(id)
          if (!popover) return
          popover.removeAttribute('data-open')
          ev.currentTarget.removeAttribute('data-open')
          removeBodyOverflowHidden(id)
        }}
      />
      <ul
        {...props}
        className={cn(
          "bg-discord-popover p-1.5 min-w-52 rounded-md",
          "absolute",
          "hidden data-[open]:block",
          className
        )}
      />
    </>
  )
}

export function openPopover(id: string, where?: MouseEvent) {
  return () => {
    const popover = document.getElementById(id)
    if (!popover) return
    const backdrop = document.getElementById(id + '-backdrop')
    popover.setAttribute('data-open', '')
    backdrop?.setAttribute('data-open', '')
    if (where) {
      popover.style.left = where.clientX + 'px'
      popover.style.top = where.clientY + 'px'
    }
    addBodyOverflowHidden(id)

    const onPointerDown = (ev: PointerEvent) => {
      if (isPointerEventInsideRect(popover.getBoundingClientRect(), ev)) return
      popover.removeAttribute('data-open')
      backdrop?.removeAttribute('data-open')
      window.removeEventListener('pointerdown', onPointerDown)
      removeBodyOverflowHidden(id)
    }
    window.addEventListener('pointerdown', onPointerDown)
  }
}

export function PopoverItem({ className, ...props }: ComponentProps<"li">) {
  return (
    <li
      className={cn(
        "p-1.5 px-3  rounded-[0.25rem]  cursor-pointer ",
        "text-discord-foreground/80",
        "text-base font-medium",
        "hover:bg-discord-button",
        "hover:text-foreground",
        className
      )}
      {...props}
    >Remove Content</li>
  )
}