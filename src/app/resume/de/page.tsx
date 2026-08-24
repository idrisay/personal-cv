import type { Metadata } from "next";
import { ResumeDoc } from "../ResumeDoc";
import { cvData } from "@/data/cv";

export const metadata: Metadata = {
  title: "Lebenslauf — Idris Ay, Full-Stack Engineer",
  description: cvData.de.meta.description,
  keywords: cvData.de.meta.keywords,
  alternates: { canonical: "/resume/de/", languages: { "en": "/resume/", "de": "/resume/de/" } },
  openGraph: {
    type: "profile",
    title: "Lebenslauf — Idris Ay, Full-Stack Engineer",
    description: cvData.de.meta.description,
    url: "/resume/de/",
    locale: "de_DE",
    alternateLocale: ["en_US"],
  },
};

export default function ResumeDePage() {
  return <ResumeDoc lang="de" />;
}
