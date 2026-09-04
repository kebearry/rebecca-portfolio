import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { FaArrowLeft } from "react-icons/fa";
import {
  estimateReadingTime,
  formatBlogDate,
  getBlogPostBySlug,
  getBlogSlugs,
} from "../../lib/blog-posts";
import {
  markdownComponents,
  markdownRemarkPlugins,
} from "../../utility/markdowncomponents";
import ShareArticle from "../../ui/sharearticle";
import BackToHomeSection from "../../ui/backtohomesection";
import BlogTagLink from "../../ui/blogtaglink";
const SITE_URL = "https://rebecca-portfolio.vercel.app";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getBlogSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const post = await getBlogPostBySlug(resolvedParams.slug);

  if (!post) {
    return { title: "Post Not Found" };
  }

  const articlePath = `/blog/${post.slug}`;

  return {
    title: `${post.title} | Rebecca Tan`,
    description: post.summary,
    authors: [{ name: "Rebecca Tan", url: SITE_URL }],
    alternates: {
      canonical: articlePath,
    },
    openGraph: {
      title: post.title,
      description: post.summary,
      type: "article",
      publishedTime: post.publishedAt,
      authors: ["Rebecca Tan"],
      tags: post.tags,
      url: articlePath,
      siteName: "Rebecca Tan",
      locale: "en_SG",
      images: [
        {
          url: `${articlePath}/opengraph-image`,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.summary,
      images: [`${articlePath}/twitter-image`],
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const resolvedParams = await params;
  const post = await getBlogPostBySlug(resolvedParams.slug);

  if (!post) {
    notFound();
  }

  const readingTime = estimateReadingTime(post.fullContent);
  const articleUrl = `${SITE_URL}/blog/${post.slug}`;

  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 pb-16">
      <div className="fixed top-5 left-5 sm:top-6 sm:left-6 z-50">
        <BackToHomeSection
          section="blog"
          className="group flex items-center gap-2 glass-panel text-accent rounded-full px-4 py-2.5 sm:px-5 sm:py-3 font-semibold text-sm sm:text-base border border-white/60 hover:bg-secondary/80 hover:border-secondary transition duration-300 shadow-md"
        >
          <FaArrowLeft className="text-base sm:text-lg" aria-hidden="true" />
          <span>Back</span>
        </BackToHomeSection>
      </div>
      <header className="pt-14 sm:pt-16 mb-8 sm:mb-10">
        <div className="flex flex-wrap items-center gap-3 text-sm text-accent/60 mb-4">
          <time dateTime={post.publishedAt}>
            {formatBlogDate(post.publishedAt)}
          </time>
          <span aria-hidden="true">·</span>
          <span>{readingTime} min read</span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-accent leading-tight mb-4">
          {post.title}
        </h1>

        <p className="text-base sm:text-lg text-accent/75 leading-relaxed">
          {post.summary}
        </p>

        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-6">
            {post.tags.map((tag) => (
              <BlogTagLink
                key={tag}
                tag={tag}
                className="bg-secondary text-accent rounded-full px-3 py-1 text-xs font-medium hover:bg-secondary/80 transition duration-200"
              />
            ))}
          </div>
        )}
      </header>

      <ShareArticle
        url={articleUrl}
        title={post.title}
        summary={post.summary}
        tags={post.tags}
      />

      <section className="glass-panel rounded-2xl p-6 sm:p-8 lg:p-10 mt-8">
        <div className="prose prose-lg max-w-none text-accent markdown-content">
          <ReactMarkdown
            remarkPlugins={markdownRemarkPlugins}
            components={markdownComponents}
          >
            {post.fullContent}
          </ReactMarkdown>
        </div>
      </section>
    </article>
  );
}
