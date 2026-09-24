"use client";

import { FaInstagram, FaLinkedin, FaLink } from "react-icons/fa";
import { useMemo, useState, type MouseEvent } from "react";

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

/** Same-origin OG path so localhost and prod both work without hardcoding host. */
function linkedInThumbnailPathFromArticle(url: string): string {
  try {
    return `${new URL(url).pathname.replace(/\/$/, "")}/opengraph-image`;
  } catch {
    return "/opengraph-image";
  }
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

function downloadPngBlob(blob: Blob, fileName: string) {
  const objectUrl = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = objectUrl;
  anchor.download = fileName;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(objectUrl);
}

/** Sync copy keeps the user-gesture; async clipboard often fails once a new tab opens. */
function copyTextNow(text: string): boolean {
  try {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.setAttribute("readonly", "");
    ta.style.position = "fixed";
    ta.style.top = "0";
    ta.style.left = "0";
    ta.style.width = "1px";
    ta.style.height = "1px";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.focus();
    ta.select();
    ta.setSelectionRange(0, text.length);
    const ok = document.execCommand("copy");
    ta.remove();
    if (ok) return true;
  } catch {
    // Fall through.
  }
  return false;
}

async function copyTextAsync(text: string): Promise<boolean> {
  if (copyTextNow(text)) return true;
  try {
    if (!navigator.clipboard?.writeText) return false;
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}

/** LinkedIn hashtags: "Sitecore Search" → #SitecoreSearch */
function linkedInHashtags(tags: string[]): string {
  return tags
    .map((tag) => tag.replace(/[^a-zA-Z0-9]+/g, ""))
    .filter(Boolean)
    .map((tag) => `#${tag}`)
    .join(" ");
}

/** Caption for LinkedIn (no URL). The share-offsite card carries the link. */
function linkedInCaption(
  title: string,
  summary?: string,
  tags: string[] = []
): string {
  const parts = [title.trim()];
  const blurb = summary?.trim();
  if (blurb) parts.push(blurb);
  const hashtags = linkedInHashtags(tags);
  if (hashtags) parts.push(hashtags);
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
  const [showLinkedInImage, setShowLinkedInImage] = useState(false);

  // share-offsite builds the OG link card (what worked on older posts).
  // Feed composer prefills text but often skips the card. Copy caption on click.
  const linkedInUrl = useMemo(
    () =>
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    [url]
  );
  const linkedInShareCaption = useMemo(
    () => linkedInCaption(title, summary, tags),
    [title, summary, tags]
  );
  const storyImageUrl = useMemo(
    () => (instagramStory ? storyImageUrlFromArticle(url) : ""),
    [instagramStory, url]
  );
  const linkedInThumbnailUrl = useMemo(
    () => linkedInThumbnailPathFromArticle(url),
    [url]
  );

  const shareMessage = storyError || copyError;
  const shareHint = storyHint;

  const clearSoon = (clear: () => void, ms = 6000) => {
    window.setTimeout(clear, ms);
  };

  const handleLinkedInClick = (event: MouseEvent<HTMLAnchorElement>) => {
    // Copy in the same click gesture, then open LinkedIn. Doing clipboard
    // after the tab switch (or only via async clipboard) often fails silently.
    event.preventDefault();
    setCopyError(null);
    setStoryError(null);
    setStoryHint(null);

    const didCopySync = copyTextNow(linkedInShareCaption);
    if (didCopySync) {
      setStoryHint(
        "Caption copied. In LinkedIn, click the empty box and paste (Ctrl+V or Cmd+V)."
      );
      clearSoon(() => setStoryHint(null), 12000);
    }

    const opened = window.open(linkedInUrl, "_blank", "noopener,noreferrer");
    if (opened == null) {
      window.location.assign(linkedInUrl);
    }

    if (!didCopySync) {
      void (async () => {
        const didCopy = await copyTextAsync(linkedInShareCaption);
        if (didCopy) {
          setStoryHint(
            "Caption copied. In LinkedIn, click the empty box and paste (Ctrl+V or Cmd+V)."
          );
          clearSoon(() => setStoryHint(null), 12000);
        } else {
          setCopyError(
            "Couldn't copy the caption. Copy the title and summary yourself, then paste into LinkedIn."
          );
          clearSoon(() => setCopyError(null), 10000);
        }
      })();
    }
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
          downloadPngBlob(pngBlob, fileName);
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
        {/* share-offsite = OG link card. Caption is copied for paste above it. */}
        <a
          href={linkedInUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleLinkedInClick}
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

      {!showLinkedInImage ? (
        <button
          type="button"
          onClick={() => setShowLinkedInImage(true)}
          className="self-start text-sm text-accent/60 hover:text-accent transition-colors underline-offset-2 hover:underline"
        >
          Need a photo instead of the link card?
        </button>
      ) : (
        <div className="mt-1 max-w-lg">
          <div className="flex items-baseline justify-between gap-3 mb-2">
            <p className="text-sm font-medium text-accent/60">Cover image</p>
            <button
              type="button"
              onClick={() => setShowLinkedInImage(false)}
              className="text-sm text-accent/60 hover:text-accent transition-colors"
            >
              Hide
            </button>
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element -- dynamic OG route, not a static asset */}
          <img
            src={linkedInThumbnailUrl}
            alt={`LinkedIn share image for ${title}`}
            width={1200}
            height={630}
            className="w-full rounded-xl border border-accent/15 bg-white/40"
          />
          <p className="text-sm text-accent/60 mt-2">
            Optional. Attaching a photo replaces the link preview.{" "}
            <a
              href={linkedInThumbnailUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:text-accent"
            >
              Open the image
            </a>
            , save it, then attach it in LinkedIn with the image icon.
          </p>
        </div>
      )}

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
