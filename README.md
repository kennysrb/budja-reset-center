# Budja Reset Center

Next.js 16 (App Router) + next-intl site for Budja Reset Center — massage studio in Škofljica, Slovenia.

- Locales: `sl` (default, no URL prefix) and `en` (`/en/...`). Browser language is not auto-detected.
- Light/dark theme: follows the OS until the visitor picks one with the toggle (saved in `localStorage`).
- Content: `messages/{sl,en}.json`; business data in `src/data/` (`siteConfig.ts`, `services.ts`, `gallery.ts`, `team.ts`).

## Setup

```bash
npm ci
cp .env.example .env.local   # fill in values
npm run dev
```

| Command | |
|---|---|
| `npm run dev` | dev server |
| `npm run build` | production build |
| `npm run lint` | ESLint |
| `npm run test:run` | Vitest (pricing, opening hours, booking, components, i18n parity) |

## Environment

See `.env.example`. All values are public (`NEXT_PUBLIC_*`) and are inlined at build time — rebuild after changing them.

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Production domain. Canonical, hreflang, sitemap, OG and JSON-LD URLs. **Unset → robots.txt disallows everything.** |
| `NEXT_PUBLIC_CALENDLY_URL` | General Calendly booking link. |
| `NEXT_PUBLIC_CALENDLY_URL_30/60/90` | Optional per-length Calendly event types. |

## Online booking (Calendly)

The booking flow is ready; it only needs the client's Calendly links.

1. In Calendly, create event types for the lengths offered — e.g. **Masaža 30 min**, **Masaža 60 min**, **Masaža 90 min**
   (Calendly sets duration per event type).
2. In each event type add, as the **first** invitee question, a short-text question such as
   *"Katero masažo želiš / Which massage?"*. The site pre-fills it (Calendly `a1` parameter) with the
   massage and length chosen in the price calculator, e.g. `Športna masaža · 60 min`.
3. Put the links in the env vars above (per-length links are optional; without them everything uses
   `NEXT_PUBLIC_CALENDLY_URL`). Only `https://calendly.com/...` links are accepted.
4. Redeploy.

Flow: price calculator (`/services`) → **Rezerviraj ta termin** → `/booking?service=sports&duration=60`
→ summary card + Calendly opened on the matching event with the question pre-filled. Query params are
validated against `src/data/services.ts`; unknown or unavailable combinations are ignored.
While no link is set, `/booking` shows "Spletna rezervacija prihaja kmalu" with an Instagram DM button.

## SEO

- Per-page, per-locale title/description, canonical, `hreflang` (`sl`, `en`, `x-default` → `sl`) via `src/lib/metadata.ts`.
- `/sitemap.xml` (every page × locale with alternates), `/robots.txt`.
- OG/Twitter image generated at `/og-image` and `/en/og-image`.
- JSON-LD: `HealthAndBeautyBusiness` on the home page (no phone / street address), `FAQPage` on `/faq`.

## Placeholders to replace before launch (`TODO(client)` in code)

Prices, therapist name/bio/portrait, photos (stock), domain, Calendly links.
