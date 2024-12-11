import { useEffect, useState, useTransition } from "react";
import { Div } from "../ui/div";
import { Label } from "../ui/label";
import { Row } from "../ui/row";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useMounted } from "../utils/mounted";
import { ErrorHelperText, HelperTextBox, SuccessHelperText } from "../ui/helper-text";

export type WebhookData = {
  id: string;
  avatar: string | undefined;
  url: string;
  channel_id: string;
  guild_id: string;
  name: string;
}

export function WebhookURLInput(
  props: {
    onChange?: (webhookData: WebhookData | null) => void,
    onSend?: (
      webhookUrl: string,
    ) => Promise<void>
  }
) {

  const [webhookUrl, setWebhookUrl] = useState<string>("")
  const mounted = useMounted(() => {
    const local = localStorage.getItem("webhookUrl")
    if (!local) return
    setWebhookUrl(local)
  })
  const [loadingWebhookData, setLoadingWebhookData] = useState(false)
  const [webhookData, setWebhookData] = useState<
    WebhookData | null | {
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
        .then(data => {
          setWebhookData(data)
          props.onChange?.(data)
        })
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
  const [sent, setSent] = useState(false)
  const triggerSent = () => {
    setSent(true)
    setTimeout(() => setSent(false), 3000)
  }

  return (
    <Div>
      <Label htmlFor="webhookurl">Webhook URL</Label>
      <Row>
        <Input id="webhookurl" type="text" className="flex-grow" autoComplete="off"
          disabled={!mounted}
          defaultValue={webhookUrl}
          onChange={(event) => {
            const value = event.target.value.trimStart().trimEnd()
            setWebhookUrl(value)
            props.onChange?.(null)
            localStorage.setItem("webhookUrl", value)
          }}
        />
        <Button type="button"
          disabled={invalidWebhookURL || !webhookUrl || isSending || loadingWebhookData}
          onClick={() => startTransition(async () => {
            try {
              setError(null)
              try {
                await props.onSend?.(webhookUrl)
                triggerSent()
              } catch (error) {
                if (error instanceof Error) setError(error)
                else console.log(error)
              }
            } catch (error) {
              if (error instanceof Error) setError(error)
              else console.log(error)
            }
          })}
        >Send</Button>
      </Row>
      <HelperTextBox>{
        sent
          ? <SuccessHelperText>Sent!</SuccessHelperText>
          : invalidWebhookURL
            ? <ErrorHelperText>Invalid URL</ErrorHelperText>
            : webhookUrl
              ? loadingWebhookData
                ? "Loading..."
                : webhookData
                  ? "code" in webhookData
                    ? <ErrorHelperText>Unable to find webhook</ErrorHelperText>
                    : !error
                      ? <span><span className="opacity-80">Sending to </span><span className="font-bold">{webhookData.name}</span></span>
                      : <ErrorHelperText><span className="opacity-80">Error sending to {webhookData.name}</span>: {error.message}</ErrorHelperText>
                  : <ErrorHelperText>Unable to fetch data</ErrorHelperText>
              : null
      }</HelperTextBox>
    </Div>
  )
}