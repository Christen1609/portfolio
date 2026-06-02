"use client";

import Reveal from "@/components/Reveal";
import { site } from "@/data/content";

/**
 * Contact — closing section in the Valentin-style layout:
 * a real-time rotating circular email (a mailto link) sits behind a blended
 * cut-out figure, with socials / contact / goals down the left. Hovering the
 * email ring expands the trailing cursor into a "hello" bubble (see Cursor.tsx).
 */
export default function Contact() {
  const email = site.email;
  const waNumber = site.phone.replace(/[^\d]/g, "");
  const ringText = `${email}  •  `.repeat(2);

  return (
    <footer id="contact" className="contact-section">
      <div className="contact-glow" aria-hidden />

      <div className="container-x relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-6 items-center">
          {/* left — socials, contact, goals */}
          <div className="lg:col-span-4 relative z-20">
            <Reveal>
              <p className="eyebrow">Socials</p>
              <ul className="mt-3 space-y-1.5">
                {site.linkedin && (
                  <li>
                    <a
                      className="contact-link"
                      href={site.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      LinkedIn
                    </a>
                  </li>
                )}
                {site.github && (
                  <li>
                    <a
                      className="contact-link"
                      href={site.github}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      GitHub
                    </a>
                  </li>
                )}
              </ul>

              <p className="eyebrow mt-8">Contact me</p>
              <ul className="mt-3 space-y-1.5">
                <li>
                  <a className="contact-link" href={`mailto:${email}`}>
                    Email
                  </a>
                </li>
                <li>
                  <a
                    className="contact-link"
                    href={`https://wa.me/${waNumber}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    WhatsApp
                  </a>
                </li>
              </ul>

              <hr className="hr-line my-8 max-w-[14rem]" />

              <p className="eyebrow">Got a project in mind?</p>
              <h2 className="display-sub text-title mt-3">
                Let&apos;s make something happen together
              </h2>
              <p className="lead mt-5 max-w-sm">
                My goal is to build AI that is scalable, and software that makes
                it out of the repo and in front of real users. Open to AI/ML and
                software engineering roles.
              </p>
            </Reveal>
          </div>

          {/* centre — rotating email ring behind the blended figure */}
          <div className="lg:col-span-8 contact-stage">
            <a
              href={`mailto:${email}`}
              data-cursor="hello"
              aria-label={`Email ${site.name}`}
              className="email-ring"
            >
              <svg viewBox="0 0 240 240" className="email-ring__svg" aria-hidden>
                <defs>
                  <path
                    id="emailCircle"
                    d="M120,120 m-96,0 a96,96 0 1,1 192,0 a96,96 0 1,1 -192,0"
                    fill="none"
                  />
                </defs>
                <text>
                  <textPath href="#emailCircle" startOffset="0">
                    {ringText}
                  </textPath>
                </text>
              </svg>
            </a>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/christen-contact.webp"
              alt={site.name}
              className="contact-figure"
            />
          </div>
        </div>

        {/* bottom credit bar */}
        <div className="mt-12 pt-8 border-t border-line flex flex-wrap justify-between gap-4 relative z-20">
          <p className="text-desc text-[0.8rem]">
            © {new Date().getFullYear()} {site.name}
          </p>
          <p
            className="text-desc text-[0.8rem] tabular-nums"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {site.location}
          </p>
        </div>
      </div>
    </footer>
  );
}
