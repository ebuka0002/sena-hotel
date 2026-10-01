import { Link, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import RoomDetail from "../components/RoomDetail";
import { useBooking } from "../components/BookingContext";
import { rooms } from "../data/rooms";
import { useTitle } from "../lib/useTitle";

export default function RoomDetails() {
  const { slug } = useParams();
  const room = rooms.find((r) => r.slug === slug);
  const { openBooking } = useBooking();
  useTitle(room ? `${room.name} | Sena Hotel & Resort, Lagos` : "Room not found | Sena Hotel & Resort");

  if (!room) {
    return (
      <section className="wrap pb-32 pt-40 text-center">
        <h1 className="text-5xl">Room not found</h1>
        <Link to="/rooms" className="btn btn-dark mt-8">See all rooms</Link>
      </section>
    );
  }

  return (
    <section className="wrap pb-24 pt-32">
      <Link to="/rooms" className="mb-6 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-gold-deep"><ArrowLeft size={16} aria-hidden /> All rooms</Link>
      <div className="mx-auto max-w-4xl overflow-hidden rounded-3xl bg-white">
        <RoomDetail room={room} headingId="room-page-title" onRequest={() => openBooking({ roomId: room.id })} />
      </div>
    </section>
  );
}
