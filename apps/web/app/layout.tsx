import { Agentation } from "agentation";
import type { Metadata } from "next";
import "@/styles/index.css";

export const metadata: Metadata = {
  title: "Calligraphy",
  description: "Fluid text transitions powered by Motion",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <link rel="preconnect" href="https://rsms.me/" />
      <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
      <body>
        {children}
        {process.env.NODE_ENV === "development" && <Agentation />}
      </body>
    </html>
  );
}
