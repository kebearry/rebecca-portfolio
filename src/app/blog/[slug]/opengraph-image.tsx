import { ImageResponse } from "next/og";
import { formatBlogDate, getBlogPostBySlug } from "../../lib/blog-posts";

export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

interface ImageProps {
  params: Promise<{ slug: string }>;
}

function titleFontSize(title: string) {
  if (title.length > 90) return 48;
  if (title.length > 70) return 54;
  if (title.length > 48) return 60;
  return 68;
}

async function loadFont(weight: "600" | "700") {
  try {
    const file =
      weight === "700" ? "latin-700-normal.woff" : "latin-600-normal.woff";
    const res = await fetch(
      `https://cdn.jsdelivr.net/fontsource/fonts/plus-jakarta-sans@5.2.5/${file}`
    );
    if (!res.ok) return null;
    return res.arrayBuffer();
  } catch {
    return null;
  }
}

export default async function OpenGraphImage({ params }: ImageProps) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  const [bold, semibold] = await Promise.all([
    loadFont("700"),
    loadFont("600"),
  ]);

  const title = post?.title ?? "Rebecca Tan | Solution Architect";
  const date = post ? formatBlogDate(post.publishedAt) : "";
  const fontSize = titleFontSize(title);
  const fonts = [
    bold
      ? {
          name: "Jakarta",
          data: bold,
          style: "normal" as const,
          weight: 700 as const,
        }
      : null,
    semibold
      ? {
          name: "Jakarta",
          data: semibold,
          style: "normal" as const,
          weight: 600 as const,
        }
      : null,
  ].filter(Boolean) as {
    name: string;
    data: ArrayBuffer;
    style: "normal";
    weight: 600 | 700;
  }[];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#F4EFE8",
          fontFamily: fonts.length ? "Jakarta" : "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            flex: 1,
            position: "relative",
            overflow: "hidden",
            padding: "56px 64px 40px",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "-40px",
              right: "-60px",
              width: "420px",
              height: "420px",
              borderRadius: "999px",
              background: "#E8D5D1",
              opacity: 0.85,
              display: "flex",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: "120px",
              right: "80px",
              width: "180px",
              height: "180px",
              borderRadius: "999px",
              background: "#C4A484",
              opacity: 0.35,
              display: "flex",
            }}
          />
          <div
            style={{
              position: "absolute",
              right: "120px",
              top: "190px",
              width: "120px",
              height: "120px",
              backgroundColor: "#8B6F47",
              transform: "rotate(45deg)",
              opacity: 0.12,
              display: "flex",
            }}
          />

          <div
            style={{
              position: "relative",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              gap: 28,
              maxWidth: 1040,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
              }}
            >
              <div
                style={{
                  display: "flex",
                  width: 14,
                  height: 14,
                  backgroundColor: "#8B6F47",
                  transform: "rotate(45deg)",
                }}
              />
              <div
                style={{
                  display: "flex",
                  fontSize: 22,
                  fontWeight: 600,
                  color: "#8B6F47",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                }}
              >
                Blog
              </div>
            </div>

            <div
              style={{
                display: "flex",
                fontSize,
                fontWeight: 700,
                color: "#3F2F22",
                lineHeight: 1.12,
                letterSpacing: "-0.03em",
              }}
            >
              {title}
            </div>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: "#8B6F47",
            color: "#F7F3EE",
            padding: "28px 64px",
            fontSize: 24,
            fontWeight: 600,
          }}
        >
          <div style={{ display: "flex" }}>Rebecca Tan</div>
          <div style={{ display: "flex", opacity: 0.9 }}>
            {date || "Solution Architect"}
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts,
    }
  );
}
