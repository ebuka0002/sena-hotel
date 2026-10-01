import { ConciergeBell, Car, BedDouble, Plane, Utensils } from "lucide-react";
import Reveal from "./Reveal";

const cards = [
  { icon: Plane, title: "Airport Convenience", text: "Located in Ajao Estate with convenient access to Murtala Muhammed International Airport.", span: "lg:col-span-2", dark: true },
  { icon: BedDouble, title: "Comfortable Rooms", text: "A selection of accommodation options designed for different types of stays.", span: "" },
  { icon: Utensils, title: "Dining & Refreshments", text: "Restaurant, bar/lounge and room service.", span: "" },
  { icon: Car, title: "Convenient Parking", text: "On-site parking is listed among the hotel's facilities.", span: "" },
  { icon: ConciergeBell, title: "Attentive Service", text: "24-hour front desk and housekeeping services are listed by booking platforms.", span: "" },
];

export default function Features() {
  return (
    <section aria-labelledby="features-title" className="section">
      <div className="wrap">
        <Reveal className="max-w-3xl">
          <h2 id="features-title" className="text-4xl leading-[1.05] sm:text-5xl lg:text-6xl">
            Everything You Need for a Comfortable Stay
          </h2>
        </Reveal>
        <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {cards.map((c) => (
            <li key={c.title} className={`${c.span} flex flex-col justify-between rounded-3xl p-7 sm:p-9 ${c.dark ? "bg-ink text-ivory sm:col-span-2" : "bg-white"}`}>
              <c.icon size={30} strokeWidth={1.3} className={c.dark ? "text-gold" : "text-gold-deep"} aria-hidden />
              <div className="mt-12">
                <h3 className="text-3xl leading-tight">{c.title}</h3>
                <p className={`mt-3 max-w-md text-[0.95rem] leading-relaxed ${c.dark ? "text-ivory/75" : "text-ink/70"}`}>{c.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
