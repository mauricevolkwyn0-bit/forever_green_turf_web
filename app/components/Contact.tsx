"use client";

import { useState } from "react";
import { Phone, Mail, MapPin, CheckCircle, Send } from "lucide-react";
import { FOREST, GRASS, CREAM, STONE, FONT_DISPLAY, FONT_BODY } from "./theme";

type FormState = { name: string; phone: string; email: string; service: string; message: string };

export default function Contact() {
  const [form, setForm] = useState<FormState>({ name: "", phone: "", email: "", service: "", message: "" });
  const [sent, setSent] = useState(false);

  function set(field: keyof FormState, val: string) {
    setForm(f => ({ ...f, [field]: val }));
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <section style={{ background: CREAM, padding: "160px 24px 100px", fontFamily: FONT_BODY }}>
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
            { icon: Phone,  text: "081 412 5540",               sub: "Closed · Opens 7:30am Thu" },
            { icon: Mail,   text: "info@forevergreenturf.co.za", sub: "Replies within 1 business day" },
            { icon: MapPin, text: "141 King Edward St, Parow, Cape Town, 7500", sub: "Serving Cape Town and nearby areas" },
          ].map(({ icon: Icon, text, sub }, i) => (
            <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 14, marginBottom: 22 }}>
              <div style={{ width: 40, height: 40, borderRadius: 4, background: FOREST, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Icon size={16} color={GRASS} />
              </div>
              <div>
                <div style={{ fontWeight: 600, fontSize: 15, color: FOREST }}>{text}</div>
                <div style={{ fontSize: 13, color: STONE, marginTop: 2 }}>{sub}</div>
              </div>
            </div>
          ))}

          {/* Photo strip */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 36 }}>
            <img src="https://images.unsplash.com/photo-1780216200639-47d28549d04e?w=400&h=240&fit=crop&auto=format" alt="Paving work" style={{ width: "100%", height: 140, objectFit: "cover", borderRadius: 4 }} />
            <img src="https://images.unsplash.com/photo-1558904541-efa843a96f01?w=400&h=240&fit=crop&auto=format" alt="Lawn installation" style={{ width: "100%", height: 140, objectFit: "cover", borderRadius: 4 }} />
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
                onClick={() => { setSent(false); setForm({ name: "", phone: "", email: "", service: "", message: "" }); }}
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
                style={{ width: "100%", background: FOREST, color: "#fff", border: "none", borderRadius: 4, padding: "15px 24px", fontFamily: FONT_BODY, fontWeight: 600, fontSize: 15, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, transition: "background 0.2s" }}
                onMouseEnter={e => (e.currentTarget.style.background = "#1A2F10")}
                onMouseLeave={e => (e.currentTarget.style.background = FOREST)}
              >
                <Send size={16} /> Send Quote Request
              </button>
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
  label, value, onChange, placeholder, type = "text", required, style: extraStyle,
}: {
  label: string; value: string; onChange: (v: string) => void;
  placeholder?: string; type?: string; required?: boolean; style?: React.CSSProperties;
}) {
  return (
    <div style={extraStyle}>
      <label style={{ display: "block", fontWeight: 600, fontSize: 13, color: FOREST, marginBottom: 6, fontFamily: FONT_BODY }}>{label}</label>
      <input
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
