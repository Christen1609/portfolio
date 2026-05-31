import Image from "next/image";
import { hero, site } from "@/data/content";
import CubeWord from "@/components/CubeWord";

export default function Hero() {
  return (
    <section
      id="top"
      className="relative min-h-[100svh] flex flex-col justify-between pt-28 pb-12"
    >
      <div className="container-x w-full">
        {/* top meta row */}
        <div className="flex items-start justify-between gap-4">
          <p className="eyebrow max-w-[16ch] sm:max-w-none">
            {site.role}
            <span className="hidden sm:inline"> &nbsp;//&nbsp; </span>
            <br className="sm:hidden" />
            <span className="text-body normal-case tracking-normal">
              {site.location}
            </span>
          </p>
          <div className="text-right shrink-0">
            <span className="eyebrow block">Available</span>
            <span className="text-title text-[0.95rem] tabular-nums">
              {site.year}
            </span>
          </div>
        </div>
      </div>

      {/* giant name */}
      <div className="container-x w-full mt-10">
        <h1 className="display-hero text-title">
          <span className="block">{hero.first}</span>
          <span className="block">
            <CubeWord text={hero.last} />
            <span className="text-orange">.</span>
          </span>
        </h1>
      </div>

      {/* bottom row: intro + portrait */}
      <div className="container-x w-full mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end">
          <div className="lg:col-span-7 order-2 lg:order-1">
            <p className="lead max-w-xl text-title">{hero.positioning}</p>
            <p className="mt-4 max-w-xl text-body text-[0.95rem]">
              {hero.subline}
            </p>
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
                Resume
                <span aria-hidden>↗</span>
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

          <div className="lg:col-span-5 order-1 lg:order-2 lg:justify-self-end w-full max-w-[320px] sm:max-w-[360px]">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-sm border border-line">
              <Image
                src="/christen.jpeg"
                alt="Christen I. Loyola"
                fill
                priority
                sizes="(max-width: 1024px) 80vw, 360px"
                className="object-cover object-center grayscale-[15%]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
