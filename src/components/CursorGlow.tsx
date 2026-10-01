import { useEffect, useState } from "react";
import { m, useMotionValue, useSpring } from "framer-motion";

/**
 * A single soft dot that trails the pointer and expands over anything
 * clickable. Fine-pointer desktops only; never shown on touch devices,
 * and off entirely for reduced-motion.
 */
export default function CursorGlow() {
  const [enabled, setEnabled] = useState(false);
  const [big, setBig] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { damping: 28, stiffness: 300, mass: 0.4 });
  const sy = useSpring(y, { damping: 28, stiffness: 300, mass: 0.4 });

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;
    setEnabled(true);

    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const el = e.target as Element | null;
      setBig(!!el?.closest("a,button,input,select,textarea,[role='button']"));
    };
    window.addEventListener("pointermove", move);
    return () => window.removeEventListener("pointermove", move);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!enabled) return null;

  return (
    <m.div
      className="cursor-glow bg-ivory"
      style={{ x: sx, y: sy, translateX: "-50%", translateY: "-50%" }}
      animate={{ width: big ? 44 : 12, height: big ? 44 : 12, opacity: big ? 0.9 : 0.7 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
    />
  );
}
