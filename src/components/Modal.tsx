import { useEffect, useRef } from "react";
import type { ReactNode } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, m } from "framer-motion";

interface Props {
  open: boolean;
  onClose: () => void;
  label: string;
  children: ReactNode;
  variant?: "sheet" | "lightbox";
  panelClassName?: string;
}

const FOCUSABLE = 'a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])';

/** Accessible dialog: focus trap, Escape to close, scroll lock, focus restore. */
export default function Modal({ open, onClose, label, children, variant = "sheet", panelClassName = "" }: Props) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef(onClose);
  closeRef.current = onClose;

  useEffect(() => {
    if (!open) return;
    const previous = document.activeElement as HTMLElement | null;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const focusables = () => Array.from(panelRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE) ?? []);
    const t = window.setTimeout(() => (focusables()[0] ?? panelRef.current)?.focus(), 40);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        closeRef.current();
      } else if (e.key === "Tab") {
        const f = focusables();
        if (!f.length) return;
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(t);
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      previous?.focus?.();
    };
  }, [open]);

  const lightbox = variant === "lightbox";

  return createPortal(
    <AnimatePresence>
      {open && (
        <m.div
          className={`fixed inset-0 z-[100] flex ${lightbox ? "items-stretch justify-stretch bg-ink/95" : "items-end justify-center bg-ink/70 sm:items-center sm:p-6"}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
        >
          <m.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label={label}
            tabIndex={-1}
            className={
              lightbox
                ? `relative flex h-full w-full flex-col ${panelClassName}`
                : `relative max-h-[94svh] w-full overflow-y-auto overscroll-contain rounded-t-3xl bg-ivory shadow-2xl sm:max-w-3xl sm:rounded-3xl ${panelClassName}`
            }
            initial={lightbox ? { opacity: 0, scale: 0.98 } : { opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={lightbox ? { opacity: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            {children}
          </m.div>
        </m.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
