"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Script from "next/script";
import { X, Leaf, Layers, Flower2, Upload, CheckCircle } from "lucide-react";
import { FOREST, GRASS, CREAM, STONE, FONT_DISPLAY, FONT_BODY } from "./theme";
import { useQuoteModal } from "./QuoteModalContext";

const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
const ERROR_RED = "#B3261E";

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

type ServiceType = "lawn" | "paving" | "garden";
type ShapeId = "square" | "rectangle" | "circle" | "lshape";

const SERVICES: { id: ServiceType; label: string; icon: typeof Leaf }[] = [
  { id: "lawn", label: "Artificial grass", icon: Leaf },
  { id: "paving", label: "Paving", icon: Layers },
  { id: "garden", label: "Garden", icon: Flower2 },
];

const SHAPES: { id: ShapeId; label: string; fields: { key: string; label: string }[] }[] = [
  { id: "square", label: "Square", fields: [{ key: "side", label: "Side length (m)" }] },
  { id: "rectangle", label: "Rectangle", fields: [{ key: "width", label: "Width (m)" }, { key: "length", label: "Length (m)" }] },
  { id: "circle", label: "Circle", fields: [{ key: "diameter", label: "Diameter (m)" }] },
  {
    id: "lshape", label: "L-Shape", fields: [
      { key: "widthA", label: "Width A (m)" }, { key: "lengthA", label: "Length A (m)" },
      { key: "widthB", label: "Width B (m)" }, { key: "lengthB", label: "Length B (m)" },
    ],
  },
];

// Placeholder rates only — replace with the business's real per-square-metre
// pricing before relying on this for actual customer-facing quotes.
const RATE_PER_SQM: Record<ServiceType, number> = {
  lawn: 180,
  paving: 650,
  garden: 450,
};

function calcArea(shapeId: ShapeId, values: Record<string, string>) {
  const n = (k: string) => parseFloat(values[k]) || 0;
  switch (shapeId) {
    case "square": return n("side") ** 2;
    case "rectangle": return n("width") * n("length");
    case "circle": return Math.PI * (n("diameter") / 2) ** 2;
    case "lshape": return n("widthA") * n("lengthA") + n("widthB") * n("lengthB");
  }
}

function ShapeIcon({ shape, color }: { shape: ShapeId; color: string }) {
  const common = { width: 40, height: 40, viewBox: "0 0 48 48", fill: "none", stroke: color, strokeWidth: 2.5 };
  if (shape === "square") return <svg {...common}><rect x="8" y="8" width="32" height="32" rx="2" /></svg>;
  if (shape === "rectangle") return <svg {...common}><rect x="4" y="14" width="40" height="20" rx="2" /></svg>;
  if (shape === "circle") return <svg {...common}><circle cx="24" cy="24" r="18" /></svg>;
  return <svg {...common}><path d="M8 8 H24 V24 H40 V40 H8 Z" strokeLinejoin="round" /></svg>;
}

function Field({
  label, value, onChange, placeholder, type = "text", required, inputRef,
}: {
  label: string; value: string; onChange: (v: string) => void;
  placeholder?: string; type?: string; required?: boolean; inputRef?: React.Ref<HTMLInputElement>;
}) {
  return (
    <div>
      <label style={{ display: "block", fontWeight: 600, fontSize: 13, color: FOREST, marginBottom: 6, fontFamily: FONT_BODY }}>{label}</label>
      <input
        ref={inputRef}
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        style={{ width: "100%", background: "#F5F0E8", border: `1px solid rgba(42,74,25,0.15)`, borderRadius: 4, padding: "12px 14px", fontFamily: FONT_BODY, fontSize: 14, color: FOREST, boxSizing: "border-box" }}
      />
    </div>
  );
}

const TOTAL_STEPS = 4;
const EMAIL_STEP = TOTAL_STEPS + 1;
const RESULT_STEP = EMAIL_STEP + 1;

export default function QuoteModal() {
  const { isOpen, close } = useQuoteModal();

  const [step, setStep] = useState(1);
  const [service, setService] = useState<ServiceType | null>(null);
  const [shape, setShape] = useState<ShapeId | null>(null);
  const [dims, setDims] = useState<Record<string, string>>({});
  const [photos, setPhotos] = useState<File[]>([]);
  const [contact, setContact] = useState({ name: "", phone: "", email: "", location: "" });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [mapsReady, setMapsReady] = useState(false);
  const locationInputRef = useRef<HTMLInputElement>(null);

  function handleClose() {
    close();
    setStep(1);
    setService(null);
    setShape(null);
    setDims({});
    setPhotos([]);
    setContact({ name: "", phone: "", email: "", location: "" });
    setSubmitted(false);
    setSubmitting(false);
    setSubmitError(null);
  }

  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") handleClose(); };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const photoPreviews = useMemo(() => photos.map(f => URL.createObjectURL(f)), [photos]);
  useEffect(() => {
    return () => { photoPreviews.forEach(url => URL.revokeObjectURL(url)); };
  }, [photoPreviews]);

  useEffect(() => {
    const input = locationInputRef.current;
    if (!mapsReady || step !== EMAIL_STEP || !input) return;
    const google = (window as unknown as { google?: GoogleMapsNamespace }).google;
    if (!google?.maps?.places) return;

    const autocomplete = new google.maps.places.Autocomplete(input, {
      fields: ["formatted_address"],
      componentRestrictions: { country: "za" },
    });
    const listener = autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();
      if (place?.formatted_address) {
        setContact(c => ({ ...c, location: place.formatted_address as string }));
      }
    });

    return () => {
      google.maps.event.removeListener(listener);
      google.maps.event.clearInstanceListeners(input);
    };
  }, [mapsReady, step]);

  if (!isOpen) return null;

  const activeShape = SHAPES.find(s => s.id === shape);
  const dimsValid = activeShape ? activeShape.fields.every(f => parseFloat(dims[f.key]) > 0) : false;
  const emailValid = /\S+@\S+\.\S+/.test(contact.email);
  const contactValid = contact.name.trim() !== "" && contact.phone.trim() !== "";

  const canNext =
    step === 1 ? service !== null :
    step === 2 ? shape !== null :
    step === 3 ? dimsValid :
    step === EMAIL_STEP ? emailValid :
    true;

  const area = shape ? calcArea(shape, dims) : 0;
  const rate = service ? RATE_PER_SQM[service] : 0;
  const estimateLow = Math.round((area * rate * 0.85) / 50) * 50;
  const estimateHigh = Math.round((area * rate * 1.15) / 50) * 50;

  function selectShape(s: ShapeId) {
    setShape(s);
    setDims({});
  }

  function addPhotos(files: FileList | null) {
    if (!files) return;
    setPhotos(p => [...p, ...Array.from(files)]);
  }

  async function submitCallback(e: React.FormEvent) {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    setSubmitError(null);
    try {
      const fd = new FormData();
      fd.append("name", contact.name);
      fd.append("phone", contact.phone);
      fd.append("email", contact.email);
      fd.append("location", contact.location);
      fd.append("service", service ?? "");
      fd.append("shape", shape ?? "");
      fd.append("dims", JSON.stringify(dims));
      fd.append("area", area.toFixed(2));
      fd.append("estimateLow", String(estimateLow));
      fd.append("estimateHigh", String(estimateHigh));
      photos.forEach(file => fd.append("photos", file, file.name));

      const res = await fetch("/api/quote-request", { method: "POST", body: fd });
      if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(body?.error || "Something went wrong. Please try again.");
      }
      setSubmitted(true);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div
      role="presentation"
      style={{ position: "fixed", inset: 0, zIndex: 200, background: "rgba(26,31,16,0.55)", display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}
    >
      {GOOGLE_MAPS_API_KEY && (
        <Script
          src={`https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places`}
          strategy="afterInteractive"
          onReady={() => setMapsReady(true)}
        />
      )}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Get a free quote"
        onClick={e => e.stopPropagation()}
        style={{ background: "#fff", borderRadius: 6, width: "100%", maxWidth: 560, maxHeight: "90vh", overflowY: "auto", fontFamily: FONT_BODY, boxShadow: "0 20px 60px rgba(0,0,0,0.3)" }}
      >
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 24px", borderBottom: `1px solid rgba(42,74,25,0.1)`, position: "sticky", top: 0, background: "#fff", zIndex: 1 }}>
          <div>
            <div style={{ fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 20, color: FOREST }}>
              {step <= TOTAL_STEPS ? "Get a Free Quote" : step === EMAIL_STEP ? "One Last Step" : "Your Estimate"}
            </div>
            {step <= TOTAL_STEPS && (
              <div style={{ fontSize: 12, color: STONE, marginTop: 2 }}>Step {step} of {TOTAL_STEPS}</div>
            )}
          </div>
          <button
            onClick={handleClose}
            aria-label="Close"
            style={{ background: "none", border: "none", cursor: "pointer", color: STONE, padding: 4 }}
          >
            <X size={22} />
          </button>
        </div>

        <div style={{ padding: 24 }}>
          {/* Step 1 — service type */}
          {step === 1 && (
            <div>
              <p style={{ color: STONE, fontSize: 14, marginBottom: 20 }}>What would you like a quote for?</p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
                {SERVICES.map(s => {
                  const Icon = s.icon;
                  const active = service === s.id;
                  return (
                    <button
                      key={s.id}
                      onClick={() => setService(s.id)}
                      style={{
                        display: "flex", flexDirection: "column", alignItems: "center", gap: 10,
                        padding: "24px 12px", borderRadius: 4, cursor: "pointer",
                        border: `2px solid ${active ? FOREST : "rgba(42,74,25,0.15)"}`,
                        background: active ? "rgba(107,155,42,0.1)" : "#fff",
                      }}
                    >
                      <Icon size={28} color={active ? FOREST : GRASS} />
                      <span style={{ fontSize: 14, fontWeight: 600, color: FOREST }}>{s.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Step 2 — shape */}
          {step === 2 && (
            <div>
              <p style={{ color: STONE, fontSize: 14, marginBottom: 20 }}>What shape is the area?</p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 12 }}>
                {SHAPES.map(s => {
                  const active = shape === s.id;
                  return (
                    <button
                      key={s.id}
                      onClick={() => selectShape(s.id)}
                      style={{
                        display: "flex", flexDirection: "column", alignItems: "center", gap: 10,
                        padding: "20px 12px", borderRadius: 4, cursor: "pointer",
                        border: `2px solid ${active ? FOREST : "rgba(42,74,25,0.15)"}`,
                        background: active ? "rgba(107,155,42,0.1)" : "#fff",
                      }}
                    >
                      <ShapeIcon shape={s.id} color={active ? FOREST : GRASS} />
                      <span style={{ fontSize: 14, fontWeight: 600, color: FOREST }}>{s.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Step 3 — dimensions */}
          {step === 3 && activeShape && (
            <div>
              <p style={{ color: STONE, fontSize: 14, marginBottom: 20 }}>
                Enter the dimensions of your {activeShape.label.toLowerCase()} area, in metres.
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16 }}>
                {activeShape.fields.map(f => (
                  <Field
                    key={f.key}
                    label={f.label}
                    type="number"
                    value={dims[f.key] ?? ""}
                    onChange={v => setDims(d => ({ ...d, [f.key]: v }))}
                    placeholder="0"
                  />
                ))}
              </div>
            </div>
          )}

          {/* Step 4 — photos */}
          {step === 4 && (
            <div>
              <p style={{ color: STONE, fontSize: 14, marginBottom: 20 }}>
                Upload a few photos of the area (optional) this helps us give a more accurate quote.
              </p>
              <label
                style={{
                  display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
                  border: `2px dashed rgba(42,74,25,0.25)`, borderRadius: 4, padding: "32px 16px",
                  cursor: "pointer", color: STONE, background: CREAM,
                }}
              >
                <Upload size={22} color={GRASS} />
                <span style={{ fontSize: 14, fontWeight: 500, color: FOREST }}>Click to upload photos</span>
                <input type="file" accept="image/*" multiple onChange={e => addPhotos(e.target.files)} style={{ display: "none" }} />
              </label>

              {photos.length > 0 && (
                <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8, marginTop: 16 }}>
                  {photos.map((file, i) => (
                    <div key={i} style={{ position: "relative" }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={photoPreviews[i]} alt={file.name} style={{ width: "100%", height: 64, objectFit: "cover", borderRadius: 4 }} />
                      <button
                        onClick={() => setPhotos(p => p.filter((_, idx) => idx !== i))}
                        aria-label={`Remove ${file.name}`}
                        style={{ position: "absolute", top: -6, right: -6, width: 20, height: 20, borderRadius: "50%", background: FOREST, color: "#fff", border: "none", cursor: "pointer", fontSize: 12, lineHeight: "20px" }}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Step 5 — email gate */}
          {step === EMAIL_STEP && (
            <div>
              <p style={{ color: STONE, fontSize: 14, marginBottom: 20 }}>
                Enter your email address to see your personalised estimate.
              </p>
              <Field
                label="Email Address"
                type="email"
                value={contact.email}
                onChange={v => setContact(c => ({ ...c, email: v }))}
                placeholder="your@email.co.za"
                required
              />
              <div style={{ marginTop: 16 }}>
                <Field
                  label="Property Location"
                  inputRef={locationInputRef}
                  value={contact.location}
                  onChange={v => setContact(c => ({ ...c, location: v }))}
                  placeholder="Start typing your address..."
                />
              </div>
            </div>
          )}

          {/* Step 6 — result */}
          {step > EMAIL_STEP && service && shape && (
            <div>
              <div style={{ background: CREAM, borderRadius: 4, padding: 20, marginBottom: 20 }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: GRASS, letterSpacing: "0.1em", textTransform: "uppercase" }}>
                  {SERVICES.find(s => s.id === service)?.label} · {activeShape?.label} · {area.toFixed(1)} m²
                </div>
                <div style={{ fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 30, color: FOREST, marginTop: 8 }}>
                  R {estimateLow.toLocaleString("en-ZA")} – R {estimateHigh.toLocaleString("en-ZA")}
                </div>
                <p style={{ fontSize: 13, color: STONE, marginTop: 10, lineHeight: 1.6 }}>
                  This is a rough automated estimate based on area only. Your final price is confirmed after a free, no-obligation site visit.
                </p>
              </div>

              {submitted ? (
                <div style={{ textAlign: "center", padding: "16px 0" }}>
                  <CheckCircle size={40} color={GRASS} style={{ margin: "0 auto 12px" }} />
                  <h3 style={{ fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 20, color: FOREST, marginBottom: 8 }}>Request Received</h3>
                  <p style={{ color: STONE, fontSize: 14 }}>We&apos;ll confirm this estimate and be in touch within one business day.</p>
                </div>
              ) : (
                <form onSubmit={submitCallback}>
                  <p style={{ fontSize: 14, fontWeight: 600, color: FOREST, marginBottom: 12 }}>Want us to confirm this quote?</p>
                  <div style={{ display: "grid", gap: 12, marginBottom: 16 }}>
                    <Field label="Full Name" value={contact.name} onChange={v => setContact(c => ({ ...c, name: v }))} placeholder="Your full name" required />
                    <Field label="Phone Number" type="tel" value={contact.phone} onChange={v => setContact(c => ({ ...c, phone: v }))} placeholder="082 000 0000" required />
                  </div>
                  <button
                    type="submit"
                    disabled={!contactValid || submitting}
                    style={{
                      width: "100%", color: "#fff", border: "none", borderRadius: 4, padding: "14px 24px",
                      fontFamily: FONT_BODY, fontWeight: 600, fontSize: 15,
                      background: contactValid && !submitting ? FOREST : "rgba(42,74,25,0.4)",
                      cursor: contactValid && !submitting ? "pointer" : "default",
                    }}
                  >
                    {submitting ? "Sending…" : "Request This Quote"}
                  </button>
                  {submitError && (
                    <p style={{ color: ERROR_RED, fontSize: 13, marginTop: 12 }}>{submitError}</p>
                  )}
                </form>
              )}
            </div>
          )}
        </div>

        {/* Footer nav */}
        {step <= EMAIL_STEP && (
          <div style={{ display: "flex", justifyContent: "space-between", padding: "16px 24px", borderTop: `1px solid rgba(42,74,25,0.1)`, position: "sticky", bottom: 0, background: "#fff" }}>
            <button
              onClick={() => setStep(s => Math.max(1, s - 1))}
              disabled={step === 1}
              style={{ background: "none", border: "none", color: step === 1 ? "rgba(107,98,81,0.4)" : STONE, fontFamily: FONT_BODY, fontWeight: 500, fontSize: 14, cursor: step === 1 ? "default" : "pointer", padding: "10px 4px" }}
            >
              Back
            </button>
            <button
              onClick={() => setStep(s => s + 1)}
              disabled={!canNext}
              style={{
                background: canNext ? GRASS : "rgba(107,155,42,0.4)", color: "#fff", border: "none", borderRadius: 4,
                padding: "12px 24px", fontFamily: FONT_BODY, fontWeight: 600, fontSize: 14, cursor: canNext ? "pointer" : "default",
              }}
            >
              {step === TOTAL_STEPS ? "Get My Estimate" : step === EMAIL_STEP ? "See My Estimate" : "Next"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
