import { useState } from "react";
import { Link } from "react-router-dom";
import { rooms } from "../data/rooms";
import type { Room } from "../data/rooms";
import RoomCard from "./RoomCard";
import RoomModal from "./RoomModal";
import Reveal from "./Reveal";

export default function Rooms({ standalone = false }: { standalone?: boolean }) {
  const [active, setActive] = useState<Room | null>(null);
  const [featured, ...rest] = rooms;

  return (
    <section id="rooms" aria-labelledby="rooms-title" className={standalone ? "pb-24 pt-36" : "section bg-sand/60"}>
      <div className="wrap">
        <Reveal className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            {standalone ? (
              <h1 id="rooms-title" className="text-5xl leading-[1.05] sm:text-6xl">Stay Your Way</h1>
            ) : (
              <h2 id="rooms-title" className="text-4xl leading-[1.05] sm:text-5xl lg:text-6xl">Stay Your Way</h2>
            )}
            <p className="mt-5 text-[1.05rem] leading-relaxed text-ink/75">
              Three room categories for different kinds of stays. Rates and availability are confirmed by the hotel when you send a request.
            </p>
          </div>
          {!standalone && <Link to="/rooms" className="btn btn-line self-start md:self-auto">See all rooms</Link>}
        </Reveal>

        <div className="mt-12 grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-14">
          <Reveal>
            <RoomCard room={featured} onView={setActive} featured />
          </Reveal>
          <Reveal delay={0.1} className="flex flex-col gap-7 lg:pt-1">
            {rest.map((r) => (
              <RoomCard key={r.id} room={r} onView={setActive} />
            ))}
          </Reveal>
        </div>
      </div>
      <RoomModal room={active} onClose={() => setActive(null)} />
    </section>
  );
}
