"use client";

import { useEffect, useState } from "react";
import { site } from "@/data/content";

const links = [
  { href: "#about", label: "About", id: "about" },
  { href: "#focus", label: "What I Do", id: "focus" },
  { href: "#work", label: "Work", id: "work" },
  { href: "#experience", label: "Experience", id: "experience" },
  { href: "#contact", label: "Contact", id: "contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scrollspy: highlight the section currently in view.
  useEffect(() => {
    const sections = links
      .map((l) => document.getElementById(l.id))
      .filter(Boolean) as HTMLElement[];
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const socials = [
    site.github && { label: "GH", full: "GitHub", href: site.github },
    site.linkedin && { label: "IN", full: "LinkedIn", href: site.linkedin },
  ].filter(Boolean) as { label: string; full: string; href: string }[];

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        scrolled
          ? "bg-bg/80 backdrop-blur-md border-b border-line"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <nav className="container-x flex items-center justify-between h-[68px] gap-6">
        {/* Wordmark: bold first name + greyed surname */}
        <a href="#top" className="shrink-0 text-[0.95rem] tracking-tight">
          <span className="font-bold text-title" style={{ fontFamily: "var(--font-display)" }}>
            Christen
          </span>{" "}
          <span style={{ color: "var(--grey-500)" }}>Loyola</span>
        </a>

        {/* Center nav links */}
        <ul className="hidden md:flex items-center gap-8 text-[0.85rem]">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className={`link-underline nav-link ${
                  active === l.id ? "is-active" : ""
                }`}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Right cluster: socials + CTA */}
        <div className="hidden md:flex items-center gap-5 shrink-0">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.full}
              className="link-underline text-[0.85rem]"
            >
              {s.label}
            </a>
          ))}
          <a href="#contact" className="btn btn-primary">
            Let&apos;s talk
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          className="md:hidden flex flex-col gap-[5px] p-2 -mr-2"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span
            className={`block h-[2px] w-6 bg-title transition-transform duration-300 ${
              open ? "translate-y-[7px] rotate-45" : ""
            }`}
          />
          <span
            className={`block h-[2px] w-6 bg-title transition-opacity duration-300 ${
              open ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block h-[2px] w-6 bg-title transition-transform duration-300 ${
              open ? "-translate-y-[7px] -rotate-45" : ""
            }`}
          />
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden bg-bg/95 backdrop-blur-md transition-[max-height] duration-500 ${
          open ? "max-h-[100vh] border-b border-line" : "max-h-0"
        }`}
      >
        <ul className="container-x flex flex-col gap-1 py-6">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={() => setOpen(false)}
                className={`block py-3 text-[1.5rem] font-medium ${
                  active === l.id ? "accent" : "text-title"
                }`}
                style={{ fontFamily: "var(--font-display)" }}
              >
                {l.label}
              </a>
            </li>
          ))}
          <li className="pt-4 flex items-center gap-6">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="link-underline text-[0.95rem]"
              >
                {s.full}
              </a>
            ))}
          </li>
          <li className="pt-4">
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="btn btn-primary w-full justify-center"
            >
              Let&apos;s talk
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
