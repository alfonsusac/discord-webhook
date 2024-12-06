import { useEffect, useState } from "react";
import { Div } from "../ui/div";
import { Label } from "../ui/label";
import { Row } from "../ui/row";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

export function WebhookURLInput(
  props: {
    onWebhookURLChange?: (webhookUrl: string) => void,
    onSend?: (webhookUrl: string) => void
  }
) {

  const [webhookUrl, setWebhookUrl] = useState<string>("")
  const [loadingWebhookData, setLoadingWebhookData] = useState(false)
  const [webhookData, setWebhookData] = useState<{
    avatar: string | null;
    channel_id: string;
    guild_id: string;
    name: string;
  } | null | {
    message: string;
    code: number
  }>(null)
  const invalidWebhookURL
    = webhookUrl && !webhookUrl.startsWith("https://discord.com/api/webhooks/")

  useEffect(() => {
    if (!webhookUrl) return
    if (invalidWebhookURL) return
    const abortController = new AbortController();
    setLoadingWebhookData(true)
    const timeoutId = setTimeout(() => {
      fetch(webhookUrl, { signal: abortController.signal })
        .then(response => response.json())
        .then(data => setWebhookData(data))
        .catch(error => {
          if (error.name === "AbortError") return
          console.log("Something wrong when fetching information about the webhook")
          console.error(error)
        })
        .finally(() => setLoadingWebhookData(false))
    }, 500)
    return () => {
      clearTimeout(timeoutId)
      abortController.abort()
    }
  }, [webhookUrl, invalidWebhookURL])

  return (
    <Div>
      <Label htmlFor="webhookurl">Webhook URL</Label>
      <Row>
        <Input id="webhookurl" type="text" className="flex-grow" autoComplete="off"
          onChange={(event) => {
            setWebhookUrl(event.target.value)
          }}
        />
        <Button type="button"
          disabled={invalidWebhookURL || !webhookUrl}
        >Send</Button>
      </Row>
      <Div className="h-4 overflow-hidden text-xs font-semibold">
        {invalidWebhookURL
          ? <span className="text-red-400">Invalid URL</span>
          : webhookUrl
            ? loadingWebhookData
              ? "Loading..."
              : webhookData
                ? "code" in webhookData
                  ? <span className="text-red-400">Unable to find webhook</span>
                  : <span><span className="opacity-80">Sending to </span><span className="font-bold">{webhookData.name}</span></span>
                : <span className="text-red-400">Unable to fetch data</span>
            : null}
      </Div>
    </Div>
  )
}