import type { SVGProps } from "react";
import { Row } from "../ui/row";
import { App } from "./App";
import { Button } from "../ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <header className="py-24 pb-12 md:pb-16 text-center">
        <h1 className="text-xl font-bold tracking-tight opacity-60">Discord Webhook Sender</h1>
        <div className="font-black text-5xl">Send Discord Webhook with Ease</div>
        <Link href="/about">
          <Button className="mt-8 border dark:border-none bg-transparent dark:bg-discord-foreground/10 text-discord-foreground dark:text-discord-foreground/90">How to use?</Button>
        </Link>
      </header>
      <App />
    </>
  );
}
