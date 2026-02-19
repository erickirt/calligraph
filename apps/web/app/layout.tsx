import { Agentation } from "agentation";
import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { headers } from "next/headers";
import "@/styles/index.css";

const openRunde = localFont({
  src: [
    {
      path: "../fonts/open-runde/regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/open-runde/medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../fonts/open-runde/semibold.woff2",
      weight: "600",
      style: "normal",
    },
    { path: "../fonts/open-runde/bold.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-sans",
  display: "swap",
});

const title = "Calligraph";

const description = "Fluid text transitions powered by Motion";

const url = "https://calligraph.raphaelsalaja.com";

export async function generateViewport(): Promise<Viewport> {
  const h = await headers();
  return { themeColor: h.get("x-color-hex") || "#e5484d" };
}

export const metadata: Metadata = {
  title,
  description,
  metadataBase: new URL(url),
  openGraph: {
    title,
    description,
    url,
    siteName: title,
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: title,
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og.png"],
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const h = await headers();
  const color = h.get("x-color-name") || "crimson";

  return (
    <html lang="en" className={openRunde.variable} data-color={color}>
      <body>
        {children}
        {process.env.NODE_ENV === "development" && <Agentation />}
      </body>
    </html>
  );
}
