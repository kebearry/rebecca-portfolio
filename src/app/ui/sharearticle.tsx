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

function isIosDevice() {
  if (typeof navigator === "undefined") return false;
  return /iPad|iPhone|iPod/.test(navigator.userAgent);
}

/** LinkedIn hashtags: "Sitecore Search" → #SitecoreSearch */
function linkedInHashtags(tags: string[]): string {
  return tags
    .map((tag) => tag.replace(/[^a-zA-Z0-9]+/g, ""))
    .filter(Boolean)
    .map((tag) => `#${tag}`)
    .join(" ");
}

/** Prefill body for LinkedIn's feed composer (plain text only). */
function linkedInShareText(
  url: string,
  title: string,
  summary?: string,
  tags: string[] = []
): string {
  const parts = [title.trim()];
  const blurb = summary?.trim();
  if (blurb) parts.push(blurb);
  const hashtags = linkedInHashtags(tags);
  if (hashtags) parts.push(hashtags);
  parts.push(url);
  return parts.join("\n\n");
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
  const [storyHint, setStoryHint] = useState<string | null>(null);

  // Feed composer prefills the post body. share-offsite only takes a URL and
  // leaves the composer empty (LinkedIn dropped title/summary params years ago).
  const linkedInUrl = useMemo(() => {
    const text = linkedInShareText(url, title, summary, tags);
    return `https://www.linkedin.com/feed/?shareActive=true&text=${encodeURIComponent(text)}`;
  }, [url, title, summary, tags]);
  const storyImageUrl = useMemo(
    () => (instagramStory ? storyImageUrlFromArticle(url) : ""),
    [instagramStory, url]
  );

  const shareMessage = storyError || copyError;
  const shareHint = storyHint;

  const clearSoon = (clear: () => void, ms = 6000) => {
    window.setTimeout(clear, ms);
  };

  const handleCopy = async () => {
    setCopyError(null);
    setStoryError(null);
    setStoryHint(null);
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
      clearSoon(() => setCopyError(null));
    }
  };

  const openStoryImageForManualSave = () => {
    // iOS Safari ignores <a download>. Opening the image lets the user long-press → Save Image.
    const opened = window.open(storyImageUrl, "_blank", "noopener,noreferrer");
    if (opened == null) {
      window.location.assign(storyImageUrl);
    }
    setStoryStatus("saved");
    setStoryHint(
      isIosDevice()
        ? "Story image opened. Long-press the image, tap Save, then share it to Instagram Stories from your Photos."
        : "Story image opened. Save it, then upload it to an Instagram Story."
    );
    clearSoon(() => {
      setStoryHint(null);
      setStoryStatus("idle");
    }, 8000);
  };

  const handleInstagramStory = async () => {
    setStoryStatus("working");
    setStoryError(null);
    setStoryHint(null);
    setCopyError(null);

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
        if (response.status === 504 || response.status === 408) {
          throw new Error(
            "Story image timed out on the server (504). Wait a moment and try again."
          );
        }
        throw new Error(
          `Couldn't create the story image (HTTP ${response.status}). Refresh the page and try again.`
        );
      }

      const rawBlob = await response.blob();
      if (!rawBlob.size) {
        throw new Error(
          "The story image came back empty. Refresh the page and try again."
        );
      }

      const pngBlob =
        rawBlob.type === "image/png"
          ? rawBlob
          : new Blob([rawBlob], { type: "image/png" });
      const fileName = `${slugFromArticleUrl(url)}-instagram-story.png`;
      const file = new File([pngBlob], fileName, { type: "image/png" });

      const canUseWebShare = typeof navigator.share === "function";
      const canShareFiles =
        canUseWebShare &&
        (typeof navigator.canShare !== "function" ||
          navigator.canShare({ files: [file] }));

      if (canShareFiles) {
        try {
          await navigator.share({
            files: [file],
            title,
            text: summary?.trim() || title,
          });
          setStoryStatus("shared");
          setStoryHint(
            "Pick Instagram from the share sheet, then add it as a Story."
          );
          clearSoon(() => {
            setStoryHint(null);
            setStoryStatus("idle");
          }, 5000);
          return;
        } catch (error) {
          if (isAbortError(error)) {
            setStoryStatus("idle");
            return;
          }
          // Fall through to the iOS-friendly open-image path.
        }
      }

      // Desktop download fallback (works in Chrome/Firefox; not reliable on iOS Safari).
      if (!isIosDevice()) {
        try {
          const objectUrl = URL.createObjectURL(pngBlob);
          const anchor = document.createElement("a");
          anchor.href = objectUrl;
          anchor.download = fileName;
          document.body.appendChild(anchor);
          anchor.click();
          anchor.remove();
          URL.revokeObjectURL(objectUrl);
          setStoryStatus("saved");
          setStoryHint(
            "Story image downloaded. Upload that PNG to an Instagram Story."
          );
          clearSoon(() => {
            setStoryHint(null);
            setStoryStatus("idle");
          }, 6000);
          return;
        } catch {
          // Fall through.
        }
      }

      openStoryImageForManualSave();
    } catch (error) {
      setStoryStatus("error");
      const message =
        error instanceof Error && error.message
          ? error.message
          : "Instagram Story share failed for an unknown reason. Try again, or use Copy link.";
      setStoryError(message);
      clearSoon(() => {
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
          ? "Image ready"
          : storyStatus === "error"
            ? "Try again"
            : "Instagram Story";

  return (
    <div className="flex flex-col gap-2 pt-6 border-t border-accent/10">
      <div className="flex flex-wrap items-center gap-3">
        <span className="text-sm font-medium text-accent/60">Share</span>
        {/* Real link avoids iOS window.open / noopener null pitfalls */}
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
      {shareMessage ? (
        <p
          role="alert"
          aria-live="polite"
          className="text-sm text-red-700/90 max-w-xl"
        >
          {shareMessage}
        </p>
      ) : null}
      {shareHint && !shareMessage ? (
        <p aria-live="polite" className="text-sm text-accent/70 max-w-xl">
          {shareHint}
        </p>
      ) : null}
    </div>
  );
};

export default ShareArticle;
