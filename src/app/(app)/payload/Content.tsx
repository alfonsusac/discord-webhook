import { closePopover, openPopover, PopoverItem, PopoverMenu } from "@/app/ui/popover"
import { Dialog, DialogBack, DialogClose, DialogMenu, useDialog } from "@/app/ui/dialog"
import { Label } from "@/app/ui/label"
import { Textarea } from "@/app/ui/textarea"
import { toHTML } from "@odiffey/discord-markdown"
import { useState, type SVGProps } from "react"
import { HoverActionButton, HoverActionGroup } from "@/app/ui/hover-action-button"
import { EditIcon, PlusIcon, TrashIcon } from "@/app/ui/icons"

export function ContentEditor(props: {
  initial?: string,
  onChange?: (content: string | undefined) => void
}) {
  const
    dialog = useDialog(),
    [content, setContent] = useState(() => {
      props.onChange?.(props.initial)
      return props.initial
    }),
    changeInput = (val?: string) => {
      if (val === undefined || val === "") {
        setContent(undefined)
        props.onChange?.(undefined)
        return
      }
      setContent(val)
      props.onChange?.(val)
    },
    removeContent
      = () => changeInput(undefined)

  return (
    <>
      <div className="p-2 py-1 -mx-2 -my-1 
      rounded-md whitespace-pre 
      relative outline-2 outline-transparent 
      flex flex-col
      overflow-visible min-w-0 *:min-w-0 break-words
      group
      "
        onContextMenu={(ev) => {
          ev.preventDefault()
          openPopover("content-context-menu", ev)()
        }}
      >
        {
          content === undefined
            ? (
              <button
                onClick={dialog.open}
                className="h-9 flex items-center px-2 -mx-2 rounded-md hover:bg-foreground/10 text-foreground/40 cursor-pointer">
                <PlusIcon className="inline align-[-0.1rem] mr-1" />
                Click to add content
              </button>
            )
            : (
              <div className="flex flex-col w-ful min-h-9">
                <HoverActionGroup className="opacity-100 mobile:opacity-0">
                  {
                    content ? (<>
                      <HoverActionButton onClick={dialog.open}><EditIcon /></HoverActionButton>
                      <HoverActionButton onClick={removeContent}><TrashIcon /></HoverActionButton>
                    </>) : null
                  }
                </HoverActionGroup>
                <div className="-mt-9">
                  <span className="whitespace-pre-line min-w-0 leading-relaxed
                  select-none

                  [&_.d-emoji]:w-5
                  [&_.d-emoji]:inline

                  [&_.d-spoiler]:text-white/5
                  [&_.d-spoiler]:p-1
                  [&_.d-spoiler]:py-0.5
                  [&_.d-spoiler]:rounded-md
                  [&_.d-spoiler]:bg-black/60

                  [&_h1]:text-2xl
                  [&_h1]:font-bold
                  [&_h1]:leading-loose

                  [&_h2]:text-xl
                  [&_h2]:font-bold
                  [&_h2]:leading-loose

                  [&_h3]:text-base
                  [&_h3]:font-bold
                  [&_h3]:leading-loose

                  [&_code]:font-medium
                  [&_code]:text-[0.8rem]
                  [&_code]:p-1
                  [&_code]:py-0.5
                  [&_code]:bg-black/30
                  [&_code]:rounded-md
                  [&_code]:border
                  [&_code]:border-black/20
                  [&_code]:align-[1px]
                  [&_code]:font-mono

                  [&_pre]:bg-black/30
                  [&_pre]:p-1.5
                  [&_pre]:rounded-md
                  [&_pre]:border
                  [&_pre]:border-black/20

                  [&_pre_code]:border-none
                  [&_pre_code]:bg-transparent

                  [&_blockquote]:border-l-4
                  [&_blockquote]:border-foreground/20
                  [&_blockquote]:pl-3

                  [&_a]:pointer-events-none
                  [&_a]:text-discord-link

                  [&_ul]:list-disc
                  [&_ul]:pl-6
                  [&_ol]:list-decimal
                  [&_ol]:pl-6
                ">
                    <span className="" dangerouslySetInnerHTML={{
                      __html: toHTML(content, {
                        discordCallback: {
                          channel: ({ id }) => `<span class="bg-discord-mention px-1 rounded-sm font-medium text-foreground"><span class="opacity-60 mr-1"># Channel:</span>${ id }</span>`,
                          user: ({ id }) => `<span class="bg-discord-mention px-1 rounded-sm font-medium text-foreground"><span class="opacity-60 mr-1">@ User:</span>${ id }</span>`,
                          role: ({ id }) => `<span class="bg-discord-mention px-1 rounded-sm font-medium text-foreground"><span class="opacity-60">@ Role:</span>${ id }</span>`,
                          timestamp: ({ timestamp, style }) => `<span class="bg-discord-foreground/10 px-1 rounded-sm text-foreground">${ new Date(timestamp * 1000).toLocaleDateString() } <span class="text-xs align-top opacity-40">${ style === "R" ? "Relative" : "Full" }</span></span>`,
                        }
                      })
                    }} />
                  </span>
                </div>
              </div>
            )
        }
      </div>
      <Dialog ref={dialog.ref}>
        <header>
          <DialogBack onClick={dialog.close} />
          <div className="grow overflow-hidden truncate">Edit Content</div>
          <div className="ml-auto flex">
            <div className="relative">
              <DialogMenu className="peer rounded-md" onClick={openPopover("edit-content-menu")} />
              <PopoverMenu id="edit-content-menu" className="absolute top-full right-0">
                <PopoverItem onClick={() => {
                  closePopover("edit-content-menu")()
                  removeContent()
                  dialog.close()
                }} className="text-red-500 hover:bg-red-500">Remove Content</PopoverItem>
              </PopoverMenu>
            </div>
            <DialogClose onClick={dialog.close} />
          </div>
        </header>
        <Label>Content</Label>
        <Textarea
          className="resize-none overscroll-none"
          value={content ?? ""}
          onChange={({ target: { value } }) => changeInput(value)}
        />
      </Dialog>
      <PopoverMenu id="content-context-menu" className="fixed">
        {content !== undefined && (
          <PopoverItem onClick={() => {
            closePopover("content-context-menu")()
            removeContent()
          }} className="text-red-500 hover:bg-red-500">Remove Content</PopoverItem>
        )}
        {content === undefined && (
          <PopoverItem onClick={() => {
            closePopover("content-context-menu")()
            dialog.open()
          }}>Add Content</PopoverItem>
        )}
      </PopoverMenu>
    </>
  )
}
