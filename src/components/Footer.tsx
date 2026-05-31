import Reveal from "@/components/Reveal";
import CopyEmail from "@/components/CopyEmail";
import { site } from "@/data/content";

export default function Footer() {
  const socials = [
    site.github && { label: "GitHub", href: site.github },
    site.linkedin && { label: "LinkedIn", href: site.linkedin },
    { label: "Email", href: `mailto:${site.email}` },
    { label: "Resume", href: site.resume },
  ].filter(Boolean) as { label: string; href: string }[];

  return (
    <footer id="contact" className="section pb-10 border-t border-line">
      <div className="container-x">
        <Reveal>
          <p className="eyebrow mb-8">Contact</p>
          <p className="intro-lg text-title max-w-4xl">
            Open to AI/ML and software engineering roles. Let&apos;s build
            something worth shipping.
          </p>

          <a href={`mailto:${site.email}`} className="group inline-block mt-10">
            <span className="display-sub text-title break-words transition-colors duration-300 group-hover:[color:var(--accent)]">
              {site.email}
            </span>
          </a>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a href={`mailto:${site.email}`} className="btn btn-primary">
              Send an email
            </a>
            <CopyEmail email={site.email} />
          </div>
        </Reveal>

        {/* Footer mirrors the header: copyright left / socials center / counter right */}
        <div className="mt-24 pt-8 border-t border-line grid grid-cols-1 sm:grid-cols-3 gap-6 items-center">
          <p className="text-desc text-[0.8rem] order-3 sm:order-1">
            © {new Date().getFullYear()} {site.name}
          </p>
          <div className="flex flex-wrap justify-start sm:justify-center gap-x-6 gap-y-2 order-1 sm:order-2">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target={s.href.startsWith("http") ? "_blank" : undefined}
                rel={
                  s.href.startsWith("http") ? "noopener noreferrer" : undefined
                }
                className="link-underline text-[0.9rem]"
              >
                {s.label}
              </a>
            ))}
          </div>
          <p
            className="text-desc text-[0.8rem] order-2 sm:order-3 sm:text-right tabular-nums"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {site.location} · 03 / 03
          </p>
        </div>
      </div>
    </footer>
  );
}
