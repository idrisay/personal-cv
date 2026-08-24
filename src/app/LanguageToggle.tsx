"use client";

import { useLang } from "@/lib/lang-context";
import { LANGS } from "@/data/cv";

export function LanguageToggle() {
  const { lang, setLang } = useLang();

  return (
    <div
      role="group"
      aria-label="Language"
      className="flex items-center rounded-lg border border-slate-200 dark:border-slate-800 p-0.5 print:hidden"
    >
      {LANGS.map((code) => {
        const active = lang === code;
        return (
          <button
            key={code}
            type="button"
            onClick={() => setLang(code)}
            aria-pressed={active}
            lang={code}
            className={[
              "px-2 py-1 text-xs font-mono font-medium rounded-md transition-colors",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-1 focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-950",
              active
                ? "bg-indigo-600 text-white"
                : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100",
            ].join(" ")}
          >
            {code.toUpperCase()}
          </button>
        );
      })}
    </div>
  );
}
