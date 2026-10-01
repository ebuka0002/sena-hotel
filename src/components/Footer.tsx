import { Link } from "react-router-dom";
import Logo from "./Logo";
import { FacebookIcon, InstagramIcon, TikTokIcon } from "./icons";
import { hotelData, PLACEHOLDERS } from "../data/hotelData";

const socials = [
  { name: "Instagram", url: hotelData.instagram, Icon: InstagramIcon },
  { name: "Facebook", url: hotelData.facebook, Icon: FacebookIcon },
  { name: "TikTok", url: hotelData.tiktok, Icon: TikTokIcon },
];

export default function Footer() {
  return (
    <footer className="bg-ink pb-10 pt-16 text-ivory sm:pt-20">
      <div className="wrap grid gap-12 md:grid-cols-[1.2fr_1fr_1.2fr]">
        <div>
          <Logo />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-ivory/70">A 3-star hotel in Ajao Estate, Lagos, close to Murtala Muhammed International Airport.</p>
          <ul className="mt-6 flex gap-3">
            {socials.map(({ name, url, Icon }) => (
              <li key={name}>
                <a
                  href={url || "#"}
                  target={url ? "_blank" : undefined}
                  rel="noreferrer"
                  aria-label={url ? name : `${name} (link not added yet)`}
                  onClick={(e) => !url && e.preventDefault()}
                  className={`grid size-11 place-items-center rounded-full border border-ivory/25 transition hover:border-gold hover:text-gold ${url ? "" : "opacity-60"}`}
                >
                  <Icon />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <nav aria-label="Footer">
          <h2 className="text-2xl">Explore</h2>
          <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-1 text-sm md:grid-cols-1">
            {hotelData.nav.map((l) => (
              <li key={l.label}>
                <Link to={l.to} className="inline-block py-2 text-ivory/75 transition hover:text-gold">{l.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="text-2xl">Contact</h2>
          <address className="mt-4 space-y-3 text-sm not-italic leading-relaxed text-ivory/75">
            <p>{hotelData.addressLines.join(" ")}</p>
            <p>{hotelData.phone ? <a href={`tel:${hotelData.phone.replace(/\s/g, "")}`}>{hotelData.phone}</a> : PLACEHOLDERS.phone}</p>
            <p>{hotelData.email ? <a href={`mailto:${hotelData.email}`}>{hotelData.email}</a> : PLACEHOLDERS.email}</p>
          </address>
        </div>
      </div>
      <div className="wrap mt-14 border-t border-ivory/10 pt-6 text-xs text-ivory/50">
        © {new Date().getFullYear()} {hotelData.name}. All rights reserved.
      </div>
    </footer>
  );
}
