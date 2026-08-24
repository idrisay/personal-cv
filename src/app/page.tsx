"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useInView,
  useReducedMotion,
} from "framer-motion";
import {
  Github,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  ChevronDown,
  Sparkles,
  Mic,
  ExternalLink,
  ArrowRight,
  FileDown,
  FileText,
} from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { LanguageToggle } from "./LanguageToggle";
import { useLang } from "@/lib/lang-context";
import { CONTACT, type Project } from "@/data/cv";

// ── animation ────────────────────────────────────────────────────────────────

const ease = [0.22, 0.61, 0.36, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease, delay },
  }),
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: (delay = 0) => ({
    opacity: 1,
    transition: { duration: 0.5, delay },
  }),
};

/** Shared viewport settings — one place to tune how eagerly things animate in. */
const inViewOnce = { once: true, margin: "-60px" } as const;

// ── primitives ───────────────────────────────────────────────────────────────

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-950";

function SectionHeading({ index, title }: { index: string; title: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, inViewOnce);
  return (
    <div ref={ref} className="flex items-center gap-3 mb-10 overflow-hidden">
      <motion.span
        initial={{ opacity: 0, x: -12 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.4, ease }}
        className="text-indigo-600 dark:text-indigo-400 font-mono text-sm font-medium"
        aria-hidden="true"
      >
        {index}.
      </motion.span>
      <motion.h2
        initial={{ opacity: 0, x: -12 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.4, delay: 0.07, ease }}
        className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-50 whitespace-nowrap"
      >
        {title}
      </motion.h2>
      <motion.div
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.12, ease }}
        style={{ originX: 0 }}
        className="flex-1 h-px bg-slate-200 dark:bg-slate-800"
      />
    </div>
  );
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-xs font-mono text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-900 px-3 py-1 rounded-full">
      {children}
    </span>
  );
}

const cardClass =
  "bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-2xl " +
  "hover:border-indigo-300 dark:hover:border-indigo-800/90 hover:shadow-[0_1px_24px_-8px_rgba(99,102,241,0.35)] " +
  "transition-colors duration-300";

/** Tag list that staggers in once, without the springy over-animation. */
function TagRow({ items }: { items: string[] }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={{ visible: { transition: { staggerChildren: 0.03 } } }}
      className="flex flex-wrap gap-2"
    >
      {items.map((item) => (
        <motion.span
          key={item}
          variants={{
            hidden: { opacity: 0, y: 6 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.28, ease } },
          }}
        >
          <Pill>{item}</Pill>
        </motion.span>
      ))}
    </motion.div>
  );
}

// ── project card ─────────────────────────────────────────────────────────────

function ProjectCard({
  project,
  labels,
  delay,
}: {
  project: Project;
  labels: { youSay: string; itWrites: string; visit: string; source: string };
  delay: number;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={inViewOnce}
      transition={{ duration: 0.55, delay, ease }}
      className={`group relative overflow-hidden p-6 sm:p-8 ${cardClass}`}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-950/70 border border-indigo-200 dark:border-indigo-900 shrink-0">
            <Mic size={18} className="text-indigo-600 dark:text-indigo-400" aria-hidden="true" />
          </span>
          <div>
            <h3 className="text-slate-900 dark:text-slate-50 font-semibold text-lg leading-tight">
              {project.name}
            </h3>
            <p className="text-indigo-600 dark:text-indigo-400 text-sm mt-0.5">{project.tagline}</p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {project.badges.map((b) => (
            <span
              key={b}
              className="text-[11px] font-medium text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-2.5 py-1 rounded-full whitespace-nowrap"
            >
              {b}
            </span>
          ))}
          <span className="text-slate-600 dark:text-slate-400 text-xs font-mono bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full">
            {project.period}
          </span>
        </div>
      </div>

      <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mt-5 max-w-2xl">
        {project.blurb}
      </p>

      {/* before → after */}
      <div className="mt-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950/70 overflow-hidden">
        <div className="grid sm:grid-cols-[1fr_auto_1fr] items-stretch">
          <div className="p-4">
            <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-slate-400 dark:text-slate-500 mb-2">
              {labels.youSay}
            </p>
            <p className="text-slate-500 dark:text-slate-400 text-[13px] leading-relaxed italic">
              &ldquo;{project.before}&rdquo;
            </p>
          </div>
          <div className="flex items-center justify-center px-4 py-2 sm:py-4 border-y sm:border-y-0 sm:border-x border-slate-200 dark:border-slate-800">
            <ArrowRight
              size={16}
              aria-hidden="true"
              className="text-indigo-500 dark:text-indigo-400 shrink-0 rotate-90 sm:rotate-0"
            />
          </div>
          <div className="p-4 bg-indigo-50/50 dark:bg-indigo-950/20">
            <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-indigo-500 dark:text-indigo-400 mb-2">
              {labels.itWrites}
            </p>
            <p className="text-slate-800 dark:text-slate-100 text-[13px] leading-relaxed font-medium">
              {project.after}
            </p>
          </div>
        </div>
      </div>

      <ul className="space-y-2 mt-6">
        {project.bullets.map((b, j) => (
          <li
            key={j}
            className="flex gap-2.5 text-slate-600 dark:text-slate-300 text-sm leading-relaxed"
          >
            <span className="text-indigo-500 dark:text-indigo-400 mt-0.5 shrink-0" aria-hidden="true">
              ▹
            </span>
            <span>{b}</span>
          </li>
        ))}
      </ul>

      <div className="flex items-center gap-8 mt-7 flex-wrap">
        {project.metrics.map(({ value, label }) => (
          <div key={label}>
            <div className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
              {value}
            </div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 whitespace-nowrap">
              {label}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6">
        <TagRow items={project.tech} />
      </div>

      <div className="flex flex-wrap items-center gap-3 mt-7">
        <a
          href={project.site}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 active:scale-[0.98] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors ${focusRing}`}
        >
          <ExternalLink size={14} aria-hidden="true" /> {labels.visit}
        </a>
        <a
          href={project.repo}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex items-center gap-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 active:scale-[0.98] text-slate-700 dark:text-slate-100 px-4 py-2 rounded-lg text-sm font-medium transition-colors border border-slate-200 dark:border-slate-700 ${focusRing}`}
        >
          <Github size={14} aria-hidden="true" /> {labels.source}
        </a>
      </div>
    </motion.article>
  );
}

// ── page ─────────────────────────────────────────────────────────────────────

const NAV_SECTIONS = ["about", "skills", "projects", "experience", "education"] as const;
type SectionId = (typeof NAV_SECTIONS)[number];

export default function Page() {
  const { t, lang } = useLang();
  const reduceMotion = useReducedMotion();

  // cursor spotlight (pointer devices only)
  const mouseX = useMotionValue(-600);
  const mouseY = useMotionValue(-600);
  const spotlight = useMotionTemplate`radial-gradient(520px at ${mouseX}px ${mouseY}px, rgba(99,102,241,0.07), transparent 80%)`;

  // active nav section
  const [activeSection, setActiveSection] = useState<SectionId | "">("");
  useEffect(() => {
    const observers = NAV_SECTIONS.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const ob = new IntersectionObserver(
        ([e]) => {
          if (e.isIntersecting) setActiveSection(id);
        },
        { rootMargin: "-40% 0px -55% 0px" }
      );
      ob.observe(el);
      return ob;
    });
    return () => observers.forEach((o) => o?.disconnect());
  }, []);

  const navItems: { id: SectionId; label: string }[] = [
    { id: "about", label: t.nav.about },
    { id: "skills", label: t.nav.skills },
    { id: "projects", label: t.nav.projects },
    { id: "experience", label: t.nav.experience },
    { id: "education", label: t.nav.education },
  ];

  const resumeHref = lang === "de" ? "/resume/de/" : "/resume/";

  return (
    <div
      className="motion-page min-h-screen bg-white dark:bg-slate-950 bg-grid"
      onMouseMove={(e) => {
        mouseX.set(e.clientX);
        mouseY.set(e.clientY);
      }}
    >
      <a href="#main" className="skip-link">
        Skip to content
      </a>

      {/* cursor spotlight */}
      {!reduceMotion && (
        <motion.div
          data-print-hide
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-30 hidden lg:block"
          style={{ background: spotlight }}
        />
      )}

      {/* ── Nav ─────────────────────────────────────────────────────── */}
      <header className="fixed inset-x-0 top-0 z-50 backdrop-blur-lg bg-white/85 dark:bg-slate-950/85 border-b border-slate-200/70 dark:border-slate-800/70">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between gap-4">
          <motion.a
            href="#"
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease }}
            aria-label={CONTACT.name}
            className={`text-indigo-600 dark:text-indigo-400 font-mono font-bold text-lg tracking-tight rounded ${focusRing}`}
          >
            {CONTACT.initials}
          </motion.a>

          <nav aria-label="Sections" className="hidden md:flex items-center gap-7 text-sm">
            {navItems.map(({ id, label }, i) => (
              <motion.a
                key={id}
                href={`#${id}`}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.06 * i + 0.15, duration: 0.4, ease }}
                aria-current={activeSection === id ? "true" : undefined}
                className={[
                  "transition-colors rounded",
                  focusRing,
                  activeSection === id
                    ? "text-indigo-600 dark:text-indigo-400"
                    : "text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400",
                ].join(" ")}
              >
                <span className="text-indigo-500 dark:text-indigo-400 font-mono mr-1" aria-hidden="true">
                  0{i + 1}.
                </span>
                {label}
              </motion.a>
            ))}
          </nav>

          <motion.div
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease }}
            className="flex items-center gap-2"
          >
            <LanguageToggle />
            <ThemeToggle />
            <a
              href={t.cvFile}
              download
              className={`hidden sm:inline-flex items-center gap-1.5 text-sm text-slate-600 dark:text-slate-200 border border-slate-300 dark:border-slate-700 hover:border-indigo-500 dark:hover:border-indigo-400 hover:text-indigo-600 dark:hover:text-indigo-400 px-4 py-1.5 rounded-lg transition-colors ${focusRing}`}
            >
              <FileDown size={14} aria-hidden="true" /> CV
            </a>
            <a
              href={`mailto:${CONTACT.email}`}
              className={`text-sm text-indigo-600 dark:text-indigo-400 border border-indigo-400/60 dark:border-indigo-500/60 hover:border-indigo-600 dark:hover:border-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 px-4 py-1.5 rounded-lg transition-colors whitespace-nowrap ${focusRing}`}
            >
              {t.hero.contact}
            </a>
          </motion.div>
        </div>
      </header>

      {/* ── Hero ────────────────────────────────────────────────────── */}
      <section className="relative min-h-dvh flex flex-col items-center justify-center text-center px-6 pt-16 overflow-hidden print-tight">
        {!reduceMotion && (
          <>
            <motion.div
              data-print-hide
              aria-hidden="true"
              animate={{ scale: [1, 1.12, 1], opacity: [0.1, 0.16, 0.1] }}
              transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-indigo-400/20 dark:bg-indigo-600/15 rounded-full blur-[120px] pointer-events-none"
            />
            <motion.div
              data-print-hide
              aria-hidden="true"
              animate={{ scale: [1, 0.9, 1], opacity: [0.08, 0.14, 0.08] }}
              transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 3 }}
              className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-violet-400/20 dark:bg-violet-600/15 rounded-full blur-[100px] pointer-events-none"
            />
          </>
        )}

        <div className="relative z-10 max-w-3xl w-full">
          <motion.p
            custom={0}
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            className="text-indigo-600 dark:text-indigo-400 font-mono text-xs sm:text-sm tracking-[0.22em] uppercase mb-4"
          >
            {t.hero.greeting}
          </motion.p>

          <motion.h1
            custom={0.08}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="text-[clamp(2.75rem,11vw,7rem)] font-bold leading-[0.92] tracking-[-0.03em] mb-3"
          >
            <span className="bg-gradient-to-br from-slate-900 via-slate-700 to-indigo-600 dark:from-white dark:via-slate-200 dark:to-indigo-300 bg-clip-text text-transparent">
              {CONTACT.name}.
            </span>
          </motion.h1>

          <motion.p
            custom={0.2}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="text-[clamp(1.3rem,4.2vw,2.5rem)] font-bold text-slate-400 dark:text-slate-500 mb-5 leading-[1.1] tracking-[-0.02em]"
          >
            {t.hero.tagline}
          </motion.p>

          <motion.p
            custom={0.3}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="text-slate-600 dark:text-slate-300 text-base sm:text-lg max-w-xl mx-auto mb-9 leading-relaxed text-balance"
          >
            {t.hero.subtitle}
          </motion.p>

          <motion.div
            custom={0.4}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="flex items-center justify-center gap-3 flex-wrap"
          >
            <a
              href={`mailto:${CONTACT.email}`}
              className={`inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 active:scale-[0.98] text-white px-6 py-3 rounded-xl text-sm font-medium transition-colors shadow-lg shadow-indigo-500/20 dark:shadow-indigo-950/50 ${focusRing}`}
            >
              <Mail size={15} aria-hidden="true" /> {t.hero.contact}
            </a>
            <a
              href={CONTACT.github}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 active:scale-[0.98] text-slate-700 dark:text-slate-100 px-6 py-3 rounded-xl text-sm font-medium transition-colors border border-slate-200 dark:border-slate-700 ${focusRing}`}
            >
              <Github size={15} aria-hidden="true" /> GitHub
            </a>
            <a
              href={CONTACT.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 active:scale-[0.98] text-slate-700 dark:text-slate-100 px-6 py-3 rounded-xl text-sm font-medium transition-colors border border-slate-200 dark:border-slate-700 ${focusRing}`}
            >
              <Linkedin size={15} aria-hidden="true" /> LinkedIn
            </a>
            <a
              href={t.cvFile}
              download
              className={`inline-flex items-center gap-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 active:scale-[0.98] text-slate-700 dark:text-slate-100 px-6 py-3 rounded-xl text-sm font-medium transition-colors border border-slate-200 dark:border-slate-700 ${focusRing}`}
            >
              <FileDown size={15} aria-hidden="true" /> {t.hero.downloadCV}
            </a>
          </motion.div>

          <motion.dl
            custom={0.5}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="mt-12 flex items-center justify-center gap-10 flex-wrap"
          >
            {/* DOM order is dt → dd (spec); flex-col-reverse keeps the value on top. */}
            {t.stats.map(({ value, label }) => (
              <div key={label} className="text-center flex flex-col-reverse">
                <dt className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 whitespace-nowrap">
                  {label}
                </dt>
                <dd className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
                  {value}
                </dd>
              </div>
            ))}
          </motion.dl>
        </div>

        <motion.div
          custom={0.75}
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-500 dark:text-slate-400 text-xs print-static"
        >
          <div className="flex items-center gap-1.5">
            <MapPin size={12} aria-hidden="true" />
            <span>
              {t.location} · {t.permit}
            </span>
          </div>
          <motion.div
            animate={reduceMotion ? undefined : { y: [0, 5, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            aria-hidden="true"
            className="print-hide"
          >
            <ChevronDown size={16} className="mt-1" />
          </motion.div>
        </motion.div>
      </section>

      {/* ── Main ────────────────────────────────────────────────────── */}
      <main id="main" tabIndex={-1} className="max-w-5xl mx-auto px-6 pb-24 focus:outline-none">
        {/* About */}
        <section id="about" className="py-20 sm:py-24 scroll-mt-20">
          <SectionHeading index="01" title={t.sections.about} />
          <div className="grid md:grid-cols-[1fr_240px] gap-10 md:gap-12 items-start">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={inViewOnce}
              transition={{ duration: 0.55, ease }}
              className="flex flex-col gap-5"
            >
              <p className="text-slate-700 dark:text-slate-300 text-base sm:text-lg leading-relaxed">
                {t.about.summary}
              </p>
              <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
                {t.about.story}
              </p>

              {/* “Now” strip — delete this block if it goes stale */}
              <div className="mt-1 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 px-4 py-3 flex flex-wrap items-center gap-x-3 gap-y-1.5">
                <span className="inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-[0.18em] text-indigo-600 dark:text-indigo-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" aria-hidden="true" />
                  {t.now.label}
                </span>
                {t.now.items.map((item, i) => (
                  <span
                    key={item}
                    className="text-xs sm:text-[13px] text-slate-600 dark:text-slate-300"
                  >
                    {i > 0 && (
                      <span className="text-slate-300 dark:text-slate-700 mr-3" aria-hidden="true">
                        ·
                      </span>
                    )}
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>

            <motion.address
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={inViewOnce}
              transition={{ duration: 0.55, delay: 0.08, ease }}
              className="not-italic flex flex-col gap-3 text-sm text-slate-600 dark:text-slate-300"
            >
              {[
                { icon: Mail, label: CONTACT.email, href: `mailto:${CONTACT.email}` },
                { icon: Phone, label: CONTACT.phone, href: `tel:${CONTACT.phone.replace(/\s/g, "")}` },
                { icon: Github, label: CONTACT.githubLabel, href: CONTACT.github },
                { icon: Linkedin, label: CONTACT.linkedinLabel, href: CONTACT.linkedin },
              ].map(({ icon: Icon, label, href }) => {
                const external = href.startsWith("http");
                return (
                  <a
                    key={label}
                    href={href}
                    target={external ? "_blank" : undefined}
                    rel={external ? "noopener noreferrer" : undefined}
                    className={`flex items-center gap-2.5 rounded hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors ${focusRing}`}
                  >
                    <Icon
                      size={14}
                      aria-hidden="true"
                      className="text-indigo-500 dark:text-indigo-400 shrink-0"
                    />
                    {label}
                  </a>
                );
              })}
            </motion.address>
          </div>
        </section>

        {/* Skills */}
        <section
          id="skills"
          className="py-20 sm:py-24 border-t border-slate-200 dark:border-slate-800/70 scroll-mt-20"
        >
          <SectionHeading index="02" title={t.sections.skills} />
          <div className="flex flex-col gap-6">
            {t.skills.map(({ category, items }, rowIdx) => {
              const isAI = category === t.skillsUI.aiCategory;
              return (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.45, delay: rowIdx * 0.05, ease }}
                  className={
                    isAI
                      ? "rounded-2xl border border-indigo-200 dark:border-indigo-900 bg-indigo-50/60 dark:bg-indigo-950/30 px-5 py-4 flex flex-col gap-3"
                      : "grid md:grid-cols-[150px_1fr] gap-3 items-start"
                  }
                >
                  {isAI ? (
                    <div className="flex items-center gap-2">
                      <Sparkles
                        size={14}
                        aria-hidden="true"
                        className="text-indigo-500 dark:text-indigo-400 shrink-0"
                      />
                      <h3 className="text-indigo-700 dark:text-indigo-300 text-sm font-semibold">
                        {category}
                      </h3>
                      <span className="ml-auto text-[10px] font-semibold tracking-wide uppercase text-indigo-600 dark:text-indigo-300 bg-indigo-100 dark:bg-indigo-900/60 border border-indigo-200 dark:border-indigo-800 px-2 py-0.5 rounded-full">
                        {t.skillsUI.dailyUse}
                      </span>
                    </div>
                  ) : (
                    <h3 className="text-slate-500 dark:text-slate-400 text-sm font-medium pt-0.5">
                      {category}
                    </h3>
                  )}
                  <TagRow items={items} />
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* Projects */}
        <section
          id="projects"
          className="py-20 sm:py-24 border-t border-slate-200 dark:border-slate-800/70 scroll-mt-20"
        >
          <SectionHeading index="03" title={t.sections.projects} />
          <div className="flex flex-col gap-6">
            {t.projects.map((p, i) => (
              <ProjectCard key={p.name} project={p} labels={t.projectUI} delay={i * 0.08} />
            ))}
          </div>
        </section>

        {/* Experience */}
        <section
          id="experience"
          className="py-20 sm:py-24 border-t border-slate-200 dark:border-slate-800/70 scroll-mt-20"
        >
          <SectionHeading index="04" title={t.sections.experience} />
          <div className="relative">
            {/* timeline rail */}
            <div
              aria-hidden="true"
              className="hidden md:block absolute left-[3px] top-6 bottom-6 w-px bg-linear-to-b from-indigo-400/70 via-slate-300 to-transparent dark:from-indigo-600/70 dark:via-slate-800"
            />
            <ol className="flex flex-col gap-6 md:gap-8 md:pl-8">
            {t.experience.map((job, i) => (
              <motion.li
                key={job.company}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: Math.min(i, 3) * 0.05, ease }}
                className="relative"
              >
                <motion.span
                  aria-hidden="true"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: 0.12 + Math.min(i, 3) * 0.05, ease }}
                  className="absolute -left-[36px] top-6 w-2 h-2 rounded-full bg-indigo-500 ring-4 ring-white dark:ring-slate-950 hidden md:block"
                />
                <div className={`p-5 sm:p-6 ${cardClass}`}>
                  <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                    <div>
                      <h3 className="text-slate-900 dark:text-slate-50 font-semibold text-base">
                        {job.company}
                      </h3>
                      <p className="text-indigo-600 dark:text-indigo-400 text-sm mt-0.5">
                        {job.role}
                      </p>
                    </div>
                    <span className="text-slate-600 dark:text-slate-400 text-xs font-mono bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full whitespace-nowrap">
                      {job.period}
                    </span>
                  </div>
                  {job.desc && (
                    <p className="text-slate-600 dark:text-slate-300 text-sm mb-4 leading-relaxed">
                      {job.desc}
                    </p>
                  )}
                  <ul className="space-y-2">
                    {job.bullets.map((b, j) => (
                      <li
                        key={j}
                        className="flex gap-2.5 text-slate-600 dark:text-slate-300 text-sm leading-relaxed"
                      >
                        <span
                          className="text-indigo-500 dark:text-indigo-400 mt-0.5 shrink-0"
                          aria-hidden="true"
                        >
                          ▹
                        </span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.li>
              ))}
            </ol>
          </div>
        </section>

        {/* Education + Languages */}
        <section
          id="education"
          className="py-20 sm:py-24 border-t border-slate-200 dark:border-slate-800/70 scroll-mt-20"
        >
          <SectionHeading index="05" title={t.sections.education} />
          <div className="grid md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, ease }}
              className={`p-6 ${cardClass}`}
            >
              <p className="text-slate-500 dark:text-slate-400 text-xs font-mono uppercase tracking-[0.18em] mb-3">
                {t.education.label}
              </p>
              <h3 className="text-slate-900 dark:text-slate-50 font-semibold text-base mb-1">
                {t.education.degree}
              </h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm mb-2">{t.education.period}</p>
              <p className="text-indigo-600 dark:text-indigo-400 text-sm">{t.education.detail}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: 0.08, ease }}
              className={`p-6 ${cardClass}`}
            >
              <p className="text-slate-500 dark:text-slate-400 text-xs font-mono uppercase tracking-[0.18em] mb-3">
                {t.languagesLabel}
              </p>
              <div className="flex flex-col gap-3">
                {t.languages.map(({ lang: name, level }) => (
                  <div key={name} className="flex items-center justify-between gap-3">
                    <span className="text-slate-800 dark:text-slate-100 text-sm font-medium">
                      {name}
                    </span>
                    <Pill>{level}</Pill>
                  </div>
                ))}
              </div>
              {t.languageNote && (
                <p className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400">
                  {t.languageNote}
                </p>
              )}
            </motion.div>
          </div>
        </section>
      </main>

      {/* ── Footer ──────────────────────────────────────────────────── */}
      <footer className="border-t border-slate-200 dark:border-slate-800/70 py-8">
        <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-500 dark:text-slate-400">
          <span>{t.footer.built}</span>
          <div className="flex flex-wrap items-center justify-center gap-5">
            <a
              href={resumeHref}
              className={`hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors flex items-center gap-1.5 rounded ${focusRing}`}
            >
              <FileText size={14} aria-hidden="true" /> {t.footer.printVersion}
            </a>
            {[
              { href: CONTACT.github, icon: Github, label: "GitHub" },
              { href: CONTACT.linkedin, icon: Linkedin, label: "LinkedIn" },
              { href: `mailto:${CONTACT.email}`, icon: Mail, label: "Email" },
            ].map(({ href, icon: Icon, label }) => {
              const external = href.startsWith("http");
              return (
                <a
                  key={label}
                  href={href}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noopener noreferrer" : undefined}
                  className={`hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors flex items-center gap-1.5 rounded ${focusRing}`}
                >
                  <Icon size={14} aria-hidden="true" /> {label}
                </a>
              );
            })}
          </div>
        </div>
      </footer>
    </div>
  );
}
