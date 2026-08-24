import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Providers } from "./providers";
import { CONTACT, cvData } from "@/data/cv";

const SITE = CONTACT.site;
const en = cvData.en;

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: "Idris Ay — Full-Stack Engineer | Zurich",
    template: "%s | Idris Ay",
  },
  description: en.meta.description,
  keywords: en.meta.keywords,
  authors: [{ name: CONTACT.name, url: SITE }],
  creator: CONTACT.name,
  publisher: CONTACT.name,
  applicationName: "Idris Ay — CV",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "profile",
    firstName: "Idris",
    lastName: "Ay",
    username: "idrisay",
    title: "Idris Ay — Full-Stack Engineer | Zurich",
    description: en.meta.description,
    url: SITE,
    siteName: "Idris Ay",
    locale: "en_US",
    alternateLocale: ["de_DE"],
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Idris Ay — Full-Stack Engineer, Zurich",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Idris Ay — Full-Stack Engineer | Zurich",
    description: en.meta.description,
    images: ["/og-image.png"],
  },
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#020617" },
  ],
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: CONTACT.name,
  givenName: "Idris",
  familyName: "Ay",
  email: `mailto:${CONTACT.email}`,
  telephone: CONTACT.phone,
  url: SITE,
  image: `${SITE}/og-image.png`,
  jobTitle: "Full-Stack Software Engineer",
  worksFor: { "@type": "Organization", name: "Evulpo" },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Zurich",
    addressCountry: "CH",
  },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "B.Sc. Electrical and Electronics Engineering",
  },
  sameAs: [CONTACT.github, CONTACT.linkedin],
  knowsLanguage: ["tr", "en", "de"],
  knowsAbout: [
    "React",
    "TypeScript",
    "Next.js",
    "Node.js",
    "PHP",
    "Laravel",
    "Livewire",
    "Swift",
    "SwiftUI",
    "Tailwind CSS",
    "PostgreSQL",
    "Docker",
    "AWS",
    "REST APIs",
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          // Static, author-controlled object — safe to serialise directly.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      </head>
      <body className="antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
