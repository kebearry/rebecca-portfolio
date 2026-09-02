"use client";

import { FaLinkedin, FaLink } from "react-icons/fa";
import { useMemo, useState } from "react";

interface ShareArticleProps {
  url: string;
  title: string;
  summary?: string;
  tags?: string[];
}

function toHashtag(tag: string): string {
  const normalized = tag.replace(/[^a-zA-Z0-9]/g, "");
  return normalized ? `#${normalized}` : "";
}

function buildLinkedInShareText({
  title,
  url,
  summary,
  tags = [],
}: ShareArticleProps): string {
  const hashtags = tags.map(toHashtag).filter(Boolean).join(" ");
  const intro = summary?.trim() || title;
  const parts = [intro, url];

  if (hashtags) {
    parts.push(hashtags);
  }

  return parts.join("\n\n");
}

const ShareArticle = ({ url, title, summary, tags = [] }: ShareArticleProps) => {
  const [copied, setCopied] = useState(false);

  const shareText = useMemo(
    () => buildLinkedInShareText({ url, title, summary, tags }),
    [url, title, summary, tags]
  );

  const linkedInUrl = `https://www.linkedin.com/feed/?shareActive=true&text=${encodeURIComponent(shareText)}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-3 pt-6 border-t border-accent/10">
      <span className="text-sm font-medium text-accent/60">Share</span>
      <a
        href={linkedInUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Share "${title}" on LinkedIn`}
        className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold bg-[#0077b5] text-white hover:bg-[#005c8e] transition duration-200"
      >
        <FaLinkedin aria-hidden="true" />
        LinkedIn
      </a>
      <button
        type="button"
        onClick={handleCopy}
        className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-accent border border-accent/30 hover:bg-white/40 transition duration-200"
      >
        <FaLink aria-hidden="true" />
        {copied ? "Copied!" : "Copy link"}
      </button>
    </div>
  );
};

export default ShareArticle;
