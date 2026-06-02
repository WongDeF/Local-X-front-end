
import { useParams } from "react-router";
export default function Exchange() {
  const { id } = useParams()
  return <h1>exchange params {id}</h1>;
}
