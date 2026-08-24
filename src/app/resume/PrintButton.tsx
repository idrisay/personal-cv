"use client";

import { Printer } from "lucide-react";

export function PrintButton({ label }: { label: string }) {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 active:scale-95 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-950 print:hidden"
    >
      <Printer size={14} aria-hidden="true" /> {label}
    </button>
  );
}
