import { render } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import sl from "../messages/sl.json";
import en from "../messages/en.json";

export const messages = { sl, en };

export function renderWithIntl(ui: React.ReactElement, locale: "sl" | "en" = "sl") {
  return render(
    <NextIntlClientProvider locale={locale} messages={messages[locale]} timeZone="Europe/Ljubljana">
      {ui}
    </NextIntlClientProvider>,
  );
}

/** Ljubljana wall-clock time → Date. November 2026 = CET (UTC+1), July 2026 = CEST (UTC+2). */
export function ljubljana(isoLocal: string) {
  const month = Number(isoLocal.slice(5, 7));
  const offset = month >= 4 && month <= 10 ? "+02:00" : "+01:00";
  return new Date(`${isoLocal}${offset}`);
}
