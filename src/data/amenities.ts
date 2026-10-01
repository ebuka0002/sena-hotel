import { Wine, Utensils, ConciergeBell, Snowflake, Wifi, Car, Clock, Coffee, Sparkles } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface Amenity {
  id: string;
  name: string;
  description: string;
  icon: LucideIcon;
}

// Only facilities commonly listed by booking platforms. Keep it that way
// unless the hotel confirms more.
export const amenities: Amenity[] = [
  { id: "restaurant", name: "Restaurant", description: "Meals on site, without leaving the hotel.", icon: Utensils },
  { id: "bar", name: "Bar & Lounge", description: "A relaxed place to unwind after a long day.", icon: Wine },
  { id: "room-service", name: "Room Service", description: "Food and refreshments brought to your room.", icon: ConciergeBell },
  { id: "ac", name: "Air Conditioning", description: "Comfortable temperatures indoors.", icon: Snowflake },
  { id: "wifi", name: "Wi-Fi", description: "Stay connected during your stay.", icon: Wifi },
  { id: "parking", name: "Free Parking", description: "On-site parking is listed. Confirm terms when you book.", icon: Car },
  { id: "front-desk", name: "24-Hour Front Desk", description: "Help with arrivals and requests at any hour.", icon: Clock },
  { id: "breakfast", name: "Breakfast", description: "Continental breakfast is listed by booking platforms.", icon: Coffee },
  { id: "housekeeping", name: "Daily Housekeeping", description: "Housekeeping to keep your room fresh.", icon: Sparkles },
];
