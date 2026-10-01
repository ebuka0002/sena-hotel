/**
 * IMAGE MAP. Put the hotel's real photographs in /public/images/ using these
 * file names (or change the paths here). Missing files show a labelled
 * placeholder, never a stock photo passed off as the hotel.
 *
 * Tip: export as WebP, about 1600px wide for hero/large images, 900px for cards.
 */
import { stock } from "./stockPhotos";

// Using free-license stock photos as stand-ins until real hotel photography
// is supplied — see stockPhotos.ts. Point these at /images/... local files
// (see comment there) once you have the hotel's own photos.
export const images = {
  hero: "/images/sena1.jpg",
  about: "/images/sena-hotel.jpg",
  dining: stock.restaurant,
  diningSecondary: stock.bar,
};

export type GalleryCategory = "Rooms" | "Interiors" | "Dining" | "Lounge" | "Exterior";

export interface GalleryItem {
  id: string;
  category: GalleryCategory;
  src: string;
  alt: string;
  caption: string;
}

export const galleryCategories: GalleryCategory[] = ["Rooms", "Interiors", "Dining", "Lounge", "Exterior"];

export const gallery: GalleryItem[] = [
  { id: "ext-1", category: "Exterior", src: "/images/sena1.jpg", alt: "Exterior of Sena Hotel & Resort, Ajao Estate, Lagos (stock placeholder)", caption: "The hotel exterior" },
  { id: "room-1", category: "Rooms", src: "/images/bed7.jpg", alt: "Guest room at Sena Hotel & Resort (stock placeholder)", caption: "Guest room" },
  { id: "int-1", category: "Interiors", src: stock.lobby, alt: "Reception and interior at Sena Hotel & Resort (stock placeholder)", caption: "Reception" },
  { id: "din-1", category: "Dining", src: stock.restaurant, alt: "Restaurant at Sena Hotel & Resort (stock placeholder)", caption: "The restaurant" },
  { id: "lou-1", category: "Lounge", src: stock.bar, alt: "Bar and lounge at Sena Hotel & Resort (stock placeholder)", caption: "Bar and lounge" },
  { id: "room-2", category: "Rooms", src: "/images/bed8.jpg", alt: "Deluxe room at Sena Hotel & Resort (stock placeholder)", caption: "Deluxe room" },
  { id: "int-2", category: "Interiors", src: stock.bathroom, alt: "Bathroom interior at Sena Hotel & Resort (stock placeholder)", caption: "Interiors" },
  { id: "ext-2", category: "Exterior", src: "/images/sena2.jpg", alt: "Entrance to Sena Hotel & Resort (stock placeholder)", caption: "Entrance and parking" },
  { id: "din-2", category: "Dining", src: "/images/food.jpg", alt: "Breakfast setting at Sena Hotel & Resort (stock placeholder)", caption: "Breakfast" },
  { id: "room-3", category: "Rooms", src: "/images/sena-bed.jpg", alt: "Business Suite bathroom at Sena Hotel & Resort (stock placeholder)", caption: "Business Suite" },
];
