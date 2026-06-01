"use client";

import Image from "next/image";
import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { hero, site } from "@/data/content";
import CubeWord from "@/components/CubeWord";

/**
 * Hero — full-bleed portrait behind the heading text.
 *
 * The portrait is a background layer (not a side-by-side element). As the
 * user scrolls through the pinned hero, a scrubbed Framer Motion timeline
 * scales the image up (1 -> ~1.6), fades it out, and ramps a darkening
 * gradient so it dissolves into the black page background, revealing the
 * section below. Gated behind prefers-reduced-motion (static fallback).
 */
export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Image: scale up + fade as the darkening gradient takes over.
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.6]);
  const imgOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.06]);
  const darken = useTransform(scrollYProgress, [0, 0.92], [0.5, 0.98]);
  // Heading drifts up and fades out a touch sooner than the image.
  const headOpacity = useTransform(scrollYProgress, [0, 0.45], [1, 0]);
  const headY = useTransform(scrollYProgress, [0, 0.6], ["0%", "-26%"]);

  // --- Reduced motion: static full-bleed hero, no scrub. ---
  if (reduce) {
    return (
      <section id="top" className="relative min-h-[100svh] overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/christen.jpeg"
            alt="Christen I. Loyola"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[center_32%]"
          />
          <div className="absolute inset-0 hero-darken hero-darken--static" />
        </div>
        <div className="relative">
          <HeroForeground />
        </div>
      </section>
    );
  }

  return (
    <section id="top" ref={ref} className="relative h-[185vh]">
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        {/* full-bleed portrait background */}
        <motion.div
          className="absolute inset-0 will-change-transform"
          style={{ scale, opacity: imgOpacity }}
        >
          <Image
            src="/christen.jpeg"
            alt="Christen I. Loyola"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[center_32%]"
          />
        </motion.div>

        {/* darkening gradient — dissolves the portrait into the page bg */}
        <motion.div
          className="absolute inset-0 hero-darken"
          style={{ opacity: darken }}
        />

        {/* heading text on top */}
        <motion.div
          className="relative h-full"
          style={{ opacity: headOpacity, y: headY }}
        >
          <HeroForeground />
        </motion.div>
      </div>
    </section>
  );
}

function HeroForeground() {
  return (
    <div className="h-[100svh] flex flex-col justify-between pt-28 pb-12">
      {/* top meta row — greeting (left) + availability (right) */}
      <div className="container-x w-full">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-body text-[0.9rem]">{hero.greeting}</p>
            <p className="font-display text-[1.45rem] sm:text-[1.8rem] leading-tight mt-1">
              <span className="text-title font-bold">{hero.firstName}</span>{" "}
              <span className="text-grey-500 font-normal">{hero.lastName}</span>
            </p>
          </div>
          <div className="text-right shrink-0">
            <span className="eyebrow block">Available</span>
            <span className="text-title text-[0.95rem] tabular-nums">
              {site.year}
            </span>
            <span className="eyebrow block mt-3">{site.location}</span>
          </div>
        </div>
      </div>

      {/* giant profession poster (white lead lines + rolling cube) + CTAs */}
      <div className="container-x w-full">
        <h1 className="display-hero text-title text-[clamp(1.9rem,8vw,6.5rem)]">
          <span className="block whitespace-nowrap">{hero.lead}</span>
          <span className="block">
            <CubeWord words={hero.roles} />
          </span>
        </h1>

        <div className="mt-8 flex flex-wrap gap-3">
          <a href="#work" className="btn btn-primary">
            View work
          </a>
          <a
            href={site.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-ghost"
          >
            Resume <span aria-hidden>↗</span>
          </a>
          <a href={`mailto:${site.email}`} className="btn btn-ghost">
            Email
          </a>
          {site.github && (
            <a
              href={site.github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost"
            >
              GitHub <span aria-hidden>↗</span>
            </a>
          )}
          {site.linkedin && (
            <a
              href={site.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost"
            >
              LinkedIn <span aria-hidden>↗</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
