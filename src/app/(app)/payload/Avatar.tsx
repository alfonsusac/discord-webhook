import { Dialog, useDialog } from "@/app/ui/dialog"
import { useEffect, useState } from "react"

export function AvatarEditor(props: {
  avatar?: string,
  onChange: (avatar: string) => void
}) {
  const [avatar, setAvatar] = useState(props.avatar ?? "https://cdn.discordapp.com/embed/avatars/0.png")
  const [dialogRef, openDialog, closeDialog] = useDialog()
  
  useEffect(() => {
    setAvatar(props.avatar ?? "https://cdn.discordapp.com/embed/avatars/0.png")
  }, [props.avatar])

  return (
    <>
      {/* Avatar */}
      <div
        onClick={openDialog}
      >

      </div>

      {/* Dialog */}
      <Dialog ref={dialogRef} >

      </Dialog>
    </>
  )

}