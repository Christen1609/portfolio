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
    <footer id="contact" className="section pb-12 border-t border-line">
      <div className="container-x">
        <Reveal>
          <p className="eyebrow mb-8">Contact</p>
          <p className="display-lg text-subtitle max-w-4xl">
            Open to AI/ML and software engineering roles. Let&apos;s build
            something worth shipping.
          </p>

          <a
            href={`mailto:${site.email}`}
            className="group inline-block mt-10"
          >
            <span className="display-xl text-title break-words group-hover:text-orange transition-colors duration-300">
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

        <div className="mt-20 pt-8 border-t border-line flex flex-col sm:flex-row gap-6 sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-x-6 gap-y-2">
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
          <p className="text-desc text-[0.8rem]">
            © {new Date().getFullYear()} {site.name}. {site.location}.
          </p>
        </div>
      </div>
    </footer>
  );
}
