import type { Metadata } from "next";
import { ResumeDoc } from "./ResumeDoc";
import { cvData } from "@/data/cv";

export const metadata: Metadata = {
  title: "Résumé — Idris Ay, Full-Stack Engineer",
  description: cvData.en.meta.description,
  alternates: { canonical: "/resume/", languages: { "en": "/resume/", "de": "/resume/de/" } },
};

export default function ResumePage() {
  return <ResumeDoc lang="en" />;
}
