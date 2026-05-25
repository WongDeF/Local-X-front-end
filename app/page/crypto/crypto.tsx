import type { Route } from "./+types/crypto";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Local-X-crypto" },
    { name: "description", content: "Welcome to Local-X-crypto!" },
  ];
}

export default function Crypto() {
  return <h1>crypto</h1>;
}
