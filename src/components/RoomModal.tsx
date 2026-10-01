import { X } from "lucide-react";
import { Link } from "react-router-dom";
import Modal from "./Modal";
import RoomDetail from "./RoomDetail";
import type { Room } from "../data/rooms";
import { useBooking } from "./BookingContext";

export default function RoomModal({ room, onClose }: { room: Room | null; onClose: () => void }) {
  const { openBooking } = useBooking();
  return (
    <Modal open={!!room} onClose={onClose} label={room ? `${room.name} details` : "Room details"}>
      {room && (
        <>
          <div className="absolute right-4 top-4 z-10 flex gap-2">
            <Link to={`/rooms/${room.slug}`} onClick={onClose} className="btn min-h-11 bg-ivory/90 px-4 text-xs text-ink backdrop-blur">Open full page</Link>
            <button type="button" onClick={onClose} aria-label="Close room details" className="grid size-11 place-items-center rounded-full bg-ivory/90 text-ink backdrop-blur transition hover:bg-white">
              <X size={20} />
            </button>
          </div>
          <RoomDetail
            room={room}
            onRequest={() => {
              onClose();
              openBooking({ roomId: room.id });
            }}
          />
        </>
      )}
    </Modal>
  );
}
