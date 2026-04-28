import type { Metadata } from "next";
import { Cormorant_Garamond, Jost, Outfit } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
});

const jost = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  variable: "--font-jost",
});

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-outfit",
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
    <html lang="es" className={`${cormorant.variable} ${jost.variable} ${outfit.variable}`}>
      <body>{children}</body>
    </html>
  );
}
