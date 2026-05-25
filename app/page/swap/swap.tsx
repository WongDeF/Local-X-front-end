import type { Route } from "./+types/swap";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Local-X-swap" },
    { name: "description", content: "Welcome to Local-X-swap!" },
  ];
}

export default function Swap() {
  return <h1>swap</h1>;
}
