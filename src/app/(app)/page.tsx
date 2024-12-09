import { App, onClickConsoleLog } from "./client";

export default function Home() {
  console.log("Server?")
  return (
    <div className="max-w-2xl mx-auto min-h-screen pb-72">
      <header className="py-12">
        <h1 className="text-3xl font-bold tracking-tight">Discord Webhook Sender</h1>
        <div className="opacity-80 font-bold text-sm">Send Discord Webhook with Ease</div>
      </header>
      <App />
    </div>
  );
}
