import type { Metadata } from "next";
import { Oswald, Inter } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import "../globals.css";

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://gentlemanschoice.si"),
  title: {
    default: "Gentleman's Choice | Premium Cuts & Grooming",
    template: "%s | Gentleman's Choice",
  },
  description:
    "Premium barbershop in Ljubljana, Slovenia offering precision haircuts, fades, beard grooming, and hot towel shaves. Book online today.",
  openGraph: {
    type: "website",
    siteName: "Gentleman's Choice",
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
    <html lang={locale} className={`${oswald.variable} ${inter.variable}`}>
      <body suppressHydrationWarning>
        <NextIntlClientProvider messages={messages}>
          <div className="fixed top-0 left-0 right-0 z-50">
            <AnnouncementBar />
            <Navbar />
          </div>
          <main>{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
