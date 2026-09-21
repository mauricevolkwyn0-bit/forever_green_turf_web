"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock, Shield, Users, Award } from "lucide-react";
import { FOREST, GRASS, STONE, FONT_DISPLAY, FONT_BODY, BRAND, SLOGAN } from "./theme";
import { useInView } from "../hooks/useInView";

export default function About() {
  const { ref: photosRef, inView: photosInView } = useInView<HTMLDivElement>(0.2, true);

  const photoDelay = (i: number) => ({
    opacity: photosInView ? 1 : 0,
    transform: photosInView ? "translateY(0)" : "translateY(24px)",
    transition: `opacity 0.6s ease ${i * 0.15}s, transform 0.6s ease ${i * 0.15}s`,
  });

  return (
    <section style={{ background: "#fff", padding: "160px 24px 100px", fontFamily: FONT_BODY }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "5fr 6fr", gap: 80, alignItems: "center" }} className="about-grid">
        {/* Photos */}
        <div ref={photosRef} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, position: "relative" }}>
          <div style={{ position: "relative", width: "100%", height: 380, borderRadius: 4, overflow: "hidden", gridRow: "1 / 3", ...photoDelay(0) }}>
            <Image
              src="/images/20251101_133114.jpg"
              alt={`${BRAND} team at work`}
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
              style={{ objectFit: "cover" }}
            />
          </div>
          <div style={{ position: "relative", width: "100%", height: 180, borderRadius: 4, overflow: "hidden", alignSelf: "end", ...photoDelay(1) }}>
            <Image
              src="/images/20250506_144101.jpg"
              alt="Manicured garden project"
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
              style={{ objectFit: "cover" }}
            />
          </div>
          <div style={{ position: "relative", width: "100%", height: 180, borderRadius: 4, overflow: "hidden", ...photoDelay(2) }}>
            <Image
              src="/images/paving-driveway-gate.jpg"
              alt="Garden patio design"
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
              style={{ objectFit: "cover" }}
            />
          </div>
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
            {BRAND} specialises in transforming outdoor spaces through quality artificial grass, paving, and landscaping solutions, serving homeowners and businesses across Cape Town and surrounding areas. Founded in 2012, the company exists because great outdoor installation isn&apos;t about speed, it&apos;s about proper preparation, patience, and getting the details right.
          </p>
          <p style={{ color: STONE, lineHeight: 1.75, fontSize: 15, marginBottom: 12 }}>
            Every project is backed by professional workmanship, quality materials, and attention to detail, from the first site visit through to the final walkthrough. Today we&apos;re a team of 18, working across residential and commercial properties. Every project is managed by a senior installer, not subcontracted out.
          </p>
          <p style={{ color: FOREST, lineHeight: 1.75, fontSize: 15, fontWeight: 700, fontStyle: "italic", marginBottom: 36 }}>
            {SLOGAN}
          </p>

          {[
            { icon: Shield, text: "Residential and commercial installations" },
            { icon: Users,  text: "Full-time employed team, no day-labour subcontracting" },
            { icon: Award,  text: "5-year workmanship guarantee on all installations" },
            { icon: Clock,  text: "Reliable service, with timelines given in writing" },
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
