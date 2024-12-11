/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { useRef, useState } from "react"
import { Div } from "../ui/div"
import { Row } from "../ui/row"
import { WebhookURLInput, type WebhookData } from "./WebhookURL"
import { ContentEditor } from "./payload/Content"
import type { RESTPostAPIWebhookWithTokenJSONBody } from "discord-api-types/v10"
import { AuthorEditor } from "./payload/Author"
import { AvatarEditor } from "./payload/Avatar"

export function App() {

  const [webhook, setWebhook] = useState<WebhookData | null>()

  const payloadRef = useRef<RESTPostAPIWebhookWithTokenJSONBody>({})

  return (
    <>
      <Div>
        {/* Webhook URL */}
        <WebhookURLInput
          onChange={(data) => {
            console.log(data)
            setWebhook(data)
          }}
          onSend={async (url) => {
            console.log("Payload ", payloadRef.current)
            const res = await fetch(url, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                ...payloadRef.current,
                embeds: [
                  {
                    title: "Hello",
                  },
                ],
              })
            })
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

        {/* Webhook Editor */}
        <Div className="mt-8">
          {/* Message */}
          <Row className="pl-[3.5rem] relative">
            {/* Text */}
            <Div className="grow gap-1 min-w-0">
              <AvatarEditor
                avatar={webhook ? "https://cdn.discordapp.com/avatars/" + webhook.id + '/' + webhook.avatar : undefined}
                onChange={(author) => { payloadRef.current.avatar_url = author }}
              />
              <AuthorEditor
                author={webhook?.name}
                onChange={(author) => { payloadRef.current.username = author }}
              />
              <ContentEditor
                onChange={(content) => { payloadRef.current.content = content }}
                initial={`Here’s a message using Discord’s markdown and formatting:
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
`}
              />

              {/* <EmbedEditor onChange
              
              /> */}

              {/* Embed */}
              {/* <Div className="mt-1">
                <Embed>
                  <EmbedTitle>Embed Title</EmbedTitle>
                  <EmbedText>
                    {`Discohook is a free tool that allows you to personalise your server to make your server stand out from the crowd. The main way it does this is using webhooks, which allows services like Discohook to send any messages with embeds to your server.

To get started with sending messages, you need a webhook URL, you can get one via the "Integrations" tab in your server's settings. If you're having issues creating a webhook, the bot can help you create one for you.

Keep in mind that Discohook can't do automation yet, it only sends messages when you tell it to. If you are looking for an automatic feed or custom commands this isn't the right tool for you.`}
                  </EmbedText>
                </Embed>
                <div className="text-sm font-semibold p-2 px-4 text-foreground/50 hover:bg-white/5 cursor-pointer rounded-md">
                  + Add More Embed
                </div>
              </Div> */}

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