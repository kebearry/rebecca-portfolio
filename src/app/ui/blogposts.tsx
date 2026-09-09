"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  blogTagFilterHref,
  type BlogPost,
} from "../lib/blog-posts";
import BlogPostCard from "./blogpostcard";

const DEFAULT_PAGE_SIZE = 4;
const PAGE_SIZE_OPTIONS = [2, 4, 6, 8] as const;

type BlogPostsProps = {
  posts: BlogPost[];
  tags: string[];
  initialTag?: string;
  pageSize?: number;
};

export default function BlogPosts({
  posts,
  tags,
  initialTag,
  pageSize = DEFAULT_PAGE_SIZE,
}: BlogPostsProps) {
  const router = useRouter();
  const defaultStep = PAGE_SIZE_OPTIONS.includes(
    pageSize as (typeof PAGE_SIZE_OPTIONS)[number]
  )
    ? pageSize
    : DEFAULT_PAGE_SIZE;

  const [step, setStep] = useState(defaultStep);
  const [visibleCount, setVisibleCount] = useState(defaultStep);
  const [activeTag, setActiveTag] = useState<string | undefined>(() => {
    if (!initialTag) return undefined;
    return tags.includes(initialTag) ? initialTag : undefined;
  });

  useEffect(() => {
    if (!initialTag) {
      setActiveTag(undefined);
      return;
    }
    setActiveTag(tags.includes(initialTag) ? initialTag : undefined);
  }, [initialTag, tags]);

  const filteredPosts = activeTag
    ? posts.filter((post) => post.tags.includes(activeTag))
    : posts;

  const visiblePosts = filteredPosts.slice(0, visibleCount);
  const hasMore = visibleCount < filteredPosts.length;
  const canShowLess = visibleCount > step;
  const showPageSizeControl = filteredPosts.length > PAGE_SIZE_OPTIONS[0];

  const selectTag = (tag?: string) => {
    setActiveTag(tag);
    setVisibleCount(step);
    router.replace(blogTagFilterHref(tag), { scroll: false });
  };

  const selectPageSize = (size: number) => {
    setStep(size);
    setVisibleCount(size);
  };

  const chipClassName = (isActive: boolean) =>
    `rounded-full px-3 py-1.5 text-xs font-medium transition duration-200 ${
      isActive
        ? "bg-accent text-primary"
        : "bg-secondary text-accent hover:bg-secondary/80"
    }`;

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
        {tags.length > 0 && (
          <div
            className="flex flex-wrap gap-2"
            role="group"
            aria-label="Filter blog posts by tag"
          >
            <button
              type="button"
              onClick={() => selectTag(undefined)}
              aria-pressed={!activeTag}
              className={chipClassName(!activeTag)}
            >
              All
            </button>
            {tags.map((tag) => {
              const isActive = activeTag === tag;
              return (
                <button
                  key={tag}
                  type="button"
                  onClick={() => selectTag(tag)}
                  aria-pressed={isActive}
                  className={chipClassName(isActive)}
                >
                  {tag}
                </button>
              );
            })}
          </div>
        )}

        {showPageSizeControl && (
          <div className="flex flex-wrap items-center gap-3">
            <span
              id="blog-page-size-label"
              className="text-xs font-medium text-accent/60"
            >
              Per page
            </span>
            <div
              className="inline-flex overflow-hidden rounded-md border border-accent/25"
              role="group"
              aria-labelledby="blog-page-size-label"
            >
              {PAGE_SIZE_OPTIONS.map((size, index) => {
                const isActive = step === size;
                return (
                  <button
                    key={size}
                    type="button"
                    onClick={() => selectPageSize(size)}
                    aria-pressed={isActive}
                    className={`min-w-10 px-3 py-1.5 text-xs font-semibold tabular-nums transition duration-200 ${
                      index > 0 ? "border-l border-accent/25" : ""
                    } ${
                      isActive
                        ? "bg-accent text-primary"
                        : "bg-transparent text-accent hover:bg-secondary/70"
                    }`}
                  >
                    {size}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {filteredPosts.length > 0 ? (
        <>
          <ul
            className={`grid gap-6 sm:gap-8 list-none p-0 m-0 ${
              visiblePosts.length === 1
                ? "grid-cols-1 max-w-2xl"
                : "grid-cols-1 lg:grid-cols-2"
            }`}
          >
            {visiblePosts.map((post) => (
              <BlogPostCard key={post.slug} post={post} />
            ))}
          </ul>

          {(hasMore || canShowLess) && (
            <div className="flex flex-wrap justify-center gap-3 pt-2">
              {hasMore && (
                <button
                  type="button"
                  onClick={() =>
                    setVisibleCount((count) =>
                      Math.min(count + step, filteredPosts.length)
                    )
                  }
                  className="inline-flex items-center rounded-full px-6 py-3 text-sm sm:text-base font-semibold bg-accent text-primary border border-accent hover:bg-accent/90 transition duration-200"
                >
                  Show more
                </button>
              )}
              {canShowLess && (
                <button
                  type="button"
                  onClick={() => setVisibleCount(step)}
                  className="inline-flex items-center rounded-full px-6 py-3 text-sm sm:text-base font-semibold text-accent border border-accent/30 hover:bg-secondary/80 transition duration-200"
                >
                  Show less
                </button>
              )}
            </div>
          )}
        </>
      ) : (
        <div className="glass-panel rounded-2xl p-8 sm:p-10 max-w-2xl">
          <h3 className="text-xl font-bold text-accent mb-3">
            No posts with this tag
          </h3>
          <p className="text-accent/75 leading-relaxed mb-4">
            Try another tag, or show everything again.
          </p>
          <button
            type="button"
            onClick={() => selectTag(undefined)}
            className="font-semibold text-accent hover:text-accent/70 transition duration-200"
          >
            Clear filter
          </button>
        </div>
      )}
    </div>
  );
}
