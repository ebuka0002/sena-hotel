import { useState } from "react";
import { ImageIcon } from "lucide-react";

interface Props {
  src?: string;
  alt: string;
  className?: string;
  /** Text shown on the placeholder when the photo file is missing. */
  label?: string;
  tone?: "light" | "dark";
  /** Hides the label (for full-bleed backgrounds with text on top). */
  quiet?: boolean;
  priority?: boolean;
  sizes?: string;
}

/**
 * Renders the hotel photo if the file exists. If it doesn't, it shows a clearly
 * labelled placeholder so a stock photo is never passed off as the hotel.
 */
export default function SmartImage({ src, alt, className = "", label, tone = "light", quiet, priority, sizes }: Props) {
  const [failed, setFailed] = useState(!src);

  if (failed) {
    const dark = tone === "dark";
    return (
      <div
        role="img"
        aria-label={`${alt} (photo placeholder)`}
        className={`relative flex items-center justify-center overflow-hidden ${className}`}
        style={{
          background: dark
            ? "radial-gradient(120% 90% at 70% 10%, #4a3d2b 0%, #2a251f 45%, #1b1916 100%)"
            : "linear-gradient(135deg, #e7dcc8 0%, #d8c9ae 100%)",
        }}
      >
        {!quiet && (
          <div className={`flex flex-col items-center gap-2 px-4 text-center ${dark ? "text-gold/80" : "text-gold-deep/80"}`}>
            <ImageIcon size={26} strokeWidth={1.3} aria-hidden />
            <span className="text-xs font-medium">{label ?? "Replace with hotel photo"}</span>
          </div>
        )}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      sizes={sizes}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      fetchPriority={priority ? "high" : "auto"}
      onError={() => setFailed(true)}
      className={`object-cover ${className}`}
    />
  );
}
