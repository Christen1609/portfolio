"use client";

import { useEffect, type RefObject } from "react";

/**
 * useBlurLines — the intro's line-by-line blur reveal, reusable.
 *
 * Splits every element matching `selector` inside `ref` into lines (GSAP
 * SplitText) and scrubs them from blurred + low-opacity to sharp + full as the
 * block passes through the viewport. Because it is scrubbed (tied to scroll
 * position) the effect runs in BOTH directions: scroll down and the lines
 * sharpen in, scroll back up and they blur out again.
 *
 * Reduced motion: no split, no scrub — text is left fully legible.
 */
export function useBlurLines(
  ref: RefObject<HTMLElement | null>,
  selector = "p"
) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      el.classList.add("intro-copy--plain");
      return;
    }

    let cleanup = () => {};
    let cancelled = false;

    (async () => {
      const [{ gsap }, { ScrollTrigger }, { SplitText }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
        import("gsap/SplitText"),
      ]);
      if (cancelled) return;

      gsap.registerPlugin(ScrollTrigger, SplitText);

      // Wait for fonts so lines split where they actually render.
      await (document.fonts?.ready ?? Promise.resolve());
      if (cancelled || !ref.current) return;

      const targets = ref.current.querySelectorAll<HTMLElement>(selector);
      if (targets.length === 0) return;

      const split = new SplitText(targets, {
        type: "lines",
        linesClass: "intro-line",
      });

      gsap.set(split.lines, { opacity: 0.12, filter: "blur(7px)" });

      const tween = gsap.to(split.lines, {
        opacity: 1,
        filter: "blur(0px)",
        ease: "none",
        stagger: 0.6,
        scrollTrigger: {
          trigger: ref.current,
          start: "top 80%",
          end: "bottom 60%",
          scrub: 0.6,
        },
      });

      ScrollTrigger.refresh();

      cleanup = () => {
        tween.scrollTrigger?.kill();
        tween.kill();
        split.revert();
      };
    })();

    return () => {
      cancelled = true;
      cleanup();
    };
  }, [ref, selector]);
}
