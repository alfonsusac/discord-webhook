import type { Metadata, Viewport } from "next";
import { Anonymous_Pro, Azeret_Mono, Commissioner, Fira_Code, Fira_Mono, Geist_Mono, IBM_Plex_Mono, Reddit_Mono, Roboto_Mono, Source_Code_Pro } from "next/font/google";
import localFont from "next/font/local";
import "../globals.css";


const mono = Roboto_Mono({
  weight: ["400", "500","700"],
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
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}



// To be sent to nextjs-showcase
// Discord Webhook - Send Discord Webhook with Ease
/**

I have created a Discord Webhook sender that allows you to send Discord Webhook with ease. You can customize the avatar, username, and content of the message. You can also use Discord's markdown and formatting to style your message. You can also use custom emojis and links in your message. The app is built using Next.js and Tailwind CSS. You can check out the app here: https://discord-webhook.vercel.app

# Features
- Send Discord Webhook with ease
- Customize the avatar, username, and content of the message
- Use Discord's markdown and formatting to style your message
- Use custom emojis and links in your message

I also made it open source: https://github.com/alfonsusac/discord-webhook

More feautures are coming soon! If you have any feedback or suggestions, feel free to let me know here!



 */