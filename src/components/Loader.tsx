"use client";

import { useEffect, useState } from "react";
import { site } from "@/data/content";

// Intro flat-panel wipe. Counts up, then the panel slides away upward.
// Skipped entirely under reduced motion.
export default function Loader() {
  const [count, setCount] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setGone(true);
      return;
    }

    document.body.style.overflow = "hidden";

    let raf = 0;
    const start = performance.now();
    const dur = 1100;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / dur);
      setCount(Math.round(p * 100));
      if (p < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setLeaving(true);
        setTimeout(() => {
          setGone(true);
          document.body.style.overflow = "";
        }, 850);
      }
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      document.body.style.overflow = "";
    };
  }, []);

  if (gone) return null;

  return (
    <div
      className="loader"
      aria-hidden
      style={{
        transform: leaving ? "translateY(-100%)" : "translateY(0)",
        transition: "transform 0.85s cubic-bezier(0.76, 0, 0.24, 1)",
      }}
    >
      <span className="loader__name">{site.shortName}</span>
      <span className="loader__count">
        {String(count).padStart(3, "0")}
      </span>
      <span className="loader__bar" style={{ width: `${count}%` }} />
    </div>
  );
}
