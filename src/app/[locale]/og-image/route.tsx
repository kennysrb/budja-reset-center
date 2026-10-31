import { ImageResponse } from "next/og";

// Plain route (not the opengraph-image file convention) so every page can reference it
// explicitly via createMetadata, without an extra /sl/ redirect hop.
const size = { width: 1200, height: 630 };

const TAGLINES: Record<string, string> = {
  sl: "Masaža · ventuze · analiza drže",
  en: "Massage · cupping · posture analysis",
};

// Brand: espresso background, sand wordmark, cream tagline (light Jost-like spacing).
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ locale: string }> },
) {
  const { locale } = await params;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #14110F 0%, #2A221D 60%, #5C4535 100%)",
          color: "#F5EFE7",
        }}
      >
        <div style={{ fontSize: 120, letterSpacing: 40, color: "#C8B29A", paddingLeft: 40 }}>
          BUDJA
        </div>
        <div style={{ fontSize: 30, letterSpacing: 18, color: "#E2D3C1", marginTop: 8, paddingLeft: 18 }}>
          RESET CENTER
        </div>
        <div style={{ width: 120, height: 2, background: "#C8B29A", margin: "44px 0", opacity: 0.6 }} />
        <div style={{ fontSize: 36, color: "#F5EFE7", opacity: 0.85 }}>
          {TAGLINES[locale] ?? TAGLINES.sl}
        </div>
        <div style={{ fontSize: 24, letterSpacing: 8, color: "#C8B29A", marginTop: 22 }}>
          ŠKOFLJICA · SLOVENIJA
        </div>
      </div>
    ),
    size,
  );
}
