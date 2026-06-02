import type { Route } from "./+types/Home";
import Conditions from "./Conditions/Conditions";
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
