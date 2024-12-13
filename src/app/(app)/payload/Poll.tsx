import { Button } from "@/app/ui/button"
import { Dialog, DialogBack, useDialog } from "@/app/ui/dialog"
import { Div } from "@/app/ui/div"
import { HelperTextBox } from "@/app/ui/helper-text"
import { HoverActionButton, HoverActionGroup } from "@/app/ui/hover-action-button"
import { EditIcon, PlusIcon, ResetIcon, TrashIcon } from "@/app/ui/icons"
import { Checkbox } from "@/app/ui/input/checkbox"
import { Input } from "@/app/ui/input/input"
import { Label } from "@/app/ui/input/label"
import { PlaceholderActionButton } from "@/app/ui/placeholder-action-button"
import { Row } from "@/app/ui/row"
import { useAnimatedArray } from "@/app/utils/animatedArray"
import type { RESTAPIPoll } from "discord-api-types/v10"
import { cn } from "lazy-cn"
import { use, useEffect, useRef, useState, type ComponentProps, type ComponentPropsWithoutRef, type ReactNode, type SVGProps } from "react"

type PollPayload = RESTAPIPoll & {
  answers: PollAnswerPayload[],
}
type PollAnswerPayload = RESTAPIPoll['answers'][0] & {
  id: string,
}




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
    removePoll = () => changeInput(undefined),
    addPoll = () => changeInput({
      question: { text: "Question?" },
      answers: [{ poll_media: { text: "Answer" }, id: "1" }]
    })

  return (
    <ResizeAnimation
      className="min-h-9"
      dependency={!!poll}
    >
      {
        poll ? (
          <PollObjectEditor
            poll={poll}
            onChange={changeInput}
            onRemove={removePoll}
          />
        ) : (
          <PlaceholderActionButton onClick={addPoll} className="w-full">
            <PlusIcon className="inline align-[-0.1rem] mr-1" />
            Click to add a Poll
          </PlaceholderActionButton>
        )
      }
    </ResizeAnimation>
  )
}

function ResizeAnimation(
  { children, className, dependency, ...props }: ComponentPropsWithoutRef<"div"> & {
    dependency: boolean,
  }
) {
  const ref = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    ref.current!.classList.add("transition-all")
  }, [dependency])

  useEffect(() => {
    const resizeObserver = new ResizeObserver(entries => {
      for (const entry of entries) {
        if (!ref.current) return
        ref.current.style.height = `${ entry.contentRect.height }px`
      }
    });
    resizeObserver.observe(innerRef.current!);
    return () => {
      resizeObserver.disconnect();
    }
  }, [])

  return (
    <div className={cn("relative transition-all", className)}
      ref={ref}
      onTransitionEnd={() => {
        ref.current!.classList.remove("transition-all")
      }}>
      <div className="absolute left-0 top-0 right-0" ref={innerRef}>
        {children}
      </div>
    </div>
  )
}








function PollObjectEditor(props: {
  poll: PollPayload,
  onChange: (poll: PollPayload) => void,
  onRemove: () => void,
}) {
  const
    pollDialog = useDialog(),
    poll = props.poll,
    removePoll = props.onRemove,
    change = props.onChange,
    setQuestion = (text: string) => {
      change({ ...poll, question: { text } })
    },
    setAllowMultipleAnswer = (value: boolean) => {
      change({ ...poll, allow_multiselect: value })
    },
    setDuration = (value: string) => {
      // if value contains char other than number,
      if (value === "")
        return change({ ...poll, duration: undefined })
      if (value.match(/\D/)) return
      const intValue = parseInt(value)
      if (intValue > 768)
        return change({ ...poll, duration: 768 })
      return change({ ...poll, duration: intValue })
    },
    canAddItem = poll.answers.length < 10

  const {
    array: answers,
    uiArray: uiAnswers,
    changeArray: changeAnswersAnimatedArray,
    changeUiArray: changeUiAnswersAnimatedArray,
  } = useAnimatedArray(poll.answers, (newItem) => change({ ...poll, answers: newItem }))

  // Items
  const
    appendItem = () => {
      changeAnswersAnimatedArray([...answers, { poll_media: { text: `Answer #${ answers.length + 1 }` }, id: Math.random().toString() }])
    },
    removeItem = (id: string) => {
      console.log("removing", id)
      changeAnswersAnimatedArray(answers.filter(item => item.id !== id))
    },
    changeItem = (id: string, cb: (prev: PollAnswerPayload) => PollAnswerPayload) => {
      changeAnswersAnimatedArray(answers.map(item => item.id === id ? cb(item) : item))
    }


  return (
    <>
      {/* Preview */}
      <Div
        onMount={(node) => {
          requestAnimationFrame(() => {
            node.classList.add("opacity-100", "h-auto")
          })
        }}
        className="p-4 rounded-md border dark:border-none dark:bg-black/10 mt-1 group transition-all duration-200 h-0 opacity-0"
      >
        <HoverActionGroup className="opacity-100 mobile:opacity-0">
          <HoverActionButton onClick={pollDialog.open} ><EditIcon /></HoverActionButton>
          <HoverActionButton onClick={removePoll} ><TrashIcon /></HoverActionButton>
        </HoverActionGroup>
        <div className="font-semibold -mt-11 min-h-[1.5em]">{poll.question.text}</div>
        <div className="text-sm opacity-80">Select one answer</div>
        <div className="min-h-16">
          {
            uiAnswers.map((item, i) => {
              const isDeleting = item.___isDeleting
              const isFirst = i === 0
              return (
                <Div
                  key={item.id}
                  className={cn(
                    "opacity-0 h-0 pointer-events-none",
                    "transition-all duration-200",
                    isFirst && "opacity-100 h-16 pointer-events-auto",
                    isDeleting && "opacity-0 h-0 pointer-events-none",
                  )}
                  onMount={(node) => {
                    requestAnimationFrame(() => {
                      node.classList.add("opacity-100", "h-16", "pointer-events-auto")
                    })
                  }}
                  onTransitionEnd={() => {
                    if (isDeleting) changeUiAnswersAnimatedArray((prev) => prev.filter(pitem => pitem.id !== item.id))
                  }}
                >
                  <Row
                    className={cn(
                      "h-14",
                      "bg-white/5 px-4 rounded-lg",
                      "transition-all duration-100",
                      "outline outline-1 outline-foreground/10 dark:outline-transparent",
                      "hover:outline-foreground/20",
                      "font-semibold",
                      "cursor-pointer items-center hover:shadow-md",
                      "group/item relative",
                    )}>
                    <div className="grow">{item.poll_media.text}</div>
                    <div
                      className="w-4 h-4 border-white border-2 rounded-lg transition-all"
                      style={{ borderRadius: poll.allow_multiselect ? "15%" : "50%" }}
                    />
                  </Row>
                </Div>
              )
            })
          }</div>

        <Row className="justify-between items-center text-sm mt-0">
          <Row className="opacity-70">
            <div>{poll.duration === undefined
              ? `24h`
              : poll.duration === 1
                ? "59m"
                : poll.duration > 24
                  ? `${ Math.floor(poll.duration / 24) }d`
                  : `${ poll.duration }h`} left</div>
          </Row>
          <Row className="items-center gap-4">
            <div className=" font-semibold select-none">Show results</div>
            <Button>Vote</Button>
          </Row>
        </Row>
      </Div>

      {/* Dialog */}
      <Dialog ref={pollDialog.ref}>
        <header>
          <DialogBack onClick={pollDialog.close} />
          <div className="grow">Edit Poll</div>
        </header>
        <div className="overflow-auto -mx-4 px-4">
          {/* Question */}
          <Div className="gap-0">
            <Label>Question</Label>
            <Input
              placeholder="What's your favorite color?"
              value={poll.question.text ?? ""}
              onChange={({ target: { value } }) => {
                setQuestion(value)
              }} />
          </Div>
          {/* Multiple Answer */}
          <Row className="mt-6 items-center">
            <Checkbox
              id="M"
              checked={poll.allow_multiselect ?? false}
              onChange={({ target: { checked } }) => {
                setAllowMultipleAnswer(checked)
              }}
            />
            <Label className="m-0 cursor-pointer" htmlFor="M">Allow multiple answer?</Label>
          </Row>
          {/* Duration */}
          <Div className="gap-0 mt-6">
            <Label>Duration <span className="font-medium ml-1">(in hours)</span></Label>
            <Input
              value={poll.duration === undefined ? "" : poll.duration}
              onChange={({ target: { value } }) => {
                setDuration(value)
              }}
            />
            <HelperTextBox className="opacity-60">
              = {poll.duration === undefined ? `24h` : poll.duration === 1 ? "60 minute(s)" : poll.duration > 24 ? `${ Math.floor(poll.duration / 24) } day(s)` : `${ poll.duration } hour(s)`}
            </HelperTextBox>
          </Div>
          {/* Answers */}
          <Div className="mt-6 gap-0 overflow-clip -mx-2 px-2">
            <Label className="">Answers <span className="">({poll.answers.length}/10)</span></Label>
            {
              uiAnswers.map((item, i) => {
                return (
                  <PollObjectEditorItem
                    key={item.id}
                    answer={item}
                    canDelete={poll.answers.length > 1}
                    onRemove={() => removeItem(item.id)}
                    isDeleting={item.___isDeleting}
                    onChange={(item) => {
                      changeItem(item.id, () => item)
                    }}
                  />
                )
              })
            }
            <PlaceholderActionButton onClick={appendItem} className={cn(
              "m-0 gap-2 overflow-hidden transition-all duration-200 ease-in h-9",
              canAddItem ? "opacity-100" : "opacity-0 h-0 pointer-events-none"
            )}>
              <PlusIcon /> Add Answer
            </PlaceholderActionButton>
          </Div>
        </div>
      </Dialog>
    </>
  )
}








function PollObjectEditorItem(props: {
  answer: PollAnswerPayload,
  canDelete: boolean,
  isDeleting: boolean,
  onRemove: () => void,
  onChange: (item: PollAnswerPayload) => void,
}) {
  const answer = props.answer
  const canDelete = props.canDelete
  const onDelete = props.onRemove
  const change = props.onChange


  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    requestAnimationFrame(() => {
      ref.current?.classList.add("h-12", "opacity-100", "pointer-events-auto")
    })
  }, [])

  return (
    <Row ref={ref} className={cn(
      "items-start relative gap-2 opacity-0 h-0 pointer-events-none overflow-visible transition-all",
      props.isDeleting && "opacity-0 h-0 pointer-events-none",
    )}>
      <div className="flex w-full">
        <Input
          className="w-full"
          value={answer.poll_media.text ?? ""}
          onChange={({ target: { value } }) => {
            change({ ...answer, poll_media: { text: value } })
          }}
        />
      </div>
      {
        canDelete && (
          <div className="h-10 flex items-center">
            <HoverActionButton
              onClick={onDelete}
              className={cn(
                "w-8 h-8",
              )}><TrashIcon /></HoverActionButton>
          </div>
        )
      }
    </Row>
  )
}



export function MaterialSymbolsCircleOutline(props: SVGProps<SVGSVGElement>) {
  return (<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}><path fill="currentColor" d="M12 22q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22m0-2q3.35 0 5.675-2.325T20 12t-2.325-5.675T12 4T6.325 6.325T4 12t2.325 5.675T12 20m0-8"></path></svg>)
}

export function MaterialSymbolsCropSquareOutline(props: SVGProps<SVGSVGElement>) {
  return (<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}><path fill="currentColor" d="M5 21q-.825 0-1.413-.587Q3 19.825 3 19V5q0-.825.587-1.413Q4.175 3 5 3h14q.825 0 1.413.587Q21 4.175 21 5v14q0 .825-.587 1.413Q19.825 21 19 21Zm0-2h14V5H5v14Zm0 0V5v14Z"></path></svg>)
}