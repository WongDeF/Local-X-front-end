import type { Route } from "./+types/home";
import { DatePicker } from "antd";
export function meta({}: Route.MetaArgs) {
  return [
    { title: "Local-X" },
    { name: "description", content: "Welcome to Local-X!" },
  ];
}

export default function Home() {
  return <div className="w-full"> <DatePicker />
  </div>;
}
