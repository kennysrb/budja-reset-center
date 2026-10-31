"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

export function AnnouncementBar() {
  const [visible, setVisible] = useState(true);
  const t = useTranslations("announcement");

  if (!visible) return null;

  return (
    <div className="bg-secondary text-sm py-2.5 px-4 text-center relative border-b border-accent/20">
      <p className="text-muted">
        {t("text")}{" "}
        <span className="text-accent font-semibold tracking-wider">
          {t("code")}
        </span>
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
