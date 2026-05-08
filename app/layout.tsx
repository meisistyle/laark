import type { Metadata } from "next";
import { Cormorant_Garamond, Dancing_Script, Marcellus, Outfit } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
});

const dancing = Dancing_Script({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-script",
});

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500"],
  variable: "--font-outfit",
});

const marcellus = Marcellus({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-marcellus",
});

export const metadata: Metadata = {
  title: "Laark — tu web, sin complicaciones",
  description: "Rellenas un formulario. Sales con una web así. 200€, pago único.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${cormorant.variable} ${dancing.variable} ${outfit.variable} ${marcellus.variable}`}>
      <body>{children}</body>
    </html>
  );
}
