"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import ScrambleText from "@/components/ScrambleText";
import Reveal from "@/components/Reveal";
import { projects, site } from "@/data/content";

const ANIM_MS = 600;

// Pull a clean year (or year range) out of a free-form date string.
function yearLabel(date: string) {
  const ys = date.match(/\d{4}/g);
  if (!ys || ys.length === 0) return date;
  const a = ys[0];
  const b = ys[ys.length - 1];
  return a === b ? a : `${a}–${b}`;
}

// Poster-style fallback shown until a real screenshot is dropped into the
// project's `image` field.
function StagePlaceholder({ title, stack }: { title: string; stack: string[] }) {
  return (
    <div className="proj-ph">
      <span className="proj-ph-label">{stack[0] ?? "Project"}</span>
      <span className="proj-ph-title">{title}</span>
      <div className="proj-ph-tags">
        {stack.slice(0, 4).map((s) => (
          <span key={s}>{s}</span>
        ))}
      </div>
    </div>
  );
}

function StageCard({ project }: { project: (typeof projects)[number] }) {
  const viewHref = project.demo || project.repo;
  return (
    <>
      {project.image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={project.image} alt={project.title} className="proj-stage-img" />
      ) : (
        <StagePlaceholder title={project.title} stack={project.stack} />
      )}
      {viewHref && (
        <a
          href={viewHref}
          target="_blank"
          rel="noopener noreferrer"
          className="proj-view"
        >
          View
        </a>
      )}
    </>
  );
}

/**
 * Work — "Projects I worked on", Valentin-style showcase.
 *
 * Scrolling while the cursor is over the showcase advances/rewinds projects:
 * the current card shrinks away toward the bottom-right while the next grows in
 * from the top-left (and vice-versa scrolling up). At the first/last project the
 * wheel is released so the page scrolls on normally. The rail on the left shows
 * the active project as a square thumbnail and the rest as thin lines.
 */
export default function Work() {
  const total = projects.length;
  const [active, setActive] = useState(0);
  const [anim, setAnim] = useState<{ from: number; dir: 1 | -1 } | null>(null);

  const activeRef = useRef(0);
  const lockRef = useRef(false);
  const animTimer = useRef<number | undefined>(undefined);
  const showcaseRef = useRef<HTMLDivElement>(null);

  const change = useCallback(
    (next: number) => {
      const cur = activeRef.current;
      if (next === cur || next < 0 || next >= total) return;
      const dir: 1 | -1 = next > cur ? 1 : -1;
      activeRef.current = next;
      setAnim({ from: cur, dir });
      setActive(next);
      window.clearTimeout(animTimer.current);
      animTimer.current = window.setTimeout(() => setAnim(null), ANIM_MS + 20);
    },
    [total]
  );

  // Wheel over the showcase cycles projects; released at the boundaries.
  useEffect(() => {
    const el = showcaseRef.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return; // no scroll-jacking under reduced motion

    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) < 2) return;
      const dir = e.deltaY > 0 ? 1 : -1;
      const next = activeRef.current + dir;
      if (next < 0 || next >= total) return; // boundary -> let the page scroll
      e.preventDefault();
      if (lockRef.current) return;
      lockRef.current = true;
      change(next);
      window.setTimeout(() => {
        lockRef.current = false;
      }, ANIM_MS + 80);
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [total, change]);

  useEffect(() => () => window.clearTimeout(animTimer.current), []);

  const p = projects[active];
  const num = String(active + 1).padStart(2, "0");
  const tot = String(total).padStart(2, "0");

  return (
    <section id="work" className="section">
      <div className="container-x">
        {/* header */}
        <div className="flex items-start justify-between gap-6">
          <Reveal as="h2" className="proj-heading text-title">
            Projects I
            <br />
            Worked On
            <span className="proj-range">2020-26</span>
          </Reveal>
          <span className="eyebrow shrink-0">(Portfolio)</span>
        </div>

        {/* showcase (scroll over this to switch). data-lenis-prevent stops the
            smooth-scroll layer from also moving the page while we hijack the
            wheel to cycle projects; at the first/last project we let it pass. */}
        <div className="proj-grid" ref={showcaseRef} data-lenis-prevent>

          {/* rail: active = square thumb, rest = lines */}
          <div className="proj-rail">
            {projects.map((pr, i) =>
              i === active ? (
                <button
                  key={pr.title}
                  type="button"
                  className="proj-rail-square"
                  onClick={() => change(i)}
                  aria-current="true"
                  aria-label={pr.title}
                >
                  {pr.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={pr.image} alt="" />
                  ) : (
                    <span>{String(i + 1).padStart(2, "0")}</span>
                  )}
                </button>
              ) : (
                <button
                  key={pr.title}
                  type="button"
                  className="proj-rail-line"
                  onClick={() => change(i)}
                  aria-label={pr.title}
                >
                  <span />
                </button>
              )
            )}
          </div>

          {/* centre stage */}
          <div className="proj-stage">
            {anim && (
              <div
                className={`proj-card ${
                  anim.dir > 0 ? "is-out-fwd" : "is-out-back"
                }`}
              >
                <StageCard project={projects[anim.from]} />
              </div>
            )}
            <div
              key={active}
              className={`proj-card ${
                anim ? (anim.dir > 0 ? "is-in-fwd" : "is-in-back") : ""
              }`}
            >
              <StageCard project={p} />
            </div>
          </div>

          {/* meta: year + description + stack */}
          <div className="proj-meta">
            <div>
              <p className="eyebrow">Year</p>
              <p className="proj-year tabular-nums">{yearLabel(p.date)}</p>
            </div>
            <div>
              <p className="eyebrow">Description</p>
              <p className="text-subtitle mt-2">{p.oneLine}</p>
            </div>
            <div>
              <p className="eyebrow">Stack</p>
              <ul className="flex flex-wrap gap-2 mt-3">
                {p.stack.map((s) => (
                  <li key={s} className="tag">
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* bottom: number + title, all-projects link */}
        <div className="proj-bottom">
          <div>
            <span className="text-desc text-[0.85rem] tabular-nums">
              {num} / {tot}
            </span>
            <h3 className="proj-title text-title">
              <ScrambleText key={p.title} text={p.title} />
            </h3>
          </div>
          {site.github && (
            <a
              href={site.github}
              target="_blank"
              rel="noopener noreferrer"
              className="proj-all accent"
            >
              All projects <span aria-hidden>↗</span>
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
