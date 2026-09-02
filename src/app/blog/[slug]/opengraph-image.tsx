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

export default async function OpenGraphImage({ params }: ImageProps) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  const title =
    post?.title ?? "Rebecca Tan | Solution Architect";
  const summary =
    post?.summary ??
    "Notes on CMS architecture, frontend delivery, and building digital experiences.";
  const date = post ? formatBlogDate(post.publishedAt) : "";
  const tag = post?.tags[0] ?? "Blog";

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
            "linear-gradient(135deg, #F5F0EB 0%, #E8D5D1 50%, #F2E8E5 100%)",
          padding: "72px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 24,
              color: "#8B6F47",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            Blog
          </div>
          <div
            style={{
              display: "flex",
              padding: "10px 18px",
              backgroundColor: "rgba(232, 213, 209, 0.95)",
              borderRadius: 999,
              fontSize: 22,
              color: "#8B6F47",
            }}
          >
            {tag}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              display: "flex",
              fontSize: 58,
              fontWeight: 700,
              color: "#8B6F47",
              lineHeight: 1.1,
              maxWidth: "1000px",
            }}
          >
            {title}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 28,
              color: "#8B6F47",
              opacity: 0.85,
              lineHeight: 1.4,
              maxWidth: "920px",
            }}
          >
            {summary}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 24,
            color: "#8B6F47",
            opacity: 0.85,
          }}
        >
          <div style={{ display: "flex" }}>Rebecca Tan</div>
          {date ? <div style={{ display: "flex" }}>{date}</div> : null}
        </div>
      </div>
    ),
    { ...size }
  );
}
