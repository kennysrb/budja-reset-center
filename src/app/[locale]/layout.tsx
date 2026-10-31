import type { Metadata } from "next";
import { Jost, Mulish } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { siteConfig } from "@/data/siteConfig";
import { themeInitScript } from "@/lib/theme";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { FloatingActions } from "@/components/layout/FloatingActions";
import { RevealObserver } from "@/components/layout/RevealObserver";
import { ThemeSync } from "@/components/layout/ThemeSync";
import "../globals.css";

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500"],
});

const mulish = Mulish({
  variable: "--font-mulish",
  subsets: ["latin", "latin-ext"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
  },
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as "en" | "sl")) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={`${jost.variable} ${mulish.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body suppressHydrationWarning>
        <NextIntlClientProvider messages={messages}>
          <div className="fixed top-0 left-0 right-0 z-50">
            <AnnouncementBar />
            <Navbar />
          </div>
          <main>{children}</main>
          <Footer />
          <FloatingActions />
          <RevealObserver />
          <ThemeSync />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
