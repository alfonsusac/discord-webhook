import { Dialog, DialogBack, DialogClose, useDialog } from "@/app/ui/dialog"
import { HoverActionButton, HoverActionGroup } from "@/app/ui/hover-action-button"
import { EditIcon, ResetIcon, TrashIcon } from "@/app/ui/icons"
import { Input } from "@/app/ui/input"
import { Label } from "@/app/ui/label"
import { useEffect, useState } from "react"

export function AuthorEditor(props: {
  author?: string,
  onChange: (author: string) => void
}) {
  const [author, setAuthor] = useState(props.author)
  const [dialogRef, openDialog, closeDialog] = useDialog()
  const [edited, setEdited] = useState(false)

  useEffect(() => {
    if (!edited) {
      setAuthor(props.author)
    }
  }, [props.author])

  const resetAuthor = () => {
    setAuthor(props.author)
    setEdited(false)
  }
  const editAuthor = () => openDialog()

  return (
    <>
      {/* Author */}
      <div
        className="font-bold p-1 px-2 -m-1 -mx-2 rounded-md cursor-pointer
        tracking-tight select-none group relative
        ">
        <HoverActionGroup className="absolute -top-full">
          <HoverActionButton onClick={editAuthor} ><EditIcon /></HoverActionButton>
          {edited && <HoverActionButton onClick={resetAuthor} ><ResetIcon /></HoverActionButton>}
        </HoverActionGroup>
        {author ?? "Spidey Bot"}
        <span className="mx-1.5 text-xs p-1 py-0.5 align-[2px] bg-discord-button rounded-md">APP</span>
        <span className="font-medium text-xs align-[2px] opacity-60">Today at {new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }).format(new Date())}</span>
      </div>

      {/* Dialog */}
      <Dialog ref={dialogRef} className="overflow-visible">
        <header className="flex items-center gap-1 min-h-6 self-end w-full justify-end">
          <DialogBack onClick={closeDialog} />
          <div className="grow">Edit Author</div>
          <DialogClose onClick={closeDialog} />
        </header>
        <Label>Name</Label>
        <Input
          className="resize-none overscroll-none"
          autoComplete="webhook-author"
          placeholder={author}
          value={author ?? ""}
          onChange={({ target: { value } }) => {
            setAuthor(value)
            setEdited(true)
            props.onChange?.(value)
          }}
        />
      </Dialog>
    </>
  )
}