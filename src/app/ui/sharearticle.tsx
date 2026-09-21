"use client";

import { FaInstagram, FaLinkedin, FaLink } from "react-icons/fa";
import { useMemo, useState } from "react";

interface ShareArticleProps {
  url: string;
  title: string;
  summary?: string;
  tags?: string[];
  /** Only show Instagram Story when the post defines storyShare copy. */
  instagramStory?: boolean;
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

function storyImageUrlFromArticle(url: string): string {
  return `${url.replace(/\/$/, "")}/instagram-story-image`;
}

function slugFromArticleUrl(url: string): string {
  try {
    const path = new URL(url).pathname.replace(/\/$/, "");
    const parts = path.split("/");
    return parts[parts.length - 1] || "story";
  } catch {
    return "story";
  }
}

function isAbortError(error: unknown): boolean {
  return (
    (error instanceof DOMException && error.name === "AbortError") ||
    (error instanceof Error && error.name === "AbortError")
  );
}

const ShareArticle = ({
  url,
  title,
  summary,
  tags = [],
  instagramStory = false,
}: ShareArticleProps) => {
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState<string | null>(null);
  const [storyStatus, setStoryStatus] = useState<
    "idle" | "working" | "shared" | "saved" | "error"
  >("idle");
  const [storyError, setStoryError] = useState<string | null>(null);
  const [linkedInError, setLinkedInError] = useState<string | null>(null);

  const shareText = useMemo(
    () => buildLinkedInShareText({ url, title, summary, tags }),
    [url, title, summary, tags]
  );

  const linkedInUrl = `https://www.linkedin.com/feed/?shareActive=true&text=${encodeURIComponent(shareText)}`;
  const storyImageUrl = useMemo(
    () => (instagramStory ? storyImageUrlFromArticle(url) : ""),
    [instagramStory, url]
  );

  const shareError = storyError || linkedInError || copyError;

  const clearErrorsSoon = (clear: () => void, ms = 5000) => {
    window.setTimeout(clear, ms);
  };

  const handleCopy = async () => {
    setCopyError(null);
    setLinkedInError(null);
    setStoryError(null);
    try {
      if (!navigator.clipboard?.writeText) {
        throw new Error("clipboard-unsupported");
      }
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      setCopied(false);
      const message =
        error instanceof Error && error.message === "clipboard-unsupported"
          ? "Couldn't copy the link. This browser does not allow clipboard access."
          : "Couldn't copy the link. Your browser may be blocking clipboard access, or the page is not on HTTPS.";
      setCopyError(message);
      clearErrorsSoon(() => setCopyError(null));
    }
  };

  const handleLinkedIn = () => {
    setCopyError(null);
    setStoryError(null);
    setLinkedInError(null);

    const popup = window.open(linkedInUrl, "_blank", "noopener,noreferrer");
    if (popup == null) {
      setLinkedInError(
        "Couldn't open LinkedIn. Your browser blocked the pop-up. Allow pop-ups for this site, or use Copy link."
      );
      clearErrorsSoon(() => setLinkedInError(null));
    }
  };

  const handleInstagramStory = async () => {
    setStoryStatus("working");
    setStoryError(null);
    setCopyError(null);
    setLinkedInError(null);

    try {
      let response: Response;
      try {
        response = await fetch(storyImageUrl);
      } catch {
        throw new Error(
          "Couldn't download the story image. Check your connection and try again."
        );
      }

      if (!response.ok) {
        throw new Error(
          `Couldn't create the story image (HTTP ${response.status}). Refresh the page and try again.`
        );
      }

      const blob = await response.blob();
      if (!blob.size) {
        throw new Error(
          "The story image came back empty. Refresh the page and try again."
        );
      }

      const fileName = `${slugFromArticleUrl(url)}-instagram-story.png`;
      const file = new File([blob], fileName, { type: "image/png" });

      const canShareFiles =
        typeof navigator.share === "function" &&
        typeof navigator.canShare === "function" &&
        navigator.canShare({ files: [file] });

      if (canShareFiles) {
        try {
          await navigator.share({
            files: [file],
            title,
            text: summary?.trim() || title,
          });
          setStoryStatus("shared");
        } catch (error) {
          if (isAbortError(error)) {
            setStoryStatus("idle");
            return;
          }
          throw new Error(
            "Couldn't open the share sheet. Your browser or device blocked file sharing. Try Copy link, or save the image from a mobile browser."
          );
        }
      } else {
        try {
          const objectUrl = URL.createObjectURL(blob);
          const anchor = document.createElement("a");
          anchor.href = objectUrl;
          anchor.download = fileName;
          document.body.appendChild(anchor);
          anchor.click();
          anchor.remove();
          URL.revokeObjectURL(objectUrl);
          setStoryStatus("saved");
        } catch {
          throw new Error(
            "This browser can't share files to Instagram, and saving the story image failed. Try Chrome or Safari on your phone."
          );
        }
      }

      window.setTimeout(() => setStoryStatus("idle"), 2800);
    } catch (error) {
      setStoryStatus("error");
      const message =
        error instanceof Error && error.message
          ? error.message
          : "Instagram Story share failed for an unknown reason. Try again, or use Copy link.";
      setStoryError(message);
      clearErrorsSoon(() => {
        setStoryError(null);
        setStoryStatus("idle");
      });
    }
  };

  const instagramLabel =
    storyStatus === "working"
      ? "Making story…"
      : storyStatus === "shared"
        ? "Opened share"
        : storyStatus === "saved"
          ? "Story saved"
          : storyStatus === "error"
            ? "Try again"
            : "Instagram Story";

  return (
    <div className="flex flex-col gap-2 pt-6 border-t border-accent/10">
      <div className="flex flex-wrap items-center gap-3">
        <span className="text-sm font-medium text-accent/60">Share</span>
        <button
          type="button"
          onClick={handleLinkedIn}
          aria-label={`Share "${title}" on LinkedIn`}
          className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold bg-[#0077b5] text-white hover:bg-[#005c8e] transition duration-200"
        >
          <FaLinkedin aria-hidden="true" />
          LinkedIn
        </button>
        {instagramStory ? (
          <button
            type="button"
            onClick={handleInstagramStory}
            disabled={storyStatus === "working"}
            aria-label={`Create an Instagram Story image for "${title}"`}
            className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold bg-gradient-to-r from-[#f58529] via-[#dd2a7b] to-[#8134af] text-white hover:opacity-90 transition duration-200 disabled:opacity-70"
          >
            <FaInstagram aria-hidden="true" />
            {instagramLabel}
          </button>
        ) : null}
        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-accent border border-accent/30 hover:bg-white/40 transition duration-200"
        >
          <FaLink aria-hidden="true" />
          {copied ? "Copied!" : "Copy link"}
        </button>
      </div>
      {shareError ? (
        <p
          role="alert"
          aria-live="polite"
          className="text-sm text-red-700/90 max-w-xl"
        >
          {shareError}
        </p>
      ) : null}
    </div>
  );
};

export default ShareArticle;
