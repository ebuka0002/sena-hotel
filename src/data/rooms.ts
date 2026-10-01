import { Snowflake, Wifi, Sparkles, ConciergeBell, Clock } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { stock } from "./stockPhotos";

export interface RoomFeature { label: string; icon: LucideIcon }

export interface Room {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  features: RoomFeature[];
  amenities: string[];
  images: { src: string; alt: string }[];
  rate: string;
  capacity: string;
  beds: string;
}

const PENDING = "To be confirmed by the hotel";

/**
 * EDIT ROOMS HERE. Nothing below is a confirmed spec: capacity, bed setup,
 * size and rates are placeholders until the hotel provides them.
 */
export const rooms: Room[] = [
  {
    id: "classic",
    slug: "classic-room",
    name: "Classic Room",
    tagline: "A comfortable base for a restful stay",
    description:
      "The Classic Room is a comfortable, straightforward choice for a stay in Lagos. Exact layout and inclusions will be confirmed by the hotel.",
    features: [
      { label: "Air conditioning", icon: Snowflake },
      { label: "Wi-Fi", icon: Wifi },
      { label: "Housekeeping", icon: Sparkles },
    ],
    amenities: ["Air conditioning", "Wi-Fi", "Housekeeping", "24-hour front desk", "Room service"],
    images: [
      { src: "/images/bed.jpg", alt: "Classic Room at Sena Hotel & Resort (stock placeholder)" },
      { src: "/images/toilet.png", alt: "Classic Room bathroom (stock placeholder)" },
      { src: "/images/bed4.png", alt: "Classic Room seating area (stock placeholder)" },
    ],
    rate: "Contact for rates",
    capacity: PENDING,
    beds: PENDING,
  },
   
  {
    id: "deluxe-double",
    slug: "deluxe-double-room",
    name: "Deluxe Double Room",
    tagline: "A little more space and comfort",
    description:
      "The Deluxe Double Room is designed for guests who want a step up in comfort. Bed configuration, size and inclusions will be confirmed by the hotel.",
    features: [
      { label: "Air conditioning", icon: Snowflake },
      { label: "Wi-Fi", icon: Wifi },
      { label: "Room service", icon: ConciergeBell },
    ],
    amenities: ["Air conditioning", "Wi-Fi", "Housekeeping", "24-hour front desk", "Room service"],
    images: [
      { src: "/images/bed1.jpg", alt: "Deluxe Double Room at Sena Hotel & Resort (stock placeholder)" },
      { src: "/images/bed2.jpg", alt: "Deluxe Double Room seating (stock placeholder)" },
      { src: stock.bathroom, alt: "Deluxe Double Room bathroom (stock placeholder)" },
    ],
    rate: "Contact for rates",
    capacity: PENDING,
    beds: PENDING,
  },
  {
    id: "business-suite",
    slug: "business-suite",
    name: "Business Suite",
    tagline: "Room to work and rest",
    description:
      "The Business Suite suits longer or work-focused stays, backed by the hotel's 24-hour front desk. Layout and inclusions will be confirmed by the hotel.",
    features: [
      { label: "Air conditioning", icon: Snowflake },
      { label: "Wi-Fi", icon: Wifi },
      { label: "24-hour front desk", icon: Clock },
    ],
    amenities: ["Air conditioning", "Wi-Fi", "Housekeeping", "24-hour front desk", "Room service"],
    images: [
      { src: stock.bedroom, alt: "Business Suite living area at Sena Hotel & Resort (stock placeholder)" },
      { src: "/images/bed5.jpg", alt: "Business Suite bedroom (stock placeholder)" },
      { src: stock.bathroom, alt: "Business Suite bathroom (stock placeholder)" },
    ],
    rate: "Contact for rates",
    capacity: PENDING,
    beds: PENDING,
  },
];
