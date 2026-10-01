/**
 * Central hotel configuration.
 * Everything marked "" is unconfirmed: fill it in once the hotel provides it.
 * Empty values render a visible "Add ..." placeholder on the site.
 */

// Digits only, with country code, no "+" or spaces. Example: "2348012345678"
// Replace with hotel WhatsApp number
export const HOTEL_WHATSAPP_NUMBER = "";

export const WHATSAPP_MESSAGE =
  "Hello Sena Hotel & Resort, I would like to make a reservation. Please assist me with availability and rates.";

export const hotelData = {
  name: "Sena Hotel & Resort",
  shortName: "SENA",
  category: "3-Star Hotel",
  address: "3 Ahanor Drive, Behind CHI Limited, Ajao Estate, Oshodi-Isolo, Lagos, Nigeria",
  addressLines: [
    "3 Ahanor Drive,",
    "Behind CHI Limited,",
    "Ajao Estate,",
    "Oshodi-Isolo,",
    "Lagos, Nigeria.",
  ],

  // ---- Fill these in when confirmed by the hotel ----
  phone: "",
  email: "",
  whatsapp: HOTEL_WHATSAPP_NUMBER,
  googleMapsUrl: "", // the hotel's Google Maps "share" link (used by Get Directions)
  googleReviewsUrl: "", // link to the Google reviews page (used by Read More Reviews)
  menuUrl: "", // optional: link to a restaurant menu (PDF or page)
  instagram: "",
  facebook: "",
  tiktok: "",

  airport: {
    name: "Murtala Muhammed International Airport",
    travel: "approximately 17 minutes by car",
  },

  // Rating summary as listed on Google. Re-check the numbers before launch.
  rating: { score: 3.6, outOf: 5, countLabel: "approximately 138 Google reviews" },

  nav: [
    { label: "Home", to: "/" },
    { label: "Rooms", to: "/#rooms" },
    { label: "About", to: "/#about" },
    { label: "Dining", to: "/#dining" },
    { label: "Amenities", to: "/#amenities" },
    { label: "Gallery", to: "/#gallery" },
    { label: "Location", to: "/#location" },
    { label: "Contact", to: "/#contact" },
  ],
};

export const PLACEHOLDERS = {
  phone: "Add confirmed hotel phone number",
  email: "Add confirmed hotel email",
  whatsapp: "Replace with hotel WhatsApp number",
};
