import Hero from "../components/Hero";
import BookingWidget from "../components/BookingWidget";
import About from "../components/About";
import Rooms from "../components/Rooms";
import Amenities from "../components/Amenities";
import Dining from "../components/Dining";
import Gallery from "../components/Gallery";
import Features from "../components/Features";
import Reviews from "../components/Reviews";
import Location from "../components/Location";
import Contact from "../components/Contact";
import ArchDivider from "../components/ArchDivider";
import { useTitle } from "../lib/useTitle";

const IVORY = "#f8f3ea";
const SAND = "#ece3d3";
const INK = "#1b1916";

export default function Home() {
  useTitle(
    "Sena Hotel & Resort | Hotel in Ajao Estate, Lagos near the Airport",
    "Sena Hotel & Resort is a 3-star hotel in Ajao Estate, Oshodi-Isolo, Lagos, about 17 minutes by car from Murtala Muhammed International Airport. Rooms, restaurant, bar and lounge, and a 24-hour front desk.",
  );
  return (
    <>
      <Hero />
      <BookingWidget />
      <About />
      <Rooms />
      <ArchDivider from={SAND} to={INK} />
      <Amenities />
      <ArchDivider from={INK} to={IVORY} flip />
      <Dining />
      <Gallery />
      <Features />
      <Reviews />
      <Location />
      <Contact />
      <ArchDivider from={SAND} to={INK} />
    </>
  );
}
