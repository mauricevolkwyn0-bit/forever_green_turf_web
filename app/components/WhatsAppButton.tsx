"use client";

import { FaWhatsapp } from "react-icons/fa";
import { useCookieConsent } from "./CookieConsentContext";

const PHONE = "27814125540";
const MESSAGE = "Hi ForeverGreenTurf, I'd like more information.";

export default function WhatsAppButton() {
  const { isOpen: cookieBannerOpen } = useCookieConsent();

  // Avoid overlapping the cookie consent banner, which also sits bottom-right.
  if (cookieBannerOpen) return null;

  return (
    <a
      href={`https://wa.me/${PHONE}?text=${encodeURIComponent(MESSAGE)}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      style={{
        position: "fixed", bottom: 55, right: 35, zIndex: 150,
        width: 56, height: 56, borderRadius: "50%",
        background: "#25D366", color: "#fff",
        display: "flex", alignItems: "center", justifyContent: "center",
        boxShadow: "0 6px 20px rgba(0,0,0,0.25)",
        transition: "transform 0.2s ease",
      }}
      onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.08)")}
      onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
    >
      <FaWhatsapp size={30} />
    </a>
  );
}
