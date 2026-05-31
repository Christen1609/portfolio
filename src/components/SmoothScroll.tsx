"use client";

import { useEffect } from "react";

// Lenis smooth scroll + GSAP ScrollTrigger.
// Deliberately does NOT hijack scroll: native wheel/touch still work, we only
// smooth them. Disabled under prefers-reduced-motion (falls back to native).
export default function SmoothScroll() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    let lenis: InstanceType<typeof import("lenis").default> | null = null;
    let cleanupFns: Array<() => void> = [];

    (async () => {
      const [{ default: Lenis }, { gsap }, { ScrollTrigger }] =
        await Promise.all([
          import("lenis"),
          import("gsap"),
          import("gsap/ScrollTrigger"),
        ]);

      gsap.registerPlugin(ScrollTrigger);

      lenis = new Lenis({
        duration: 1.1,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      });

      lenis.on("scroll", ScrollTrigger.update);

      const ticker = (time: number) => {
        lenis?.raf(time * 1000);
      };
      gsap.ticker.add(ticker);
      gsap.ticker.lagSmoothing(0);
      cleanupFns.push(() => gsap.ticker.remove(ticker));

      // Anchor links -> Lenis scrollTo with header offset
      const onClick = (e: MouseEvent) => {
        const a = (e.target as HTMLElement).closest('a[href^="#"]');
        if (!a) return;
        const id = a.getAttribute("href");
        if (!id || id === "#") return;
        const el = document.querySelector(id);
        if (!el) return;
        e.preventDefault();
        lenis?.scrollTo(el as HTMLElement, { offset: -72, duration: 1.2 });
      };
      document.addEventListener("click", onClick);
      cleanupFns.push(() => document.removeEventListener("click", onClick));

      // Top progress bar
      const bar = document.getElementById("scroll-progress");
      if (bar) {
        const st = ScrollTrigger.create({
          start: 0,
          end: "max",
          onUpdate: (self) => {
            bar.style.transform = `scaleX(${self.progress})`;
          },
        });
        cleanupFns.push(() => st.kill());
      }

      // Hero portrait parallax
      const portrait = document.querySelector<HTMLElement>("[data-parallax]");
      if (portrait) {
        const tween = gsap.to(portrait, {
          yPercent: -12,
          ease: "none",
          scrollTrigger: {
            trigger: portrait,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
        cleanupFns.push(() => tween.scrollTrigger?.kill());
      }

      ScrollTrigger.refresh();
    })();

    return () => {
      cleanupFns.forEach((fn) => fn());
      cleanupFns = [];
      lenis?.destroy();
    };
  }, []);

  return null;
}
