"use client";
import { ThemeProvider } from "next-themes";
import { MotionConfig } from "framer-motion";
import { LangProvider } from "@/lib/lang-context";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <LangProvider>
        {/* reducedMotion="user" honours prefers-reduced-motion for every motion component */}
        <MotionConfig reducedMotion="user">{children}</MotionConfig>
      </LangProvider>
    </ThemeProvider>
  );
}
