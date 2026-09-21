import { readFile } from "fs/promises";
import { join } from "path";
import { ImageResponse } from "next/og";
import { getBlogPostBySlug } from "../../../lib/blog-posts";

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
  const post = await getBlogPostBySlug(slug);
  const [bold, semibold, avatarSrc] = await Promise.all([
    loadLocalFont("700"),
    loadLocalFont("600"),
    loadAvatar(),
  ]);

  const story = post?.storyShare;
  const hook = story?.hook ?? "just dropped a note";
  const title = clip(
    story?.title ?? post?.title ?? "a little something from my blog",
    70
  );
  const blurb = clip(
    story?.blurb ??
      post?.summary ??
      "notes on search, CMS, and building digital experiences.",
    180
  );
  const cta = story?.cta ?? "recipes are on the link sticker";
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
          background:
            "linear-gradient(180deg, #FFF8F3 0%, #F8EDE6 45%, #F3E2DB 100%)",
          fontFamily: "Jakarta",
          padding: "100px 64px 96px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "-140px",
            left: "-120px",
            width: "420px",
            height: "420px",
            borderRadius: "999px",
            background: "#F2D4CC",
            opacity: 0.9,
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "180px",
            right: "-160px",
            width: "460px",
            height: "460px",
            borderRadius: "999px",
            background: "#E8C9B8",
            opacity: 0.45,
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "80px",
            left: "-100px",
            width: "300px",
            height: "300px",
            borderRadius: "999px",
            background: "#EAD8C8",
            opacity: 0.55,
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-40px",
            right: "-60px",
            width: "280px",
            height: "280px",
            borderRadius: "999px",
            background: "#E8B8AE",
            opacity: 0.35,
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 130,
            right: 96,
            width: 28,
            height: 28,
            borderRadius: 999,
            backgroundColor: "#C9897A",
            opacity: 0.5,
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 175,
            right: 150,
            width: 16,
            height: 16,
            borderRadius: 999,
            backgroundColor: "#8B6F47",
            opacity: 0.3,
            display: "flex",
          }}
        />

        {/* Avatar + hook */}
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
              width: 268,
              height: 268,
              borderRadius: 999,
              background:
                "linear-gradient(145deg, #F0D9D4 0%, #E0B8A8 50%, #C9897A 100%)",
              padding: 10,
              boxShadow: "0 18px 40px rgba(139, 111, 71, 0.18)",
            }}
          >
            {avatarSrc ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={avatarSrc}
                width={248}
                height={248}
                alt=""
                style={{
                  width: 248,
                  height: 248,
                  borderRadius: 999,
                  objectFit: "cover",
                }}
              />
            ) : (
              <div
                style={{
                  display: "flex",
                  width: 248,
                  height: 248,
                  borderRadius: 999,
                  backgroundColor: "#FFF8F3",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 72,
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
              boxShadow: "0 10px 28px rgba(139, 111, 71, 0.1)",
              fontSize: 28,
              fontWeight: 700,
              color: "#C9897A",
            }}
          >
            {hook}
          </div>
        </div>

        {/* Title + dual-lens takeaway */}
        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            gap: 20,
            backgroundColor: "rgba(255, 255, 255, 0.92)",
            borderRadius: 48,
            padding: "40px 42px 36px",
            border: "3px solid rgba(201, 137, 122, 0.22)",
            boxShadow: "0 22px 50px rgba(139, 111, 71, 0.12)",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: 10,
              flexWrap: "wrap",
            }}
          >
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

          <div
            style={{
              display: "flex",
              gap: 8,
              flexWrap: "wrap",
              marginTop: 4,
            }}
          >
            {["how-to", "brand", "shop", "help"].map((label) => (
              <div
                key={label}
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
                {label}
              </div>
            ))}
          </div>
        </div>

        {/* Sign-off + CTA */}
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
              background:
                "linear-gradient(135deg, #C9897A 0%, #8B6F47 100%)",
              fontSize: 28,
              fontWeight: 700,
              color: "#FFF8F3",
              boxShadow: "0 14px 30px rgba(139, 111, 71, 0.22)",
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
