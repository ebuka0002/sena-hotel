import { useState } from "react";
import type { FormEvent } from "react";
import { CalendarDays, DoorOpen, Search, Users } from "lucide-react";
import { useBooking } from "./BookingContext";

const today = () => new Date().toISOString().slice(0, 10);
const nextDay = (d: string) => {
  const t = new Date(d + "T00:00:00");
  t.setDate(t.getDate() + 1);
  return t.toISOString().slice(0, 10);
};

export default function BookingWidget() {
  const { openBooking } = useBooking();
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(2);
  const [rooms, setRooms] = useState(1);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    openBooking({ checkIn, checkOut, adults: guests, rooms });
  };

  const box = "flex flex-col gap-1 rounded-xl px-4 py-2.5";
  const label = "flex items-center gap-1.5 text-xs font-semibold text-gold-deep";
  const input = "w-full min-h-8 bg-transparent text-base font-medium text-ink outline-offset-4";

  return (
    <section aria-label="Check availability" className="relative z-20 -mt-24 sm:-mt-16">
      <div className="wrap">
        <form
          onSubmit={submit}
          className="grid gap-2 rounded-3xl bg-white p-3 shadow-[0_24px_60px_-20px_rgba(27,25,22,.45)] sm:grid-cols-2 lg:grid-cols-[1.2fr_1.2fr_1fr_1fr_auto] lg:items-stretch lg:rounded-full lg:p-2.5"
        >
          <div className={`${box} bg-ivory lg:rounded-full lg:pl-7`}>
            <label htmlFor="w-in" className={label}><CalendarDays size={14} aria-hidden /> Check-in</label>
            <input id="w-in" type="date" min={today()} value={checkIn} className={input}
              onChange={(e) => { setCheckIn(e.target.value); if (checkOut && checkOut <= e.target.value) setCheckOut(""); }} />
          </div>
          <div className={`${box} bg-ivory lg:rounded-full`}>
            <label htmlFor="w-out" className={label}><CalendarDays size={14} aria-hidden /> Check-out</label>
            <input id="w-out" type="date" min={checkIn ? nextDay(checkIn) : today()} value={checkOut} className={input}
              onChange={(e) => setCheckOut(e.target.value)} />
          </div>
          <div className={`${box} bg-ivory lg:rounded-full`}>
            <label htmlFor="w-guests" className={label}><Users size={14} aria-hidden /> Guests</label>
            <select id="w-guests" value={guests} onChange={(e) => setGuests(Number(e.target.value))} className={input}>
              {[1, 2, 3, 4, 5, 6].map((n) => <option key={n} value={n}>{n} {n === 1 ? "guest" : "guests"}</option>)}
            </select>
          </div>
          <div className={`${box} bg-ivory lg:rounded-full`}>
            <label htmlFor="w-rooms" className={label}><DoorOpen size={14} aria-hidden /> Rooms</label>
            <select id="w-rooms" value={rooms} onChange={(e) => setRooms(Number(e.target.value))} className={input}>
              {[1, 2, 3, 4].map((n) => <option key={n} value={n}>{n} {n === 1 ? "room" : "rooms"}</option>)}
            </select>
          </div>
          <button type="submit" className="btn btn-dark min-h-14 sm:col-span-2 lg:col-span-1 lg:px-8">
            <Search size={18} aria-hidden /> Search Availability
          </button>
        </form>
      </div>
    </section>
  );
}
