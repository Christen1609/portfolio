import Reveal from "@/components/Reveal";
import { projects, type Project } from "@/data/content";

function ProjectEntry({ project, index }: { project: Project; index: number }) {
  const num = String(index + 1).padStart(2, "0");
  return (
    <Reveal as="article" className="border-t border-line py-10 lg:py-14">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12">
        {/* left: number + title + meta */}
        <div className="lg:col-span-5">
          <div className="flex items-baseline gap-4">
            <span className="text-desc text-[0.85rem] tabular-nums">{num}</span>
            <span className="text-desc text-[0.85rem]">{project.date}</span>
          </div>
          <h3 className="heading-md text-title mt-3">{project.title}</h3>
          <p className="lead mt-4 max-w-md">{project.oneLine}</p>

          <ul className="flex flex-wrap gap-2 mt-6">
            {project.stack.map((s) => (
              <li key={s} className="tag">
                {s}
              </li>
            ))}
          </ul>

          {(project.demo || project.repo) && (
            <div className="flex flex-wrap gap-3 mt-6">
              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-ghost"
                >
                  Live demo <span aria-hidden>↗</span>
                </a>
              )}
              {project.repo && (
                <a
                  href={project.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-ghost"
                >
                  Repository <span aria-hidden>↗</span>
                </a>
              )}
            </div>
          )}
        </div>

        {/* right: detail */}
        <div className="lg:col-span-7 lg:pl-8 lg:border-l border-line space-y-6">
          <Detail label="Problem" text={project.problem} />
          <Detail label="Approach" text={project.approach} />
          <Detail
            label="Decisions & trade-offs"
            text={project.decisions}
            accent
          />
        </div>
      </div>
    </Reveal>
  );
}

function Detail({
  label,
  text,
  accent = false,
}: {
  label: string;
  text: string;
  accent?: boolean;
}) {
  return (
    <div>
      <p
        className="eyebrow mb-2"
        style={accent ? { color: "var(--cl-orange)" } : undefined}
      >
        {label}
      </p>
      <p className={accent ? "text-subtitle" : "text-body"}>{text}</p>
    </div>
  );
}

export default function Work() {
  return (
    <section id="work" className="section">
      <div className="container-x">
        <Reveal>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
            <h2 className="display-xl text-title">
              Selected
              <br />
              Work
            </h2>
            <p className="lead max-w-sm md:text-right">
              Shipped projects across AI/ML and full-stack. Each one notes the
              decisions and trade-offs behind it.
            </p>
          </div>
        </Reveal>

        <div>
          {projects.map((p, i) => (
            <ProjectEntry key={p.title} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
