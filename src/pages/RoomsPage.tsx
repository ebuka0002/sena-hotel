import Rooms from "../components/Rooms";
import { useTitle } from "../lib/useTitle";

export default function RoomsPage() {
  useTitle("Rooms | Sena Hotel & Resort, Ajao Estate, Lagos");
  return <Rooms standalone />;
}
