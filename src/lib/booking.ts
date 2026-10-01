import { hotelData, WHATSAPP_MESSAGE } from "../data/hotelData";

export interface BookingRequest {
  checkIn: string;
  checkOut: string;
  adults: number;
  children: number;
  rooms: number;
  roomType: string;
  name: string;
  email: string;
  phone: string;
  requests: string;
}

export interface ContactMessage {
  name: string;
  email: string;
  phone: string;
  message: string;
}

/**
 * BOOKING BACKEND HOOK.
 * Right now this only simulates a network call. Replace the body with one of:
 *
 *  - Supabase:   await supabase.from("booking_requests").insert(data)
 *  - Hotel API:  await fetch("https://<hotel-api>/reservations", { method: "POST", body: JSON.stringify(data) })
 *  - Email:      POST to a serverless function that sends the request (Resend, EmailJS, etc.)
 *  - WhatsApp:   open buildWhatsAppLink(bookingSummaryMessage(data))
 *  - Payments:   after the hotel confirms, send the guest a Paystack/Flutterwave link
 *
 * Throw an Error to show the form's error state.
 */
export async function submitBookingRequest(_data: BookingRequest): Promise<void> {
  await new Promise((r) => setTimeout(r, 900));
}

/** Same idea for the contact form. */
export async function submitContactMessage(_data: ContactMessage): Promise<void> {
  await new Promise((r) => setTimeout(r, 700));
}

export const whatsappConfigured = () => hotelData.whatsapp.replace(/\D/g, "").length > 6;

export function buildWhatsAppLink(message: string = WHATSAPP_MESSAGE): string {
  const number = hotelData.whatsapp.replace(/\D/g, "");
  const text = encodeURIComponent(message);
  // Without a number, wa.me lets the visitor pick a contact, so the button still opens WhatsApp in demos.
  return number ? `https://wa.me/${number}?text=${text}` : `https://wa.me/?text=${text}`;
}

export function bookingSummaryMessage(d: BookingRequest): string {
  return [
    "Hello Sena Hotel & Resort, I would like to request a booking.",
    `Room: ${d.roomType}`,
    `Dates: ${d.checkIn} to ${d.checkOut}`,
    `Guests: ${d.adults} adult(s), ${d.children} child(ren), ${d.rooms} room(s)`,
    `Name: ${d.name}`,
    d.requests ? `Notes: ${d.requests}` : "",
    "Please confirm availability and rates.",
  ]
    .filter(Boolean)
    .join("\n");
}

export function directionsUrl(): string {
  return (
    hotelData.googleMapsUrl ||
    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent("Sena Hotel & Resort, " + hotelData.address)}`
  );
}

export function mapEmbedUrl(): string {
  return `https://www.google.com/maps?q=${encodeURIComponent("Sena Hotel & Resort, " + hotelData.address)}&output=embed`;
}
