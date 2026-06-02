"use client";

import Image from "next/image";
import { useRef } from "react";
import Reveal from "@/components/Reveal";
import { useBlurLines } from "@/components/useBlurLines";
import { companies, worked, type Company } from "@/data/content";

/**
 * WorkedWith — the band revealed as the hero dissolves.
 *
 * Left:  offset / asymmetric logo grid, tiles revealing on scroll with a
 *        staggered fade + slight upward translate (reuses <Reveal/>).
 * Right: intro paragraphs split into lines with GSAP SplitText. A scrubbed
 *        ScrollTrigger walks each line from blurred + low-opacity to sharp +
 *        full white, one line at a time. Lenis (already mounted globally)
 *        smooths the scrub. Reduced motion falls back to a plain visible/fade.
 */
export default function WorkedWith() {
  const introRef = useRef<HTMLDivElement>(null);
  useBlurLines(introRef, ".intro-p");

  return (
    <section id="companies" className="relative z-10 section">
      <div className="container-x grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* LEFT — companies */}
        <div className="lg:col-span-5">
          <Reveal>
            <p className="eyebrow max-w-[18ch] leading-[1.5] text-[0.9rem]">
              {worked.heading}
            </p>
          </Reveal>

          <div className="logo-grid mt-10">
            {companies.map((c, i) => (
              <Reveal
                as="div"
                key={c.name}
                delay={i * 120}
                className={`logo-tile logo-tile--${i}`}
              >
                <CompanyTile company={c} />
              </Reveal>
            ))}
          </div>
        </div>

        {/* RIGHT — intro */}
        <div className="lg:col-span-7 lg:pl-6">
          <div ref={introRef} className="intro-copy">
            <span className="intro-label">{worked.introLabel}</span>
            <div className="intro-text">
              {worked.intro.map((p, i) => (
                <p key={i} className="intro-p">
                  {/* Emphasize the word "scalable": bold + underline + caps */}
                  {p.split(/(scalable)/i).map((part, j) =>
                    /^scalable$/i.test(part) ? (
                      <strong key={j} className="intro-emph">
                        {part}
                      </strong>
                    ) : (
                      part
                    )
                  )}
                </p>
              ))}
            </div>
          </div>

          <div className="mt-12">
            <a href="#work" aria-label="View work" className="arrow-btn">
              <span aria-hidden>↗</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function CompanyTile({ company }: { company: Company }) {
  return (
    <div className="logo-tile-inner" title={`${company.role} · ${company.period}`}>
      {company.logo ? (
        <Image
          src={company.logo}
          alt={company.name}
          width={140}
          height={90}
          className="logo-img"
        />
      ) : (
        <span className="logo-wordmark">{company.name}</span>
      )}
    </div>
  );
}
