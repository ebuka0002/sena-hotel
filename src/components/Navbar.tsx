import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { AnimatePresence, m } from "framer-motion";
import Logo from "./Logo";
import { hotelData } from "../data/hotelData";
import { useBooking } from "./BookingContext";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const { openBooking } = useBooking();
  const solid = scrolled || open || pathname !== "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 text-ivory transition-[background-color,box-shadow,padding] duration-500 ${
        solid ? "bg-ink py-3 shadow-[0_1px_0_rgba(201,165,106,.25)]" : "bg-transparent py-5"
      }`}
    >
      <div className="wrap flex items-center justify-between gap-6">
        <Link to="/" aria-label="Sena Hotel & Resort, home" className="shrink-0">
          <Logo />
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-7 lg:flex">
          {hotelData.nav.map((l) => (
            <Link key={l.label} to={l.to} className="nav-link text-[0.86rem] font-medium text-ivory/85 transition hover:text-gold">
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button type="button" onClick={() => openBooking()} className="btn btn-gold hidden min-h-11 px-5 sm:inline-flex">
            Book Now
          </button>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="grid size-11 place-items-center rounded-full border border-ivory/25 lg:hidden"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <m.nav
            id="mobile-menu"
            aria-label="Mobile"
            className="fixed inset-x-0 bottom-0 top-[4.4rem] overflow-y-auto bg-ink px-6 pb-10 pt-6 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <ul className="divide-y divide-ivory/10">
              {hotelData.nav.map((l) => (
                <li key={l.label}>
                  <Link to={l.to} onClick={() => setOpen(false)} className="block py-4 font-serif text-3xl">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                openBooking();
              }}
              className="btn btn-gold mt-8 w-full"
            >
              Book Now
            </button>
          </m.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
