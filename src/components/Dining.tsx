import { Coffee, ConciergeBell, Utensils, Wine } from "lucide-react";
import { Link } from "react-router-dom";
import Reveal from "./Reveal";
import SmartImage from "./SmartImage";
import { images } from "../data/images";
import { hotelData } from "../data/hotelData";

const items = [
  { icon: Utensils, title: "Restaurant", text: "Meals on site during your stay." },
  { icon: Wine, title: "Bar & Lounge", text: "Drinks and downtime in a relaxed setting." },
  { icon: ConciergeBell, title: "Room Service", text: "Eat in the comfort of your room." },
  { icon: Coffee, title: "Breakfast", text: "Listings describe a continental breakfast." },
];

export default function Dining() {
  return (
    <section id="dining" aria-labelledby="dining-title" className="section">
      <div className="wrap grid items-center gap-12 lg:grid-cols-2 lg:gap-24">
        <Reveal className="relative">
          <SmartImage src={images.dining} alt="Dining at Sena Hotel & Resort" label="Replace with restaurant photo" className="aspect-[4/5] w-full rounded-3xl" sizes="(min-width:1024px) 45vw, 92vw" />
          <SmartImage
            src={images.diningSecondary}
            alt="Bar and lounge at Sena Hotel & Resort"
            label="Bar photo"
            tone="dark"
            className="absolute -bottom-8 -right-2 hidden aspect-square w-2/5 rounded-2xl border-[6px] border-ivory sm:flex"
            sizes="20vw"
          />
        </Reveal>

        <Reveal delay={0.1}>
          <h2 id="dining-title" className="text-4xl leading-[1.05] sm:text-5xl lg:text-6xl">Dine, Relax &amp; Unwind</h2>
          <p className="mt-6 max-w-lg text-[1.05rem] leading-relaxed text-ink/75">
            From breakfast to a drink in the evening, eating and relaxing happen under one roof. Menus and opening hours are shared by the hotel on request.
          </p>
          <ul className="mt-9 space-y-5">
            {items.map((it) => (
              <li key={it.title} className="flex items-start gap-4 border-b border-ink/10 pb-5">
                <it.icon size={22} strokeWidth={1.4} className="mt-1 text-gold-deep" aria-hidden />
                <div>
                  <h3 className="text-2xl leading-tight">{it.title}</h3>
                  <p className="mt-1 text-sm text-ink/70">{it.text}</p>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-9">
            {hotelData.menuUrl ? (
              <a href={hotelData.menuUrl} target="_blank" rel="noreferrer" className="btn btn-dark">Explore Dining</a>
            ) : (
              <Link to="/#contact" className="btn btn-dark">Explore Dining</Link>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
