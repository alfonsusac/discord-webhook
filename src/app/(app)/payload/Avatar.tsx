import { Dialog, DialogBack, useDialog } from "@/app/ui/dialog"
import { ErrorHelperText, HelperTextBox, SuccessHelperText } from "@/app/ui/helper-text"
import { HoverActionButton, HoverActionGroup } from "@/app/ui/hover-action-button"
import { EditIcon, ResetIcon } from "@/app/ui/icons"
import { Label } from "@/app/ui/input/label"
import { Textarea } from "@/app/ui/input/textarea"
import { isValidURL } from "@/app/utils/validation"
import { useCallback, useEffect, useState } from "react"

export function AvatarEditor(props: {
  defaultValue?: string,
  avatar: string | undefined,
  onChange: (avatar: string | undefined) => void
}) {
  const
    { defaultValue, avatar, onChange } = props,
    dialog = useDialog(),
    isValid = isValidURL(avatar!),
    edited = avatar !== undefined,
    changeInput = (val: string | undefined) => onChange(val || undefined),
    resetAvatar = () => changeInput(undefined)

  return (
    <>
      {/* Avatar */}
      <div className="absolute left-0 top-0.5 group">
        <div className="rounded-full overflow-hidden peer">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={(avatar ?? defaultValue ?? "https://cdn.discordapp.com/embed/avatars/0.png") || undefined} width="40" height="40" alt="" />
        </div>
        <HoverActionGroup className="absolute -top-full left-1/2 -translate-x-1/2">
          <HoverActionButton onClick={dialog.open} ><EditIcon /></HoverActionButton>
          {edited && <HoverActionButton onClick={resetAvatar} ><ResetIcon /></HoverActionButton>}
        </HoverActionGroup>
      </div>

      {/* Dialog */}
      <Dialog ref={dialog.ref}>
        <header>
          <DialogBack onClick={dialog.close} />
          <div className="grow">Edit Avatar</div>
        </header>
        <Label>URL</Label>
        <Textarea
          autoComplete="webhook-author"
          placeholder={defaultValue}
          value={avatar ?? ""}
          onChange={({ target: { value } }) => changeInput(value)}
        />
        <HelperTextBox>{
          (avatar && !isValid) ? <ErrorHelperText>Invalid URL</ErrorHelperText> : null
        }</HelperTextBox>
      </Dialog>
    </>
  )

}