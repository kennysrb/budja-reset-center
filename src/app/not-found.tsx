import Link from "next/link";
import "./globals.css";

// Fallback for requests outside [locale]. The root layout has no <html>/<body>,
// so this page renders its own.
export default function GlobalNotFound() {
  return (
    <html lang="sl">
      <body className="min-h-screen flex items-center justify-center text-center px-4">
        <div>
          <p className="text-accent text-xs uppercase tracking-[0.4em] mb-4">404</p>
          <h1 className="text-3xl uppercase mb-6">Stran ne obstaja</h1>
          <Link href="/" className="btn-gold">
            Na domačo stran
          </Link>
        </div>
      </body>
    </html>
  );
}
