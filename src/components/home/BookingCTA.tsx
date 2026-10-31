import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export async function BookingCTA() {
  const t = await getTranslations("bookingCta");
  const tCommon = await getTranslations("common");

  return (
    <section className="py-16 md:py-24 bg-secondary border-y border-accent/30">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="font-heading text-3xl font-bold text-light mb-4">
          {t("title")}
        </h2>
        <p className="text-muted text-lg mb-10">{t("subtitle")}</p>
        <Link
          href="/booking"
          className="inline-block bg-accent text-primary font-semibold font-body px-8 py-4 text-lg rounded hover:bg-accent-light transition-colors duration-200"
        >
          {tCommon("bookAppointment")}
        </Link>
      </div>
    </section>
  );
}
