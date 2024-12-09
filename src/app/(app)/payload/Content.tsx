import { openPopover, PopoverItem, PopoverMenu } from "@/app/ui/popover"
import { Dialog, DialogBack, DialogClose, DialogMenu, useDialog } from "@/app/ui/dialog"
import { Label } from "@/app/ui/label"
import { Textarea, useTextarea } from "@/app/ui/textarea"
import { useVisualViewportHeight } from "@/app/ui/visualViewport"
import { toHTML } from "@odiffey/discord-markdown"
import { useEffect, useRef, useState } from "react"

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
  const [content, setContent] = useState(initialContent)

  const [textareaRef, resizeTextArea] = useTextarea()

  const [dialogRef, openDialog, closeDialog] = useDialog({ onOpen: resizeTextArea })

  return (
    <>
      <div className="p-2 py-1 -mx-2 -my-1 hover:bg-white/5 rounded-md whitespace-pre -line cursor-pointer relative outline-2 outline-transparent data-[state]:hover:bg-transparent flex overflow-hidden min-w-0 *:min-w-0 break-words"
        onClick={() => {
          openDialog()
          resizeTextArea()
        }}
        onContextMenu={(ev) => {
          ev.preventDefault()
          openPopover("content-context-menu", ev)()
        }}
      >
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
          {content === ""
            ? <span className="text-foreground/30 font-medium">Click to edit content</span>
            : <span className="" dangerouslySetInnerHTML={{
              __html: toHTML(content, {
                discordCallback: {
                  channel: ({ id }) => `<span class="bg-discord-mention px-1 rounded-sm font-medium text-foreground"><span class="opacity-60 mr-1"># Channel:</span>${ id }</span>`,
                  user: ({ id }) => `<span class="bg-discord-mention px-1 rounded-sm font-medium text-foreground"><span class="opacity-60 mr-1">@ User:</span>${ id }</span>`,
                  role: ({ id }) => `<span class="bg-discord-mention px-1 rounded-sm font-medium text-foreground"><span class="opacity-60">@ Role:</span>${ id }</span>`,
                  timestamp: ({ timestamp, style }) => `<span class="bg-discord-foreground/10 px-1 rounded-sm text-foreground">${ new Date(timestamp * 1000).toLocaleDateString() } <span class="text-xs align-top opacity-40">${ style === "R" ? "Relative" : "Full" }</span></span>`,
                }
              })
            }} />}
        </span>
      </div>
      <Dialog ref={dialogRef} onClose={closeDialog} className="overflow-visible">
        <header className="flex items-center gap-1 min-h-6 self-end w-full justify-end">
          <DialogBack onClick={closeDialog} />
          <div className="grow">Edit Content</div>
          <div className="relative">
            <DialogMenu className="peer rounded-md" onClick={openPopover("edit-content-menu")} />
            <PopoverMenu id="edit-content-menu" className="absolute top-full right-0">
              <PopoverItem className="text-red-500 hover:bg-red-500">Remove Content</PopoverItem>
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
        <PopoverItem className="text-red-500 hover:bg-red-500">Remove Content</PopoverItem>
      </PopoverMenu>
    </>
  )
}




