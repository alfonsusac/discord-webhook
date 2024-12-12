import { Dialog, DialogBack, DialogClose, useDialog } from "@/app/ui/dialog"
import { ErrorHelperText, HelperTextBox } from "@/app/ui/helper-text"
import { HoverActionButton, HoverActionGroup } from "@/app/ui/hover-action-button"
import { EditIcon, ResetIcon, TrashIcon } from "@/app/ui/icons"
import { Input } from "@/app/ui/input"
import { Label } from "@/app/ui/label"
import { ibetween } from "@/app/utils/validation"
import { useEffect, useState } from "react"

export function AuthorEditor(props: {
  author?: string,
  onChange: (author?: string) => void
}) {
  const
    dialog = useDialog(),
    [author, setAuthor] = useState<string>(),
    isBetweenRange = ibetween(author?.length, 1, 80),
    changeInput = (val?: string) => {
      if (val === undefined || val === "") {
        setAuthor(undefined)
        props.onChange(undefined)
        return
      }
      setAuthor(val)
      props.onChange?.(val)
    },
    resetAuthor = () => changeInput(undefined),
    edited = author !== undefined


  return (
    <>
      {/* Author */}
      <div
        className="font-bold p-1 px-2 -m-1 -mx-2 rounded-md
        tracking-tight select-none group relative min-w-0 break-words
        ">
        <HoverActionGroup className="absolute -top-9">
          <HoverActionButton onClick={dialog.open} ><EditIcon /></HoverActionButton>
          {edited && <HoverActionButton onClick={resetAuthor} ><ResetIcon /></HoverActionButton>}
        </HoverActionGroup>
        {author ?? props.author ?? "Spidey Bot"}
        <span className="mx-1.5 text-xs p-1 py-0.5 align-[2px] bg-discord-button rounded-md text-white">APP</span>
        <span className="font-medium text-xs align-[2px] opacity-60">Today at {new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }).format(new Date())}</span>
      </div>

      {/* Dialog */}
      <Dialog ref={dialog.ref}>
        <header>
          <DialogBack onClick={dialog.close} />
          <div className="grow">Edit Author</div>
          <DialogClose onClick={dialog.close} />
        </header>
        <Label>Name</Label>
        <Input
          autoComplete="webhook-author"
          placeholder={author ?? props.author ?? "Spidey Bot"}
          value={author ?? ""}
          onChange={({ target: { value } }) => changeInput(value)}
        />
        <HelperTextBox>{
          author
            ? !isBetweenRange
              ? <ErrorHelperText>Author name must be between 1 and 80 characters</ErrorHelperText>
              : null
            : null
        }</HelperTextBox>
      </Dialog>
    </>
  )
}