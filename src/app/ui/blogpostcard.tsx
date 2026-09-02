import Link from "next/link";
import {
  estimateReadingTime,
  formatBlogDate,
  type BlogPost,
} from "../lib/blog-posts";

type BlogPostCardProps = {
  post: BlogPost;
};

const BlogPostCard = ({ post }: BlogPostCardProps) => {
  const readingTime = estimateReadingTime(post.fullContent);

  return (
    <li className="glass-card rounded-2xl p-6 sm:p-8 flex flex-col h-full transition duration-300 hover:shadow-lg">
      <div className="flex flex-wrap items-center gap-3 text-sm text-accent/60 mb-4">
        <time dateTime={post.publishedAt}>{formatBlogDate(post.publishedAt)}</time>
        <span aria-hidden="true">·</span>
        <span>{readingTime} min read</span>
      </div>

      <h2 className="text-xl sm:text-2xl font-bold text-accent mb-3 leading-snug">
        <Link
          href={`/blog/${post.slug}`}
          className="hover:text-accent/80 transition-colors"
        >
          {post.title}
        </Link>
      </h2>

      <p className="text-accent/75 leading-relaxed mb-5 flex-1">
        {post.summary}
      </p>

      {post.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="bg-secondary text-accent rounded-full px-3 py-1 text-xs font-medium"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      <Link
        href={`/blog/${post.slug}`}
        className="font-semibold inline-flex items-center text-accent hover:text-accent/70 transition duration-200"
      >
        Read article →
      </Link>
    </li>
  );
};

export default BlogPostCard;
