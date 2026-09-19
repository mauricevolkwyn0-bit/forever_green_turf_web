"use client";

import Link from "next/link";
import { ArrowRight, Clock, Shield, Users, Award } from "lucide-react";
import { FOREST, GRASS, STONE, FONT_DISPLAY, FONT_BODY, BRAND } from "./theme";

export default function About() {
  return (
    <section style={{ background: "#fff", padding: "160px 24px 100px", fontFamily: FONT_BODY }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "5fr 6fr", gap: 80, alignItems: "center" }} className="about-grid">
        {/* Photos */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, position: "relative" }}>
          <img
            src="/images/20251101_133114.jpg"
            alt={`${BRAND} team at work`}
            style={{ width: "100%", height: 380, objectFit: "cover", borderRadius: 4, gridRow: "1 / 3" }}
          />
          <img
            src="https://images.unsplash.com/photo-1597201278257-3687be27d954?w=500&h=320&fit=crop&auto=format"
            alt="Manicured garden project"
            style={{ width: "100%", height: 180, objectFit: "cover", borderRadius: 4, alignSelf: "end" }}
          />
          <img
            src="https://images.unsplash.com/photo-1762461838534-ca26dfa134a8?w=500&h=320&fit=crop&auto=format"
            alt="Garden patio design"
            style={{ width: "100%", height: 180, objectFit: "cover", borderRadius: 4 }}
          />
          {/* Badge */}
          <div style={{ position: "absolute", bottom: -20, left: "50%", transform: "translateX(-50%)", background: FOREST, color: "#fff", borderRadius: 4, padding: "14px 20px", textAlign: "center", whiteSpace: "nowrap" }}>
            <div style={{ fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 22, color: "#BFD98F" }}>12 Years</div>
            <div style={{ fontSize: 11, opacity: 0.7, fontWeight: 500, marginTop: 2 }}>Of Craftsmanship</div>
          </div>
        </div>

        {/* Copy */}
        <div style={{ paddingTop: 8 }}>
          <span style={{ fontSize: 12, fontWeight: 600, color: GRASS, letterSpacing: "0.14em", textTransform: "uppercase" }}>Our Story</span>
          <h2 style={{ fontFamily: FONT_DISPLAY, fontWeight: 800, fontSize: "clamp(28px, 3.5vw, 46px)", color: FOREST, marginTop: 12, lineHeight: 1.1, letterSpacing: "-0.02em", marginBottom: 24 }}>
            Built on craft.<br /><em style={{ fontStyle: "italic" }}>Grounded in quality.</em>
          </h2>
          <p style={{ color: STONE, lineHeight: 1.75, fontSize: 15, marginBottom: 16 }}>
            {BRAND} was founded in 2012 by a landscaper who&apos;d spent a decade watching poor workmanship ruin good-intentioned outdoor spaces. The company exists because great outdoor installation isn&apos;t about speed, it&apos;s about preparation, patience, and getting the details right.
          </p>
          <p style={{ color: STONE, lineHeight: 1.75, fontSize: 15, marginBottom: 36 }}>
            Today we&apos;re a team of 18, working across Cape Town and nearby areas. Every project is managed by a senior installer, not subcontracted out.
          </p>

          {[
            { icon: Shield, text: "PIRB and NHBRC registered, every job covered" },
            { icon: Users,  text: "Full-time employed team, no day-labour subcontracting" },
            { icon: Award,  text: "5-year workmanship guarantee on all installations" },
            { icon: Clock,  text: "Project timelines given in writing and adhered to" },
          ].map(({ icon: Icon, text }, i) => (
            <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 12, marginBottom: 14 }}>
              <div style={{ width: 28, height: 28, borderRadius: 4, background: `rgba(107,155,42,0.12)`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
                <Icon size={14} color={GRASS} />
              </div>
              <span style={{ fontSize: 14, color: "#2D2820", lineHeight: 1.55, fontWeight: 400 }}>{text}</span>
            </div>
          ))}

          <Link
            href="/contact"
            style={{ marginTop: 36, background: FOREST, color: "#fff", border: "none", borderRadius: 4, padding: "14px 28px", fontFamily: FONT_BODY, fontWeight: 600, fontSize: 14, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 8, transition: "background 0.2s", textDecoration: "none" }}
            onMouseEnter={e => (e.currentTarget.style.background = "#1A2F10")}
            onMouseLeave={e => (e.currentTarget.style.background = FOREST)}
          >
            Start a Conversation <ArrowRight size={15} />
          </Link>
        </div>
      </div>
      <style>{`
        @media (max-width: 768px) { .about-grid { grid-template-columns: 1fr !important; gap: 48px !important; } }
      `}</style>
    </section>
  );
}
