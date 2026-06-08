import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import WorkedWith from "@/components/WorkedWith";
import Work from "@/components/Work";
import Contact from "@/components/Contact";
import FocusAccordion from "@/components/FocusAccordion";
import Reveal from "@/components/Reveal";
import BlurLines from "@/components/BlurLines";
import { renderEmphasis } from "@/components/renderEmphasis";
import {
  about,
  experience,
  education,
  skillGroups,
  topSkills,
  languages,
} from "@/data/content";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />

        {/* COMPANIES I'VE WORKED WITH — revealed as the hero dissolves */}
        <WorkedWith />

        {/* ABOUT */}
        <section id="about" className="section border-t border-line">
          <div className="container-x grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            <div className="lg:col-span-4">
              <Reveal>
                <p className="eyebrow">{about.heading}</p>
              </Reveal>
            </div>
            <div className="lg:col-span-8 space-y-6">
              <BlurLines className="space-y-6" selector=".about-p">
                {about.paragraphs.map((p, i) => (
                  <p key={i} className="intro-lg text-subtitle about-p">
                    {renderEmphasis(p)}
                  </p>
                ))}
              </BlurLines>

              {/* top skills strip */}
              <Reveal delay={120}>
                <div className="pt-6 flex flex-wrap gap-2.5">
                  {topSkills.map((s) => (
                    <span key={s} className="tag">
                      {s}
                    </span>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* INVERTED STATEMENT BAND */}
        <section className="section section-invert">
          <div className="container-x">
            <Reveal>
              <p className="eyebrow mb-8">Approach</p>
              <p className="display-lg max-w-5xl">
                I build products that can handle the real world.
              </p>
              <p className="intro-md max-w-3xl mt-8">
                Which means asking the questions that matter before anything
                ships: Can it take the load and the queries at scale? How does
                it hold up security-wise? And what does latency look like under
                real use?
              </p>
            </Reveal>
            <Reveal delay={120}>
              <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8">
                {[
                  { v: "Masters", l: "AI & ML · University of Adelaide (Go8)" },
                  { v: "Now", l: "Software Engineer · Ahfy" },
                  { v: "7", l: "Shipped projects, AI/ML to full-stack" },
                ].map((s) => (
                  <div key={s.l} className="border-t border-line pt-4">
                    <div
                      className="leading-none"
                      style={{
                        fontFamily: "var(--font-display)",
                        fontWeight: 700,
                        fontSize: "clamp(2.2rem, 4vw, 3.4rem)",
                      }}
                    >
                      {s.v}
                    </div>
                    <div className="mt-3 text-[0.95rem]">{s.l}</div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* FOCUS / WHAT I DO */}
        <section id="focus" className="section border-t border-line">
          <div className="container-x">
            <Reveal>
              <h2 className="display-sub text-title mb-12">
                What I
                <br />
                Do
              </h2>
            </Reveal>
            <Reveal>
              <FocusAccordion />
            </Reveal>
          </div>
        </section>

        {/* WORK */}
        <Work />

        {/* EXPERIENCE + EDUCATION */}
        <section id="experience" className="section border-t border-line">
          <div className="container-x">
            <Reveal>
              <h2 className="display-sub text-title mb-12">Experience</h2>
            </Reveal>

            <div>
              {experience.map((job, i) => (
                <Reveal
                  key={job.company}
                  as="div"
                  delay={i * 60}
                  className="border-t border-line py-8 lg:py-10 grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-12"
                >
                  <div className="lg:col-span-5">
                    <h3 className="heading-md text-title">{job.role}</h3>
                    <p className="mt-2 text-[0.95rem]">
                      <span className="text-desc">{job.type}</span>
                      <span className="text-desc"> · </span>
                      {job.url ? (
                        <a
                          href={job.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="accent hover:underline"
                        >
                          {job.company}
                        </a>
                      ) : (
                        <span className="accent">{job.company}</span>
                      )}
                    </p>
                    <p className="text-desc text-[0.85rem] mt-1 tabular-nums">
                      {job.period}
                    </p>
                    {job.stack && (
                      <ul className="flex flex-wrap gap-2 mt-4">
                        {job.stack.map((s) => (
                          <li key={s} className="tag">
                            {s}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                  <ul className="lg:col-span-7 space-y-3">
                    {job.bullets.map((b, bi) => (
                      <li key={bi} className="flex gap-3 text-body">
                        <span className="accent mt-[0.45rem] shrink-0 text-[0.6rem]">
                          ●
                        </span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </Reveal>
              ))}
            </div>

            {/* Education */}
            <Reveal>
              <h3 className="display-lg text-title mt-20 mb-10">Education</h3>
            </Reveal>
            <div>
              {education.map((ed, i) => (
                <Reveal
                  key={ed.degree}
                  as="div"
                  delay={i * 60}
                  className="border-t border-line py-8 grid grid-cols-1 lg:grid-cols-12 gap-3 lg:gap-12"
                >
                  <div className="lg:col-span-5">
                    <p className="text-desc text-[0.85rem] tabular-nums">
                      {ed.period}
                    </p>
                  </div>
                  <div className="lg:col-span-7">
                    <h4 className="heading-md text-title">{ed.degree}</h4>
                    <p className="text-subtitle mt-1">{ed.school}</p>
                    <p className="text-desc text-[0.9rem] mt-1">{ed.detail}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* SKILLS */}
        <section id="skills" className="section border-t border-line">
          <div className="container-x grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            <div className="lg:col-span-4">
              <Reveal>
                <h2 className="display-sub text-title">
                  Tools &amp;
                  <br />
                  Skills
                </h2>
              </Reveal>
            </div>
            <div className="lg:col-span-8 space-y-10">
              {skillGroups.map((group, i) => (
                <Reveal key={group.title} delay={i * 60}>
                  <div className="border-t border-line pt-6">
                    <p className="eyebrow mb-4">{group.title}</p>
                    <ul className="flex flex-wrap gap-2.5">
                      {group.skills.map((s) => (
                        <li key={s} className="tag">
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              ))}

              <Reveal>
                <div className="border-t border-line pt-6">
                  <p className="eyebrow mb-4">Languages</p>
                  <ul className="flex flex-wrap gap-2.5">
                    {languages.map((s) => (
                      <li key={s} className="tag">
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </div>
          </div>
        </section>
      </main>
      <Contact />
    </>
  );
}
