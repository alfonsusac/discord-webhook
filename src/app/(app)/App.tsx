/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { useRef, useState } from "react"
import { Div } from "../ui/div"
import { Row } from "../ui/row"
import { WebhookURLInput, type WebhookData } from "./WebhookURL"
import { ContentEditor, type ContenEditorComponent } from "./payload/Content"
import type { RESTPostAPIWebhookWithTokenJSONBody } from "discord-api-types/v10"
import { AuthorEditor } from "./payload/Author"
import { AvatarEditor } from "./payload/Avatar"
import { PollEditor } from "./payload/Poll"
import { RichPreviewList, type RichPreviewComponent } from "./payload/RichPreview"

export function App() {

  const
    [webhook, setWebhook]
      = useState<WebhookData | null>()

  const
    load
      = () => {
        if (typeof localStorage === "undefined") return {}
        const raw = localStorage?.getItem("payload")
        const data = raw ? JSON.parse(raw) as RESTPostAPIWebhookWithTokenJSONBody : {}
        return data
      },
    payloadRef
      = useRef(load()),
    payload
      = payloadRef.current,
    save
      = () => {
        localStorage?.setItem("payload", JSON.stringify(payload))
      }

  const
    contentEditorRef
      = useRef<ContenEditorComponent>(null),
    richPreviewRef
      = useRef<RichPreviewComponent>(null)

  return (
    <>
      <Div>
        {/* Webhook URL */}
        <WebhookURLInput
          onChange={(data) => {
            // console.log(data)
            setWebhook(data)
          }}
          onSend={async (url) => {

            const finalPayload = {
              ...payload,
              ...process.env.NODE_ENV === "development" ? {
                // poll: {
                //   attachment_ids: [
                //     { id: "123120293fh0234891g03498gh.txt"}
                //   ],
                //   question: {
                //     text: "What is your favourite colour?",
                //   },
                //   answers: [
                //     { poll_media: { text: "Red" } },
                //     { poll_media: { text: "Green" } },
                //     { poll_media: { text: "Blue" } }
                //   ]
                // }
              } satisfies RESTPostAPIWebhookWithTokenJSONBody : {}
            }

            console.log("Payload ", finalPayload)

            // return

            const usingForm = false
            let res: Response
            if (usingForm) {
              const form = new FormData()
              form.set("payload_json", JSON.stringify(finalPayload))
              // attach example file
              form.set("file[0]", new Blob(["Hello World"], { type: "text/plain" }), "testText.txt")
              // // attach example image 
              // // Create a simple black PNG (1x1 pixel)
              // const pngBase64 = "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/wIAAgMBAQFBYwAAAABJRU5ErkJggg==";

              // // Decode the Base64 string and convert it to a Blob
              // const binary = atob(pngBase64);
              // const array = new Uint8Array(binary.length);
              // for (let i = 0; i < binary.length; i++) {
              //   array[i] = binary.charCodeAt(i);
              // }
              // const blob = new Blob([array], { type: "image/png" });

              // form.set("file[1]", blob, "textImage.png")

              res = await fetch(url, {
                method: "POST",
                body: form
              })
            } else {
              res = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(finalPayload)
              })
            }


            if (!res.ok) {
              const json = await res.json()
              if (typeof json === "object") {
                if (typeof json === "object" && 'code' in json && 'message' in json) {
                  throw new Error(json.message)
                }
                const firstKey = Object.keys(json)[0];
                if (!firstKey) throw new Error("Failed to send message")
                if (Array.isArray(json[firstKey])) {
                  throw new Error(firstKey + ' ' + json[firstKey][0])
                }
              }
              throw new Error("Failed to send message")
            }
          }}
        />

        <div className="py-4 pb-0 text-center opacity-30 flex flex-row items-start gap-4 mx-auto">
          <img src="/arrow.svg" className="w-20 h-20" alt="" />
          <div className="font-medium">
            Hover over elements to start editing
          </div>
        </div>

        {/* Webhook Editor */}
        <Div className="mt-8">
          {/* Message */}
          <Row className="pl-[3rem] mobile:pl-[3.5rem] relative text-[0.9em] mobile:text-[1em]">
            {/* Text */}
            <Div className="grow gap-0.5 min-w-0">
              <AvatarEditor
                default={webhook ? "https://cdn.discordapp.com/avatars/" + webhook.id + '/' + webhook.avatar : undefined}
                onChange={avatar => payload.avatar_url = avatar}
              />
              <AuthorEditor
                default={webhook?.name}
                onChange={author => payload.username = author}
              />
              <ContentEditor
                default={process.env.NODE_ENV === "development" ? initialContentTest : defaultContent}
                onChange={(content) => {
                  payload.content = content
                  richPreviewRef.current?.refresh(content ?? "")
                }}
                ref={contentEditorRef}
              />
              <PollEditor
                onChange={(poll) => {
                  payloadRef.current.poll = poll
                }}
              />
              <RichPreviewList
                onSetContent={(content) => contentEditorRef.current?.change(content)}
                ref={richPreviewRef}
              />
            </Div>

          </Row>

        </Div>

      </Div>
    </>
  )
}

export function onClickConsoleLog() {
  console.log("Hello World")
}

const initialContentTest = `Here’s a message using Discord’s markdown and formatting:
Text: Text | Bold: **Bold** | Italic: *Italic* | Underline: __Underline__ | Strikethrough: ~~Strikethrough~~ | Code: \`Code\` | Spoiler: ||Spoiler|| | Link: [Link](https://discord.com) | Emojis: 🎨 | Custom emoji: <:meow_coffee:753870956811911219> | [image link](https://cdn.discordapp.com/embed/avatars/0.png)
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

// for first time users
const defaultContent = `Welcome to alfon's discord-webhook! The easiest way to personalise your Discord server.

To get started with sending messages, you need a webhook URL, you can get one via the "Integrations" tab in your server's settings.

1. Access the server settings by clicking on the settings icon next to the channel name.
2. Proceed to the "Integrations" tab.
3. Select a webhook or create a new one.
4. Copy the URL.
5. Paste the URL in the input field, type your message and click on the "Send" button.
`