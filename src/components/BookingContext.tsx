import { createContext, useCallback, useContext, useState } from "react";
import type { ReactNode } from "react";
import BookingModal from "./BookingModal";
import type { BookingPrefill } from "./BookingModal";

const Ctx = createContext<{ openBooking: (prefill?: BookingPrefill) => void }>({ openBooking: () => {} });
export const useBooking = () => useContext(Ctx);

export function BookingProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<{ open: boolean; prefill: BookingPrefill; n: number }>({ open: false, prefill: {}, n: 0 });
  const openBooking = useCallback((prefill: BookingPrefill = {}) => setState((s) => ({ open: true, prefill, n: s.n + 1 })), []);
  const close = useCallback(() => setState((s) => ({ ...s, open: false })), []);

  return (
    <Ctx.Provider value={{ openBooking }}>
      {children}
      <BookingModal key={state.n} open={state.open} onClose={close} prefill={state.prefill} />
    </Ctx.Provider>
  );
}
