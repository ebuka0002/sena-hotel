import { Suspense, lazy, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { LazyMotion, domAnimation } from "framer-motion";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";
import CursorGlow from "./components/CursorGlow";
import { BookingProvider } from "./components/BookingContext";
import Home from "./pages/Home";

const RoomsPage = lazy(() => import("./pages/RoomsPage"));
const RoomDetails = lazy(() => import("./pages/RoomDetails"));
const ContactPage = lazy(() => import("./pages/ContactPage"));

function ScrollManager() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const t = window.setTimeout(() => document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: "smooth" }), 80);
      return () => window.clearTimeout(t);
    }
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname, hash]);
  return null;
}

export default function App() {
  return (
    <LazyMotion features={domAnimation} strict>
      <BookingProvider>
        <a href="#main" className="sr-only z-[200] rounded bg-gold px-4 py-2 font-semibold text-ink focus:not-sr-only focus:fixed focus:left-4 focus:top-4">
          Skip to content
        </a>
        <ScrollManager />
        <Navbar />
        <main id="main">
          <Suspense fallback={<div className="min-h-screen" />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/rooms" element={<RoomsPage />} />
              <Route path="/rooms/:slug" element={<RoomDetails />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="*" element={<RoomDetails />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
        <WhatsAppButton />
        <CursorGlow />
      </BookingProvider>
    </LazyMotion>
  );
}
