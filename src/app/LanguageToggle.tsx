"use client";

import { useLang } from "@/lib/lang-context";
import { LANGS } from "@/data/cv";

export function LanguageToggle() {
  const { lang, setLang } = useLang();

  return (
    <div
      role="group"
      aria-label="Language"
      className="flex items-center rounded-full border border-zinc-700 p-1 print:hidden"
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
              "min-h-9 min-w-11 px-2 text-xs font-mono font-medium rounded-full transition-colors cursor-pointer",
              active
                ? "bg-(--kt-accent) text-(--kt-bg)"
                : "text-zinc-400 hover:text-zinc-100",
            ].join(" ")}
          >
            {code.toUpperCase()}
          </button>
        );
      })}
    </div>
  );
}
