/* eslint-disable @next/next/no-img-element */
import { ResizeAnimation } from "@/app/ui/animate-resize"
import { HoverActionButton, HoverActionGroup } from "@/app/ui/hover-action-button"
import { HideIcon } from "@/app/ui/icons"
import { useMounted } from "@/app/utils/mounted"
import { useState } from "react"

const refreshRichPreviewList = (content: string) => {
  const matches = content.matchAll(/(\(?)(\<?)(https:\/\/[^\s]+)/g)
  const urlLike: Record<string, {
    isHidden: boolean,
    token: { index: number, hidden: boolean }[],
  }> = {}
  for (const { 0: match, index } of matches) {
    const original = match.startsWith("(")
      ? match.slice(1).split(")")[0]
      : match

    const url = match.startsWith("(<")
      ? match.slice(2).split(">)")[0]
      : match.startsWith("(")
        ? match.slice(1).split(")")[0]
        : match.startsWith("<")
          ? match.slice(1).split(">")[0]
          : match

    const isHidden = original.startsWith("<")

    const newindex = match.startsWith("(")
      ? index + 1
      : index

    if (urlLike[url] !== undefined) {
      if (urlLike[url].isHidden === true)
        urlLike[url].isHidden = isHidden

      urlLike[url].token.push({ index: newindex, hidden: isHidden })
    } else {
      urlLike[url] = {
        isHidden,
        token: [{ index: newindex, hidden: isHidden }]
      }
    }
  }
  return urlLike
}

export function RichPreviewList(
  { content, onHide }: {
    content: string | undefined,
    onHide: (entries: [index: number, url: string][]) => void,
  }
) {
  const mounted = useMounted()
  if (!mounted) return null

  const urlArray = refreshRichPreviewList(content || "")

  return (
    <ResizeAnimation
      className="duration-500"
      dependency={[mounted, urlArray]}
    >
      <div
        className="flex flex-col gap-1 items-start select-none"
      >
        {
          Object.entries(urlArray).filter(e => !e[1].isHidden).map(([url, data]) => {
            return (
              <RichPreview
                key={url}
                url={url}
                onHide={() => {
                  onHide(data.token.filter(u => !u.hidden).map(u => [u.index, url]))
                }}
              />
            )
          })
        }
      </div>
    </ResizeAnimation>
  )

}

export type RichPreviewComponent = HTMLDivElement & {
  refresh: (content: string) => void
}

function RichPreview(props: {
  url: string
  onHide: () => void
}) {

  const [error, setError] = useState(false)

  // useEffect(() => {
  // TODO - link preview
  // console.log("Hello?")
  // const url = new URL(props.url)
  // const ext = url.pathname.split(".").pop()
  // const supportedImageExtensions = [
  //   ".jpeg", ".jpg", ".png", ".gif", ".svg", ".webp", ".bmp", ".tiff", ".avif"
  // ];
  // fetch(props.url, {
  //   mode: "no-cors",
  // }).then(async res => {
  //   const contentType = res.headers.get('Content-Type');
  //   if (contentType && contentType.startsWith('image/')) {
  //     const blob = await res.blob();
  //     const reader = new FileReader()
  //     reader.onload = () => {
  //       setData({
  //         type: "image",
  //         data: reader.result as string
  //       })
  //     }
  //     reader.readAsDataURL(blob)
  //     // It's an image, proceed to process it
  //     // return response.blob(); // or response.arrayBuffer() depending on your needs
  //   } else {
  //     setData({ type: "url" })
  //     const html = await res.text()
  //   }
  // })
  // return () => {
  // }
  // }, [props.url])

  if (error) return null

  return (
    <div className="flex gap-1 items-center relative group flex-col">
      <HoverActionGroup className="absolute top-2 right-2">
        <HoverActionButton onClick={props.onHide}>
          <HideIcon />
        </HoverActionButton>
      </HoverActionGroup>
      <img
        src={props.url}
        alt={props.url}
        className="rounded-lg"
        onError={() => setError(true)}
      />
    </div>
  )
}
