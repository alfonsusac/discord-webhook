import type { SVGProps } from "react";
import { Row } from "../ui/row";
import { App } from "./App";
import { Button } from "../ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <header className="py-24 pb-12 md:pb-16 text-center">
        <h1 className="text-xl font-bold tracking-tight">Discord Webhook Sender</h1>
        <div className="opacity-80 font-bold text-4xl">Send Discord Webhook with Ease</div>
        <Link href="/about">
          <Button className="mt-4 bg-discord-foreground/10">How to use?</Button>
        </Link>
      </header>
      <App />
    </>
  );
}
