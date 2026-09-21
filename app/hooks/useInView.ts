"use client";

import { useEffect, useRef, useState } from "react";

// Tracks whether an element is in the viewport. With `repeat` (default
// false), it fires once and stops observing — used for one-shot reveals like
// the stats counter. With `repeat: true`, it keeps toggling both ways as the
// element enters/leaves — used for staggered reveals that should replay.
export function useInView<T extends HTMLElement>(threshold = 0.4, repeat = false) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (!repeat) observer.disconnect();
        } else if (repeat) {
          setInView(false);
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, repeat]);

  return { ref, inView };
}
