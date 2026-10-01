import { useState } from "react";
import type { FormEvent } from "react";
import { CheckCircle2, X } from "lucide-react";
import Modal from "./Modal";
import { SelectField, TextAreaField, TextField } from "./Field";
import { WhatsAppIcon } from "./icons";
import { rooms } from "../data/rooms";
import { hotelData } from "../data/hotelData";
import { bookingSummaryMessage, buildWhatsAppLink, submitBookingRequest } from "../lib/booking";
import type { BookingRequest } from "../lib/booking";

export interface BookingPrefill {
  checkIn?: string;
  checkOut?: string;
  adults?: number;
  children?: number;
  rooms?: number;
  roomId?: string;
}

const today = () => new Date().toISOString().slice(0, 10);
const nextDay = (d: string) => {
  const t = new Date(d + "T00:00:00");
  t.setDate(t.getDate() + 1);
  return t.toISOString().slice(0, 10);
};

type Errors = Partial<Record<"checkIn" | "checkOut" | "name" | "email" | "phone", string>>;

export default function BookingModal({ open, onClose, prefill }: { open: boolean; onClose: () => void; prefill: BookingPrefill }) {
  // The parent remounts this component (via `key`) each time it opens, so state starts from the prefill.
  const [form, setForm] = useState({
    checkIn: prefill.checkIn ?? "",
    checkOut: prefill.checkOut ?? "",
    adults: prefill.adults ?? 2,
    children: prefill.children ?? 0,
    rooms: prefill.rooms ?? 1,
    roomId: prefill.roomId ?? "",
    name: "",
    email: "",
    phone: "",
    requests: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "failed">("idle");

  const set = <K extends keyof typeof form>(k: K, v: (typeof form)[K]) => setForm((f) => ({ ...f, [k]: v }));

  const payload = (): BookingRequest => ({
    checkIn: form.checkIn,
    checkOut: form.checkOut,
    adults: form.adults,
    children: form.children,
    rooms: form.rooms,
    roomType: rooms.find((r) => r.id === form.roomId)?.name ?? "No preference",
    name: form.name.trim(),
    email: form.email.trim(),
    phone: form.phone.trim(),
    requests: form.requests.trim(),
  });

  const validate = (): Errors => {
    const e: Errors = {};
    if (!form.checkIn) e.checkIn = "Choose a check-in date.";
    if (!form.checkOut) e.checkOut = "Choose a check-out date.";
    else if (form.checkIn && form.checkOut <= form.checkIn) e.checkOut = "Check-out must be after check-in.";
    if (!form.name.trim()) e.name = "Enter your name.";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = "Enter a valid email address.";
    if (form.phone.replace(/\D/g, "").length < 7) e.phone = "Enter a phone number we can reach you on.";
    return e;
  };

  const onSubmit = async (ev: FormEvent) => {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) return;
    setStatus("sending");
    try {
      await submitBookingRequest(payload());
      setStatus("sent");
    } catch {
      setStatus("failed");
    }
  };

  return (
    <Modal open={open} onClose={onClose} label="Request a booking">
      <button
        type="button"
        onClick={onClose}
        aria-label="Close booking form"
        className="absolute right-4 top-4 z-10 grid size-11 place-items-center rounded-full bg-sand text-ink transition hover:bg-[#dccfb8]"
      >
        <X size={20} />
      </button>

      {status === "sent" ? (
        <div className="px-6 py-14 text-center sm:px-14">
          <CheckCircle2 className="mx-auto text-gold-deep" size={52} strokeWidth={1.3} aria-hidden />
          <h2 className="mt-5 text-3xl sm:text-4xl">Request received</h2>
          <p className="mx-auto mt-4 max-w-md text-[1.05rem] leading-relaxed text-ink/80" role="status">
            Your booking request has been received. Our team will contact you to confirm availability and rates.
          </p>
          <dl className="mx-auto mt-8 max-w-sm space-y-2 rounded-2xl bg-sand/70 p-5 text-left text-sm">
            <div className="flex justify-between gap-4"><dt className="text-ink/60">Room</dt><dd className="font-medium">{payload().roomType}</dd></div>
            <div className="flex justify-between gap-4"><dt className="text-ink/60">Dates</dt><dd className="font-medium">{form.checkIn} to {form.checkOut}</dd></div>
            <div className="flex justify-between gap-4"><dt className="text-ink/60">Guests</dt><dd className="font-medium">{form.adults} adult(s), {form.children} child(ren)</dd></div>
          </dl>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <a href={buildWhatsAppLink(bookingSummaryMessage(payload()))} target="_blank" rel="noreferrer" className="btn btn-dark">
              <WhatsAppIcon /> Send details on WhatsApp
            </a>
            <button type="button" onClick={onClose} className="btn btn-line">Close</button>
          </div>
        </div>
      ) : (
        <form onSubmit={onSubmit} noValidate className="px-5 pb-8 pt-8 sm:px-10 sm:pb-10">
          <h2 className="pr-12 text-3xl sm:text-4xl">Request a booking</h2>
          <p className="mt-2 text-sm text-ink/70">
            Send your dates and details. {hotelData.name} will confirm availability and rates with you.
          </p>

          <div className="mt-7 grid gap-4 sm:grid-cols-2">
            <TextField id="bk-in" label="Check-in" type="date" min={today()} value={form.checkIn} error={errors.checkIn}
              onChange={(e) => setForm((f) => ({ ...f, checkIn: e.target.value, checkOut: f.checkOut && f.checkOut <= e.target.value ? "" : f.checkOut }))} />
            <TextField id="bk-out" label="Check-out" type="date" min={form.checkIn ? nextDay(form.checkIn) : today()} value={form.checkOut} error={errors.checkOut}
              onChange={(e) => set("checkOut", e.target.value)} />
            <SelectField id="bk-adults" label="Adults" value={form.adults} onChange={(e) => set("adults", Number(e.target.value))}>
              {[1, 2, 3, 4, 5, 6].map((n) => <option key={n} value={n}>{n}</option>)}
            </SelectField>
            <SelectField id="bk-children" label="Children" value={form.children} onChange={(e) => set("children", Number(e.target.value))}>
              {[0, 1, 2, 3, 4].map((n) => <option key={n} value={n}>{n}</option>)}
            </SelectField>
            <SelectField id="bk-room" label="Room type" value={form.roomId} onChange={(e) => set("roomId", e.target.value)}>
              <option value="">No preference</option>
              {rooms.map((r) => <option key={r.id} value={r.id}>{r.name}</option>)}
            </SelectField>
            <SelectField id="bk-rooms" label="Rooms" value={form.rooms} onChange={(e) => set("rooms", Number(e.target.value))}>
              {[1, 2, 3, 4].map((n) => <option key={n} value={n}>{n}</option>)}
            </SelectField>
            <TextField id="bk-name" label="Full name" autoComplete="name" value={form.name} error={errors.name} onChange={(e) => set("name", e.target.value)} />
            <TextField id="bk-email" label="Email" type="email" autoComplete="email" value={form.email} error={errors.email} onChange={(e) => set("email", e.target.value)} />
            <div className="sm:col-span-2">
              <TextField id="bk-phone" label="Phone" type="tel" autoComplete="tel" value={form.phone} error={errors.phone} onChange={(e) => set("phone", e.target.value)} />
            </div>
            <div className="sm:col-span-2">
              <TextAreaField id="bk-notes" label="Special requests (optional)" value={form.requests} onChange={(e) => set("requests", e.target.value)} />
            </div>
          </div>

          {status === "failed" && (
            <p role="alert" className="mt-4 text-sm font-medium text-[#a4352a]">
              We couldn't send your request. Check your connection and try again.
            </p>
          )}

          <button type="submit" disabled={status === "sending"} className="btn btn-dark mt-7 w-full disabled:opacity-60">
            {status === "sending" ? "Sending request..." : "Request Booking"}
          </button>
          <p className="mt-3 text-center text-xs text-ink/60">This is a request, not a confirmed reservation.</p>
        </form>
      )}
    </Modal>
  );
}
