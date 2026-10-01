# Sena Hotel & Resort: website redesign

React + Vite + TypeScript + Tailwind CSS v4 + Framer Motion + Lucide.

## Run it
```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # type-check + production build into /dist
npm run preview
```
Deploy /dist to Netlify or Vercel. SPA rewrites are included (`public/_redirects`, `vercel.json`).

## About the photos
Every photo on the site right now is a **free-license stock photo** (Unsplash License), not a picture of the actual Sena Hotel — I couldn't find any real photos of the hotel that were mine to reuse. They're wired in from `src/data/stockPhotos.ts` so the site doesn't look empty for your pitch. Credits are listed in that file. Replace them with the hotel's own photography before treating this as final — see the image row below.

## Where to change things
| What | Where |
|---|---|
| Hotel photos | Currently stock placeholders from `src/data/stockPhotos.ts`. To swap in real photos: drop files in `public/images/` (hero, about, dining), `public/images/rooms/`, `public/images/gallery/`, then point `src/data/images.ts` and `src/data/rooms.ts` at those local paths instead of `stock.*`. Missing files show a labelled placeholder. Export as WebP, ~1600px wide (hero) / ~900px (cards). |
| Phone, email, maps link, reviews link, menu link | `src/data/hotelData.ts` |
| WhatsApp number | `HOTEL_WHATSAPP_NUMBER` at the top of `src/data/hotelData.ts` (digits with country code, e.g. `2348012345678`) |
| Instagram / Facebook / TikTok | `instagram`, `facebook`, `tiktok` in `src/data/hotelData.ts` |
| Rooms (names, copy, capacity, beds, rates, photos) | `src/data/rooms.ts` |
| Amenities | `src/data/amenities.ts` |
| Gallery photos and categories | `src/data/images.ts` |
| Rating summary (3.6 / ~138 reviews) | `rating` in `src/data/hotelData.ts` (re-check before launch) |
| Colours and fonts | `@theme` block in `src/index.css` |
| SEO, Open Graph, Hotel structured data | `index.html` (add `/public/og-image.jpg`, plus `url`, `telephone`, `sameAs` in the JSON-LD once known) |

## Connecting a real booking system
All booking and contact submissions go through `src/lib/booking.ts`:
`submitBookingRequest()` and `submitContactMessage()` currently simulate a request.
Replace the body with Supabase, the hotel's API, an email function, a WhatsApp handoff
(`buildWhatsAppLink` + `bookingSummaryMessage` are ready) or a payment link (Paystack/Flutterwave).
The UI already handles loading, success and error states.

## What changed in this pass
- **Amenities is now the showpiece**: hover or tap a facility and the full-bleed photo behind the list crossfades to match it — a "walk the building" moment instead of an icon grid (`components/Amenities.tsx`).
- **Rooms** dropped the three-identical-cards layout for one large featured room with the name set directly on the photo, plus a quieter list for the other two (`components/RoomCard.tsx`, `components/Rooms.tsx`).
- **Arch dividers** (`components/ArchDivider.tsx`) replace hard colour cuts between sections, echoing the arch-topped portrait in Welcome.
- **Hero** now has a slow parallax drift on scroll and an arch-shaped scroll cue that draws itself in.
- A very quiet **grain texture** sits over the whole page, buttons fill in from the left on hover instead of flat-swapping colour, and nav links underline in on hover/focus — all in `index.css`.
- A soft **cursor glow** trails the pointer and grows over clickable things, desktop only (`components/CursorGlow.tsx`); it's off for touch devices and reduced-motion.

## Design plan (summary)
- **Palette:** charcoal `#1b1916`, ivory `#f8f3ea`, sand `#ece3d3`, muted gold `#c9a56a` (text-safe deep gold `#7c5d31` on light backgrounds), white.
- **Type:** Cormorant Garamond (headings), Manrope (body/UI).
- **Signature detail:** the arch-topped portrait in the welcome section, echoing hotel doorways and windows; everything else stays quiet.
- **Flow:** Hero + overlapping booking panel → Welcome → Rooms → Amenities (dark) → Dining → Gallery → Comfort features → Reviews → Location → Contact → Footer.
- **Mobile:** bottom-sheet modals, swipeable room cards, full-screen menu, 44px+ touch targets.
- **Content rule:** no invented prices, contacts, reviews, room specs or facilities. Every unknown is a visible placeholder.
