import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy — muhtar assistant",
  description: "Privacy policy for muhtar assistant, a private household tool.",
  alternates: { canonical: "/privacy/" },
  robots: { index: false },
};

const box = { maxWidth: 680, margin: "0 auto", padding: "64px 20px", lineHeight: 1.65 } as const;
const muted = { color: "var(--kt-muted)" } as const;

export default function PrivacyPage() {
  return (
    <main style={box}>
      <h1 style={{ fontSize: 32, marginBottom: 8 }}>Privacy policy</h1>
      <p style={muted}>muhtar assistant · last updated 9 November 2026</p>

      <h2 style={{ fontSize: 20, marginTop: 32 }}>What this is</h2>
      <p>
        muhtar assistant is a private tool used only by the Ay household. It files photographed
        letters on a home server and writes their deadlines into a calendar. It is not offered to
        the public.
      </p>

      <h2 style={{ fontSize: 20, marginTop: 32 }}>Google data it uses</h2>
      <p>
        With the permission <code>calendar.app.created</code>, the app creates one calendar named
        &ldquo;Post&rdquo; in the connected Google account and adds, moves or deletes events in that
        calendar only. It cannot see or change any other calendar, email, contacts or files.
      </p>

      <h2 style={{ fontSize: 20, marginTop: 32 }}>Storage and sharing</h2>
      <p>
        The access token is stored only on the household&apos;s own server. No Google data is sold,
        shared with third parties, or used for advertising or model training. Access can be revoked
        at any time at{" "}
        <a href="https://myaccount.google.com/permissions">myaccount.google.com/permissions</a>.
      </p>

      <h2 style={{ fontSize: 20, marginTop: 32 }}>Contact</h2>
      <p>
        <a href="mailto:mail.tracker.suisse@gmail.com">mail.tracker.suisse@gmail.com</a>
      </p>
    </main>
  );
}
