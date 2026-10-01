/**
 * Temporary stand-in photography.
 *
 * These are NOT photos of Sena Hotel & Resort — they are free-license stock
 * photos (Unsplash License: free to use, no permission needed) used only so
 * the demo doesn't look empty. Swap every one of these for the hotel's own
 * photographs before this goes live or gets presented as final. See
 * src/data/images.ts and src/data/rooms.ts for where each is used, and
 * PHOTO_CREDITS below for attribution (not required by the license, but
 * good practice).
 */
const u = (id: string, w: number) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const stock = {
  lobby: u("photo-1759038086403-c607d67bb245", 1800), // Neon Wang
  exterior: u("photo-1766634001778-c44327686895", 1800), // Kouji Tsuru
  hotelRoom: u("photo-1702255489644-392758161f1f", 1600), // Wes Hicks
  bedroom: u("photo-1631049421450-348ccd7f8949", 1600), // Point3D Commercial Imaging Ltd.
  bathroom: u("photo-1664227430687-9299c593e3da", 1600), // Yosuke Ota
  restaurant: u("photo-1754557619846-0574960c5f3f", 1600), // Deepal Tamang
  bar: u("photo-1760982192590-de2b005bb4d5", 1200), // Jazmin Wong
};

export const PHOTO_CREDITS = [
  "Lobby — Neon Wang on Unsplash",
  "Exterior — Kouji Tsuru on Unsplash",
  "Hotel room — Wes Hicks on Unsplash",
  "Bedroom — Point3D Commercial Imaging Ltd. on Unsplash",
  "Bathroom — Yosuke Ota on Unsplash",
  "Restaurant table — Deepal Tamang on Unsplash",
  "Bar — Jazmin Wong on Unsplash",
];
