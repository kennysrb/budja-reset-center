import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  // There is no Serbian locale. Send stray /sr URLs (old bookmarks, browser
  // autocomplete) to the Slovenian site. Temporary (307) so browsers don't
  // cache it for localhost:3000 across other projects.
  async redirects() {
    return [
      { source: "/sr", destination: "/", permanent: false },
      { source: "/sr/:path*", destination: "/:path*", permanent: false },
      { source: "/en/sr", destination: "/en", permanent: false },
      { source: "/en/sr/:path*", destination: "/en/:path*", permanent: false },
    ];
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "placehold.co" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "plus.unsplash.com" },
      { protocol: "https", hostname: "unsplash.com" },
    ],
  },
};

export default withNextIntl(nextConfig);
