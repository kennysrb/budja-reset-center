"use client";

import { useLayoutEffect } from "react";
import { useLocale } from "next-intl";
import { applyTheme } from "@/lib/theme";

// Switching language re-renders the [locale] root layout, which resets <html>'s
// className and drops the "dark"/"js" classes set by themeInitScript. Re-apply them
// before paint so the theme survives the switch without a flash.
export function ThemeSync() {
  const locale = useLocale();
  useLayoutEffect(() => {
    applyTheme();
  }, [locale]);
  return null;
}
