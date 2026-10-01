import Contact from "../components/Contact";
import { useTitle } from "../lib/useTitle";

export default function ContactPage() {
  useTitle("Contact | Sena Hotel & Resort, Ajao Estate, Lagos");
  return <Contact standalone />;
}
