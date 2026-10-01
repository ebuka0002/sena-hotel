/**
 * Repeating arch silhouette — the same shape as the About portrait frame —
 * used as a seam between sections instead of a hard colour cut. Doorway/
 * window arches are a small nod to the building's own facade.
 */
export default function ArchDivider({ from, to, flip = false }: { from: string; to: string; flip?: boolean }) {
  return (
    <div aria-hidden className={`relative h-10 w-full sm:h-14 ${flip ? "-scale-y-100" : ""}`} style={{ background: from }}>
      <svg viewBox="0 0 400 40" preserveAspectRatio="none" className="absolute inset-0 h-full w-full" style={{ color: to }}>
        <path
          fill="currentColor"
          d="M0,40 L0,22 C0,22 8,4 20,4 C32,4 40,22 40,22 L40,40 Z
             M40,40 L40,22 C40,22 48,4 60,4 C72,4 80,22 80,22 L80,40 Z
             M80,40 L80,22 C80,22 88,4 100,4 C112,4 120,22 120,22 L120,40 Z
             M120,40 L120,22 C120,22 128,4 140,4 C152,4 160,22 160,22 L160,40 Z
             M160,40 L160,22 C160,22 168,4 180,4 C192,4 200,22 200,22 L200,40 Z
             M200,40 L200,22 C200,22 208,4 220,4 C232,4 240,22 240,22 L240,40 Z
             M240,40 L240,22 C240,22 248,4 260,4 C272,4 280,22 280,22 L280,40 Z
             M280,40 L280,22 C280,22 288,4 300,4 C312,4 320,22 320,22 L320,40 Z
             M320,40 L320,22 C320,22 328,4 340,4 C352,4 360,22 360,22 L360,40 Z
             M360,40 L360,22 C360,22 368,4 380,4 C392,4 400,22 400,22 L400,40 Z"
        />
      </svg>
    </div>
  );
}
