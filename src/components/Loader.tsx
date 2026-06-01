"use client";

import { useEffect, useState } from "react";

/**
 * Diagonal line loader.
 *
 * A cyan line draws along the top-left -> bottom-right diagonal on a black
 * screen (a bar of length = the screen diagonal, pinned at the top-left and
 * rotated to the diagonal angle, filled left-to-right via scaleX). When it
 * completes, the black screen splits along that same diagonal into two
 * triangles that slide off opposite corners, opening the page underneath.
 *
 * Geometry: angle = atan2(h, w), length = hypot(w, h). Skipped entirely under
 * prefers-reduced-motion.
 */
export default function Loader() {
  const [dims, setDims] = useState<{ angle: number; hypot: number } | null>(
    null
  );
  const [prog, setProg] = useState(0);
  const [phase, setPhase] = useState<"draw" | "open" | "gone">("draw");

  useEffect(() => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduce) {
      setPhase("gone");
      return;
    }

    const w = window.innerWidth;
    const h = window.innerHeight;
    setDims({
      angle: (Math.atan2(h, w) * 180) / Math.PI,
      hypot: Math.hypot(w, h),
    });

    document.body.style.overflow = "hidden";

    const DRAW = 1300; // line draw duration
    const OPEN = 950; // split-open duration
    const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
    const start = performance.now();
    let raf = 0;
    const timers: ReturnType<typeof setTimeout>[] = [];

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / DRAW);
      setProg(easeOut(t));
      if (t < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        timers.push(setTimeout(() => setPhase("open"), 140));
        timers.push(
          setTimeout(() => {
            setPhase("gone");
            document.body.style.overflow = "";
          }, 140 + OPEN)
        );
      }
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      timers.forEach(clearTimeout);
      document.body.style.overflow = "";
    };
  }, []);

  if (phase === "gone") return null;

  return (
    <div
      className="dloader"
      data-phase={phase}
      aria-hidden
      style={
        {
          "--angle": `${dims?.angle ?? 30}deg`,
          "--hypot": `${dims?.hypot ?? 2200}px`,
          "--prog": prog,
        } as React.CSSProperties
      }
    >
      {/* two black halves split by the diagonal */}
      <div className="dloader__half dloader__half--top" />
      <div className="dloader__half dloader__half--bot" />

      {/* the cyan diagonal line that draws top-left -> bottom-right */}
      {dims && (
        <div className="dloader__line">
          <span className="dloader__line-fill" />
        </div>
      )}
    </div>
  );
}
