import Link from "next/link";
import { CONTACT, cvData, type Lang } from "@/data/cv";
import { PrintButton } from "./PrintButton";

// Server component — no client JS beyond the print button.
export function ResumeDoc({ lang }: { lang: Lang }) {
  const t = cvData[lang];

  return (
    <div className="min-h-screen bg-white text-slate-900 print:bg-white">
      <div className="mx-auto max-w-[820px] px-6 py-10 print:px-0 print:py-0">
        {/* toolbar — screen only */}
        <div className="flex items-center justify-between gap-4 mb-8 print:hidden">
          <Link
            href="/"
            className="text-sm text-slate-500 hover:text-indigo-600 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded"
          >
            ← {t.resume.backToSite}
          </Link>
          <div className="flex items-center gap-3">
            <Link
              href={lang === "en" ? "/resume/de/" : "/resume/"}
              className="text-xs font-mono text-slate-500 hover:text-indigo-600 border border-slate-200 px-2.5 py-1.5 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
            >
              {lang === "en" ? "DE" : "EN"}
            </Link>
            <PrintButton label={t.resume.print} />
          </div>
        </div>

        <article lang={t.htmlLang} className="resume">
          {/* ── header ─────────────────────────────────────────────── */}
          <header className="border-b border-slate-300 pb-5 mb-6">
            <h1 className="text-3xl font-bold tracking-tight">{CONTACT.name}</h1>
            <p className="text-base text-slate-700 mt-1">{t.title}</p>
            <p className="text-sm text-slate-600 mt-3 leading-relaxed">
              {t.location} · {t.permit} ·{" "}
              <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a> ·{" "}
              <a href={`tel:${CONTACT.phone.replace(/\s/g, "")}`}>{CONTACT.phone}</a>
              <br />
              <a href={CONTACT.site}>{CONTACT.site.replace("https://", "")}</a> ·{" "}
              <a href={CONTACT.github}>{CONTACT.githubLabel}</a> ·{" "}
              <a href={CONTACT.linkedin}>{CONTACT.linkedinLabel}</a>
            </p>
          </header>

          {/* ── profile ────────────────────────────────────────────── */}
          <section className="mb-6 break-inside-avoid">
            <h2 className="resume-h2">{t.resume.profile}</h2>
            <p className="text-sm leading-relaxed text-slate-800">{t.about.summary}</p>
          </section>

          {/* ── skills ─────────────────────────────────────────────── */}
          <section className="mb-6 break-inside-avoid">
            <h2 className="resume-h2">{t.resume.skills}</h2>
            <dl className="text-sm leading-relaxed">
              {t.skills.map(({ category, items }) => (
                <div key={category} className="flex flex-wrap gap-x-2 py-0.5">
                  <dt className="font-semibold text-slate-900 min-w-[11rem]">{category}</dt>
                  <dd className="flex-1 text-slate-800">{items.join(" · ")}</dd>
                </div>
              ))}
            </dl>
          </section>

          {/* ── experience ─────────────────────────────────────────── */}
          <section className="mb-6">
            <h2 className="resume-h2">{t.resume.experience}</h2>
            <div className="flex flex-col gap-5">
              {t.experience.map((job) => (
                <div key={job.company} className="break-inside-avoid">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                    <h3 className="text-sm font-bold text-slate-900">
                      {job.role} — {job.company}
                    </h3>
                    <span className="text-xs text-slate-600 whitespace-nowrap">{job.period}</span>
                  </div>
                  {job.desc && (
                    <p className="text-sm text-slate-700 mt-1 leading-relaxed">{job.desc}</p>
                  )}
                  <ul className="list-disc pl-5 mt-1.5 space-y-1 text-sm text-slate-800 leading-relaxed marker:text-slate-400">
                    {job.bullets.map((b, i) => (
                      <li key={i}>{b}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* ── projects ───────────────────────────────────────────── */}
          <section className="mb-6">
            <h2 className="resume-h2">{t.resume.projects}</h2>
            <div className="flex flex-col gap-4">
              {t.projects.map((p) => (
                <div key={p.name} className="break-inside-avoid">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                    <h3 className="text-sm font-bold text-slate-900">
                      {p.name} — {p.tagline}
                    </h3>
                    <span className="text-xs text-slate-600 whitespace-nowrap">{p.period}</span>
                  </div>
                  <p className="text-sm text-slate-700 mt-1 leading-relaxed">{p.blurb}</p>
                  <ul className="list-disc pl-5 mt-1.5 space-y-1 text-sm text-slate-800 leading-relaxed marker:text-slate-400">
                    {p.bullets.map((b, i) => (
                      <li key={i}>{b}</li>
                    ))}
                    <li>
                      {p.metrics.map((m) => `${m.value} ${m.label}`).join(" · ")} —{" "}
                      <a href={p.site}>{p.site.replace("https://", "")}</a> ·{" "}
                      <a href={p.repo}>{p.repo.replace("https://", "")}</a>
                    </li>
                  </ul>
                  <p className="text-sm text-slate-700 mt-1.5">
                    <span className="font-semibold">Stack: </span>
                    {p.tech.join(" · ")}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* ── education + languages ──────────────────────────────── */}
          <section className="mb-6 break-inside-avoid">
            <h2 className="resume-h2">{t.resume.education}</h2>
            <div className="flex flex-wrap items-baseline justify-between gap-x-3">
              <h3 className="text-sm font-bold text-slate-900">{t.education.degree}</h3>
              <span className="text-xs text-slate-600 whitespace-nowrap">{t.education.period}</span>
            </div>
            <p className="text-sm text-slate-800 mt-1">{t.education.detail}</p>
          </section>

          <section className="break-inside-avoid">
            <h2 className="resume-h2">{t.resume.languages}</h2>
            <p className="text-sm text-slate-800">
              {t.languages.map((l) => `${l.lang} — ${l.level}`).join(" · ")}
            </p>
            {t.languageNote && (
              <p className="text-sm text-slate-700 mt-1">{t.languageNote}</p>
            )}
          </section>
        </article>
      </div>
    </div>
  );
}
