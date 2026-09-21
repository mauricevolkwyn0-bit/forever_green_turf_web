"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

// Fades a section in as it enters the viewport and back out as it leaves —
// in either scroll direction, since IntersectionObserver's `isIntersecting`
// flips both ways on its own; no special-casing for scroll direction needed.
export default function FadeInSection({ children, threshold = 0.15, style }: { children: ReactNode; threshold?: number; style?: CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return (
    <div
      ref={ref}
      style={{
        ...style,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: "opacity 0.7s ease, transform 0.7s ease",
      }}
    >
      {children}
    </div>
  );
}
