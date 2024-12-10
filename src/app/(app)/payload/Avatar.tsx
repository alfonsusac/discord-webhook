import { Dialog, useDialog } from "@/app/ui/dialog"
import { HoverActionButton, HoverActionGroup } from "@/app/ui/hover-action-button"
import { EditIcon, ResetIcon } from "@/app/ui/icons"
import { useEffect, useState } from "react"

export function AvatarEditor(props: {
  avatar: string,
  onChange: (avatar: string) => void
}) {
  const [avatar, setAvatar] = useState(props.avatar)
  const [dialogRef, openDialog, closeDialog] = useDialog()

  useEffect(() => {
    setAvatar(props.avatar)
  }, [props.avatar])

  const resetAvatar = () => setAvatar(props.avatar)
  const editAvatar = () => openDialog()
  const isEdited = avatar !== props.avatar

  return (
    <>
      <div className="absolute left-0 top-0.5 group">
        <div className="rounded-full overflow-hidden outline outline-0 outline-foreground/10 hover:outline-foreground/20
      hover:outline-4 cursor-pointer peer">
          <img src="https://cdn.discordapp.com/embed/avatars/0.png" width="40" height="40" alt="" />
        </div>
        <HoverActionGroup className="absolute -top-full left-1/2 -translate-x-1/2">
          <HoverActionButton onClick={editAvatar} ><EditIcon /></HoverActionButton>
          {isEdited && <HoverActionButton onClick={resetAvatar} ><ResetIcon /></HoverActionButton>}
        </HoverActionGroup>
      </div>


      <Dialog>
        
      </Dialog>
    </>
  )

}