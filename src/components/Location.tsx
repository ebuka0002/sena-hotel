import { MapPin, Navigation, Plane } from "lucide-react";
import Reveal from "./Reveal";
import { hotelData } from "../data/hotelData";
import { directionsUrl, mapEmbedUrl } from "../lib/booking";

export default function Location() {
  return (
    <section id="location" aria-labelledby="location-title" className="section">
      <div className="wrap grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <Reveal>
          <h2 id="location-title" className="text-4xl leading-[1.05] sm:text-5xl lg:text-6xl">Find us in Ajao Estate</h2>
          <p className="mt-6 max-w-md text-[1.05rem] leading-relaxed text-ink/75">
            The hotel sits in the Oshodi-Isolo / Ajao Estate area of Lagos.
          </p>

          <address className="mt-8 flex gap-4 not-italic">
            <MapPin size={22} strokeWidth={1.4} className="mt-1 shrink-0 text-gold-deep" aria-hidden />
            <span className="font-serif text-2xl leading-snug">
              {hotelData.addressLines.map((l) => (
                <span key={l} className="block">{l}</span>
              ))}
            </span>
          </address>

          <div className="mt-8 flex gap-4 rounded-2xl bg-ink p-6 text-ivory">
            <Plane size={24} strokeWidth={1.4} className="mt-0.5 shrink-0 text-gold" aria-hidden />
            <div>
              <p className="font-serif text-2xl leading-snug">{hotelData.airport.name}</p>
              <p className="mt-1 text-ivory/80">Approximately 17 minutes by car</p>
              <p className="mt-2 text-xs text-ivory/55">Journey times vary with Lagos traffic.</p>
            </div>
          </div>

          <a href={directionsUrl()} target="_blank" rel="noreferrer" className="btn btn-gold mt-8">
            <Navigation size={18} aria-hidden /> Get Directions
          </a>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="overflow-hidden rounded-3xl bg-sand shadow-[0_24px_50px_-30px_rgba(27,25,22,.5)]">
            <iframe
              title="Map showing Sena Hotel & Resort, Ajao Estate, Lagos"
              src={mapEmbedUrl()}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="block aspect-[4/5] w-full border-0 sm:aspect-[4/3] lg:aspect-auto lg:h-[34rem]"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
