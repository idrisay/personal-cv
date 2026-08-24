"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { cvData, type CVContent, type Lang } from "@/data/cv";

const STORAGE_KEY = "cv-lang";

type LangContextValue = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: CVContent;
};

const LangContext = createContext<LangContextValue | null>(null);

export function LangProvider({ children }: { children: React.ReactNode }) {
  // Always 'en' on the server AND on the first client render → no hydration mismatch.
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    let stored: string | null = null;
    try {
      stored = window.localStorage.getItem(STORAGE_KEY);
    } catch {
      // private mode / storage disabled — fall through to the default
    }
    if (stored === "de" || stored === "en") setLangState(stored);
  }, []);

  // Keep <html lang> in sync so screen readers and search engines see the right language.
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // ignore — the toggle still works for this session
    }
  }, []);

  return (
    <LangContext.Provider value={{ lang, setLang, t: cvData[lang] }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used inside <LangProvider>");
  return ctx;
}
