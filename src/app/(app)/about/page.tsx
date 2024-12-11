import Image from "next/image";
import Image1 from "./1.png";
import Image2 from "./2.png";
import Image3 from "./3.png";
import CursorImg from "./cursor.png";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="
    [&_p]:text-lg
    [&_p]:my-[1.5em]
    [&_p]:text-foreground/80
    ">
      <header className="pt-24 pb-4">
        <a href="/" className="text-xl font-bold tracking-tight">Discord Webhook Sender</a>
        <h1 className="opacity-80 font-bold text-4xl">How to use this?</h1>
      </header>

      <p>
        {`This is a simple tool to send Discord Webhook message. A Discord Webhook is a simple way to send messages to a channel. It can be used to send messages to a channel without the need to create a bot.`}
      </p>

      <p>
        {`To get started with sending messages, you need a webhook URL, you can get one via the "Integrations" tab in your server's settings. Accessible from the server settings, or by clicking on the settings icon next to the channel name.`}
      </p>

      <div className="rounded-xl overflow-hidden transition-all hover:shadow-xl max-w-xl relative
      outline outline-1 outline-foreground/5
      hover:outline-foreground/10
      ">
        <Image src={Image1} alt="" />
        <Image src={CursorImg} alt="cursor" className="absolute w-24 h-24 top-[52%] left-[35%] origin-top-left animate-rotate-swing" />
      </div>

      <p>
        {`Proceed in to the integration tab, select a webhook or create a new one and copy the URL.`}
      </p>

      <div className="rounded-xl overflow-hidden transition-all hover:shadow-xl max-w-xl  relative
      outline outline-1 outline-foreground/5
      hover:outline-foreground/10
      ">
        <Image src={Image2} alt="" />
        <Image src={CursorImg} alt="cursor" className="absolute w-24 h-24 top-[33%] left-[20%] origin-top-left animate-spline " />
      </div>

      <p>
        {`Paste the URL in the input field, type your message and click on the "Send" button. Your message will be sent to the channel.`}
      </p>

      <div className="rounded-xl overflow-hidden transition-all hover:shadow-xl max-w-xl mx-auto  relative
      outline outline-1 outline-foreground/5
      hover:outline-foreground/10
      ">
        <Image src={Image3} alt="" />
        <Image src={CursorImg} alt="cursor" className="absolute w-24 h-24 top-[70%] left-[75%] origin-top-left animate-rotate-swing " />
      </div>

    </div>
  )
}