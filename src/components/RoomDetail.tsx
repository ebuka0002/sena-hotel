import { useState } from "react";
import { BedDouble, Check, ChevronLeft, ChevronRight, Users } from "lucide-react";
import type { Room } from "../data/rooms";
import SmartImage from "./SmartImage";

export default function RoomDetail({ room, onRequest, headingId = "room-title" }: { room: Room; onRequest: () => void; headingId?: string }) {
  const [i, setI] = useState(0);
  const n = room.images.length;
  const go = (d: number) => setI((v) => (v + d + n) % n);

  return (
    <div>
      <div className="relative">
        <SmartImage
          key={room.images[i].src}
          src={room.images[i].src}
          alt={room.images[i].alt}
          label={`Replace with ${room.name} photo ${i + 1}`}
          className="aspect-[4/3] w-full sm:aspect-[16/10]"
        />
        <button type="button" onClick={() => go(-1)} aria-label="Previous photo" className="absolute left-3 top-1/2 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-ink/70 text-ivory backdrop-blur transition hover:bg-ink">
          <ChevronLeft size={22} />
        </button>
        <button type="button" onClick={() => go(1)} aria-label="Next photo" className="absolute right-3 top-1/2 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-ink/70 text-ivory backdrop-blur transition hover:bg-ink">
          <ChevronRight size={22} />
        </button>
      </div>
      <div className="flex gap-2 px-5 pt-3 sm:px-8" role="group" aria-label="Choose photo">
        {room.images.map((img, k) => (
          <button key={img.src} type="button" onClick={() => setI(k)} aria-label={`Show photo ${k + 1}`} aria-current={k === i} className={`overflow-hidden rounded-lg border-2 transition ${k === i ? "border-gold-deep" : "border-transparent opacity-70 hover:opacity-100"}`}>
            <SmartImage src={img.src} alt="" quiet className="h-14 w-20" />
          </button>
        ))}
      </div>

      <div className="px-5 pb-8 pt-6 sm:px-8">
        <h2 id={headingId} className="text-4xl leading-tight">{room.name}</h2>
        <p className="mt-1 text-gold-deep">{room.tagline}</p>
        <p className="mt-5 max-w-2xl text-[1.02rem] leading-relaxed text-ink/80">{room.description}</p>

        <dl className="mt-7 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl bg-sand/70 p-4">
            <dt className="flex items-center gap-2 text-sm font-semibold"><Users size={17} className="text-gold-deep" aria-hidden /> Guest capacity</dt>
            <dd className="mt-1 text-sm text-ink/70">{room.capacity}</dd>
          </div>
          <div className="rounded-2xl bg-sand/70 p-4">
            <dt className="flex items-center gap-2 text-sm font-semibold"><BedDouble size={17} className="text-gold-deep" aria-hidden /> Bed information</dt>
            <dd className="mt-1 text-sm text-ink/70">{room.beds}</dd>
          </div>
        </dl>

        <h3 className="mt-8 text-2xl">Amenities</h3>
        <ul className="mt-3 grid gap-x-6 gap-y-2 text-sm sm:grid-cols-2">
          {room.amenities.map((a) => (
            <li key={a} className="flex items-center gap-2"><Check size={16} className="text-gold-deep" aria-hidden /> {a}</li>
          ))}
        </ul>
        <p className="mt-3 text-xs text-ink/60">Amenities shown are hotel facilities. Room-specific inclusions are confirmed by the hotel.</p>

        <div className="mt-8 flex flex-col gap-4 border-t border-ink/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-semibold text-gold-deep">{room.rate}</p>
          <button type="button" onClick={onRequest} className="btn btn-dark">Request Booking</button>
        </div>
      </div>
    </div>
  );
}
