/* eslint-disable @next/next/no-img-element */
import { HoverActionButton, HoverActionGroup } from "@/app/ui/hover-action-button"
import { HideIcon, TrashIcon } from "@/app/ui/icons"
import { useEffect, useImperativeHandle, useRef, useState, type ComponentPropsWithRef } from "react"

const refreshRichPreviewList = (content: string) => {
  // console.log(content)
  const matches = content.match(/(\(?)(\<?)(https:\/\/[^\s]+)/g)
  // console.log(matches)
  const urlLike: Record<string, boolean> = {}
  matches?.forEach((match) => {
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


    if (urlLike[url] !== undefined) {
      if (urlLike[url] === false)
        urlLike[url] = isHidden
      else
        return
    } else {
      urlLike[url] = isHidden
    }
  })
  // console.log(urlLike)
  return urlLike
}

export function RichPreviewList(
  { ref, onSetContent, ...props }: ComponentPropsWithRef<"div"> & {
    onSetContent: (cb: (prev: string | undefined) => string | undefined) => void,
  }
) {

  const innerRef = useRef<HTMLDivElement>(null)
  useImperativeHandle(ref, () => {
    return ({
      ...innerRef.current!,
      refresh: (content: string) => {
        setURLArray(refreshRichPreviewList(content))
      }
    })
  })

  const [urlArray, setURLArray] = useState<Record<string, boolean>>({})

  return (
    <div
      className="flex flex-col gap-1 items-start select-none"
      ref={innerRef}
      {...props}
    >
      {
        Object.entries(urlArray).filter(e => !e[1]).map(([url]) => {
          return (
            <RichPreview
              key={url}
              url={url}
              onHide={() => {
                onSetContent((prev) => prev?.replace(url, `<${ url }>`))
              }}
            />
          )
        })
      }
    </div>
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

  useEffect(() => {
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
  }, [props.url])

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