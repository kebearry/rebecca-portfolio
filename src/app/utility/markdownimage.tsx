interface MarkdownImageProps {
  src?: string;
  alt?: string;
}

const MarkdownImage = ({ src, alt }: MarkdownImageProps) => {
  if (!src) return null;

  return (
    <span className="markdown-figure block">
      <span className="markdown-screenshot block">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt ?? "Project screenshot"} loading="lazy" />
      </span>
      {alt && alt !== "Example Image" && (
        <span className="markdown-figure-caption block">{alt}</span>
      )}
    </span>
  );
};

export default MarkdownImage;
