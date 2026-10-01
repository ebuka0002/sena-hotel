import { useState } from "react";
import { AnimatePresence, m } from "framer-motion";
import { amenities } from "../data/amenities";
import { stock } from "../data/stockPhotos";
import Reveal from "./Reveal";
import SmartImage from "./SmartImage";

// Each facility pairs with a photo so the list feels like walking the
// building rather than reading a spec sheet.
const shot: Record<string, string> = {
  restaurant: stock.restaurant,
  bar: stock.bar,
  "room-service": stock.hotelRoom,
  ac: stock.bedroom,
  wifi: stock.lobby,
  parking: stock.exterior,
  "front-desk": stock.lobby,
  breakfast: stock.restaurant,
  housekeeping: stock.bedroom,
};

export default function Amenities() {
  const [active, setActive] = useState(0);
  const current = amenities[active];

  return (
    <section id="amenities" aria-labelledby="amenities-title" className="section relative overflow-hidden bg-ink text-ivory">
      {/* Crossfading backdrop, dimmed under a gradient so the list stays readable */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <AnimatePresence>
          <m.div
            key={current.id}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
          >
            <SmartImage src={shot[current.id]} alt="" quiet className="h-full w-full" />
          </m.div>
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-ink/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/60" />
      </div>

      <div className="wrap relative">
        <Reveal className="max-w-2xl">
          <h2 id="amenities-title" className="text-4xl leading-[1.05] sm:text-5xl lg:text-6xl">Hotel amenities</h2>
          <p className="mt-5 max-w-md text-[1.05rem] leading-relaxed text-ivory/75">
            The facilities listed for Sena Hotel &amp; Resort. Move through the list — the photo behind it follows along.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-10 lg:grid-cols-[1fr_1fr] lg:gap-6">
          <ul role="list" className="border-t border-ivory/15">
            {amenities.map((a, i) => (
              <li key={a.id} className="border-b border-ivory/15">
                <button
                  type="button"
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onClick={() => setActive(i)}
                  aria-pressed={active === i}
                  className={`flex w-full items-center gap-5 py-5 text-left transition-colors sm:py-6 ${active === i ? "text-gold" : "text-ivory/70 hover:text-ivory"}`}
                >
                  <a.icon size={22} strokeWidth={1.3} className="shrink-0" aria-hidden />
                  <span className="font-serif text-2xl sm:text-3xl">{a.name}</span>
                </button>
              </li>
            ))}
          </ul>

          {/* Description panel: hidden on mobile (image fills the section behind the list there) */}
          <div className="hidden lg:block">
            <AnimatePresence mode="wait">
              <m.div
                key={current.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
                className="max-w-sm pt-6"
              >
                <p className="text-lg leading-relaxed text-ivory/85">{current.description}</p>
              </m.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
