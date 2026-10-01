import { Briefcase, Car, Plane, Star } from "lucide-react";
import Reveal from "./Reveal";
import SmartImage from "./SmartImage";
import { images } from "../data/images";
import { hotelData } from "../data/hotelData";

export default function About() {
  const points = [
    { icon: Briefcase, title: "Business and leisure", text: "Suited to work trips and time away." },
    { icon: Plane, title: "Close to the airport", text: `${hotelData.airport.name} is ${hotelData.airport.travel}.` },
    { icon: Car, title: "Parking on site", text: "Convenient if you're driving." },
  ];

  return (
    <section id="about" aria-labelledby="about-title" className="section pt-40 sm:pt-44 lg:pt-52">
      <div className="wrap grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-24">
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full border border-gold-deep/40 px-4 py-1.5 text-sm font-semibold text-gold-deep">
            <Star size={14} aria-hidden /> 3-Star Hotel
          </span>
          <h2 id="about-title" className="mt-6 text-4xl leading-[1.05] sm:text-5xl lg:text-6xl">
            Welcome to Sena Hotel &amp; Resort
          </h2>
          <div className="mt-7 max-w-xl space-y-5 font-serif text-[1.3rem] leading-[1.6] text-ink/85">
            <p>
              Sena Hotel &amp; Resort is a 3-star hotel in Ajao Estate, in the Oshodi-Isolo area of Lagos. It keeps things simple and comfortable: air-conditioned accommodation, a restaurant and bar, room service and a front desk that is open around the clock.
            </p>
            <p>
              Whether you're in the city for business, staying for a few days of leisure, or connecting through Lagos, the hotel makes it easy to arrive, settle in and get on with your plans.
            </p>
          </div>
          <dl className="mt-10 grid gap-6 border-t border-ink/15 pt-8 sm:grid-cols-3">
            {points.map((p) => (
              <div key={p.title}>
                <dt className="flex items-center gap-2 text-sm font-semibold">
                  <p.icon size={18} className="text-gold-deep" aria-hidden /> {p.title}
                </dt>
                <dd className="mt-1.5 text-sm leading-relaxed text-ink/70">{p.text}</dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <Reveal delay={0.1} className="mx-auto w-full max-w-md lg:max-w-none">
          <div className="relative">
            <SmartImage
              src={images.about}
              alt="Sena Hotel & Resort interior"
              label="Replace with hotel photo (portrait)"
              className="aspect-[4/5] w-full rounded-t-[999px] rounded-b-3xl"
              sizes="(min-width:1024px) 40vw, 90vw"
            />
            <div className="absolute -bottom-5 -left-3 rounded-2xl bg-ink px-5 py-4 text-ivory shadow-xl sm:-left-8">
              <p className="font-serif text-2xl leading-tight">Ajao Estate</p>
              <p className="text-xs text-ivory/70">Oshodi-Isolo, Lagos</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
