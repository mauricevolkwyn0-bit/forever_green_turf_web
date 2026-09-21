"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronRight, CheckCircle,
  ArrowRight, Leaf, Layers, Flower2, ChevronDown, MapPin
} from "lucide-react";
import { FOREST, GRASS, CREAM, STONE, FONT_DISPLAY, FONT_BODY, SLOGAN, scrollTo } from "./theme";
import Nav from "./Nav";
import Footer from "./Footer";
import FadeInSection from "./FadeInSection";
import FAQ from "./FAQ";
import { useQuoteModal } from "./QuoteModalContext";
import { useInView } from "../hooks/useInView";

// ─── Data ─────────────────────────────────────────────────────────────────────
const SERVICES = [
  {
    id: "grass",
    icon: Leaf,
    title: "Artificial Grass",
    desc: "Supply and installation, turf-only supply, ground preparation, and pet-friendly options in a range of pile heights, for residential and commercial properties.",
    img: "/images/20260912_090200.jpg",
    href: "/artificial-grass",
  },
  {
    id: "paving",
    icon: Layers,
    title: "Paving Solutions",
    desc: "Driveways, patios, walkways, block, bond and cobblestone paving, pool surrounds, and kerbs and edging, prepared and laid to last.",
    img: "/images/brick-paving-hero-enhanced.jpg",
    href: "/paving",
  },
  {
    id: "landscaping",
    icon: Flower2,
    title: "Landscaping",
    desc: "Garden transformations, ground preparation, irrigation, retaining blocks, and general landscaping solutions for practical outdoor improvement.",
    img: "/images/pool.jpg",
    href: "/landscaping",
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
    <section id="main" style={{
      background: FOREST,
      display: "flex", flexDirection: "column", justifyContent: "center",
      minHeight: "100vh",
      position: "relative", overflow: "hidden",
      backgroundImage: "url(/images/hero-grass-texture.jpg)",
      backgroundRepeat: "repeat",
      backgroundSize: "420px auto",
      backgroundAttachment: "fixed",
    }}>
      {/* Dark wash so the white text stays legible over the photo */}
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(15,26,9,0.88), rgba(15,26,9,0.68))" }} />
      {/* Texture overlay */}
      <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle at 80% 20%, rgba(107,155,42,0.22) 0%, transparent 60%)", pointerEvents: "none" }} />

      {/* Worker photo, cutout with a transparent background */}
      <div className="hero-worker" style={{ position: "absolute", right: "22%", top: "42%", transform: "translateY(-50%)", width: 400, height: "82%" }}>
        <Image
          src="/images/hero-worker.png"
          alt="ForeverGreenTurf installer at work"
          fill
          sizes="340px"
          priority
          style={{ objectFit: "contain", objectPosition: "bottom" }}
        />
      </div>

      <div style={{ position: "relative", maxWidth: 1200, width: "100%", margin: "0 auto", padding: "120px 64px 80px" }}>
        <div style={{ maxWidth: 560 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 24 }}>
            <div style={{ width: 32, height: 1, background: GRASS }} />
            <span style={{ fontFamily: FONT_BODY, fontSize: 12, fontWeight: 500, color: GRASS, letterSpacing: "0.14em", textTransform: "uppercase" }}>
              Established 2012 · Cape Town
            </span>
          </div>

          <h1 style={{ fontFamily: FONT_DISPLAY, fontWeight: 800, fontSize: "clamp(36px, 4.6vw, 64px)", lineHeight: 1.08, color: "#fff", marginBottom: 20, letterSpacing: "-0.02em" }}>
            Artificial Grass <em style={{ fontStyle: "italic", color: "#BFD98F" }}>&amp; Paving</em> Specialists in Cape Town
          </h1>

          <p style={{ fontFamily: FONT_BODY, fontSize: 17, color: "rgba(255,255,255,0.72)", lineHeight: 1.7, maxWidth: 420, marginBottom: 16 }}>
            Professional artificial grass, paving and landscaping solutions designed to transform your outdoor space.
          </p>

          <p style={{ fontFamily: FONT_DISPLAY, fontStyle: "italic", fontWeight: 700, fontSize: 18, color: "#BFD98F", marginBottom: 40 }}>
            {SLOGAN}
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
            {[
              { icon: MapPin, text: "Serving Cape Town & Surrounding Areas" },
              { icon: CheckCircle, text: "Workmanship Guarantee" },
            ].map(({ icon: Icon, text }) => (
              <div key={text} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <Icon size={14} color={GRASS} />
                <span style={{ fontFamily: FONT_BODY, fontSize: 12, color: "rgba(255,255,255,0.55)", fontWeight: 500 }}>{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div
        style={{ position: "absolute", bottom: 32, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 6, cursor: "pointer" }}
        onClick={() => scrollTo("services")}
      >
        <span style={{ fontFamily: FONT_BODY, fontSize: 10, fontWeight: 600, letterSpacing: "0.12em", color: "rgba(255,255,255,0.6)", textTransform: "uppercase" }}>Scroll</span>
        <ChevronDown size={20} color="rgba(255,255,255,0.6)" />
      </div>
      <style>{`
        @media (max-width: 1024px) { .hero-worker { display: none !important; } }
      `}</style>
    </section>
  );
}

// ─── Stats Bar ────────────────────────────────────────────────────────────────
const STATS_ANIMATION_DURATION = 1800;

// Counts up from 0 to `target` over a fixed duration shared by every stat, so
// a big number (500) climbs in larger increments than a small one (5) but
// they all land on their final value at the same moment.
function CountUp({ target, start, duration = STATS_ANIMATION_DURATION, decimals = 0 }: { target: number; start: boolean; duration?: number; decimals?: number }) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!start) return;
    let raf: number;
    const startTime = performance.now();

    function tick(now: number) {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
      setValue(target * eased);
      if (progress < 1) raf = requestAnimationFrame(tick);
    }

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [start, target, duration]);

  return <>{value.toFixed(decimals)}</>;
}

function StatsBar() {
  const stats = [
    { target: 500, suffix: "+", label: "Projects Completed" },
    { target: 12,  suffix: "",  label: "Years in Business" },
    { target: 100, suffix: "%", label: "Licensed & Insured" },
    { target: 4.9, suffix: "★", label: "Average Client Rating", decimals: 1 },
  ];
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <section style={{ background: FOREST, fontFamily: FONT_BODY }}>
      <div ref={ref} style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", display: "grid", gridTemplateColumns: "repeat(4, 1fr)" }} className="stats-grid">
        {stats.map((s, i) => (
          <div key={i} style={{ padding: "32px 24px", borderRight: i < 3 ? "1px solid rgba(255,255,255,0.1)" : "none", textAlign: "center" }} className="stat-cell">
            <div style={{ fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 40, color: "#BFD98F", letterSpacing: "-0.02em" }}>
              <CountUp target={s.target} start={inView} decimals={s.decimals} />{s.suffix}
            </div>
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
              Three services,<br /><em style={{ fontStyle: "italic" }}>one standard.</em>
            </h2>
          </div>
          <p style={{ color: STONE, lineHeight: 1.7, fontSize: 16, maxWidth: 460 }}>
            Whether you need artificial grass, a paved driveway, or a complete landscaping solution, we bring the same level of care and craft to every project, regardless of size.
          </p>
        </div>

        {/* Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }} className="services-grid">
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
      href={service.href}
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
      <div style={{ height: 200, overflow: "hidden", background: "#2A3A1A", position: "relative" }}>
        <Image
          src={service.img}
          alt={service.title}
          fill
          sizes="(max-width: 768px) 50vw, 25vw"
          style={{ objectFit: "cover", transition: "transform 0.4s ease", transform: hovered ? "scale(1.06)" : "scale(1)" }}
        />
      </div>
      <div style={{ padding: "24px" }}>
        <div style={{ width: 36, height: 36, borderRadius: 4, background: `rgba(107,155,42,0.12)`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 14 }}>
          <Icon size={18} color={GRASS} />
        </div>
        <h3 style={{ fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 20, color: FOREST, marginBottom: 10, letterSpacing: "-0.01em" }}>{service.title}</h3>
        <p style={{ fontSize: 14, color: STONE, lineHeight: 1.65 }}>{service.desc}</p>
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 18, color: GRASS, fontSize: 13, fontWeight: 600 }}>
          Learn More <ChevronRight size={14} />
        </div>
      </div>
    </Link>
  );
}

// ─── Process ─────────────────────────────────────────────────────────────────
function Process() {
  const { ref: stepsRef, inView: stepsInView } = useInView<HTMLDivElement>(0.2, true);

  return (
    <section id="process" style={{
      background: FOREST,
      padding: "100px 24px",
      fontFamily: FONT_BODY,
      position: "relative", overflow: "hidden",
      backgroundImage: "url(/images/hero-grass-texture.jpg)",
      backgroundRepeat: "repeat",
      backgroundSize: "420px auto",
      backgroundAttachment: "fixed",
    }}>
      {/* Dark wash so the white text stays legible over the photo */}
      <div style={{ position: "absolute", inset: 0, background: "rgba(15,26,9,0.82)" }} />
      <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative" }}>
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <span style={{ fontSize: 12, fontWeight: 600, color: GRASS, letterSpacing: "0.14em", textTransform: "uppercase" }}>The Process</span>
          <h2 style={{ fontFamily: FONT_DISPLAY, fontWeight: 800, fontSize: "clamp(32px, 4vw, 52px)", color: "#fff", marginTop: 12, lineHeight: 1.1, letterSpacing: "-0.02em" }}>
            How It Works
          </h2>
        </div>

        <div ref={stepsRef} style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 0 }} className="process-grid">
          {STEPS.map((step, i) => (
            <div
              key={step.num}
              style={{
                padding: "0 32px 32px",
                borderRight: i < 3 ? "1px solid rgba(255,255,255,0.08)" : "none",
                position: "relative",
                opacity: stepsInView ? 1 : 0,
                transform: stepsInView ? "translateY(0)" : "translateY(24px)",
                transition: `opacity 0.6s ease ${i * 0.15}s, transform 0.6s ease ${i * 0.15}s`,
              }}
              className="process-cell"
            >
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
export default function LandingPage({ testimonials, portfolio }: { testimonials: React.ReactNode; portfolio: React.ReactNode }) {
  return (
    <div style={{ fontFamily: FONT_BODY, overflowX: "hidden", overflowY: "hidden" }}>
      <Nav />
      <Hero />
      <FadeInSection><StatsBar /></FadeInSection>
      <FadeInSection><Services /></FadeInSection>
      <FadeInSection>{portfolio}</FadeInSection>
      <FadeInSection><Process /></FadeInSection>
      <FadeInSection><FAQ /></FadeInSection>
      <FadeInSection>{testimonials}</FadeInSection>
      <FadeInSection><Footer /></FadeInSection>
    </div>
  );
}
