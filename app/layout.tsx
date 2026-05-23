import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: "Isha Shrivastava — AI/ML Engineer",
  description: "Final-year B.Tech CSE (AI & ML) at VIT Chennai. Biomedical ML, NLP, XAI, FHE.",
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  );
}
