import { Button } from "@/app/ui/button"
import { Dialog, useDialog } from "@/app/ui/dialog"
import { Input } from "@/app/ui/input"
import { useRef, useState } from "react"

const initialContent = `Hey, welcome to Alfon's Discord Webhook Editor! The easiest way to personalise your Discord server.`

export function ContentEditor() {
  const [content, setContent] = useState(initialContent)

  const { ref, openDialog, closeDialog } = useDialog({
    className: "transition-all scale-50 backdrop:transition-all backdrop:opacity-0",
    duration: 100
  })

  return (
    <>
      <div className="p-2 py-1 -mx-2 -my-1 hover:bg-white/5
      rounded-md whitespace-pre-line cursor-pointer relative outline-2 outline-transparent data-[state]:hover:bg-transparent"
        onClick={openDialog}
      >
        <span className="whitespace-pre-line">
          {content}
        </span>
      </div>
      <Dialog ref={ref} onClose={closeDialog}>
        <header>Edit Content</header>
        <Input
          className="mt-2 w-full"
          value={content}
          multiple
          onChange={(event) => setContent(event.target.value)}
        />
        <footer>
          <Button>Save</Button>
        </footer>
      </Dialog>
    </>
  )
}