export type BlogPostStoryShare = {
  hook: string;
  title: string;
  blurb: string;
  cta: string;
  /** Top pills on the story card (1–2 short labels). */
  badges?: string[];
  /** Small chips under the blurb. */
  chips?: string[];
  /** Line above the CTA, e.g. "Rebecca · performance notes". */
  footer?: string;
};

export type BlogStoryShareMeta = {
  slug: string;
  postTitle: string;
  summary: string;
  storyShare: BlogPostStoryShare;
};

/**
 * Lightweight story metadata for the Instagram image route.
 * Keep this file free of post bodies so Vercel can render stories without
 * loading the full blog-posts module (avoids 504 timeouts).
 */
export const BLOG_STORY_SHARES: BlogStoryShareMeta[] = [
  {
    slug: "serp-ui-patterns",
    postTitle: "Planning Search UI: Patterns from Giants and Peer Industries",
    summary:
      "Big engines teach results-page modules. Peer industries teach which recipe fits your site. A pattern pass for anyone planning search UI, with Trailworks examples.",
    storyShare: {
      hook: "steal this if you build site search",
      title: "not every search needs the same page",
      blurb:
        "sample industry: outdoor retail. Google shows the building blocks. outdoor peers show which layout fits which job. four layouts inside.",
      cta: "full patterns on the link sticker",
      badges: ["giants", "+ outdoor peers"],
      chips: ["how-to", "brand", "shop", "help"],
      footer: "Rebecca · search notes",
    },
  },
  {
    slug: "website-performance-assessment",
    postTitle: "When Everyone Says the Site Is Slow",
    summary:
      "A short performance pass for any site: compare a few pages, name the pattern, split tags from your own code, then assign owners.",
    storyShare: {
      hook: "hold up. which pages though?",
      title: "when everyone says the site is slow",
      blurb:
        "someone drops a red score. tags get blamed. hosting gets blamed. rewrite gets floated. still nobody opened three pages side by side.",
      cta: "playbook on the link sticker",
      badges: ["blame meeting", "+ short pass"],
      chips: ["urls", "pattern", "owners"],
      footer: "Rebecca · performance notes",
    },
  },
];

export function getBlogStoryShareBySlug(
  slug: string
): BlogStoryShareMeta | undefined {
  return BLOG_STORY_SHARES.find((entry) => entry.slug === slug);
}

export function hasBlogStoryShare(slug: string): boolean {
  return Boolean(getBlogStoryShareBySlug(slug));
}
