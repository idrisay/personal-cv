"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useInView,
  useScroll,
  useTransform,
} from "framer-motion";
import { Github, Linkedin, Mail, MapPin, Phone, ChevronDown, Sparkles } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

// ── data ──────────────────────────────────────────────────────────────────────

const CV = {
  email: "idrisaydev@gmail.com",
  github: "https://github.com/idrisay",
  linkedin: "https://linkedin.com/in/idris-ay",
  phone: "+41 77 257 21 36",
  location: "Zurich, Switzerland",
  permit: "Swiss B Permit",
  summary:
    "Software engineer with 6+ years of experience building production web applications across the full stack. Strong in React, TypeScript, and modern frontend tooling, with solid backend depth in PHP/Laravel and Node.js. Currently shipping core features of an e-learning platform at Evulpo as part of a 30-person team. Previously led a frontend team on an EU-funded project and taught full-stack development to bootcamp cohorts. Comfortable owning features end to end — from design hand-off through deployment and monitoring.",
  stats: [
    { value: "6+", label: "Years experience" },
    { value: "5", label: "Positions held" },
    { value: "3", label: "Languages spoken" },
  ],
  skills: [
    { category: "Languages", items: ["TypeScript", "JavaScript", "PHP", "Python", "HTML5", "CSS3", "SASS"] },
    { category: "Frontend", items: ["React", "Next.js", "React Native", "Tailwind CSS", "Material-UI", "Storybook"] },
    { category: "Backend", items: ["Laravel", "Livewire", "Node.js", "Django", "Flask", "REST APIs"] },
    { category: "Databases", items: ["PostgreSQL", "MySQL", "MongoDB", "SQLite"] },
    { category: "DevOps & Tools", items: ["Docker", "Jenkins", "AWS", "Git", "Sentry", "Stripe", "Firebase", "Postman"] },
    { category: "AI Tooling", items: ["GitHub Copilot", "Cursor", "Claude", "ChatGPT"] },
    { category: "Methodologies", items: ["Agile", "Scrum", "Kanban"] },
  ],
  experience: [
    {
      company: "Evulpo",
      role: "Full-Stack Software Engineer",
      period: "Mar 2022 – Present",
      desc: "Building features for an e-learning platform as part of a team of 30+ (10+ engineers), working across the stack with PHP, Laravel, Livewire, and Tailwind CSS.",
      bullets: [
        "Develop backend services and frontend features for core learning, content delivery, and account flows.",
        "Integrated Stripe to power subscription billing and recurring payments for the platform.",
        "Built an automated content-translation pipeline using DeepL's neural translation API to localise learning content across multiple languages.",
        "Designed and shipped REST API endpoints consumed by mobile app and partner integrations.",
        "Leveraged AI tools (Cursor, Claude, GitHub Copilot) daily to accelerate feature integration and deliver more robust solutions at a faster pace.",
      ],
    },
    {
      company: "Inveon",
      role: "Frontend Engineer",
      period: "Jun 2021 – Mar 2022",
      desc: "Built React and Next.js features for e-commerce platforms serving major brands including Columbia Sportswear and KOM.",
      bullets: [
        "Developed production frontend in TypeScript with Material-UI, focused on reusable, type-safe components.",
        "Authored a shared component library documented in Storybook and published to npm for reuse across client projects.",
        "Researched error-tracking options and led the integration of Sentry.io, improving production observability and bug triage.",
        "Worked within Jenkins CI/CD, Jira, and GitHub workflows alongside cross-functional teams.",
      ],
    },
    {
      company: "Nioya Tech",
      role: "Frontend Team Lead · React Developer",
      period: "Oct 2020 – Jun 2021",
      desc: "Led the frontend on an EU-funded project, coordinating delivery and code quality across the team.",
      bullets: [
        "Led the frontend team using GitLab and ClickUp for code review, planning, and delivery.",
        "Translated Figma designs into production-ready, responsive React components.",
      ],
    },
    {
      company: "Clarusway",
      role: "Full-Stack Instructor",
      period: "Jan 2020 – Jun 2021",
      desc: "Designed and delivered the full-stack curriculum for an intensive developer bootcamp.",
      bullets: [
        "Taught HTML, CSS, JavaScript, React, Vue, and Node.js to multiple cohorts.",
        "Built reference projects using Material-UI, Bootstrap, Chart.js, Firebase, and third-party APIs to anchor each module.",
        "Analysed market demand to shape course content toward employability, and ran workshops on frontend topics.",
      ],
    },
    {
      company: "Freelance",
      role: "Web Developer",
      period: "Dec 2019 – Oct 2020",
      desc: "",
      bullets: ["Built e-commerce tooling for product tracking and operational efficiency."],
    },
  ],
  education: {
    degree: "B.Sc. Electrical and Electronics Engineering",
    period: "Sep 2011 – Jun 2015",
    detail: "Graduated 2nd in class · 3.67 / 4.0 GPA",
  },
  languages: [
    { lang: "Turkish", level: "Native" },
    { lang: "English", level: "C1" },
    { lang: "German", level: "A2" },
  ],
};

// ── animation variants ────────────────────────────────────────────────────────

const ease = [0.25, 0.1, 0.25, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease, delay },
  }),
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: (delay = 0) => ({
    opacity: 1,
    transition: { duration: 0.5, delay },
  }),
};

// ── components ────────────────────────────────────────────────────────────────

function SectionHeading({ index, title }: { index: string; title: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <div ref={ref} className="flex items-center gap-3 mb-10 overflow-hidden">
      <motion.span
        initial={{ opacity: 0, x: -12 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.4, ease }}
        className="text-indigo-500 dark:text-indigo-400 font-mono text-sm font-medium"
      >
        {index}.
      </motion.span>
      <motion.h2
        initial={{ opacity: 0, x: -12 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.4, delay: 0.07, ease }}
        className="text-xl font-bold text-slate-900 dark:text-slate-100 whitespace-nowrap"
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
    <span className="text-xs font-mono text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-900/80 px-3 py-1 rounded-full">
      {children}
    </span>
  );
}

// ── page ──────────────────────────────────────────────────────────────────────

const NAV_SECTIONS = ["about", "skills", "experience", "education"] as const;

export default function Page() {
  // cursor spotlight
  const mouseX = useMotionValue(-600);
  const mouseY = useMotionValue(-600);
  const spotlight = useMotionTemplate`radial-gradient(520px at ${mouseX}px ${mouseY}px, rgba(99,102,241,0.07), transparent 80%)`;

  // active nav section
  const [activeSection, setActiveSection] = useState("");
  useEffect(() => {
    const observers = NAV_SECTIONS.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const ob = new IntersectionObserver(
        ([e]) => { if (e.isIntersecting) setActiveSection(id); },
        { rootMargin: "-40% 0px -55% 0px" }
      );
      ob.observe(el);
      return ob;
    });
    return () => observers.forEach((o) => o?.disconnect());
  }, []);

  // nav background on scroll
  const { scrollY } = useScroll();
  const navBg = useTransform(scrollY, [0, 80], [0, 1]);

  return (
    <div
      className="min-h-screen bg-white dark:bg-slate-950 bg-grid"
      onMouseMove={(e) => { mouseX.set(e.clientX); mouseY.set(e.clientY); }}
    >
      {/* cursor spotlight */}
      <motion.div
        className="pointer-events-none fixed inset-0 z-30 hidden lg:block"
        style={{ background: spotlight }}
      />

      {/* ── Nav ───────────────────────────────────────────────────────── */}
      <motion.header
        style={{ "--nav-alpha": navBg } as React.CSSProperties}
        className="fixed inset-x-0 top-0 z-50 backdrop-blur-lg bg-white/80 dark:bg-slate-950/80 border-b border-slate-200/70 dark:border-slate-800/60"
      >
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <motion.span
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease }}
            className="text-indigo-600 dark:text-indigo-400 font-mono font-bold text-lg tracking-tight"
          >
            IA
          </motion.span>

          <nav className="hidden md:flex items-center gap-7 text-sm">
            {NAV_SECTIONS.map((s, i) => (
              <motion.a
                key={s}
                href={`#${s}`}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 * i + 0.2, duration: 0.4, ease }}
                className={[
                  "capitalize transition-colors",
                  activeSection === s
                    ? "text-indigo-600 dark:text-indigo-400"
                    : "text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400",
                ].join(" ")}
              >
                <span className="text-indigo-500 font-mono mr-1">0{i + 1}.</span>{s}
              </motion.a>
            ))}
          </nav>

          <motion.div
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease }}
            className="flex items-center gap-2"
          >
            <ThemeToggle />
            <a
              href={`mailto:${CV.email}`}
              className="text-sm text-indigo-600 dark:text-indigo-400 border border-indigo-400/50 dark:border-indigo-500/50 hover:border-indigo-600 dark:hover:border-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 px-4 py-1.5 rounded-lg transition-all"
            >
              Hire Me
            </a>
          </motion.div>
        </div>
      </motion.header>

      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <section className="relative min-h-dvh flex flex-col items-center justify-center text-center px-6 pt-16 overflow-hidden">
        {/* animated blobs */}
        <motion.div
          animate={{ scale: [1, 1.12, 1], opacity: [0.1, 0.16, 0.1] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-indigo-400/20 dark:bg-indigo-600/15 rounded-full blur-[120px] pointer-events-none"
        />
        <motion.div
          animate={{ scale: [1, 0.9, 1], opacity: [0.08, 0.14, 0.08] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 3 }}
          className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-violet-400/20 dark:bg-violet-600/15 rounded-full blur-[100px] pointer-events-none"
        />

        <div className="relative z-10 max-w-4xl w-full">
          <motion.p
            custom={0}
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            className="text-indigo-500 dark:text-indigo-400 font-mono text-sm tracking-[0.2em] uppercase mb-5"
          >
            Hi, my name is
          </motion.p>

          <motion.h1
            custom={0.1}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="text-[clamp(3rem,12vw,8rem)] font-bold leading-none tracking-tight mb-4"
          >
            <span className="bg-gradient-to-br from-slate-900 via-slate-700 to-indigo-600 dark:from-white dark:via-slate-200 dark:to-indigo-300 bg-clip-text text-transparent">
              Idris Ay.
            </span>
          </motion.h1>

          <motion.h2
            custom={0.25}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="text-[clamp(1.4rem,4.5vw,3rem)] font-bold text-slate-400 dark:text-slate-500 mb-6 leading-tight"
          >
            I build things for the web.
          </motion.h2>

          <motion.p
            custom={0.38}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="text-slate-600 dark:text-slate-400 text-lg max-w-xl mx-auto mb-10 leading-relaxed"
          >
            Full-stack engineer based in Zurich — specialising in React, TypeScript, and modern web tooling.
          </motion.p>

          <motion.div
            custom={0.5}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="flex items-center justify-center gap-3 flex-wrap"
          >
            <a
              href={`mailto:${CV.email}`}
              className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 active:scale-95 text-white px-6 py-3 rounded-xl text-sm font-medium transition-all shadow-lg shadow-indigo-500/20 dark:shadow-indigo-950/50"
            >
              <Mail size={15} /> Get In Touch
            </a>
            <a
              href={CV.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 active:scale-95 text-slate-700 dark:text-slate-200 px-6 py-3 rounded-xl text-sm font-medium transition-all border border-slate-200 dark:border-slate-700"
            >
              <Github size={15} /> GitHub
            </a>
            <a
              href={CV.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 active:scale-95 text-slate-700 dark:text-slate-200 px-6 py-3 rounded-xl text-sm font-medium transition-all border border-slate-200 dark:border-slate-700"
            >
              <Linkedin size={15} /> LinkedIn
            </a>
          </motion.div>

          {/* stats */}
          <motion.div
            custom={0.65}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="mt-14 flex items-center justify-center gap-10 flex-wrap"
          >
            {CV.stats.map(({ value, label }) => (
              <div key={label} className="text-center">
                <div className="text-3xl font-bold text-slate-900 dark:text-slate-100">{value}</div>
                <div className="text-xs text-slate-500 dark:text-slate-500 mt-0.5 whitespace-nowrap">{label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          custom={0.9}
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-400 dark:text-slate-600 text-xs"
        >
          <div className="flex items-center gap-1.5">
            <MapPin size={12} />
            <span>{CV.location} · {CV.permit}</span>
          </div>
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown size={16} className="mt-1" />
          </motion.div>
        </motion.div>
      </section>

      {/* ── Main ──────────────────────────────────────────────────────── */}
      <main className="max-w-5xl mx-auto px-6 pb-24">

        {/* About */}
        <section id="about" className="py-20">
          <SectionHeading index="01" title="About" />
          <div className="grid md:grid-cols-[1fr_260px] gap-10 items-start">
            <motion.p
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, ease }}
              className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed"
            >
              {CV.summary}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: 0.1, ease }}
              className="flex flex-col gap-3 text-sm text-slate-600 dark:text-slate-400"
            >
              {[
                { icon: Mail, label: CV.email, href: `mailto:${CV.email}` },
                { icon: Phone, label: CV.phone, href: `tel:${CV.phone}` },
                { icon: Github, label: "github.com/idrisay", href: CV.github },
                { icon: Linkedin, label: "linkedin.com/in/idris-ay", href: CV.linkedin },
              ].map(({ icon: Icon, label, href }) => (
                <a key={label} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer"
                  className="flex items-center gap-2.5 hover:text-slate-900 dark:hover:text-slate-200 transition-colors group"
                >
                  <Icon size={14} className="text-indigo-500 dark:text-indigo-400 shrink-0 group-hover:scale-110 transition-transform" />
                  {label}
                </a>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Skills */}
        <section id="skills" className="py-20 border-t border-slate-200 dark:border-slate-800/60">
          <SectionHeading index="02" title="Skills" />
          <div className="flex flex-col gap-6">
            {CV.skills.map(({ category, items }, rowIdx) => {
              const isAI = category === "AI Tooling";
              return isAI ? (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, delay: rowIdx * 0.06, ease }}
                  className="rounded-2xl border border-indigo-200 dark:border-indigo-900/60 bg-indigo-50/60 dark:bg-indigo-950/30 px-5 py-4 flex flex-col gap-3"
                >
                  <div className="flex items-center gap-2">
                    <Sparkles size={14} className="text-indigo-500 dark:text-indigo-400 shrink-0" />
                    <span className="text-indigo-700 dark:text-indigo-300 text-sm font-semibold">{category}</span>
                    <span className="ml-auto text-[10px] font-semibold tracking-wide uppercase text-indigo-500 dark:text-indigo-400 bg-indigo-100 dark:bg-indigo-900/60 border border-indigo-200 dark:border-indigo-800 px-2 py-0.5 rounded-full">
                      Daily use
                    </span>
                  </div>
                  <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={{ visible: { transition: { staggerChildren: 0.045 } } }}
                    className="flex flex-wrap gap-2"
                  >
                    {items.map((item) => (
                      <motion.span
                        key={item}
                        variants={{
                          hidden: { opacity: 0, scale: 0.75 },
                          visible: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 280, damping: 18 } },
                        }}
                      >
                        <Pill>{item}</Pill>
                      </motion.span>
                    ))}
                  </motion.div>
                </motion.div>
              ) : (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, delay: rowIdx * 0.06, ease }}
                  className="grid md:grid-cols-[140px_1fr] gap-3 items-start"
                >
                  <span className="text-slate-500 text-sm font-medium pt-0.5">{category}</span>
                  <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={{ visible: { transition: { staggerChildren: 0.045 } } }}
                    className="flex flex-wrap gap-2"
                  >
                    {items.map((item) => (
                      <motion.span
                        key={item}
                        variants={{
                          hidden: { opacity: 0, scale: 0.75 },
                          visible: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 280, damping: 18 } },
                        }}
                      >
                        <Pill>{item}</Pill>
                      </motion.span>
                    ))}
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* Experience */}
        <section id="experience" className="py-20 border-t border-slate-200 dark:border-slate-800/60">
          <SectionHeading index="03" title="Experience" />
          <div className="relative">
            <div className="absolute left-0 top-2 bottom-0 w-px bg-slate-200 dark:bg-slate-800 hidden md:block" />
            <div className="flex flex-col gap-8">
              {CV.experience.map((job, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -28 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.55, delay: i * 0.06, ease }}
                  className="relative md:pl-10"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 400, damping: 18, delay: 0.15 + i * 0.06 }}
                    className="absolute left-[-5px] top-2.5 w-2.5 h-2.5 rounded-full bg-indigo-500 ring-4 ring-white dark:ring-slate-950 hidden md:block"
                  />
                  <div className="group bg-slate-50 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 hover:border-indigo-300 dark:hover:border-indigo-800 hover:shadow-lg hover:shadow-indigo-500/5 dark:hover:shadow-indigo-950/30 transition-all duration-300">
                    <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                      <div>
                        <h3 className="text-slate-900 dark:text-slate-100 font-semibold text-base group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{job.company}</h3>
                        <p className="text-indigo-600 dark:text-indigo-400 text-sm mt-0.5">{job.role}</p>
                      </div>
                      <span className="text-slate-500 text-xs font-mono bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full whitespace-nowrap">
                        {job.period}
                      </span>
                    </div>
                    {job.desc && (
                      <p className="text-slate-600 dark:text-slate-400 text-sm mb-4 leading-relaxed">{job.desc}</p>
                    )}
                    <ul className="space-y-2">
                      {job.bullets.map((b, j) => (
                        <li key={j} className="flex gap-2.5 text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                          <span className="text-indigo-500 mt-0.5 shrink-0">▹</span>
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Education + Languages */}
        <section id="education" className="py-20 border-t border-slate-200 dark:border-slate-800/60">
          <SectionHeading index="04" title="Education & Languages" />
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                label: "Education",
                content: (
                  <>
                    <h3 className="text-slate-900 dark:text-slate-100 font-semibold text-base mb-1">{CV.education.degree}</h3>
                    <p className="text-slate-500 text-sm mb-2">{CV.education.period}</p>
                    <p className="text-indigo-600 dark:text-indigo-400 text-sm">{CV.education.detail}</p>
                  </>
                ),
              },
              {
                label: "Languages",
                content: (
                  <div className="flex flex-col gap-3">
                    {CV.languages.map(({ lang, level }) => (
                      <div key={lang} className="flex items-center justify-between">
                        <span className="text-slate-800 dark:text-slate-200 text-sm font-medium">{lang}</span>
                        <Pill>{level}</Pill>
                      </div>
                    ))}
                  </div>
                ),
              },
            ].map(({ label, content }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 28, scale: 0.97 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.1, ease }}
                className="bg-slate-50 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 hover:border-indigo-300 dark:hover:border-indigo-800 hover:shadow-lg hover:shadow-indigo-500/5 dark:hover:shadow-indigo-950/30 transition-all duration-300"
              >
                <p className="text-slate-400 dark:text-slate-500 text-xs font-mono uppercase tracking-widest mb-3">{label}</p>
                {content}
              </motion.div>
            ))}
          </div>
        </section>
      </main>

      {/* ── Footer ────────────────────────────────────────────────────── */}
      <footer className="border-t border-slate-200 dark:border-slate-800/60 py-8">
        <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-400 dark:text-slate-600">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Built by Idris Ay
          </motion.span>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex items-center gap-5"
          >
            {[
              { href: CV.github, icon: Github, label: "GitHub" },
              { href: CV.linkedin, icon: Linkedin, label: "LinkedIn" },
              { href: `mailto:${CV.email}`, icon: Mail, label: "Email" },
            ].map(({ href, icon: Icon, label }) => (
              <a key={label} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer"
                className="hover:text-slate-700 dark:hover:text-slate-400 transition-colors flex items-center gap-1.5 group"
              >
                <Icon size={14} className="group-hover:scale-110 transition-transform" /> {label}
              </a>
            ))}
          </motion.div>
        </div>
      </footer>
    </div>
  );
}
