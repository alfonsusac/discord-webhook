import { useEffect, useState, useTransition } from "react";
import { Div } from "../ui/div";
import { Label } from "../ui/label";
import { Row } from "../ui/row";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

export function WebhookURLInput(
  props: {
    onChange?: (webhookUrl: string) => void,
    onSend?: (webhookUrl: string) => Promise<void>
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

  const [isSending, startTransition] = useTransition()
  const [error, setError] = useState<Error | null>(null)

  return (
    <Div>
      <Label htmlFor="webhookurl">Webhook URL</Label>
      <Row>
        <Input id="webhookurl" type="text" className="flex-grow" autoComplete="off"
          onChange={(event) => {
            setWebhookUrl(event.target.value)
            props.onChange?.(event.target.value)
          }}
        />
        <Button type="button"
          disabled={invalidWebhookURL || !webhookUrl || isSending || loadingWebhookData}
          onClick={() => startTransition(async () => {
            try {
              setError(null)
              await props.onSend?.(webhookUrl)
            } catch (error) {
              if (error instanceof Error) setError(error)
              else console.log(error)
            }
          })}
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
                  : !error
                    ? <span><span className="opacity-80">Sending to </span><span className="font-bold">{webhookData.name}</span></span>
                    : <span className="text-red-400"><span className="opacity-80">Error sending to {webhookData.name}</span>: {error.message}</span>
                : <span className="text-red-400">Unable to fetch data</span>
            : null}
      </Div>
    </Div>
  )
}