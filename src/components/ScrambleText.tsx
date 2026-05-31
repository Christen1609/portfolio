"use client";

import { useEffect, useRef, useState } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%&*";

// Scrambles into the final text once, when scrolled into view.
// Under reduced motion it renders the plain text immediately.
export default function ScrambleText({
  text,
  className = "",
  as: Tag = "span",
}: {
  text: string;
  className?: string;
  as?: React.ElementType;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [display, setDisplay] = useState(text);
  const done = useRef(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setDisplay(text);
      return;
    }

    let raf = 0;
    const run = () => {
      const start = performance.now();
      const dur = 700;
      const tick = (now: number) => {
        const p = Math.min(1, (now - start) / dur);
        const revealCount = Math.floor(p * text.length);
        let out = "";
        for (let i = 0; i < text.length; i++) {
          if (i < revealCount || text[i] === " ") {
            out += text[i];
          } else {
            out += CHARS[Math.floor(Math.random() * CHARS.length)];
          }
        }
        setDisplay(out);
        if (p < 1) {
          raf = requestAnimationFrame(tick);
        } else {
          setDisplay(text);
        }
      };
      raf = requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !done.current) {
            done.current = true;
            run();
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.4 }
    );
    observer.observe(node);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [text]);

  return (
    <Tag ref={ref} className={className} aria-label={text}>
      <span aria-hidden>{display}</span>
    </Tag>
  );
}
