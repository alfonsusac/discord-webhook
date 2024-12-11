import { Button } from "@/app/ui/button"
import { Div } from "@/app/ui/div"
import { HoverActionButton, HoverActionGroup } from "@/app/ui/hover-action-button"
import { EditIcon, PlusIcon, TrashIcon } from "@/app/ui/icons"
import { PlaceholderActionButton } from "@/app/ui/placeholder-action-button"
import { Row } from "@/app/ui/row"
import type { RESTAPIPoll, RESTPostAPIWebhookWithTokenJSONBody } from "discord-api-types/v10"
import { useState } from "react"

type PollPayload = RESTAPIPoll


export function PollEditor(props: {
  initial?: PollPayload,
  onChange?: (payload: PollPayload | undefined) => void
}) {
  const
    [poll, setPoll] = useState(() => {
      props.onChange?.(props.initial)
      return props.initial
    }),
    changeInput = (val?: PollPayload) => {
      if (val === undefined) {
        setPoll(undefined)
        props.onChange?.(undefined)
        return
      }
      setPoll(val)
      props.onChange?.(val)
    },
    removePoll = () => changeInput(undefined)

  return (
    <>
      {
        !poll ? (
          <Div className="p-4 rounded-md bg-black/10 mt-1 group">
            <HoverActionGroup className="opacity-100 mobile:opacity-0">
              <HoverActionButton ><EditIcon /></HoverActionButton>
              <HoverActionButton ><TrashIcon /></HoverActionButton>
            </HoverActionGroup>
            <div className="font-semibold -mt-11">What is your favourite colour?</div>
            <div className="text-sm opacity-80">Select one answer</div>
            {
              [
                { text: "Red" },
                { text: "Blue" },
                { text: "Green" }
              ].map((item, i) => {
                return (
                  <Row
                    className="bg-white/5 p-4 rounded-lg
                    transition-all duration-100
                    outline outline-1 outline-transparent
                    hover:outline-foreground/20
                    font-semibold
                    cursor-pointer items-center hover:shadow-md
                    group/item
                    "
                    key={i}>
                    <div className="text-2xl leading-[0]">🤣</div>
                    <div className="grow">{item.text}</div>
                    <EditIcon className="w-5 h-5 opacity-0 group-hover/item:opacity-80 transition-all" />
                  </Row>
                )
              })
            }
            <Row
              className="p-4 h-10 rounded-lg
                    transition-all duration-100
                    hover:bg-white/5
                    cursor-pointer items-center text-foreground/50 hover:text-discord-foreground
                    "
            >
              <PlusIcon className="" />
              <div className="grow"> Add new Item</div>
            </Row>
            <Row className="justify-between items-center text-sm mt-3">
              <Row className="opacity-70">
                <div>0 votes</div>
                <span className="font-bold">·</span>
                <div>49m left</div>
              </Row>
              <Row className="items-center gap-4">
                <div className=" font-semibold select-none">Show results</div>
                <Button>Vote</Button>
              </Row>
            </Row>
          </Div>
        ) : (
          <PlaceholderActionButton>
            <PlusIcon className="inline align-[-0.1rem] mr-1" />
            Click to add a Poll
          </PlaceholderActionButton>
        )
      }
    </>
  )

}