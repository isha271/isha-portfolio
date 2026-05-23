import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Isha Shrivastava — AI/ML Engineer",
  description: "Final-year B.Tech CSE (AI & ML) at VIT Chennai. Building intelligent systems in Biomedical ML, NLP, XAI, and FHE.",
  openGraph: {
    title: "Isha Shrivastava — AI/ML Engineer",
    description: "Final-year B.Tech CSE (AI & ML) at VIT Chennai. Building intelligent systems in Biomedical ML, NLP, XAI, and FHE.",
    url: "https://isha-portfolio.vercel.app",
    siteName: "Isha Shrivastava Portfolio",
    images: [
      {
        url: "https://isha-portfolio.vercel.app/profile.jpg",
        width: 800,
        height: 800,
        alt: "Isha Shrivastava",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Isha Shrivastava — AI/ML Engineer",
    description: "Final-year B.Tech CSE (AI & ML) at VIT Chennai. Building intelligent systems in Biomedical ML, NLP, XAI, and FHE.",
    images: ["https://isha-portfolio.vercel.app/profile.jpg"],
  },
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
