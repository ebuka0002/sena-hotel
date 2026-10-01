import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { gallery, galleryCategories } from "../data/images";
import type { GalleryCategory } from "../data/images";
import SmartImage from "./SmartImage";
import Modal from "./Modal";
import Reveal from "./Reveal";

const spans = ["md:col-span-2 md:row-span-2", "", "", "md:row-span-2", "", "md:col-span-2", "", "", "md:col-span-2", "md:row-span-2"];

export default function Gallery() {
  const [cat, setCat] = useState<GalleryCategory | "All">("All");
  const [index, setIndex] = useState<number | null>(null);
  const items = cat === "All" ? gallery : gallery.filter((g) => g.category === cat);
  const open = index !== null;
  const current = index !== null ? items[index] : null;

  const step = (d: number) => setIndex((i) => (i === null ? i : (i + d + items.length) % items.length));

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, items.length]);

  return (
    <section id="gallery" aria-labelledby="gallery-title" className="section bg-sand/60">
      <div className="mx-auto w-full max-w-[110rem] px-4 sm:px-8">
        <Reveal className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h2 id="gallery-title" className="text-4xl leading-[1.05] sm:text-5xl lg:text-6xl">Gallery</h2>
            <p className="mt-4 max-w-md text-ink/70">A look around the hotel. Tap any photo to enlarge it.</p>
          </div>
          <div role="group" aria-label="Filter gallery by category" className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:mx-0 sm:px-0 [&::-webkit-scrollbar]:hidden">
            {(["All", ...galleryCategories] as const).map((c) => (
              <button
                key={c}
                type="button"
                aria-pressed={cat === c}
                onClick={() => setCat(c)}
                className={`min-h-11 shrink-0 rounded-full border px-5 text-sm font-semibold transition ${cat === c ? "border-ink bg-ink text-ivory" : "border-ink/25 hover:border-ink"}`}
              >
                {c}
              </button>
            ))}
          </div>
        </Reveal>

        <ul className="mt-10 grid grid-cols-2 gap-2.5 sm:gap-3 md:auto-rows-[15rem] md:grid-cols-4">
          {items.map((g, i) => (
            <li key={g.id} className={`${spans[i % spans.length]} aspect-square md:aspect-auto`}>
              <button type="button" onClick={() => setIndex(i)} aria-label={`Enlarge photo: ${g.caption}`} className="group relative block h-full w-full overflow-hidden rounded-2xl">
                <SmartImage src={g.src} alt={g.alt} label={`Replace with ${g.caption.toLowerCase()} photo`} className="h-full w-full transition duration-700 group-hover:scale-105" sizes="(min-width:768px) 25vw, 50vw" />
                <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/70 to-transparent p-3 text-left text-sm font-medium text-ivory opacity-0 transition group-hover:opacity-100 group-focus-visible:opacity-100">
                  {g.caption}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      <Modal open={open} onClose={() => setIndex(null)} label="Photo gallery" variant="lightbox">
        {current && (
          <>
            <div className="flex items-center justify-between px-4 py-3 text-ivory sm:px-8">
              <p className="text-sm" aria-live="polite">{current.caption} <span className="text-ivory/50">({(index ?? 0) + 1} of {items.length})</span></p>
              <button type="button" onClick={() => setIndex(null)} aria-label="Close gallery" className="grid size-11 place-items-center rounded-full border border-ivory/25 text-ivory transition hover:border-gold">
                <X size={20} />
              </button>
            </div>
            <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 pb-6 sm:px-20">
              <SmartImage key={current.id} src={current.src} alt={current.alt} tone="dark" label={`Replace with ${current.caption.toLowerCase()} photo`} className="max-h-full w-full max-w-5xl rounded-2xl object-contain aspect-[3/2]" />
              <button type="button" onClick={() => step(-1)} aria-label="Previous photo" className="absolute left-2 top-1/2 grid size-12 -translate-y-1/2 place-items-center rounded-full bg-ink/70 text-ivory backdrop-blur transition hover:bg-gold hover:text-ink sm:left-6">
                <ChevronLeft size={24} />
              </button>
              <button type="button" onClick={() => step(1)} aria-label="Next photo" className="absolute right-2 top-1/2 grid size-12 -translate-y-1/2 place-items-center rounded-full bg-ink/70 text-ivory backdrop-blur transition hover:bg-gold hover:text-ink sm:right-6">
                <ChevronRight size={24} />
              </button>
            </div>
          </>
        )}
      </Modal>
    </section>
  );
}
