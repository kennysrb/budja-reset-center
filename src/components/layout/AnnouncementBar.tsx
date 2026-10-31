"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export function AnnouncementBar() {
  const [visible, setVisible] = useState(true);
  const t = useTranslations("announcement");
  const tCommon = useTranslations("common");

  if (!visible) return null;

  return (
    <div className="bg-secondary text-sm py-2.5 pl-4 pr-10 text-center relative border-b border-accent/15">
      <p className="text-muted">
        {t("text")}{" "}
        <Link
          href="/booking"
          className="text-accent font-semibold tracking-wide underline-offset-4 hover:underline whitespace-nowrap"
        >
          {tCommon("bookAppointment")} →
        </Link>
      </p>
      <button
        onClick={() => setVisible(false)}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-muted hover:text-light transition-colors duration-200 text-lg leading-none"
        aria-label={t("dismiss")}
      >
        ×
      </button>
    </div>
  );
}
