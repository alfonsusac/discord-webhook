import type { Metadata, Viewport } from "next";
import { Commissioner, Roboto_Mono } from "next/font/google";
import "../globals.css";
import { Row } from "../ui/row";
import type { SVGProps } from "react";


const mono = Roboto_Mono({
  weight: ["400", "500", "700"],
  variable: "--font-mono",
  subsets: ["latin"],
})

const sans = Commissioner({
  variable: "--font-sans",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Discord Webhook",
  description: "Send Discord Webhook with Ease",
  keywords: ["discord", "webhook", "sender", "alfonsusac"],
  openGraph: {
    title: "Discord Webhook",
    description: "Send Discord Webhook with Ease",
    images: ["/logo.png"],
    locale: "en_US",
    url: "https://discord-webhook.vercel.app",
    type: "website",
  },
  authors: [
    {
      name: "AlfonsusAC",
      url: "https://x.com/alfonsusac",
    }
  ],
  creator: "AlfonsusAC",
  twitter: {
    title: "Discord Webhook",
    description: "Send Discord Webhook with Ease",
    card: "summary",
    images: ["/logo.png"],
    creator: "alfonsusac",
  },
  generator: "Next.js",
  // metadataBase: new URL("https://dishook.app"), TODO
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  interactiveWidget: "resizes-content",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${ sans.variable } ${ mono.variable } antialiased ${ sans.className } bg-discord-background`}
      >
        <div className="w-full min-h-screen">
          <div className="min-h-screen mx-4">
            <div className="max-w-xl mx-auto min-h-screen pb-48">
              {children}
              <footer className="py-20 flex flex-col gap-2">
                Made by @alfonsusac
                <Row className="text-2xl gap-2 text-discord-foreground/60 hover:*:text-white *:cursor-pointer">
                  <a target="_blank" href="https://github.com/alfonsusac/discord-webhook" ><MdiGithub /></a>
                  <a target="_blank" href="https://x.com/alfonsusac"><LineMdTwitterXAlt /></a>
                </Row>
              </footer>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}




function MdiGithub(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}><path fill="currentColor" d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33s1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 2.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2"></path></svg>
  )
}



function LineMdTwitterXAlt(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}><path fill="currentColor" d="M8.5 2h2.5L11 2h-2.5zM13 2h2.5L15.5 2h-2.5zM10.5 2h5v0h-5zM8.5 2h5v0h-5zM10 2h3.5L13.5 2h-3.5z"><animate fill="freeze" attributeName="d" dur="0.8s" keyTimes="0;0.3;0.5;1" values="M8.5 2h2.5L11 2h-2.5zM13 2h2.5L15.5 2h-2.5zM10.5 2h5v0h-5zM8.5 2h5v0h-5zM10 2h3.5L13.5 2h-3.5z;M8.5 2h2.5L11 22h-2.5zM13 2h2.5L15.5 22h-2.5zM10.5 2h5v2h-5zM8.5 20h5v2h-5zM10 2h3.5L13.5 22h-3.5z;M8.5 2h2.5L11 22h-2.5zM13 2h2.5L15.5 22h-2.5zM10.5 2h5v2h-5zM8.5 20h5v2h-5zM10 2h3.5L13.5 22h-3.5z;M1 2h2.5L18.5 22h-2.5zM5.5 2h2.5L23 22h-2.5zM3 2h5v2h-5zM16 20h5v2h-5zM18.5 2h3.5L5 22h-3.5z"></animate></path></svg>
  )
}


