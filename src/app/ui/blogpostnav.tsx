import Link from "next/link";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import type { BlogPost } from "../lib/blog-posts";

type BlogPostNavProps = {
  previous: BlogPost | null;
  next: BlogPost | null;
};

export default function BlogPostNav({ previous, next }: BlogPostNavProps) {
  if (!previous && !next) {
    return null;
  }

  return (
    <nav
      aria-label="Blog post pagination"
      className="mt-12 pt-8 border-t border-accent/15 grid gap-8 sm:grid-cols-2 sm:gap-10"
    >
      {previous ? (
        <Link
          href={`/blog/${previous.slug}`}
          className="group flex flex-col gap-1.5 sm:items-start focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-accent/55">
            <FaArrowLeft aria-hidden="true" />
            Previous
          </span>
          <span className="text-base sm:text-lg font-semibold text-accent leading-snug group-hover:text-accent/70 transition-colors">
            {previous.title}
          </span>
        </Link>
      ) : (
        <div className="hidden sm:block" aria-hidden="true" />
      )}

      {next ? (
        <Link
          href={`/blog/${next.slug}`}
          className="group flex flex-col gap-1.5 sm:items-end sm:text-right focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-accent/55 sm:flex-row-reverse">
            Next
            <FaArrowRight aria-hidden="true" />
          </span>
          <span className="text-base sm:text-lg font-semibold text-accent leading-snug group-hover:text-accent/70 transition-colors">
            {next.title}
          </span>
        </Link>
      ) : null}
    </nav>
  );
}
