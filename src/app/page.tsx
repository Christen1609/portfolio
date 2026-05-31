import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Work from "@/components/Work";
import Footer from "@/components/Footer";
import FocusAccordion from "@/components/FocusAccordion";
import Reveal from "@/components/Reveal";
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

        {/* ABOUT */}
        <section id="about" className="section border-t border-line">
          <div className="container-x grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            <div className="lg:col-span-4">
              <Reveal>
                <p className="eyebrow">{about.heading}</p>
              </Reveal>
            </div>
            <div className="lg:col-span-8 space-y-6">
              {about.paragraphs.map((p, i) => (
                <Reveal key={i} delay={i * 80}>
                  <p className="text-[1.15rem] sm:text-[1.4rem] leading-relaxed text-subtitle">
                    {p}
                  </p>
                </Reveal>
              ))}

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

        {/* FOCUS / WHAT I DO */}
        <section id="focus" className="section border-t border-line">
          <div className="container-x">
            <Reveal>
              <h2 className="display-xl text-title mb-12">
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
              <h2 className="display-xl text-title mb-12">Experience</h2>
            </Reveal>

            <div>
              {experience.map((job, i) => (
                <Reveal
                  key={job.company}
                  as="div"
                  delay={i * 60}
                  className="border-t border-line py-8 lg:py-10 grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-12"
                >
                  <div className="lg:col-span-4">
                    <h3 className="text-title text-[1.4rem] font-semibold">
                      {job.role}
                    </h3>
                    <p className="text-orange mt-1">{job.company}</p>
                    <p className="text-desc text-[0.85rem] mt-1">
                      {job.period}
                    </p>
                  </div>
                  <ul className="lg:col-span-8 space-y-3">
                    {job.bullets.map((b, bi) => (
                      <li key={bi} className="flex gap-3 text-body">
                        <span className="text-orange mt-[0.35rem] shrink-0">
                          ▪
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
                  <div className="lg:col-span-4">
                    <p className="text-desc text-[0.85rem]">{ed.period}</p>
                  </div>
                  <div className="lg:col-span-8">
                    <h4 className="text-title text-[1.25rem] font-medium">
                      {ed.degree}
                    </h4>
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
                <h2 className="display-xl text-title">
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
      <Footer />
    </>
  );
}
