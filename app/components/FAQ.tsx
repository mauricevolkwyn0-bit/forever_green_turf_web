"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { FOREST, GRASS, CREAM, STONE, FONT_DISPLAY, FONT_BODY } from "./theme";

const FAQS = [
  {
    q: "Do you supply artificial grass without installation?",
    a: "Yes, we offer turf supply only for clients who prefer to arrange their own installation, as well as full supply-and-install packages.",
  },
  {
    q: "Do you prepare the ground before installing artificial grass?",
    a: "Yes. Every installation includes proper ground preparation, a weed membrane, and sub-base preparation where required, so the finished lawn stays level and drains well.",
  },
  {
    q: "Can artificial grass be installed over existing paving?",
    a: "In many cases, yes, depending on the condition and drainage of the existing surface. We assess this during our site visit and advise on the best approach.",
  },
  {
    q: "How long does artificial grass installation take?",
    a: "Most residential installations are completed within one to a few days, depending on the size and preparation required. We'll give you a clear timeline in writing before work starts.",
  },
  {
    q: "What artificial grass options do you offer?",
    a: "We supply and install artificial grass in 20mm, 25mm, 30mm and 35mm pile heights, so you can choose the look and feel that suits your space.",
  },
  {
    q: "Do you install pet-friendly artificial grass?",
    a: "Yes, we offer pet-friendly artificial grass options designed for durability and easy cleaning.",
  },
  {
    q: "Do you install paving?",
    a: "Yes. We handle driveways, patios, walkways, block, bond and cobblestone paving, pool surrounds, and kerbs and edging.",
  },
  {
    q: "Do you remove existing grass or rubble?",
    a: "Yes, removal of existing grass, paving, or rubble is part of our ground and site preparation services where required.",
  },
  {
    q: "Do you provide site assessments?",
    a: "Yes. We prefer to assess and measure the site in person before providing a final quotation, so the price and plan reflect exactly what your space needs.",
  },
  {
    q: "Which areas of Cape Town do you service?",
    a: "We serve Cape Town and surrounding areas. Get in touch and we'll confirm whether we cover your location.",
  },
  {
    q: "Do you provide a workmanship guarantee?",
    a: "Yes, all our installations are backed by a workmanship guarantee.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section style={{ background: CREAM, padding: "100px 24px 60px", fontFamily: FONT_BODY }}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <span style={{ fontSize: 12, fontWeight: 600, color: GRASS, letterSpacing: "0.14em", textTransform: "uppercase" }}>FAQ</span>
          <h2 style={{ fontFamily: FONT_DISPLAY, fontWeight: 800, fontSize: "clamp(32px, 4vw, 52px)", color: FOREST, marginTop: 12, lineHeight: 1.1, letterSpacing: "-0.02em" }}>
            Frequently Asked Questions
          </h2>
        </div>

        <div>
          {FAQS.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={item.q} style={{ borderBottom: "1px solid rgba(42,74,25,0.12)" }}>
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 16,
                    padding: "20px 0",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    textAlign: "left",
                    fontFamily: FONT_DISPLAY,
                    fontWeight: 700,
                    fontSize: 17,
                    color: FOREST,
                  }}
                  aria-expanded={isOpen}
                >
                  {item.q}
                  <ChevronDown
                    size={18}
                    color={GRASS}
                    style={{ flexShrink: 0, transition: "transform 0.25s ease", transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
                  />
                </button>
                <div
                  style={{
                    maxHeight: isOpen ? 200 : 0,
                    overflow: "hidden",
                    transition: "max-height 0.3s ease",
                  }}
                >
                  <p style={{ color: STONE, lineHeight: 1.7, fontSize: 15, paddingBottom: 20 }}>{item.a}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
