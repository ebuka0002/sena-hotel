import { Clock, Plane, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { m, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import SmartImage from "./SmartImage";
import { images } from "../data/images";
import { useBooking } from "./BookingContext";

export default function Hero() {
  const { openBooking } = useBooking();
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Scale down the parallax shift on smaller screens to prevent aggressive cropping
  const imgY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 60]);

  return (
    <section
      ref={ref}
      id="home"
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-[100svh] items-end overflow-hidden bg-ink text-ivory"
    >
      {/* Background Container */}
      <m.div className="absolute inset-0 -z-10 overflow-hidden" style={{ y: imgY }}>
        <m.div
          className="relative h-full w-full"
          initial={reduce ? false : { scale: 1.05 }}
          animate={{ scale: 1 }}
          transition={{ duration: 16, ease: "easeOut" }}
        >
          <SmartImage
            src={images.hero}
            alt="Sena Hotel & Resort, Lagos"
            tone="dark"
            quiet
            priority
            sizes="100vw"
            className="h-full w-full object-cover object-center sm:object-[center_35%]"
          />
        </m.div>
      </m.div>

      {/* Overlay Gradient */}
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-t from-ink/90 via-ink/50 to-ink/35"
        aria-hidden
      />

      <div className="wrap pb-24 pt-32 sm:pb-40 lg:pb-44">
        <m.div
          className="max-w-3xl"
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="font-serif text-xl tracking-[0.28em] text-gold sm:text-2xl">
            SENA HOTEL &amp; RESORT
          </p>
          <h1
            id="hero-title"
            className="mt-4 text-[2.2rem] leading-[1.05] sm:text-6xl lg:text-7xl"
          >
            <span className="sr-only">Sena Hotel &amp; Resort, Lagos: </span>
            Comfort, Convenience &amp; Hospitality in Lagos
          </h1>
          <p className="mt-6 max-w-xl text-[1rem] leading-relaxed text-ivory/85 sm:text-lg">
            Experience a welcoming stay in Ajao Estate, Lagos, with comfortable
            rooms, dining, attentive service and convenient access to the
            airport.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => openBooking()}
              className="btn btn-gold"
            >
              Book Your Stay
            </button>
            <Link to="/#rooms" className="btn btn-line text-ivory">
              Explore Rooms
            </Link>
          </div>
          <ul className="mt-9 flex flex-col gap-3 text-sm text-ivory/85 sm:flex-row sm:flex-wrap sm:gap-x-7">
            <li className="flex items-center gap-2">
              <Star size={16} className="text-gold" aria-hidden /> 3-star hotel
            </li>
            <li className="flex items-center gap-2">
              <Plane size={16} className="text-gold" aria-hidden /> About 17
              minutes from the airport by car
            </li>
            <li className="flex items-center gap-2">
              <Clock size={16} className="text-gold" aria-hidden /> 24-hour
              front desk
            </li>
          </ul>
        </m.div>
      </div>

      {/* Scroll indicator */}
      <a
        href="#about"
        aria-label="Scroll to welcome section"
        className="absolute bottom-28 right-6 hidden size-14 place-items-center text-ivory/80 transition hover:text-gold lg:grid"
      >
        <svg
          viewBox="0 0 56 56"
          className="absolute inset-0 h-full w-full"
          aria-hidden
        >
          <m.path
            d="M8,48 L8,24 C8,12.95 16.95,4 28,4 C39.05,4 48,12.95 48,24 L48,48"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            initial={reduce ? false : { pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{
              duration: 1.4,
              delay: 1.1,
              ease: [0.22, 1, 0.36, 1],
            }}
          />
        </svg>
        <m.span
          className="mt-5 block h-2 w-2 rounded-full bg-current"
          animate={reduce ? undefined : { y: [0, 8, 0] }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2.4,
          }}
        />
      </a>
    </section>
  );
}