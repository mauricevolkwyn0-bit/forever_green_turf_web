"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import { Phone, Mail, MapPin, CheckCircle, Send, Loader2 } from "lucide-react";
import { FOREST, GRASS, CREAM, STONE, FONT_DISPLAY, FONT_BODY, MAPS_URL } from "./theme";

const ERROR_RED = "#B3261E";
const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
const RECAPTCHA_ACTION = "contact";

// Minimal shape of the `google` global injected by the Maps JavaScript API
// script — just enough to type the Places Autocomplete usage below.
type GoogleMapsNamespace = {
  maps: {
    places: {
      Autocomplete: new (
        input: HTMLInputElement,
        opts: { fields: string[]; componentRestrictions: { country: string } }
      ) => {
        addListener: (event: string, handler: () => void) => { remove: () => void };
        getPlace: () => { formatted_address?: string };
      };
    };
    event: {
      removeListener: (listener: { remove: () => void }) => void;
      clearInstanceListeners: (instance: unknown) => void;
    };
  };
};

// Minimal shape of the `grecaptcha` global injected by the reCAPTCHA v3 script.
type Grecaptcha = {
  ready: (cb: () => void) => void;
  execute: (siteKey: string, opts: { action: string }) => Promise<string>;
};

// Resolves once with a fresh v3 token, or null if reCAPTCHA isn't configured
// or fails to load — submission then falls back to the server's fail-open
// behavior (see app/api/contact/route.ts).
function getRecaptchaToken(): Promise<string | null> {
  if (!RECAPTCHA_SITE_KEY) return Promise.resolve(null);
  const grecaptcha = (window as unknown as { grecaptcha?: Grecaptcha }).grecaptcha;
  if (!grecaptcha) return Promise.resolve(null);

  return new Promise(resolve => {
    grecaptcha.ready(() => {
      grecaptcha.execute(RECAPTCHA_SITE_KEY!, { action: RECAPTCHA_ACTION }).then(resolve).catch(() => resolve(null));
    });
  });
}

type FormState = { name: string; phone: string; email: string; location: string; service: string; message: string };

export default function Contact() {
  const [form, setForm] = useState<FormState>({ name: "", phone: "", email: "", location: "", service: "", message: "" });
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [mapsReady, setMapsReady] = useState(false);
  const [locationLoading, setLocationLoading] = useState(false);
  const locationInputRef = useRef<HTMLInputElement>(null);
  const locationDebounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  function set(field: keyof FormState, val: string) {
    setForm(f => ({ ...f, [field]: val }));
  }

  function setLocation(v: string) {
    set("location", v);
    setLocationLoading(true);
    if (locationDebounceRef.current) clearTimeout(locationDebounceRef.current);
    locationDebounceRef.current = setTimeout(() => setLocationLoading(false), 500);
  }

  useEffect(() => {
    const input = locationInputRef.current;
    if (!mapsReady || !input) return;
    const google = (window as unknown as { google?: GoogleMapsNamespace }).google;
    if (!google?.maps?.places) return;

    const autocomplete = new google.maps.places.Autocomplete(input, {
      fields: ["formatted_address"],
      componentRestrictions: { country: "za" },
    });
    const listener = autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();
      if (place?.formatted_address) {
        setForm(f => ({ ...f, location: place.formatted_address as string }));
      }
      if (locationDebounceRef.current) clearTimeout(locationDebounceRef.current);
      setLocationLoading(false);
    });

    return () => {
      google.maps.event.removeListener(listener);
      google.maps.event.clearInstanceListeners(input);
    };
  }, [mapsReady]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    setSubmitError(null);
    try {
      const recaptchaToken = await getRecaptchaToken();
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, recaptchaToken }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(body?.error || "Something went wrong. Please try again.");
      }
      setSent(true);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section style={{ background: CREAM, padding: "160px 24px 100px", fontFamily: FONT_BODY }}>
      {GOOGLE_MAPS_API_KEY && (
        <Script
          src={`https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places`}
          strategy="afterInteractive"
          onReady={() => setMapsReady(true)}
        />
      )}
      {RECAPTCHA_SITE_KEY && (
        <Script
          src={`https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}`}
          strategy="afterInteractive"
        />
      )}
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "5fr 6fr", gap: 80, alignItems: "start" }} className="contact-grid">
        {/* Left */}
        <div>
          <span style={{ fontSize: 12, fontWeight: 600, color: GRASS, letterSpacing: "0.14em", textTransform: "uppercase" }}>Get in Touch</span>
          <h2 style={{ fontFamily: FONT_DISPLAY, fontWeight: 800, fontSize: "clamp(28px, 3.5vw, 46px)", color: FOREST, marginTop: 12, lineHeight: 1.1, letterSpacing: "-0.02em", marginBottom: 20 }}>
            We’d Love to<br /><em style={{ fontStyle: "italic" }}>Hear From You.</em>
          </h2>
          <p style={{ color: STONE, lineHeight: 1.75, fontSize: 15, marginBottom: 36 }}>
            Tell us about your project and we&apos;ll get back to you within one business day to schedule a site visit no obligation.
          </p>

          {[
            { icon: Phone,  text: "081 412 5540",               sub: "Closed · Opens 7:30am Thu",  href: "tel:+27814125540" },
            { icon: Mail,   text: "info@forevergreenturf.co.za", sub: "Replies within 1 business day", href: "mailto:info@forevergreenturf.co.za" },
            { icon: MapPin, text: "141 King Edward St, Parow, Cape Town, 7500", sub: "Serving Cape Town and nearby areas", href: MAPS_URL, external: true },
          ].map(({ icon: Icon, text, sub, href, external }, i) => (
            <a
              key={i}
              href={href}
              target={external ? "_blank" : undefined}
              rel={external ? "noopener noreferrer" : undefined}
              style={{ display: "flex", alignItems: "flex-start", gap: 14, marginBottom: 22, textDecoration: "none", cursor: "pointer" }}
            >
              <div style={{ width: 40, height: 40, borderRadius: 4, background: FOREST, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Icon size={16} color={GRASS} />
              </div>
              <div>
                <div style={{ fontWeight: 600, fontSize: 15, color: FOREST }}>{text}</div>
                <div style={{ fontSize: 13, color: STONE, marginTop: 2 }}>{sub}</div>
              </div>
            </a>
          ))}

          {/* Photo strip */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 36 }}>
            <Link href="/portfolio" style={{ display: "block", position: "relative", height: 140, borderRadius: 4, overflow: "hidden" }}>
              <Image src="/images/20260228_135947.jpg" alt="Lawn installation" fill sizes="(max-width: 768px) 50vw, 25vw" style={{ objectFit: "cover" }} />
            </Link>
            <Link href="/portfolio" style={{ display: "block", position: "relative", height: 140, borderRadius: 4, overflow: "hidden" }}>
              <Image src="/images/20260227_184044.jpg" alt="Paving work" fill sizes="(max-width: 768px) 50vw, 25vw" style={{ objectFit: "cover" }} />
            </Link>
          </div>
        </div>

        {/* Right — form */}
        <div style={{ background: "#fff", borderRadius: 4, padding: "40px", border: `1px solid rgba(42,74,25,0.1)`, boxShadow: "0 4px 24px rgba(42,74,25,0.06)" }}>
          {sent ? (
            <div style={{ textAlign: "center", padding: "32px 0" }}>
              <CheckCircle size={48} color={GRASS} style={{ margin: "0 auto 20px" }} />
              <h3 style={{ fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 26, color: FOREST, marginBottom: 12 }}>Request Received</h3>
              <p style={{ color: STONE, lineHeight: 1.65, fontSize: 15 }}>
                Thanks, {form.name.split(" ")[0] || "there"}! We&apos;ll be in touch within one business day to arrange your free site visit.
              </p>
              <button
                onClick={() => { setSent(false); setForm({ name: "", phone: "", email: "", location: "", service: "", message: "" }); }}
                style={{ marginTop: 24, background: "transparent", color: GRASS, border: `1px solid ${GRASS}`, borderRadius: 4, padding: "10px 20px", fontFamily: FONT_BODY, fontSize: 14, fontWeight: 500, cursor: "pointer" }}
              >
                Submit Another
              </button>
            </div>
          ) : (
            <form onSubmit={submit}>
              <h3 style={{ fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 22, color: FOREST, marginBottom: 28, letterSpacing: "-0.01em" }}>Your Project Details</h3>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }} className="form-row">
                <FormField label="Full Name" value={form.name} onChange={v => set("name", v)} placeholder="Your full name" required />
                <FormField label="Phone Number" value={form.phone} onChange={v => set("phone", v)} placeholder="082 000 0000" type="tel" required />
              </div>
              <FormField label="Email Address" value={form.email} onChange={v => set("email", v)} placeholder="your@email.co.za" type="email" required style={{ marginBottom: 16 }} />
              <FormField
                label="Location"
                inputRef={locationInputRef}
                value={form.location}
                onChange={setLocation}
                placeholder="Start typing your address..."
                style={{ marginBottom: 16 }}
                rightIcon={locationLoading ? <Loader2 size={16} color={GRASS} className="spin-icon" /> : <MapPin size={16} color={GRASS} />}
              />
              <div style={{ marginBottom: 16 }}>
                <label style={{ display: "block", fontWeight: 600, fontSize: 13, color: FOREST, marginBottom: 6 }}>Service Required</label>
                <select
                  value={form.service}
                  onChange={e => set("service", e.target.value)}
                  required
                  style={{ width: "100%", background: "#F5F0E8", border: `1px solid rgba(42,74,25,0.15)`, borderRadius: 4, padding: "12px 14px", fontFamily: FONT_BODY, fontSize: 14, color: form.service ? FOREST : STONE, appearance: "none", cursor: "pointer" }}
                >
                  <option value="">Select a service…</option>
                  <option>Lawn Installation</option>
                  <option>Brick Paving</option>
                  <option>Driveway Paving</option>
                  <option>Garden Design</option>
                  <option>Multiple / Not Sure</option>
                </select>
              </div>
              <div style={{ marginBottom: 24 }}>
                <label style={{ display: "block", fontWeight: 600, fontSize: 13, color: FOREST, marginBottom: 6 }}>Project Description</label>
                <textarea
                  value={form.message}
                  onChange={e => set("message", e.target.value)}
                  placeholder="Brief description of your project, property size, timeline, etc."
                  rows={4}
                  style={{ width: "100%", background: "#F5F0E8", border: `1px solid rgba(42,74,25,0.15)`, borderRadius: 4, padding: "12px 14px", fontFamily: FONT_BODY, fontSize: 14, color: FOREST, resize: "vertical", boxSizing: "border-box" }}
                />
              </div>
              <button
                type="submit"
                disabled={submitting}
                style={{ width: "100%", background: submitting ? "rgba(42,74,25,0.6)" : FOREST, color: "#fff", border: "none", borderRadius: 4, padding: "15px 24px", fontFamily: FONT_BODY, fontWeight: 600, fontSize: 15, cursor: submitting ? "default" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, transition: "background 0.2s" }}
                onMouseEnter={e => { if (!submitting) e.currentTarget.style.background = "#1A2F10"; }}
                onMouseLeave={e => { if (!submitting) e.currentTarget.style.background = FOREST; }}
              >
                <Send size={16} /> {submitting ? "Sending…" : "Send Quote Request"}
              </button>
              {submitError && (
                <p style={{ fontSize: 13, color: ERROR_RED, textAlign: "center", marginTop: 14 }}>{submitError}</p>
              )}
              <p style={{ fontSize: 12, color: STONE, textAlign: "center", marginTop: 14 }}>
                No spam. We only contact you about your project.
              </p>
            </form>
          )}
        </div>
      </div>
      <style>{`
        @media (max-width: 768px) {
          .contact-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
          .form-row { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

function FormField({
  label, value, onChange, placeholder, type = "text", required, style: extraStyle, inputRef, rightIcon,
}: {
  label: string; value: string; onChange: (v: string) => void;
  placeholder?: string; type?: string; required?: boolean; style?: React.CSSProperties; inputRef?: React.Ref<HTMLInputElement>;
  rightIcon?: React.ReactNode;
}) {
  return (
    <div style={extraStyle}>
      <label style={{ display: "block", fontWeight: 600, fontSize: 13, color: FOREST, marginBottom: 6, fontFamily: FONT_BODY }}>{label}</label>
      <div style={{ position: "relative" }}>
        <input
          ref={inputRef}
          type={type}
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
          required={required}
          style={{ width: "100%", background: "#F5F0E8", border: `1px solid rgba(42,74,25,0.15)`, borderRadius: 4, padding: "12px 14px", paddingRight: rightIcon ? 40 : undefined, fontFamily: FONT_BODY, fontSize: 14, color: FOREST, boxSizing: "border-box" }}
        />
        {rightIcon && (
          <div style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", display: "flex", pointerEvents: "none" }}>
            {rightIcon}
          </div>
        )}
      </div>
    </div>
  );
}
