/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { useState } from "react"
import { Div } from "../ui/div"
import { Row } from "../ui/row"
import { WebhookURLInput } from "./WebhookURL"
import { ContentEditor } from "./payload/Content"
import type { RESTPostAPIWebhookWithTokenJSONBody } from "discord-api-types/v10"

export function App() {

  const [webhookUrl, setWebhookUrl] = useState<string>("")

  const [payload, setPayload] = useState<RESTPostAPIWebhookWithTokenJSONBody>({})

  return (
    <>
      <Div>
        {/* Webhook URL */}
        <WebhookURLInput
          onChange={setWebhookUrl}
          onSend={async () => {
            // Emulate error after delay 1000ms
            await fetch(webhookUrl, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(payload)
            })
          }}
        />

        {/* Webhook Editor */}
        <Div className="mt-8">
          {/* Message */}
          <Row className="pl-[3.5rem] relative">
            {/* PFP */}
            <div className="rounded-full overflow-hidden absolute left-0 top-0.5">
              <img src="https://cdn.discordapp.com/embed/avatars/0.png" width="40" height="40" alt="" />
            </div>
            {/* Text */}
            <Div className="grow gap-1 min-w-0">
              {/* Auhor */}
              <span className="font-bold tracking-tight">Ray So Spidey Bot
                <span className="mx-1.5 text-xs p-1 py-0.5 align-[2px] bg-discord-button rounded-md">APP</span>
                <span className="font-medium text-xs align-[2px] opacity-60">Today at {new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }).format(new Date())}</span>
              </span>

              {/* Content */}
              <ContentEditor onChange={(content) => {
                setPayload(prev => ({ ...prev, content }))
              }} />

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