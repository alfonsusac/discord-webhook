import type { Metadata } from "next";
import { Commissioner } from "next/font/google";
import localFont from "next/font/local";
import "../globals.css";

const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});
const sans = Commissioner({
  variable: "--font-sans"
})

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${ sans.variable } ${ geistMono.variable } antialiased ${ sans.className } bg-discord-background`}
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