import type { Metadata } from "next";
import "@fontsource/fredoka/400.css";
import "@fontsource/fredoka/500.css";
import "@fontsource/fredoka/600.css";
import "@fontsource/fredoka/700.css";
import "@fontsource/nunito/400.css";
import "@fontsource/nunito/600.css";
import "@fontsource/nunito/700.css";
import "@fontsource/nunito/800.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "Cozy Cloud – Gemütliche Hosen für deine Wohlfühlmomente",
  description:
    "Cozy Cloud – super weiche, gemütliche Hosen für deine schönsten Wohlfühlmomente. Restock kommt bald!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body className="font-body bg-cream text-cocoa antialiased">
        {children}
      </body>
    </html>
  );
}
