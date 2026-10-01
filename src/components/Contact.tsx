import { useState } from "react";
import type { FormEvent } from "react";
import { CheckCircle2, Mail, MapPin, Phone } from "lucide-react";
import Reveal from "./Reveal";
import { TextAreaField, TextField } from "./Field";
import { hotelData, PLACEHOLDERS } from "../data/hotelData";
import { submitContactMessage } from "../lib/booking";

type Errors = Partial<Record<"name" | "email" | "phone" | "message", string>>;

export default function Contact({ standalone = false }: { standalone?: boolean }) {
  const [f, setF] = useState({ name: "", email: "", phone: "", message: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "failed">("idle");
  const set = (k: keyof typeof f) => (e: { target: { value: string } }) => setF((s) => ({ ...s, [k]: e.target.value }));

  const submit = async (ev: FormEvent) => {
    ev.preventDefault();
    const e: Errors = {};
    if (!f.name.trim()) e.name = "Enter your name.";
    if (!/^\S+@\S+\.\S+$/.test(f.email)) e.email = "Enter a valid email address.";
    if (f.phone && f.phone.replace(/\D/g, "").length < 7) e.phone = "Enter a valid phone number.";
    if (f.message.trim().length < 5) e.message = "Write a short message.";
    setErrors(e);
    if (Object.keys(e).length) return;
    setStatus("sending");
    try {
      await submitContactMessage(f);
      setStatus("sent");
    } catch {
      setStatus("failed");
    }
  };

  const Title = standalone ? "h1" : "h2";

  return (
    <section id="contact" aria-labelledby="contact-title" className={standalone ? "pb-24 pt-36" : "section bg-sand/60"}>
      <div className="wrap grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        <Reveal>
          <Title id="contact-title" className="text-4xl leading-[1.05] sm:text-5xl lg:text-6xl">Get in touch</Title>
          <p className="mt-5 max-w-md text-ink/75">Ask about rooms, rates, dining or your arrival. The team will reply as soon as they can.</p>

          <h3 className="mt-10 text-2xl">{hotelData.name}</h3>
          <ul className="mt-5 space-y-5 text-[0.98rem]">
            <li className="flex gap-3">
              <MapPin size={20} className="mt-0.5 shrink-0 text-gold-deep" aria-hidden />
              <address className="not-italic leading-relaxed">
                {hotelData.addressLines.map((l) => <span key={l} className="block">{l}</span>)}
              </address>
            </li>
            <li className="flex gap-3">
              <Phone size={20} className="mt-0.5 shrink-0 text-gold-deep" aria-hidden />
              {hotelData.phone ? <a className="underline-offset-4 hover:underline" href={`tel:${hotelData.phone.replace(/\s/g, "")}`}>{hotelData.phone}</a> : <span className="text-ink/60">{PLACEHOLDERS.phone}</span>}
            </li>
            <li className="flex gap-3">
              <Mail size={20} className="mt-0.5 shrink-0 text-gold-deep" aria-hidden />
              {hotelData.email ? <a className="underline-offset-4 hover:underline" href={`mailto:${hotelData.email}`}>{hotelData.email}</a> : <span className="text-ink/60">{PLACEHOLDERS.email}</span>}
            </li>
          </ul>
        </Reveal>

        <Reveal delay={0.1}>
          {status === "sent" ? (
            <div className="rounded-3xl bg-white p-8 text-center sm:p-12" role="status">
              <CheckCircle2 size={48} strokeWidth={1.3} className="mx-auto text-gold-deep" aria-hidden />
              <h3 className="mt-4 text-3xl">Message sent</h3>
              <p className="mt-3 text-ink/75">Thank you. The hotel team will get back to you.</p>
              <button type="button" className="btn btn-line mt-7" onClick={() => { setStatus("idle"); setF({ name: "", email: "", phone: "", message: "" }); }}>Send another message</button>
            </div>
          ) : (
            <form onSubmit={submit} noValidate className="grid gap-4 rounded-3xl bg-white p-6 shadow-[0_1px_0_rgba(27,25,22,.06)] sm:grid-cols-2 sm:p-10">
              <TextField id="c-name" label="Name" autoComplete="name" value={f.name} error={errors.name} onChange={set("name")} />
              <TextField id="c-email" label="Email" type="email" autoComplete="email" value={f.email} error={errors.email} onChange={set("email")} />
              <div className="sm:col-span-2">
                <TextField id="c-phone" label="Phone (optional)" type="tel" autoComplete="tel" value={f.phone} error={errors.phone} onChange={set("phone")} />
              </div>
              <div className="sm:col-span-2">
                <TextAreaField id="c-message" label="Message" value={f.message} error={errors.message} onChange={set("message")} />
              </div>
              {status === "failed" && <p role="alert" className="text-sm font-medium text-[#a4352a] sm:col-span-2">We couldn't send your message. Try again in a moment.</p>}
              <button type="submit" disabled={status === "sending"} className="btn btn-dark disabled:opacity-60 sm:col-span-2">
                {status === "sending" ? "Sending..." : "Send message"}
              </button>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}
