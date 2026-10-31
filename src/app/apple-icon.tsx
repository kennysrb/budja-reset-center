import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// "B" monogram, same as icon.svg (iOS home screen doesn't use SVG icons).
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#2A221D",
        }}
      >
        <div
          style={{
            width: 132,
            height: 132,
            borderRadius: 66,
            border: "3px solid rgba(200,178,154,0.55)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#E2D3C1",
            fontSize: 84,
          }}
        >
          B
        </div>
      </div>
    ),
    size,
  );
}
