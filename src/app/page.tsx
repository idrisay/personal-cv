import { Github, Linkedin, Mail, MapPin, Phone, ExternalLink, ChevronDown } from "lucide-react";

const CV = {
  name: "Idris Ay",
  role: "Software Engineer",
  tagline: "I build things for the web.",
  location: "Zurich, Switzerland",
  permit: "Swiss B Permit",
  phone: "+41 77 257 21 36",
  email: "idrisaydev@gmail.com",
  github: "https://github.com/idrisay",
  linkedin: "https://linkedin.com/in/idris-ay",
  summary:
    "Software engineer with 6+ years of experience building production web applications across the full stack. Strong in React, TypeScript, and modern frontend tooling, with solid backend depth in PHP/Laravel and Node.js. Currently shipping core features of an e-learning platform at Evulpo as part of a 30-person team. Previously led a frontend team on an EU-funded project and taught full-stack development to bootcamp cohorts. Comfortable owning features end to end — from design hand-off through deployment and monitoring.",
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

function SectionHeading({ index, title }: { index: string; title: string }) {
  return (
    <div className="flex items-center gap-3 mb-10">
      <span className="text-indigo-400 font-mono text-sm font-medium">{index}.</span>
      <h2 className="text-xl font-bold text-slate-100 whitespace-nowrap">{title}</h2>
      <div className="flex-1 h-px bg-slate-800" />
    </div>
  );
}

export default function Page() {
  return (
    <div className="bg-grid min-h-screen">

      {/* ── Nav ─────────────────────────────────────────────────────────── */}
      <header className="fixed inset-x-0 top-0 z-50 backdrop-blur-lg bg-slate-950/80 border-b border-slate-800/60">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <span className="text-indigo-400 font-mono font-bold text-lg tracking-tight">IA</span>
          <nav className="hidden md:flex items-center gap-7 text-sm text-slate-400">
            {["About", "Skills", "Experience", "Education"].map((s, i) => (
              <a
                key={s}
                href={`#${s.toLowerCase()}`}
                className="hover:text-indigo-400 transition-colors"
              >
                <span className="text-indigo-500 font-mono mr-1">0{i + 1}.</span>{s}
              </a>
            ))}
          </nav>
          <a
            href={`mailto:${CV.email}`}
            className="text-sm text-indigo-400 border border-indigo-500/50 hover:border-indigo-400 hover:bg-indigo-500/10 px-4 py-1.5 rounded-lg transition-all"
          >
            Hire Me
          </a>
        </div>
      </header>

      {/* ── Hero ────────────────────────────────────────────────────────── */}
      <section className="relative min-h-dvh flex flex-col items-center justify-center text-center px-6 pt-16 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-violet-600/8 rounded-full blur-[80px] pointer-events-none" />

        <div className="relative z-10 max-w-4xl">
          <p className="text-indigo-400 font-mono text-sm tracking-[0.2em] uppercase mb-5">
            Hi, my name is
          </p>
          <h1 className="text-[clamp(3rem,12vw,8rem)] font-bold leading-none tracking-tight mb-4">
            <span className="bg-gradient-to-br from-white via-slate-200 to-indigo-300 bg-clip-text text-transparent">
              Idris Ay.
            </span>
          </h1>
          <h2 className="text-[clamp(1.5rem,5vw,3.5rem)] font-bold text-slate-500 mb-6 leading-tight">
            {CV.tagline}
          </h2>
          <p className="text-slate-400 text-lg max-w-xl mx-auto mb-10 leading-relaxed">
            Full-stack engineer based in Zurich — specialising in React, TypeScript, and modern web tooling.
          </p>

          <div className="flex items-center justify-center gap-3 flex-wrap">
            <a
              href={`mailto:${CV.email}`}
              className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-xl text-sm font-medium transition-colors shadow-lg shadow-indigo-950/50"
            >
              <Mail size={15} /> Get In Touch
            </a>
            <a
              href={CV.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 px-6 py-3 rounded-xl text-sm font-medium transition-colors border border-slate-700"
            >
              <Github size={15} /> GitHub
            </a>
            <a
              href={CV.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 px-6 py-3 rounded-xl text-sm font-medium transition-colors border border-slate-700"
            >
              <Linkedin size={15} /> LinkedIn
            </a>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-600 text-xs">
          <div className="flex items-center gap-1.5">
            <MapPin size={12} />
            <span>{CV.location} · {CV.permit}</span>
          </div>
          <ChevronDown size={16} className="animate-bounce mt-1" />
        </div>
      </section>

      {/* ── Main content ────────────────────────────────────────────────── */}
      <main className="max-w-5xl mx-auto px-6 pb-24">

        {/* About */}
        <section id="about" className="py-20">
          <SectionHeading index="01" title="About" />
          <div className="grid md:grid-cols-[1fr_260px] gap-10 items-start">
            <p className="text-slate-400 text-lg leading-relaxed">
              {CV.summary}
            </p>
            <div className="flex flex-col gap-3 text-sm text-slate-400">
              <div className="flex items-center gap-2.5 hover:text-slate-200 transition-colors">
                <Mail size={14} className="text-indigo-400 shrink-0" />
                <a href={`mailto:${CV.email}`}>{CV.email}</a>
              </div>
              <div className="flex items-center gap-2.5 hover:text-slate-200 transition-colors">
                <Phone size={14} className="text-indigo-400 shrink-0" />
                <a href={`tel:${CV.phone}`}>{CV.phone}</a>
              </div>
              <div className="flex items-center gap-2.5 hover:text-slate-200 transition-colors">
                <Github size={14} className="text-indigo-400 shrink-0" />
                <a href={CV.github} target="_blank" rel="noopener noreferrer">github.com/idrisay</a>
              </div>
              <div className="flex items-center gap-2.5 hover:text-slate-200 transition-colors">
                <Linkedin size={14} className="text-indigo-400 shrink-0" />
                <a href={CV.linkedin} target="_blank" rel="noopener noreferrer">linkedin.com/in/idris-ay</a>
              </div>
            </div>
          </div>
        </section>

        {/* Skills */}
        <section id="skills" className="py-20 border-t border-slate-800/60">
          <SectionHeading index="02" title="Skills" />
          <div className="flex flex-col gap-5">
            {CV.skills.map(({ category, items }) => (
              <div key={category} className="grid md:grid-cols-[140px_1fr] gap-3 items-start">
                <span className="text-slate-500 text-sm font-medium pt-0.5">{category}</span>
                <div className="flex flex-wrap gap-2">
                  {items.map((item) => (
                    <span
                      key={item}
                      className="text-xs font-mono text-indigo-300 bg-indigo-950/60 border border-indigo-900/80 px-3 py-1 rounded-full"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Experience */}
        <section id="experience" className="py-20 border-t border-slate-800/60">
          <SectionHeading index="03" title="Experience" />
          <div className="relative">
            <div className="absolute left-0 top-2 bottom-0 w-px bg-slate-800 hidden md:block" />
            <div className="flex flex-col gap-8">
              {CV.experience.map((job, i) => (
                <div key={i} className="relative md:pl-10">
                  <div className="absolute left-[-4px] top-2 w-2.5 h-2.5 rounded-full bg-indigo-500 ring-4 ring-slate-950 hidden md:block" />
                  <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 hover:border-slate-700 transition-colors">
                    <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                      <div>
                        <h3 className="text-slate-100 font-semibold text-base">{job.company}</h3>
                        <p className="text-indigo-400 text-sm mt-0.5">{job.role}</p>
                      </div>
                      <span className="text-slate-500 text-xs font-mono bg-slate-800 px-3 py-1 rounded-full whitespace-nowrap">
                        {job.period}
                      </span>
                    </div>
                    {job.desc && (
                      <p className="text-slate-400 text-sm mb-4 leading-relaxed">{job.desc}</p>
                    )}
                    <ul className="space-y-2">
                      {job.bullets.map((b, j) => (
                        <li key={j} className="flex gap-2.5 text-slate-400 text-sm leading-relaxed">
                          <span className="text-indigo-500 mt-0.5 shrink-0">▹</span>
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Education + Languages */}
        <section id="education" className="py-20 border-t border-slate-800/60">
          <SectionHeading index="04" title="Education & Languages" />
          <div className="grid md:grid-cols-2 gap-6">

            <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 hover:border-slate-700 transition-colors">
              <p className="text-slate-500 text-xs font-mono uppercase tracking-widest mb-3">Education</p>
              <h3 className="text-slate-100 font-semibold text-base mb-1">{CV.education.degree}</h3>
              <p className="text-slate-500 text-sm mb-2">{CV.education.period}</p>
              <p className="text-indigo-400 text-sm">{CV.education.detail}</p>
            </div>

            <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 hover:border-slate-700 transition-colors">
              <p className="text-slate-500 text-xs font-mono uppercase tracking-widest mb-3">Languages</p>
              <div className="flex flex-col gap-3">
                {CV.languages.map(({ lang, level }) => (
                  <div key={lang} className="flex items-center justify-between">
                    <span className="text-slate-200 text-sm font-medium">{lang}</span>
                    <span className="text-xs text-indigo-300 bg-indigo-950/60 border border-indigo-900/80 px-3 py-1 rounded-full font-mono">
                      {level}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </section>
      </main>

      {/* ── Footer ──────────────────────────────────────────────────────── */}
      <footer className="border-t border-slate-800/60 py-8">
        <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-600">
          <span>Built by Idris Ay</span>
          <div className="flex items-center gap-5">
            <a href={CV.github} target="_blank" rel="noopener noreferrer" className="hover:text-slate-400 transition-colors flex items-center gap-1.5">
              <Github size={14} /> GitHub
            </a>
            <a href={CV.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-slate-400 transition-colors flex items-center gap-1.5">
              <Linkedin size={14} /> LinkedIn
            </a>
            <a href={`mailto:${CV.email}`} className="hover:text-slate-400 transition-colors flex items-center gap-1.5">
              <Mail size={14} /> Email
            </a>
          </div>
        </div>
      </footer>

    </div>
  );
}
