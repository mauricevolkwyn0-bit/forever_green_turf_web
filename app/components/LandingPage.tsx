"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ChevronRight, CheckCircle,
  ArrowRight, Leaf, Layers, Hammer, Flower2, ChevronDown
} from "lucide-react";
import { FOREST, GRASS, CREAM, STONE, FONT_DISPLAY, FONT_BODY, scrollTo } from "./theme";
import Nav from "./Nav";
import Footer from "./Footer";
import Portfolio from "./Portfolio";
import { useQuoteModal } from "./QuoteModalContext";

// ─── Data ─────────────────────────────────────────────────────────────────────
const SERVICES = [
  {
    id: "lawn",
    icon: Leaf,
    title: "Lawn Installation",
    desc: "Lush, level turf laid to perfection. We prepare the base, lay quality grass rolls, and leave you with a carpet-green result that lasts.",
    img: "https://images.unsplash.com/photo-1558904541-efa843a96f01?w=600&h=400&fit=crop&auto=format",
    tag: "lawns",
  },
  {
    id: "brick",
    icon: Layers,
    title: "Brick Paving",
    desc: "Handcrafted patterns in clay and concrete brick for patios, paths, courtyards, and pool surrounds that age beautifully.",
    img: "https://images.unsplash.com/photo-1652096069725-b6ff1a3837d9?w=600&h=400&fit=crop&auto=format",
    tag: "paving",
  },
  {
    id: "driveway",
    icon: Hammer,
    title: "Driveway Paving",
    desc: "Durable, precision-laid driveways using interlocking pavers, exposed aggregate, or cobble engineered for heavy load and kerb appeal.",
    img: "https://images.unsplash.com/photo-1621701845350-8518defeaec7?w=600&h=400&fit=crop&auto=format",
    tag: "paving",
  },
  {
    id: "garden",
    icon: Flower2,
    title: "Garden Design",
    desc: "From concept sketch to planted finish we design and install indigenous and exotic garden beds, retaining walls, irrigation, and lighting.",
    img: "https://images.unsplash.com/photo-1762461838534-ca26dfa134a8?w=600&h=400&fit=crop&auto=format",
    tag: "gardens",
  },
];

const STEPS = [
  { num: "01", title: "Free Consultation", desc: "We visit your property, assess the space, and discuss your vision and budget." },
  { num: "02", title: "Custom Proposal",   desc: "You receive a detailed plan with material samples, timeline, and fixed-price quote." },
  { num: "03", title: "Installation",      desc: "Our crew arrives on schedule and works cleanly to the agreed spec, no surprises." },
  { num: "04", title: "Final Walkthrough", desc: "We inspect together, address anything outstanding, and hand over a care guide." },
];

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero() {
  const { open: openQuoteModal } = useQuoteModal();
  return (
    <section style={{ display: "grid", gridTemplateColumns: "1fr 1fr", minHeight: "100vh" }} className="hero-grid">
      {/* Left — editorial */}
      <div style={{
        background: FOREST,
        display: "flex", flexDirection: "column", justifyContent: "center",
        padding: "120px 64px 80px",
        position: "relative", overflow: "hidden",
      }}>
        {/* Texture overlay */}
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle at 80% 20%, rgba(107,155,42,0.18) 0%, transparent 60%)", pointerEvents: "none" }} />

        <div style={{ position: "relative" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 24 }}>
            <div style={{ width: 32, height: 1, background: GRASS }} />
            <span style={{ fontFamily: FONT_BODY, fontSize: 12, fontWeight: 500, color: GRASS, letterSpacing: "0.14em", textTransform: "uppercase" }}>
              Established 2012 · Cape Town
            </span>
          </div>

          <h1 style={{ fontFamily: FONT_DISPLAY, fontWeight: 800, fontSize: "clamp(40px, 5vw, 72px)", lineHeight: 1.05, color: "#fff", marginBottom: 28, letterSpacing: "-0.02em" }}>
            Your Outdoor
            <br />
            <em style={{ fontStyle: "italic", color: "#BFD98F" }}>Space,</em>
            <br />
            Crafted to Last.
          </h1>

          <p style={{ fontFamily: FONT_BODY, fontSize: 17, color: "rgba(255,255,255,0.72)", lineHeight: 1.7, maxWidth: 420, marginBottom: 40 }}>
            Premium lawn installation and brick paving for homes and developments across Cape Town and nearby areas, built by a team that takes pride in every square metre.
          </p>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
            <button
              onClick={openQuoteModal}
              style={{ background: GRASS, color: "#fff", border: "none", borderRadius: 4, padding: "14px 28px", fontFamily: FONT_BODY, fontWeight: 600, fontSize: 15, cursor: "pointer", display: "flex", alignItems: "center", gap: 8, transition: "background 0.2s" }}
              onMouseEnter={e => (e.currentTarget.style.background = "#5a8420")}
              onMouseLeave={e => (e.currentTarget.style.background = GRASS)}
            >
              Get a Free Quote <ArrowRight size={16} />
            </button>
            <Link
              href="/portfolio"
              style={{ background: "transparent", color: "#fff", border: "1px solid rgba(255,255,255,0.3)", borderRadius: 4, padding: "14px 28px", fontFamily: FONT_BODY, fontWeight: 500, fontSize: 15, cursor: "pointer", transition: "border-color 0.2s", textDecoration: "none" }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.7)")}
              onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)")}
            >
              View Our Work
            </Link>
          </div>

          {/* Trust badges */}
          <div style={{ display: "flex", gap: 20, marginTop: 48, flexWrap: "wrap" }}>
            {["PIRB Registered", "NHBRC Member", "Workmanship Guarantee"].map(badge => (
              <div key={badge} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <CheckCircle size={14} color={GRASS} />
                <span style={{ fontFamily: FONT_BODY, fontSize: 12, color: "rgba(255,255,255,0.55)", fontWeight: 500 }}>{badge}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right — photo */}
      <div style={{ position: "relative", overflow: "hidden", minHeight: 480, background: "#2A3A1A" }}>
        <img
          src="https://images.unsplash.com/photo-1594498653385-d5172c532c00?w=1200&h=900&fit=crop&auto=format"
          alt="Lush professionally installed lawn"
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        />
        {/* Scroll cue */}
        <div
          style={{ position: "absolute", bottom: 32, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 6, cursor: "pointer" }}
          onClick={() => scrollTo("services")}
        >
          <span style={{ fontFamily: FONT_BODY, fontSize: 10, fontWeight: 600, letterSpacing: "0.12em", color: "rgba(255,255,255,0.6)", textTransform: "uppercase" }}>Scroll</span>
          <ChevronDown size={20} color="rgba(255,255,255,0.6)" />
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .hero-grid { grid-template-columns: 1fr !important; }
          .hero-grid > div:last-child { min-height: 320px !important; }
        }
      `}</style>
    </section>
  );
}

// ─── Stats Bar ────────────────────────────────────────────────────────────────
function StatsBar() {
  const stats = [
    { value: "500+",  label: "Projects Completed" },
    { value: "12",    label: "Years in Business" },
    { value: "100%",  label: "Licensed & Insured" },
    { value: "5★",    label: "Average Client Rating" },
  ];

  return (
    <section style={{ background: FOREST, fontFamily: FONT_BODY }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", display: "grid", gridTemplateColumns: "repeat(4, 1fr)" }} className="stats-grid">
        {stats.map((s, i) => (
          <div key={i} style={{ padding: "32px 24px", borderRight: i < 3 ? "1px solid rgba(255,255,255,0.1)" : "none", textAlign: "center" }} className="stat-cell">
            <div style={{ fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 40, color: "#BFD98F", letterSpacing: "-0.02em" }}>{s.value}</div>
            <div style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", marginTop: 6, fontWeight: 500, letterSpacing: "0.02em" }}>{s.label}</div>
          </div>
        ))}
      </div>
      <style>{`
        @media (max-width: 768px) {
          .stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .stat-cell { border-right: none !important; border-bottom: 1px solid rgba(255,255,255,0.1) !important; }
        }
      `}</style>
    </section>
  );
}

// ─── Services ─────────────────────────────────────────────────────────────────
function Services() {
  return (
    <section id="services" style={{ background: CREAM, padding: "100px 24px", fontFamily: FONT_BODY }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "end", marginBottom: 64 }} className="section-header-grid">
          <div>
            <span style={{ fontSize: 12, fontWeight: 600, color: GRASS, letterSpacing: "0.14em", textTransform: "uppercase" }}>What We Do</span>
            <h2 style={{ fontFamily: FONT_DISPLAY, fontWeight: 800, fontSize: "clamp(32px, 4vw, 52px)", color: FOREST, marginTop: 12, lineHeight: 1.1, letterSpacing: "-0.02em" }}>
              Four services,<br /><em style={{ fontStyle: "italic" }}>one standard.</em>
            </h2>
          </div>
          <p style={{ color: STONE, lineHeight: 1.7, fontSize: 16, maxWidth: 460 }}>
            Whether you need a new lawn, a paved driveway, or a complete garden transformation, we bring the same level of care and craft to every project, regardless of size.
          </p>
        </div>

        {/* Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24 }} className="services-grid">
          {SERVICES.map(s => (
            <ServiceCard key={s.id} service={s} />
          ))}
        </div>
      </div>
      <style>{`
        @media (max-width: 1024px) { .services-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 640px)  { .services-grid { grid-template-columns: 1fr !important; } }
        @media (max-width: 768px)  { .section-header-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}

function ServiceCard({ service }: { service: typeof SERVICES[0] }) {
  const [hovered, setHovered] = useState(false);
  const Icon = service.icon;
  return (
    <Link
      href="/contact"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "#fff",
        borderRadius: 4,
        overflow: "hidden",
        border: `1px solid rgba(42,74,25,0.1)`,
        transition: "transform 0.25s ease, box-shadow 0.25s ease",
        transform: hovered ? "translateY(-6px)" : "none",
        boxShadow: hovered ? "0 20px 48px rgba(42,74,25,0.12)" : "0 2px 8px rgba(42,74,25,0.05)",
        cursor: "pointer",
        fontFamily: FONT_BODY,
        textDecoration: "none",
        display: "block",
      }}
    >
      <div style={{ height: 200, overflow: "hidden", background: "#2A3A1A" }}>
        <img src={service.img} alt={service.title} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.4s ease", transform: hovered ? "scale(1.06)" : "scale(1)" }} />
      </div>
      <div style={{ padding: "24px" }}>
        <div style={{ width: 36, height: 36, borderRadius: 4, background: `rgba(107,155,42,0.12)`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 14 }}>
          <Icon size={18} color={GRASS} />
        </div>
        <h3 style={{ fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 20, color: FOREST, marginBottom: 10, letterSpacing: "-0.01em" }}>{service.title}</h3>
        <p style={{ fontSize: 14, color: STONE, lineHeight: 1.65 }}>{service.desc}</p>
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 18, color: GRASS, fontSize: 13, fontWeight: 600 }}>
          Get a Quote <ChevronRight size={14} />
        </div>
      </div>
    </Link>
  );
}

// ─── Process ─────────────────────────────────────────────────────────────────
function Process() {
  return (
    <section id="process" style={{ background: FOREST, padding: "100px 24px", fontFamily: FONT_BODY }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <span style={{ fontSize: 12, fontWeight: 600, color: GRASS, letterSpacing: "0.14em", textTransform: "uppercase" }}>The Process</span>
          <h2 style={{ fontFamily: FONT_DISPLAY, fontWeight: 800, fontSize: "clamp(32px, 4vw, 52px)", color: "#fff", marginTop: 12, lineHeight: 1.1, letterSpacing: "-0.02em" }}>
            How It Works
          </h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 0 }} className="process-grid">
          {STEPS.map((step, i) => (
            <div key={step.num} style={{ padding: "0 32px 32px", borderRight: i < 3 ? "1px solid rgba(255,255,255,0.08)" : "none", position: "relative" }} className="process-cell">
              {/* Connector line */}
              {i < 3 && (
                <div style={{ position: "absolute", top: 24, right: -1, width: 32, height: 1, background: "rgba(107,155,42,0.4)" }} className="connector-line" />
              )}
              <div style={{ fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 56, color: "rgba(107,155,42,0.25)", lineHeight: 1, marginBottom: 12 }}>{step.num}</div>
              <h3 style={{ fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 20, color: "#fff", marginBottom: 12, letterSpacing: "-0.01em" }}>{step.title}</h3>
              <p style={{ fontSize: 14, color: "rgba(255,255,255,0.6)", lineHeight: 1.7 }}>{step.desc}</p>
            </div>
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: 64 }}>
          <Link
            href="/contact"
            style={{ background: GRASS, color: "#fff", border: "none", borderRadius: 4, padding: "16px 36px", fontFamily: FONT_BODY, fontWeight: 600, fontSize: 15, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 8, transition: "background 0.2s", textDecoration: "none" }}
            onMouseEnter={e => (e.currentTarget.style.background = "#5a8420")}
            onMouseLeave={e => (e.currentTarget.style.background = GRASS)}
          >
            Book Your Free Consultation <ArrowRight size={16} />
          </Link>
        </div>
      </div>
      <style>{`
        @media (max-width: 768px) {
          .process-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .process-cell { border-right: none !important; border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 28px !important; margin-bottom: 28px; }
          .connector-line { display: none; }
        }
        @media (max-width: 480px) {
          .process-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function LandingPage({ testimonials }: { testimonials: React.ReactNode }) {
  return (
    <div style={{ fontFamily: FONT_BODY, overflowX: "hidden" }}>
      <Nav />
      <Hero />
      <StatsBar />
      <Services />
      <Portfolio />
      <Process />
      {testimonials}
      <Footer />
    </div>
  );
}
