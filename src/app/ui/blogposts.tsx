"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  blogTagFilterHref,
  type BlogPost,
} from "../lib/blog-posts";
import BlogPostCard from "./blogpostcard";

type BlogPostsProps = {
  posts: BlogPost[];
  tags: string[];
  initialTag?: string;
};

export default function BlogPosts({
  posts,
  tags,
  initialTag,
}: BlogPostsProps) {
  const router = useRouter();
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

  const selectTag = (tag?: string) => {
    setActiveTag(tag);
    router.replace(blogTagFilterHref(tag), { scroll: false });
  };

  return (
    <div className="space-y-8">
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
            className={`rounded-full px-3 py-1.5 text-xs font-medium transition duration-200 ${
              !activeTag
                ? "bg-accent text-primary"
                : "bg-secondary text-accent hover:bg-secondary/80"
            }`}
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
                className={`rounded-full px-3 py-1.5 text-xs font-medium transition duration-200 ${
                  isActive
                    ? "bg-accent text-primary"
                    : "bg-secondary text-accent hover:bg-secondary/80"
                }`}
              >
                {tag}
              </button>
            );
          })}
        </div>
      )}

      {filteredPosts.length > 0 ? (
        <ul
          className={`grid gap-6 sm:gap-8 list-none p-0 m-0 ${
            filteredPosts.length === 1
              ? "grid-cols-1 max-w-2xl"
              : "grid-cols-1 lg:grid-cols-2"
          }`}
        >
          {filteredPosts.map((post) => (
            <BlogPostCard key={post.slug} post={post} />
          ))}
        </ul>
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
