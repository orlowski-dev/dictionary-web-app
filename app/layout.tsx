import type { Metadata } from "next";
import { IBM_Plex_Serif } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";

const plexSerif = IBM_Plex_Serif({
  subsets: ["latin-ext"],
  weight: ["400", "500", "700"],
  variable: "--plex-serif",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Dictionary Web App",
  icons: [
    "/favicon-128.png",
    "/favicon-64.png",
    "/favicon-32.png",
    "/favicon-16.png",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={plexSerif.variable}>
        <Header />
        {children}
      </body>
    </html>
  );
}
