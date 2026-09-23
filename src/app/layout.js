import { Outfit, Ovo } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-outfit",
});

const ovo = Ovo({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-ovo",
});

export const metadata = {
  title: "Altamash Khan — AI Engineer",
  description:
    "AI Engineer building production LLM agents for WhatsApp commerce: LangGraph orchestration, catalog-constrained structured outputs, RAG and LLM evaluation.",
  openGraph: {
    title: "Altamash Khan — AI Engineer",
    description:
      "Production LLM agents for WhatsApp commerce. LangGraph, structured outputs, RAG, evaluation.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${outfit.variable} ${ovo.variable} ${outfit.className} antialiased overflow-x-hidden bg-white text-zinc-900 dark:bg-[#0b0713] dark:text-zinc-100`}
      >
        {children}
      </body>
    </html>
  );
}
