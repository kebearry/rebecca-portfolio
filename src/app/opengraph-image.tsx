import { ImageResponse } from "next/og";

export const alt = "Rebecca Tan | Solution Architect";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(135deg, #F5F0EB 0%, #E8D5D1 50%, #F2E8E5 100%)",
          padding: "72px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 28,
            color: "#8B6F47",
            letterSpacing: "0.04em",
            textTransform: "uppercase",
          }}
        >
          Portfolio
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div
            style={{
              display: "flex",
              fontSize: 88,
              fontWeight: 700,
              color: "#8B6F47",
              lineHeight: 1.05,
            }}
          >
            Rebecca Tan
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 36,
              color: "#8B6F47",
              opacity: 0.9,
            }}
          >
            Solution Architect
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 12,
              padding: "12px 20px",
              backgroundColor: "rgba(232, 213, 209, 0.9)",
              borderRadius: 16,
              fontSize: 26,
              color: "#8B6F47",
              width: "auto",
              alignSelf: "flex-start",
            }}
          >
            Frontend experiences · CMS platforms
          </div>
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 24,
            color: "#8B6F47",
            opacity: 0.8,
          }}
        >
          Based in Singapore
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
