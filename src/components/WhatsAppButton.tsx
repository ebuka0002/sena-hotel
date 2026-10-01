import { m } from "framer-motion";
import { WhatsAppIcon } from "./icons";
import { buildWhatsAppLink, whatsappConfigured } from "../lib/booking";

export default function WhatsAppButton() {
  return (
    <m.a
      href={buildWhatsAppLink()}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat with Sena Hotel & Resort on WhatsApp"
      title={whatsappConfigured() ? "Chat on WhatsApp" : "Replace with hotel WhatsApp number"}
      className="fixed bottom-5 right-5 z-[90] grid size-14 place-items-center rounded-full bg-[#1f8f57] text-white shadow-[0_12px_30px_-8px_rgba(0,0,0,.55)] sm:bottom-7 sm:right-7"
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1.2, duration: 0.5 }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.94 }}
    >
      <WhatsAppIcon width={28} height={28} />
    </m.a>
  );
}
