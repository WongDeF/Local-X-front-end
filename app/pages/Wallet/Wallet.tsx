import type { Route } from "./+types/Wallet";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Local-X-wallet" },
    { name: "description", content: "Welcome to Local-X-wallet!" },
  ];
}

export default function Wallet() {
  return <h1>wallet</h1>;
}
