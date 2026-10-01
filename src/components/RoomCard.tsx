import type { Room } from "../data/rooms";
import SmartImage from "./SmartImage";
import { useBooking } from "./BookingContext";

/**
 * `featured`: large format, name set directly over the photo (the room
 * you lead with). Otherwise: a quieter photo-over-text card. Either way,
 * no shadow-and-radius sameness — the image does the talking.
 */
export default function RoomCard({ room, onView, featured = false }: { room: Room; onView: (r: Room) => void; featured?: boolean }) {
  const { openBooking } = useBooking();

  if (featured) {
    return (
      <article className="group relative overflow-hidden rounded-2xl">
        <SmartImage
          src={room.images[0].src}
          alt={room.images[0].alt}
          label={`Replace with ${room.name} photo`}
          className="aspect-[4/3] w-full transition duration-700 ease-out group-hover:scale-[1.03] lg:aspect-[16/10]"
          sizes="(min-width:1024px) 60vw, 92vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-6 sm:p-9">
          <p className="text-sm font-medium text-gold">{room.tagline}</p>
          <h3 className="mt-1 text-4xl leading-tight text-ivory sm:text-5xl">{room.name}</h3>
          <div className="mt-5 flex flex-wrap items-center gap-4">
            <button type="button" onClick={() => onView(room)} className="btn btn-line text-ivory">View Room</button>
            <button type="button" onClick={() => openBooking({ roomId: room.id })} className="btn btn-gold">Book Now</button>
            <span className="ml-auto text-sm font-semibold text-ivory/85">{room.rate}</span>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="group flex gap-5">
      <button type="button" onClick={() => onView(room)} aria-label={`View ${room.name}`} className="shrink-0 overflow-hidden rounded-xl">
        <SmartImage
          src={room.images[0].src}
          alt={room.images[0].alt}
          label={`Replace with ${room.name} photo`}
          className="aspect-square w-28 transition duration-700 ease-out group-hover:scale-110 sm:w-36"
          sizes="150px"
        />
      </button>
      <div className="flex min-w-0 flex-1 flex-col border-b border-ink/12 pb-5">
        <h3 className="text-2xl leading-tight sm:text-3xl">{room.name}</h3>
        <p className="mt-1 text-sm leading-relaxed text-ink/65">{room.tagline}</p>
        <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-2 pt-3">
          <button type="button" onClick={() => onView(room)} className="text-sm font-semibold text-gold-deep underline-offset-4 hover:underline">View Room</button>
          <button type="button" onClick={() => openBooking({ roomId: room.id })} className="text-sm font-semibold underline-offset-4 hover:underline">Book Now</button>
          <span className="ml-auto text-sm font-semibold text-gold-deep">{room.rate}</span>
        </div>
      </div>
    </article>
  );
}
