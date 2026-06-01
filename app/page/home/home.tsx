import type { Route } from "./+types/home";
import Conditions from "./conditions/conditions";
export function meta({}: Route.MetaArgs) {
  return [
    { title: "Local-X" },
    { name: "description", content: "Welcome to Local-X!" },
  ];
}

export default function Home() {
  return <div className="w-full">
    <Conditions/>
  </div>;
}
