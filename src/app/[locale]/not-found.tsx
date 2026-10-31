import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export default async function NotFound() {
  const t = await getTranslations("notFound");

  return (
    <section className="min-h-[70vh] flex items-center justify-center px-4 pt-32 pb-20">
      <div className="text-center max-w-md">
        <p className="text-accent text-xs uppercase tracking-[0.4em] mb-4 font-body">
          404
        </p>
        <h1 className="font-heading text-4xl md:text-5xl text-light uppercase mb-4">
          {t("title")}
        </h1>
        <p className="text-muted mb-10">{t("text")}</p>
        <Link href="/" className="btn-gold">
          {t("home")}
        </Link>
      </div>
    </section>
  );
}
