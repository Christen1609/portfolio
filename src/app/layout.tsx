import type { Metadata } from "next";
import "./globals.css";
import Cursor from "@/components/Cursor";

export const metadata: Metadata = {
  metadataBase: new URL("https://christenloyola.com"),
  title: "Christen I. Loyola — AI/ML & Software Engineer",
  description:
    "AI/ML and software engineer based in Adelaide, Australia. I build and ship LLM, computer vision, and full-stack data systems.",
  keywords: [
    "Christen Loyola",
    "AI Engineer",
    "Machine Learning Engineer",
    "Software Engineer",
    "Adelaide",
    "LLM",
    "Computer Vision",
    "Next.js",
  ],
  authors: [{ name: "Christen I. Loyola" }],
  openGraph: {
    title: "Christen I. Loyola — AI/ML & Software Engineer",
    description:
      "I build and ship LLM, computer vision, and full-stack data systems. Adelaide, Australia.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Cursor />
        {children}
      </body>
    </html>
  );
}
