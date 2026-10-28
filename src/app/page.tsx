"use client";

import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  MotionConfig,
  animate,
  motion,
  useInView,
  useReducedMotion,
} from "framer-motion";
import { ArrowRight, FileDown, FileText } from "lucide-react";
import { LanguageToggle } from "./LanguageToggle";
import { useLang } from "@/lib/lang-context";
import { CONTACT, type Project } from "@/data/cv";

const MOTION_KEY = "cv-motion";

const ease = [0.2, 0.7, 0.2, 1] as const;

// ── pieces ───────────────────────────────────────────────────────────────────

/**
 * Scroll reveal. Content is visible in the server HTML; `.kt-js` (added once JS runs) hides
 * not-yet-seen `.kt-reveal` elements, and useReveal() marks them `.kt-in` as they scroll in.
 */
function Reveal({
  as: Tag = "div",
  delay = 0,
  className = "",
  children,
  ...rest
}: {
  as?: "div" | "span" | "h1" | "h2" | "article" | "aside";
  delay?: number;
  className?: string;
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLElement>) {
  return (
    <Tag
      {...rest}
      className={`kt-reveal ${className}`}
      style={delay ? { transitionDelay: `${delay}s` } : undefined}
    >
      {children}
    </Tag>
  );
}

function useReveal(lang: string) {
  useEffect(() => {
    const root = document.querySelector(".kt-root");
    if (!root) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("kt-in");
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -60px 0px" }
    );
    // Anything already on screen is shown straight away; the rest waits for the observer.
    root.querySelectorAll(".kt-reveal:not(.kt-in)").forEach((el) => {
      if (el.getBoundingClientRect().top < window.innerHeight) el.classList.add("kt-in");
      else io.observe(el);
    });
    root.classList.add("kt-js");
    return () => io.disconnect();
    // Re-scan on language change: anything React re-created must be observed again.
  }, [lang]);
}

/** Counts up from 0 the first time it scrolls into view. Renders the final value before that. */
function Counter({ value, calm }: { value: number; calm: boolean }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduce = useReducedMotion();
  const [shown, setShown] = useState(value);

  useEffect(() => {
    if (!inView || calm || reduce) {
      setShown(value);
      return;
    }
    const controls = animate(0, value, {
      duration: 2.2,
      ease,
      onUpdate: (v) => setShown(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, calm, reduce, value]);

  return <span ref={ref}>{shown}</span>;
}

function Marquee({ items, reverse }: { items: string[]; reverse?: boolean }) {
  // Two copies side by side; the track slides by exactly one copy (-50%) and loops.
  const copy = (key: string) =>
    items.map((item, i) => (
      <span key={`${key}-${i}`} className="flex items-center gap-10">
        <span>{item}</span>
        {!reverse && <span className="text-(--kt-accent)">✦</span>}
      </span>
    ));
  return (
    <div
      className={`kt-track ${reverse ? "kt-track-rev kt-outline" : ""} gap-10 whitespace-nowrap text-[clamp(32px,4vw,56px)] font-extrabold tracking-[-0.03em]`}
    >
      {copy("a")}
      {copy("b")}
    </div>
  );
}

function ProjectCard({
  project,
  featured,
  labels,
}: {
  project: Project;
  featured: boolean;
  labels: { youSay: string; itWrites: string; visit: string; source: string };
}) {
  // The second card is the accent-coloured one; everything inside flips to dark ink.
  const ink = featured ? "text-(--kt-bg)" : "text-(--kt-ink)";
  const sub = featured ? "text-zinc-800" : "text-(--kt-muted)";
  const pill = featured
    ? "border-(--kt-bg) text-(--kt-bg) hover:bg-(--kt-bg) hover:text-(--kt-ink)"
    : "kt-pill border-zinc-700";

  return (
    <Reveal as="article"
      className={`kt-card flex flex-col gap-5 rounded-[28px] p-6 sm:p-10 ${ink} ${
        featured ? "bg-(--kt-accent)" : "border border-(--kt-line) bg-(--kt-card)"
      }`}
    >
      <div className={`flex justify-between gap-4 font-mono text-[13px] ${sub}`}>
        <span>{project.badges.join(" · ")}</span>
        <span>{project.period}</span>
      </div>
      <h3 className="text-[clamp(52px,6vw,72px)] font-extrabold leading-[0.9] tracking-[-0.04em]">
        {project.name}
      </h3>
      <p className={`text-[22px] font-semibold leading-snug ${featured ? "" : "text-(--kt-accent)"}`}>
        {project.tagline}
      </p>
      <p className={sub}>{project.blurb}</p>

      {project.before && project.after ? (
        <div className="flex flex-col gap-2 rounded-2xl bg-(--kt-bg) px-5 py-4 text-(--kt-ink)">
          <span className="sr-only">{labels.youSay}:</span>
          <span className="text-zinc-500 line-through">{project.before}</span>
          <span className="sr-only">{labels.itWrites}:</span>
          <span className="font-semibold">{project.after}</span>
        </div>
      ) : (
        <div
          aria-hidden="true"
          className="flex flex-col gap-1 rounded-2xl bg-(--kt-bg) px-5 py-4 font-mono text-[13px] text-(--kt-muted)"
        >
          <span>
            <span className="text-(--kt-accent)">›</span> {project.name.toLowerCase()} handoff --agent
            claude-code
          </span>
          <span>
            ✓ context attached · terminal ready<span className="kt-caret text-(--kt-accent)"> ▍</span>
          </span>
        </div>
      )}

      <dl className="grid grid-cols-3 gap-4">
        {project.metrics.map(({ value, label }) => (
          <div key={label} className="flex flex-col-reverse">
            <dt className={`text-[13px] leading-tight ${sub}`}>{label}</dt>
            <dd className="text-[32px] font-extrabold tracking-[-0.03em]">{value}</dd>
          </div>
        ))}
      </dl>

      <details className="group">
        <summary
          className={`flex min-h-11 cursor-pointer list-none items-center gap-2 font-mono text-[13px] ${sub}`}
        >
          <span className="transition-transform group-open:rotate-90" aria-hidden="true">
            ›
          </span>
          {project.tech.join(" · ")}
        </summary>
        <ul className={`mt-2 flex flex-col gap-2 text-[15px] ${sub}`}>
          {project.bullets.map((b) => (
            <li key={b} className="flex gap-2.5">
              <span aria-hidden="true">→</span>
              <span>{b}</span>
            </li>
          ))}
        </ul>
      </details>

      <div className="mt-auto flex flex-wrap gap-2.5">
        <a
          href={project.site}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex min-h-11 items-center rounded-full px-5 text-[15px] ${
            featured ? "bg-(--kt-bg) text-(--kt-ink)" : `border ${pill}`
          }`}
        >
          {project.site.replace("https://", "")} ↗
        </a>
        <a
          href={project.repo}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex min-h-11 items-center rounded-full border px-5 text-[15px] transition-colors ${pill}`}
        >
          {project.repoLabel ?? labels.source} ↗
        </a>
      </div>
    </Reveal>
  );
}

// ── page ─────────────────────────────────────────────────────────────────────

export default function Page() {
  const { t, lang } = useLang();
  const k = t.kinetic;

  // "Motion off" is remembered per visitor. Starts on, so server and first client render match.
  const [calm, setCalm] = useState(false);
  useEffect(() => {
    try {
      if (window.localStorage.getItem(MOTION_KEY) === "off") setCalm(true);
    } catch {
      // storage unavailable — default to motion on
    }
  }, []);
  const toggleCalm = () => {
    const next = !calm;
    setCalm(next);
    try {
      window.localStorage.setItem(MOTION_KEY, next ? "off" : "on");
    } catch {
      // ignore — the toggle still works for this visit
    }
  };

  const [openJob, setOpenJob] = useState<number | null>(null);
  useReveal(lang);

  const resumeHref = lang === "de" ? "/resume/de/" : "/resume/";
  const marqueeTop = [...t.skills[0].items.slice(0, 3), ...t.skills[1].items.slice(0, 5), "Laravel", "Node.js"];
  const marqueeBottom = ["PostgreSQL", "Docker", "AWS", "Stripe", "Sentry", "Claude Code", "Codex", "Cursor"];
  const slotWords = [...k.buildWords, k.buildWords[0]];

  const container = "mx-auto max-w-[1240px] px-6";

  return (
    <MotionConfig reducedMotion={calm ? "always" : "user"}>
      <div className={`kt-root min-h-screen overflow-x-clip text-[17px] leading-normal ${calm ? "kt-calm" : ""}`}>
        <a href="#main" className="skip-link">
          Skip to content
        </a>

        {/* ── Header ─────────────────────────────────────────────── */}
        <header className={`${container} flex min-h-19 flex-wrap items-center justify-between gap-x-6 gap-y-2`}>
          <a href="#" className="inline-flex min-h-11 items-center gap-2.5 text-xl font-extrabold">
            <svg
              className="kt-spin"
              width="26"
              height="26"
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--kt-accent)"
              strokeWidth="2"
              aria-hidden="true"
            >
              <path d="M12 2v20M2 12h20M5 5l14 14M19 5 5 19" />
            </svg>
            {CONTACT.name}
          </a>
          <nav
            aria-label="Sections"
            className="flex flex-wrap items-center gap-x-6 gap-y-1 font-mono text-[13px] uppercase tracking-[0.06em]"
          >
            <a href="#projects" className="inline-flex min-h-11 items-center hover:text-(--kt-accent)">
              {t.nav.projects}
            </a>
            <a href="#experience" className="inline-flex min-h-11 items-center hover:text-(--kt-accent)">
              {k.careerTitle}
            </a>
            <a href="#contact" className="inline-flex min-h-11 items-center hover:text-(--kt-accent)">
              {k.letsTalk}
            </a>
            <LanguageToggle />
            <button
              type="button"
              onClick={toggleCalm}
              aria-pressed={calm}
              className="kt-pill min-h-11 cursor-pointer rounded-full border border-zinc-700 px-3.5 uppercase"
            >
              {calm ? k.motionOn : k.motionOff}
            </button>
          </nav>
        </header>

        <main id="main" tabIndex={-1} className="focus:outline-none">
          {/* ── Hero ─────────────────────────────────────────────── */}
          <section className={`${container} flex flex-col gap-8 pt-[clamp(48px,8vw,120px)] pb-16`}>
            <Reveal as="span" className="font-mono text-sm text-(--kt-accent)">
              ● {t.title} — {t.location}
            </Reveal>
            <Reveal as="h1"
              delay={0.1}
              className="text-[clamp(56px,10vw,152px)] font-extrabold leading-[1.1] tracking-[-0.045em]"
            >
              <span className="sr-only">
                {k.buildPrefix} {k.buildWords.join(", ")}
              </span>
              <span aria-hidden="true">
                {k.buildPrefix}
                <br />
                <span className="inline-block h-[1.1em] overflow-hidden align-bottom text-(--kt-accent)">
                  <span className="kt-slot">
                    {slotWords.map((w, i) => (
                      <span key={i} className="block h-[1.1em]">
                        {w}
                      </span>
                    ))}
                  </span>
                </span>
              </span>
            </Reveal>
            <Reveal
              delay={0.25}
              className="flex flex-wrap items-end justify-between gap-8"
            >
              <p className="max-w-[560px] text-[21px] text-(--kt-muted)">{t.hero.subtitle}</p>
              <div className="flex flex-wrap gap-3">
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="inline-flex min-h-13 items-center gap-2.5 rounded-full bg-(--kt-accent) px-6.5 font-semibold text-(--kt-bg)"
                >
                  {k.letsTalk} <ArrowRight size={18} aria-hidden="true" />
                </a>
                <a
                  href={t.cvFile}
                  download
                  className="kt-pill inline-flex min-h-13 items-center gap-2 rounded-full border border-(--kt-ink) px-6.5 font-semibold"
                >
                  <FileDown size={17} aria-hidden="true" /> {t.hero.downloadCV}
                </a>
              </div>
            </Reveal>
          </section>

          {/* ── Skill marquee (decorative; the full list is in #skills) ── */}
          <div
            aria-hidden="true"
            data-print-hide
            className="flex flex-col gap-2.5 overflow-hidden border-y border-(--kt-line) py-4.5"
          >
            <Marquee items={marqueeTop} />
            <Marquee items={marqueeBottom} reverse />
          </div>

          {/* ── Counters ─────────────────────────────────────────── */}
          <section
            aria-label="Highlights"
            className={`${container} grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-8 py-24`}
          >
            {k.counters.map((c, i) => (
              <Reveal
                key={i}
                delay={i * 0.08}
                className={`border-t-2 pt-5 ${i === 0 ? "border-(--kt-accent)" : "border-zinc-700"}`}
              >
                <div className="text-[88px] font-extrabold leading-none tracking-[-0.04em]">
                  <Counter value={c.value} calm={calm} />
                  {c.suffix}
                </div>
                <div className="mt-2 text-(--kt-muted)">{c.label}</div>
              </Reveal>
            ))}
          </section>

          {/* ── About ────────────────────────────────────────────── */}
          <section id="about" className={`${container} grid gap-10 pb-24 md:grid-cols-[1fr_300px] scroll-mt-6`}>
            <Reveal className="flex flex-col gap-6">
              <h2 className="font-mono text-[13px] uppercase tracking-[0.08em] text-(--kt-accent)">
                {t.sections.about}
              </h2>
              <p className="text-[clamp(22px,2.4vw,30px)] font-semibold leading-snug tracking-[-0.01em]">
                {t.about.summary}
              </p>
              <p className="text-lg text-(--kt-muted)">{t.about.story}</p>
            </Reveal>
            <Reveal as="aside"
              delay={0.1}
              className="flex flex-col gap-3 self-start rounded-3xl border border-(--kt-line) bg-(--kt-card) p-6"
            >
              <span className="inline-flex items-center gap-2 font-mono text-[13px] uppercase tracking-[0.08em] text-(--kt-accent)">
                <span className="h-2 w-2 rounded-full bg-(--kt-accent)" aria-hidden="true" />
                {t.now.label}
              </span>
              {t.now.items.map((item) => (
                <span key={item} className="font-medium">
                  → {item}
                </span>
              ))}
            </Reveal>
          </section>

          {/* ── Work ─────────────────────────────────────────────── */}
          <section id="projects" className={`${container} flex flex-col gap-7 pb-24 scroll-mt-6`}>
            <Reveal as="h2"
              className="text-[clamp(48px,7vw,104px)] font-extrabold leading-[0.95] tracking-[-0.045em]"
            >
              {k.workTitle[0]} <span className="text-(--kt-accent)">{k.workTitle[1]}</span>
            </Reveal>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(min(340px,100%),1fr))] gap-6">
              {t.projects.map((p, i) => (
                <ProjectCard key={p.name} project={p} featured={i % 2 === 1} labels={t.projectUI} />
              ))}
            </div>
          </section>

          {/* ── Career ───────────────────────────────────────────── */}
          <section id="experience" className="pb-24 scroll-mt-6">
            <Reveal as="h2"
              className={`${container} mb-7 text-[clamp(48px,7vw,104px)] font-extrabold leading-[0.95] tracking-[-0.045em]`}
            >
              {k.careerTitle}
            </Reveal>
            <ol className="border-t border-(--kt-line)">
              {t.experience.map((job, i) => {
                const open = openJob === i;
                return (
                  <li key={job.company} data-open={open} className="kt-row border-b border-(--kt-line)">
                    <button
                      type="button"
                      onClick={() => setOpenJob(open ? null : i)}
                      aria-expanded={open}
                      className={`${container} flex w-full cursor-pointer flex-wrap items-center gap-x-8 gap-y-2 py-7 text-left`}
                    >
                      <span className="flex-[0_0_190px] font-mono text-[13px]">{job.period}</span>
                      <span className="kt-co flex-[1_1_300px] text-[clamp(36px,5vw,64px)] font-extrabold leading-none tracking-[-0.04em]">
                        {job.company}
                      </span>
                      <span className="flex-[1_1_260px]">{job.role}</span>
                      <span
                        className="kt-arrow text-[32px]"
                        aria-hidden="true"
                        style={{ transform: open ? "rotate(90deg)" : undefined }}
                      >
                        →
                      </span>
                    </button>
                    <AnimatePresence initial={false}>
                      {open && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.35, ease }}
                          className="overflow-hidden"
                        >
                          <div className={`${container} flex flex-col gap-3 pb-8 md:pl-[246px]`}>
                            {job.desc && <p className="kt-dim max-w-3xl">{job.desc}</p>}
                            <ul className="flex max-w-3xl flex-col gap-2">
                              {job.bullets.map((b) => (
                                <li key={b} className="flex gap-2.5">
                                  <span aria-hidden="true">→</span>
                                  <span>{b}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </li>
                );
              })}
            </ol>
          </section>

          {/* ── Skills ───────────────────────────────────────────── */}
          <section id="skills" className={`${container} flex flex-col gap-8 pb-24 scroll-mt-6`}>
            <Reveal as="h2"
              className="font-mono text-[13px] uppercase tracking-[0.08em] text-(--kt-accent)"
            >
              {t.sections.skills}
            </Reveal>
            <dl className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-x-10 gap-y-8">
              {t.skills.map(({ category, items }, i) => (
                <Reveal
                  key={i}
                  delay={(i % 3) * 0.06}
                  className="flex flex-col gap-3 border-t border-(--kt-line) pt-4"
                >
                  <dt className="flex items-center gap-2 text-lg font-semibold">
                    {category}
                    {category === t.skillsUI.aiCategory && (
                      <span className="rounded-full bg-(--kt-accent) px-2 py-0.5 font-mono text-[11px] font-medium text-(--kt-bg)">
                        {t.skillsUI.dailyUse}
                      </span>
                    )}
                  </dt>
                  <dd className="flex flex-wrap gap-2">
                    {items.map((item) => (
                      <span
                        key={item}
                        className="kt-pill rounded-full border border-zinc-700 px-3 py-1 text-[15px]"
                      >
                        {item}
                      </span>
                    ))}
                  </dd>
                </Reveal>
              ))}
            </dl>
          </section>

          {/* ── Education & languages ────────────────────────────── */}
          <section
            id="education"
            className={`${container} grid gap-6 pb-24 md:grid-cols-2 scroll-mt-6`}
          >
            <Reveal className="flex flex-col gap-2 rounded-3xl border border-(--kt-line) p-7">
              <h2 className="font-mono text-[13px] uppercase tracking-[0.08em] text-(--kt-accent)">
                {t.education.label}
              </h2>
              <p className="text-2xl font-semibold tracking-[-0.01em]">{t.education.degree}</p>
              <p className="text-(--kt-muted)">
                {t.education.period} · {t.education.detail}
              </p>
            </Reveal>
            <Reveal
              delay={0.08}
              className="flex flex-col gap-3 rounded-3xl border border-(--kt-line) p-7"
            >
              <h2 className="font-mono text-[13px] uppercase tracking-[0.08em] text-(--kt-accent)">
                {t.languagesLabel}
              </h2>
              {t.languages.map(({ lang: name, level }) => (
                <div key={name} className="flex items-center justify-between gap-3 text-lg">
                  <span className="font-semibold">{name}</span>
                  <span className="font-mono text-sm text-(--kt-muted)">{level}</span>
                </div>
              ))}
              {t.languageNote && <p className="text-sm text-(--kt-muted)">{t.languageNote}</p>}
            </Reveal>
          </section>

          {/* ── Contact ──────────────────────────────────────────── */}
          <section id="contact" className="overflow-hidden bg-(--kt-accent) text-(--kt-bg)">
            <div className={`${container} flex flex-col gap-8 py-[clamp(56px,9vw,128px)]`}>
              <Reveal as="h2"
                className="text-[clamp(56px,11vw,168px)] font-extrabold leading-[0.85] tracking-[-0.055em]"
              >
                {k.contactTitle[0]}
                <br />
                {k.contactTitle[1]}
              </Reveal>
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="inline-flex min-h-14 items-center rounded-full bg-(--kt-bg) px-7 text-lg font-semibold text-(--kt-ink)"
                >
                  {CONTACT.email}
                </a>
                {[
                  { href: CONTACT.github, label: "GitHub" },
                  { href: CONTACT.linkedin, label: "LinkedIn" },
                ].map(({ href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-14 items-center rounded-full border-2 border-(--kt-bg) px-6 font-semibold transition-colors hover:bg-(--kt-bg) hover:text-(--kt-ink)"
                  >
                    {label}
                  </a>
                ))}
                <a
                  href={`tel:${CONTACT.phone.replace(/\s/g, "")}`}
                  className="inline-flex min-h-14 items-center rounded-full border-2 border-(--kt-bg) px-6 font-semibold transition-colors hover:bg-(--kt-bg) hover:text-(--kt-ink)"
                >
                  {CONTACT.phone}
                </a>
              </div>
            </div>
          </section>
        </main>

        {/* ── Footer ─────────────────────────────────────────────── */}
        <footer className="bg-(--kt-accent) text-(--kt-bg)">
          <div
            className={`${container} flex flex-wrap justify-between gap-2 border-t border-(--kt-bg)/20 py-6 font-mono text-[13px]`}
          >
            <span>
              {t.location} · {t.permit}
            </span>
            <a href={resumeHref} className="inline-flex items-center gap-1.5 underline underline-offset-4">
              <FileText size={14} aria-hidden="true" /> {t.footer.printVersion}
            </a>
          </div>
        </footer>
      </div>
    </MotionConfig>
  );
}
