import type { Route } from "./+types/Polymarket";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Local-X-polymarket" },
    { name: "description", content: "Welcome to Local-X-polymarket!" },
  ];
}

export default function Polymarket() {
  return <h1>polymarket</h1>;
}
