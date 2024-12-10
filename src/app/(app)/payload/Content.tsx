import { closePopover, openPopover, PopoverItem, PopoverMenu } from "@/app/ui/popover"
import { Dialog, DialogBack, DialogClose, DialogMenu, useDialog } from "@/app/ui/dialog"
import { Label } from "@/app/ui/label"
import { Textarea, useTextarea } from "@/app/ui/textarea"
import { useVisualViewportHeight } from "@/app/ui/visualViewport"
import { toHTML } from "@odiffey/discord-markdown"
import { useEffect, useRef, useState, type SVGProps } from "react"
import { HoverActionButton, HoverActionGroup } from "@/app/ui/hover-action-button"

const initialContent = `Here’s a message using Discord’s markdown and formatting:
Text: Text | Bold: **Bold** | Italic: *Italic* | Underline: __Underline__ | Strikethrough: ~~Strikethrough~~ | Code: \`Code\` | Spoiler: ||Spoiler|| | Link: [Link](https://discord.com) | Emojis: 🎨 | Custom emoji: <:meow_coffee:753870956811911219>
Code Block:
\`\`\`Code Block\`\`\`
# Heading
## Headeing 2
### Yes
Block Quote:
> Block Quote
Lists
- Channels: <#766433464055496744>
- Users: <@194128415954173952>
- Roles: <@&1068092523085574204>
Numbered
1. Hello
2. World
Timestamps: <t:1701964800:R> *(Relative)*, <t:1701964800:F> *(Full)*
`
export function ContentEditor(props: {
  initial?: string,
  onChange?: (content: string | undefined) => void
}) {
  const
    [content, setContent] = useState<string | undefined>(initialContent),
    addOrEditContent = () => {
      openDialog()
      if (content === undefined) {
        textareaRef.current!.value = ""
        setContent('')
      }
      resizeTextArea()
    },
    removeContent = () => setContent(undefined)

  const [textareaRef, resizeTextArea] = useTextarea()

  const [dialogRef, openDialog, closeDialog] = useDialog({ onOpen: resizeTextArea })

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
                onClick={addOrEditContent}
                className="h-9 flex items-center px-2 rounded-md hover:bg-foreground/10 text-foreground/40 cursor-pointer">
                <MaterialSymbolsAdd className="inline align-[-0.1rem] mr-1" />
                Click to add content
              </button>
            )
            : (
              <div className="flex flex-col w-ful min-h-9">
                <HoverActionGroup>
                  {
                    content === undefined ? (
                      <HoverActionButton onClick={addOrEditContent}><MaterialSymbolsAdd /></HoverActionButton>
                    ) : (<>
                      <HoverActionButton onClick={addOrEditContent}><MaterialSymbolsEditOutline /></HoverActionButton>
                      <HoverActionButton onClick={removeContent}><MaterialSymbolsDelete /></HoverActionButton>
                    </>)
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
      <Dialog ref={dialogRef} onClose={closeDialog} className="overflow-visible">
        <header className="flex items-center gap-1 min-h-6 self-end w-full justify-end">
          <DialogBack onClick={closeDialog} />
          <div className="grow">Edit Content</div>
          <div className="relative">
            <DialogMenu className="peer rounded-md" onClick={openPopover("edit-content-menu")} />
            <PopoverMenu id="edit-content-menu" className="absolute top-full right-0">
              <PopoverItem onClick={() => {
                closePopover("edit-content-menu")()
                setContent(undefined)
                closeDialog()
              }} className="text-red-500 hover:bg-red-500">Remove Content</PopoverItem>
            </PopoverMenu>
          </div>
          <DialogClose onClick={closeDialog} />
        </header>
        <Label>Content</Label>
        <Textarea
          className="resize-none overscroll-none"
          ref={textareaRef}
          value={content}
          onChange={({ target: { value } }) => {
            setContent(value)
            props.onChange?.(value)
          }}
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
            openDialog()
            if (content === undefined) textareaRef.current!.value = ""
            resizeTextArea()
            setContent('')
          }}>Add Content</PopoverItem>
        )}
      </PopoverMenu>
    </>
  )
}





function MaterialSymbolsAdd(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}><path fill="currentColor" d="M11 13H5v-2h6V5h2v6h6v2h-6v6h-2z"></path></svg>
  )
}


function MaterialSymbolsEditOutline(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}><path fill="currentColor" d="M5 19h1.425L16.2 9.225L14.775 7.8L5 17.575zm-2 2v-4.25L16.2 3.575q.3-.275.663-.425t.762-.15t.775.15t.65.45L20.425 5q.3.275.438.65T21 6.4q0 .4-.137.763t-.438.662L7.25 21zM19 6.4L17.6 5zm-3.525 2.125l-.7-.725L16.2 9.225z"></path></svg>
  )
}



function MaterialSymbolsDelete(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}><path fill="currentColor" d="M7 21q-.825 0-1.412-.587T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413T17 21zm2-4h2V8H9zm4 0h2V8h-2z"></path></svg>
  )
}