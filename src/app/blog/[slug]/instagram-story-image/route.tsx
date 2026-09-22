import { readFile } from "fs/promises";
import { join } from "path";
import { ImageResponse } from "next/og";
import { getBlogStoryShareBySlug } from "../../../lib/blog-story-share";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 30;

const size = {
  width: 1080,
  height: 1920,
};

interface RouteProps {
  params: Promise<{ slug: string }>;
}

function titleFontSize(title: string) {
  if (title.length > 70) return 52;
  if (title.length > 48) return 58;
  if (title.length > 32) return 64;
  return 72;
}

function clip(text: string, max: number) {
  const trimmed = (text ?? "").trim();
  if (trimmed.length <= max) return trimmed;
  return `${trimmed.slice(0, max - 1).trimEnd()}…`;
}

async function loadLocalFont(weight: "600" | "700") {
  try {
    const file =
      weight === "700" ? "plus-jakarta-700.woff" : "plus-jakarta-600.woff";
    return await readFile(join(process.cwd(), "public/fonts", file));
  } catch {
    return null;
  }
}

async function loadAvatar() {
  try {
    const data = await readFile(
      join(process.cwd(), "public/blog/story-avatar.png")
    );
    return `data:image/png;base64,${data.toString("base64")}`;
  } catch {
    return null;
  }
}

export async function GET(_request: Request, { params }: RouteProps) {
  const { slug } = await params;
  const meta = getBlogStoryShareBySlug(slug);
  const [bold, semibold, avatarSrc] = await Promise.all([
    loadLocalFont("700"),
    loadLocalFont("600"),
    loadAvatar(),
  ]);

  const story = meta?.storyShare;
  const hook = story?.hook ?? "just dropped a note";
  const title = clip(
    story?.title ?? meta?.postTitle ?? "a little something from my blog",
    70
  );
  const blurb = clip(
    story?.blurb ??
      meta?.summary ??
      "notes on search, CMS, and building digital experiences.",
    180
  );
  const cta = story?.cta ?? "full patterns on the link sticker";
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
    data: Buffer;
    style: "normal";
    weight: 600 | 700;
  }[];

  if (!fonts.length) {
    return new Response("Story image fonts unavailable", { status: 500 });
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#FBF6F1",
          fontFamily: "Jakarta",
          padding: "100px 64px 96px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "-120px",
            left: "-100px",
            width: "380px",
            height: "380px",
            borderRadius: "999px",
            background: "#F2D4CC",
            opacity: 0.85,
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-40px",
            right: "-60px",
            width: "300px",
            height: "300px",
            borderRadius: "999px",
            background: "#E8B8AE",
            opacity: 0.35,
            display: "flex",
          }}
        />

        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 24,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 240,
              height: 240,
              borderRadius: 999,
              background: "#E8D5D1",
              padding: 8,
            }}
          >
            {avatarSrc ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={avatarSrc}
                width={224}
                height={224}
                alt=""
                style={{
                  width: 224,
                  height: 224,
                  borderRadius: 999,
                  objectFit: "cover",
                }}
              />
            ) : (
              <div
                style={{
                  display: "flex",
                  width: 224,
                  height: 224,
                  borderRadius: 999,
                  backgroundColor: "#FFF8F3",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 64,
                  fontWeight: 700,
                  color: "#C9897A",
                }}
              >
                RT
              </div>
            )}
          </div>

          <div
            style={{
              display: "flex",
              padding: "16px 34px",
              borderRadius: 999,
              backgroundColor: "#FFFFFF",
              fontSize: 28,
              fontWeight: 700,
              color: "#C9897A",
            }}
          >
            {hook}
          </div>
        </div>

        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            gap: 20,
            backgroundColor: "#FFFFFF",
            borderRadius: 48,
            padding: "40px 42px 36px",
            border: "3px solid rgba(201, 137, 122, 0.22)",
          }}
        >
          <div style={{ display: "flex", gap: 10 }}>
            <div
              style={{
                display: "flex",
                padding: "8px 16px",
                borderRadius: 999,
                backgroundColor: "#F2D4CC",
                fontSize: 22,
                fontWeight: 700,
                color: "#8B6F47",
              }}
            >
              giants
            </div>
            <div
              style={{
                display: "flex",
                padding: "8px 16px",
                borderRadius: 999,
                backgroundColor: "#FFF8F3",
                border: "2px solid rgba(139, 111, 71, 0.2)",
                fontSize: 22,
                fontWeight: 700,
                color: "#C9897A",
              }}
            >
              + outdoor peers
            </div>
          </div>

          <div
            style={{
              display: "flex",
              fontSize,
              fontWeight: 700,
              color: "#4A3428",
              lineHeight: 1.18,
              letterSpacing: "-0.03em",
            }}
          >
            {title}
          </div>

          <div
            style={{
              display: "flex",
              fontSize: 30,
              fontWeight: 600,
              color: "#8B6F47",
              lineHeight: 1.4,
            }}
          >
            {blurb}
          </div>

          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <div
              style={{
                display: "flex",
                padding: "8px 14px",
                borderRadius: 999,
                backgroundColor: "rgba(232, 213, 209, 0.7)",
                fontSize: 20,
                fontWeight: 700,
                color: "#8B6F47",
              }}
            >
              how-to
            </div>
            <div
              style={{
                display: "flex",
                padding: "8px 14px",
                borderRadius: 999,
                backgroundColor: "rgba(232, 213, 209, 0.7)",
                fontSize: 20,
                fontWeight: 700,
                color: "#8B6F47",
              }}
            >
              brand
            </div>
            <div
              style={{
                display: "flex",
                padding: "8px 14px",
                borderRadius: 999,
                backgroundColor: "rgba(232, 213, 209, 0.7)",
                fontSize: 20,
                fontWeight: 700,
                color: "#8B6F47",
              }}
            >
              shop
            </div>
            <div
              style={{
                display: "flex",
                padding: "8px 14px",
                borderRadius: 999,
                backgroundColor: "rgba(232, 213, 209, 0.7)",
                fontSize: 20,
                fontWeight: 700,
                color: "#8B6F47",
              }}
            >
              help
            </div>
          </div>
        </div>

        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 18,
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 28,
              fontWeight: 700,
              color: "#5C4636",
            }}
          >
            Rebecca · search notes
          </div>
          <div
            style={{
              display: "flex",
              padding: "20px 40px",
              borderRadius: 999,
              backgroundColor: "#8B6F47",
              fontSize: 28,
              fontWeight: 700,
              color: "#FFF8F3",
            }}
          >
            {cta}
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
