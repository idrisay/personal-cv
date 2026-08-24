// ─────────────────────────────────────────────────────────────────────────────
// Single source of truth for every piece of CV content.
// `page.tsx` (visual layer) and `resume/` (ATS layer) both read from here.
// ─────────────────────────────────────────────────────────────────────────────

export type Lang = "en" | "de";

export const LANGS: Lang[] = ["en", "de"];

/** Language-independent facts. */
export const CONTACT = {
  name: "Idris Ay",
  initials: "IA",
  email: "idrisaydev@gmail.com",
  phone: "+41 77 257 21 36",
  github: "https://github.com/idrisay",
  githubLabel: "github.com/idrisay",
  linkedin: "https://linkedin.com/in/idris-ay",
  linkedinLabel: "linkedin.com/in/idris-ay",
  site: "https://idrisay.ch",
} as const;

export type Job = {
  company: string;
  role: string;
  period: string;
  desc: string;
  bullets: string[];
};

export type Project = {
  name: string;
  tagline: string;
  period: string;
  blurb: string;
  bullets: string[];
  before: string;
  after: string;
  tech: string[];
  metrics: { value: string; label: string }[];
  site: string;
  repo: string;
  badges: string[];
};

export type CVContent = {
  htmlLang: string;
  ogLocale: string;
  title: string;
  location: string;
  permit: string;
  /** Language-specific PDF in public/ — regenerate with `npm run cv:pdf`. */
  cvFile: string;
  nav: { about: string; skills: string; projects: string; experience: string; education: string };
  hero: {
    greeting: string;
    tagline: string;
    subtitle: string;
    contact: string;
    downloadCV: string;
  };
  stats: { value: string; label: string }[];
  sections: {
    about: string;
    skills: string;
    projects: string;
    experience: string;
    education: string;
  };
  about: { summary: string; story: string };
  now: { label: string; items: string[] };
  skills: { category: string; items: string[] }[];
  skillsUI: { dailyUse: string; aiCategory: string };
  projects: Project[];
  projectUI: { youSay: string; itWrites: string; visit: string; source: string };
  experience: Job[];
  education: { label: string; degree: string; period: string; detail: string };
  languagesLabel: string;
  languages: { lang: string; level: string }[];
  languageNote?: string;
  footer: { built: string; printVersion: string };
  resume: {
    profile: string;
    skills: string;
    experience: string;
    projects: string;
    education: string;
    languages: string;
    print: string;
    backToSite: string;
  };
  meta: { description: string; keywords: string[] };
};

// ── English ──────────────────────────────────────────────────────────────────

const en: CVContent = {
  htmlLang: "en",
  ogLocale: "en_US",
  title: "Full-Stack Engineer",
  location: "Zurich, Switzerland",
  permit: "Swiss B Permit",
  cvFile: "/Idris-Ay-CV.pdf",
  nav: {
    about: "About",
    skills: "Skills",
    projects: "Projects",
    experience: "Experience",
    education: "Education",
  },
  hero: {
    greeting: "Hi, my name is",
    tagline: "I build things for the web.",
    subtitle:
      "Full-stack engineer based in Zurich — specialising in React, TypeScript, and modern web tooling.",
    contact: "Get In Touch",
    downloadCV: "Download CV",
  },
  stats: [
    { value: "6+", label: "Years experience" },
    { value: "5", label: "Positions held" },
    { value: "3", label: "Languages spoken" },
  ],
  sections: {
    about: "About",
    skills: "Skills",
    projects: "Projects",
    experience: "Experience",
    education: "Education & Languages",
  },
  about: {
    summary:
      "I ship production web applications end to end — from design hand-off through deployment and monitoring. Six years across React, TypeScript, PHP/Laravel and Node.js, currently building core learning, billing and localisation features at Evulpo inside a 30+ person product team with 10+ engineers. Outside client work I design and ship my own products, most recently VoiceSmith, an open-source macOS dictation app written in Swift.",
    story:
      "I started in electrical engineering, graduated second in my class, then taught myself the web and spent 18 months teaching it to 250+ bootcamp students — still the fastest way I know to learn something properly. From there: leading a frontend team of five on an EU-funded project, and since 2022 full-stack engineering in Zurich at Evulpo.",
  },
  now: {
    label: "Now",
    items: [
      "Shipping VoiceSmith 1.x",
      "Improving my German toward B1",
      "Exploring SwiftUI",
    ],
  },
  skills: [
    { category: "Languages", items: ["TypeScript", "JavaScript", "Swift", "PHP", "Python", "HTML5", "CSS3", "SASS"] },
    { category: "Frontend", items: ["React", "Next.js", "React Native", "SwiftUI", "Tailwind CSS", "Material-UI", "Storybook"] },
    { category: "Backend", items: ["Laravel", "Livewire", "Node.js", "Django", "Flask", "REST APIs"] },
    { category: "Databases", items: ["PostgreSQL", "MySQL", "MongoDB", "SQLite"] },
    { category: "DevOps & Tools", items: ["Docker", "Jenkins", "AWS", "Git", "Sentry", "Stripe", "Firebase", "Postman"] },
    { category: "AI Tooling", items: ["GitHub Copilot", "Cursor", "Claude", "ChatGPT"] },
    { category: "Methodologies", items: ["Agile", "Scrum", "Kanban"] },
  ],
  skillsUI: { dailyUse: "Daily use", aiCategory: "AI Tooling" },
  projects: [
    {
      name: "VoiceSmith",
      tagline: "Speak naturally. Write beautifully.",
      period: "2026",
      blurb:
        "A macOS menu bar app that turns dictation into finished writing. Double-tap Shift in any application, speak, double-tap again — the transcript is cleaned up and written straight into the field you were already typing in.",
      bullets: [
        "Fifteen speech and text backends behind two Swift protocols — Apple Speech, Whisper.cpp and Ollama run entirely on-device; OpenAI, Anthropic, Groq and others use your own key.",
        "Global double-tap hotkeys and text insertion through the macOS Accessibility API, with dictated to-dos parsed into Apple Reminders via EventKit.",
        "No account, no backend, no telemetry — keys live in the Keychain and requests go straight to the provider.",
        "Universal binaries built, packaged and released by a GitHub Actions workflow.",
      ],
      before: "so um hi Sarah I I just wanted to say the deck is basically ready",
      after: "Hi Sarah, I just wanted to say the deck is ready.",
      tech: ["Swift 6", "SwiftUI", "AppKit", "SwiftData", "AVFoundation", "Speech", "EventKit", "GitHub Actions"],
      metrics: [
        { value: "7.6k", label: "lines of Swift" },
        { value: "15", label: "AI providers" },
        { value: "99", label: "languages" },
      ],
      site: "https://voicesmith.idrisay.ch",
      repo: "https://github.com/idrisay/VoiceSmith",
      badges: ["macOS 14+", "Open source · MIT"],
    },
  ],
  projectUI: {
    youSay: "You say",
    itWrites: "It writes",
    visit: "Visit site",
    source: "Source",
  },
  experience: [
    {
      company: "Evulpo",
      role: "Full-Stack Software Engineer",
      period: "Mar 2022 – Present",
      desc: "Full-stack feature work on an e-learning platform inside a 30+ person product team with 10+ engineers — PHP, Laravel, Livewire and Tailwind CSS.",
      bullets: [
        "Ship backend services and frontend features for core learning, content delivery and account flows as one of 10+ engineers in a 30+ person product team.",
        "Integrated Stripe to power subscription billing and recurring payments across the platform.",
        "Built an automated content-translation pipeline on DeepL's neural translation API to localise learning material across multiple languages.",
        "Designed and shipped REST API endpoints consumed by the mobile app and partner integrations.",
        "Use AI tooling (Cursor, Claude, GitHub Copilot) daily to integrate features faster without lowering the quality bar.",
      ],
    },
    {
      company: "Inveon",
      role: "Frontend Engineer",
      period: "Jun 2021 – Mar 2022",
      desc: "Built React and Next.js features for e-commerce platforms serving major brands including Columbia Sportswear and KOM.",
      bullets: [
        "Built production frontend in TypeScript with Material-UI, focused on reusable, type-safe components.",
        "Authored a shared component library documented in Storybook and published to npm for reuse across client projects.",
        "Led the Sentry.io integration after evaluating error-tracking options, improving production observability and bug triage.",
        "Shipped through Jenkins CI/CD, Jira and GitHub workflows alongside cross-functional teams.",
      ],
    },
    {
      company: "Nioya Tech",
      role: "Frontend Team Lead · React Developer",
      period: "Oct 2020 – Jun 2021",
      desc: "Led a frontend team of 5 on an EU-funded project, coordinating delivery and code quality across the team.",
      bullets: [
        "Led a team of 5 using GitLab and ClickUp for code review, planning, and delivery.",
        "Translated Figma designs into production-ready, responsive React components.",
      ],
    },
    {
      company: "Clarusway",
      role: "Full-Stack Instructor",
      period: "Jan 2020 – Jun 2021",
      desc: "Designed and delivered the full-stack curriculum for an intensive developer bootcamp.",
      bullets: [
        "Taught HTML, CSS, JavaScript, React, Vue, and Node.js to 4 cohorts (250+ students).",
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
    label: "Education",
    degree: "B.Sc. Electrical and Electronics Engineering",
    period: "Sep 2011 – Jun 2015",
    detail: "Graduated 2nd in class · 3.67 / 4.0 GPA",
  },
  languagesLabel: "Languages",
  languages: [
    { lang: "Turkish", level: "Native" },
    { lang: "English", level: "C1" },
    { lang: "German", level: "A2" },
  ],
  footer: {
    built: "Built by Idris Ay",
    printVersion: "Print / ATS version",
  },
  resume: {
    profile: "Profile",
    skills: "Skills",
    experience: "Experience",
    projects: "Projects",
    education: "Education",
    languages: "Languages",
    print: "Print / Save as PDF",
    backToSite: "Back to site",
  },
  meta: {
    description:
      "Idris Ay — full-stack engineer in Zurich. Six years shipping production web apps with React, TypeScript, Next.js, PHP/Laravel and Node.js. Swiss B Permit.",
    keywords: [
      "Idris Ay",
      "Full-Stack Engineer",
      "Software Engineer Zurich",
      "React Developer Zurich",
      "TypeScript",
      "Next.js",
      "Laravel",
      "Node.js",
      "Swift",
      "Frontend Engineer Switzerland",
    ],
  },
};

// ── German ───────────────────────────────────────────────────────────────────

const de: CVContent = {
  htmlLang: "de",
  ogLocale: "de_DE",
  title: "Full-Stack Engineer",
  location: "Zürich, Schweiz",
  permit: "Aufenthaltsbewilligung B",
  cvFile: "/Idris-Ay-CV-DE.pdf",
  nav: {
    about: "Über mich",
    skills: "Skills",
    projects: "Projekte",
    experience: "Erfahrung",
    education: "Ausbildung",
  },
  hero: {
    greeting: "Hallo, ich bin",
    tagline: "Ich baue Dinge fürs Web.",
    subtitle:
      "Full-Stack Engineer in Zürich — spezialisiert auf React, TypeScript und modernes Web-Tooling.",
    contact: "Kontakt aufnehmen",
    downloadCV: "CV herunterladen",
  },
  stats: [
    { value: "6+", label: "Jahre Erfahrung" },
    { value: "5", label: "Positionen" },
    { value: "3", label: "Sprachen" },
  ],
  sections: {
    about: "Über mich",
    skills: "Skills",
    projects: "Projekte",
    experience: "Berufserfahrung",
    education: "Ausbildung & Sprachen",
  },
  about: {
    summary:
      "Ich bringe Web-Anwendungen end-to-end in Produktion — von der Designübergabe über das Deployment bis zum Monitoring. Sechs Jahre mit React, TypeScript, PHP/Laravel und Node.js; aktuell entwickle ich bei Evulpo zentrale Lern-, Abrechnungs- und Lokalisierungsfunktionen in einem über 30-köpfigen Produktteam mit mehr als 10 Entwicklern. Daneben baue ich eigene Produkte, zuletzt VoiceSmith, eine Open-Source-Diktier-App für macOS in Swift.",
    story:
      "Ich komme aus der Elektrotechnik, habe als Zweitbester meines Jahrgangs abgeschlossen, mir das Web selbst beigebracht und es anschliessend 18 Monate lang über 250 Bootcamp-Teilnehmenden vermittelt — für mich bis heute der schnellste Weg, etwas wirklich zu verstehen. Danach: Leitung eines fünfköpfigen Frontend-Teams in einem EU-geförderten Projekt und seit 2022 Full-Stack-Entwicklung bei Evulpo in Zürich.",
  },
  now: {
    label: "Aktuell",
    items: [
      "VoiceSmith 1.x veröffentlichen",
      "Deutsch lernen — A2, auf dem Weg zu B1",
      "SwiftUI vertiefen",
    ],
  },
  skills: [
    { category: "Programmiersprachen", items: ["TypeScript", "JavaScript", "Swift", "PHP", "Python", "HTML5", "CSS3", "SASS"] },
    { category: "Frontend", items: ["React", "Next.js", "React Native", "SwiftUI", "Tailwind CSS", "Material-UI", "Storybook"] },
    { category: "Backend", items: ["Laravel", "Livewire", "Node.js", "Django", "Flask", "REST APIs"] },
    { category: "Datenbanken", items: ["PostgreSQL", "MySQL", "MongoDB", "SQLite"] },
    { category: "DevOps & Tools", items: ["Docker", "Jenkins", "AWS", "Git", "Sentry", "Stripe", "Firebase", "Postman"] },
    { category: "AI-Tooling", items: ["GitHub Copilot", "Cursor", "Claude", "ChatGPT"] },
    { category: "Methoden", items: ["Agile", "Scrum", "Kanban"] },
  ],
  skillsUI: { dailyUse: "Täglich im Einsatz", aiCategory: "AI-Tooling" },
  projects: [
    {
      name: "VoiceSmith",
      tagline: "Natürlich sprechen. Sauber schreiben.",
      period: "2026",
      blurb:
        "Eine macOS-Menüleisten-App, die Diktate in fertigen Text verwandelt. In beliebiger Anwendung zweimal die Umschalttaste tippen, sprechen, erneut zweimal tippen — das Transkript wird bereinigt und direkt in das Feld geschrieben, in dem man ohnehin schon getippt hat.",
      bullets: [
        "Fünfzehn Sprach- und Text-Backends hinter zwei Swift-Protokollen — Apple Speech, Whisper.cpp und Ollama laufen vollständig lokal; OpenAI, Anthropic, Groq und andere mit dem eigenen API-Key.",
        "Globale Doppeltipp-Hotkeys und Texteinfügung über die macOS-Accessibility-API, diktierte To-dos landen via EventKit direkt in Apple Erinnerungen.",
        "Kein Konto, kein Backend, keine Telemetrie — API-Schlüssel liegen im Schlüsselbund, Anfragen gehen direkt an den Anbieter.",
        "Universal Binaries werden von einem GitHub-Actions-Workflow gebaut, paketiert und veröffentlicht.",
      ],
      before: "also ähm hallo Sarah ich ich wollte nur sagen die Präsentation ist im Grunde fertig",
      after: "Hallo Sarah, ich wollte nur sagen: Die Präsentation ist fertig.",
      tech: ["Swift 6", "SwiftUI", "AppKit", "SwiftData", "AVFoundation", "Speech", "EventKit", "GitHub Actions"],
      metrics: [
        { value: "7.6k", label: "Zeilen Swift" },
        { value: "15", label: "AI-Anbieter" },
        { value: "99", label: "Sprachen" },
      ],
      site: "https://voicesmith.idrisay.ch",
      repo: "https://github.com/idrisay/VoiceSmith",
      badges: ["macOS 14+", "Open Source · MIT"],
    },
  ],
  projectUI: {
    youSay: "Du sagst",
    itWrites: "Es schreibt",
    visit: "Zur Website",
    source: "Quellcode",
  },
  experience: [
    {
      company: "Evulpo",
      role: "Full-Stack Software Engineer",
      period: "März 2022 – heute",
      desc: "Full-Stack-Feature-Entwicklung an einer E-Learning-Plattform in einem über 30-köpfigen Produktteam mit mehr als 10 Entwicklern — PHP, Laravel, Livewire und Tailwind CSS.",
      bullets: [
        "Entwickle Backend-Services und Frontend-Features für Lerninhalte, Content-Auslieferung und Kontoprozesse als einer von über 10 Entwicklern in einem 30-köpfigen Produktteam.",
        "Integration von Stripe für Abo-Abrechnung und wiederkehrende Zahlungen auf der gesamten Plattform.",
        "Aufbau einer automatisierten Übersetzungs-Pipeline auf Basis der neuronalen DeepL-API, um Lerninhalte in mehrere Sprachen zu lokalisieren.",
        "REST-API-Endpunkte entworfen und ausgeliefert, die von der Mobile-App und Partner-Integrationen genutzt werden.",
        "Nutze AI-Tooling (Cursor, Claude, GitHub Copilot) täglich, um Features schneller zu integrieren, ohne Abstriche bei der Qualität.",
      ],
    },
    {
      company: "Inveon",
      role: "Frontend Engineer",
      period: "Juni 2021 – März 2022",
      desc: "Entwickelte React- und Next.js-Features für E-Commerce-Plattformen grosser Marken, darunter Columbia Sportswear und KOM.",
      bullets: [
        "Produktions-Frontend in TypeScript mit Material-UI gebaut, mit Fokus auf wiederverwendbare, typsichere Komponenten.",
        "Gemeinsame Komponentenbibliothek entwickelt, in Storybook dokumentiert und auf npm veröffentlicht, zur Wiederverwendung in Kundenprojekten.",
        "Nach Evaluation mehrerer Error-Tracking-Lösungen die Sentry.io-Integration geleitet und damit Observability und Bug-Triage in Produktion verbessert.",
        "Auslieferung über Jenkins CI/CD, Jira und GitHub-Workflows in cross-funktionalen Teams.",
      ],
    },
    {
      company: "Nioya Tech",
      role: "Frontend Team Lead · React Developer",
      period: "Okt. 2020 – Juni 2021",
      desc: "Leitung eines fünfköpfigen Frontend-Teams in einem EU-geförderten Projekt, verantwortlich für Auslieferung und Code-Qualität.",
      bullets: [
        "Team von 5 Personen geleitet, mit GitLab und ClickUp für Code-Review, Planung und Auslieferung.",
        "Figma-Designs in produktionsreife, responsive React-Komponenten umgesetzt.",
      ],
    },
    {
      company: "Clarusway",
      role: "Full-Stack Instructor",
      period: "Jan. 2020 – Juni 2021",
      desc: "Full-Stack-Curriculum für ein intensives Developer-Bootcamp konzipiert und unterrichtet.",
      bullets: [
        "HTML, CSS, JavaScript, React, Vue und Node.js an 4 Kohorten (250+ Teilnehmende) unterrichtet.",
        "Referenzprojekte mit Material-UI, Bootstrap, Chart.js, Firebase und Drittanbieter-APIs gebaut, um jedes Modul zu verankern.",
        "Marktnachfrage analysiert, um die Kursinhalte auf die Arbeitsmarktfähigkeit der Teilnehmenden auszurichten, und Workshops zu Frontend-Themen gehalten.",
      ],
    },
    {
      company: "Freelance",
      role: "Web Developer",
      period: "Dez. 2019 – Okt. 2020",
      desc: "",
      bullets: ["E-Commerce-Tooling für Produkt-Tracking und effizientere Abläufe gebaut."],
    },
  ],
  education: {
    label: "Ausbildung",
    degree: "B.Sc. Elektrotechnik und Elektronik",
    period: "Sep. 2011 – Juni 2015",
    detail: "Als Zweitbester des Jahrgangs abgeschlossen · Notendurchschnitt 3,67 / 4,0",
  },
  languagesLabel: "Sprachen",
  languages: [
    { lang: "Türkisch", level: "Muttersprache" },
    { lang: "Englisch", level: "C1" },
    { lang: "Deutsch", level: "A2" },
  ],
  languageNote: "Deutsch lernen — A2, auf dem Weg zu B1",
  footer: {
    built: "Gebaut von Idris Ay",
    printVersion: "Druck- / ATS-Version",
  },
  resume: {
    profile: "Profil",
    skills: "Skills",
    experience: "Berufserfahrung",
    projects: "Projekte",
    education: "Ausbildung",
    languages: "Sprachen",
    print: "Drucken / als PDF sichern",
    backToSite: "Zurück zur Website",
  },
  meta: {
    description:
      "Idris Ay — Full-Stack Engineer in Zürich. Sechs Jahre Erfahrung mit React, TypeScript, Next.js, PHP/Laravel und Node.js. Aufenthaltsbewilligung B.",
    keywords: [
      "Idris Ay",
      "Full-Stack Engineer",
      "Softwareentwickler Zürich",
      "React Entwickler Zürich",
      "TypeScript",
      "Next.js",
      "Laravel",
      "Node.js",
      "Swift",
      "Frontend Entwickler Schweiz",
    ],
  },
};

export const cvData: Record<Lang, CVContent> = { en, de };
