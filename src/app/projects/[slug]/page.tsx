// app/projects/[slug]/page.tsx
import { getPosts } from "../../lib/posts";
import ReactMarkdown from "react-markdown";
import Image from "next/image";
import Link from "next/link";
import { markdownComponents, caseStudyUrlTransform } from "../../utility/markdowncomponents";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { FaArrowLeft } from "react-icons/fa";

interface Post {
  slug: string;
  title: string;
  summary?: string;
  image?: string;
  type: string;
  industry: string;
  role: string;
  tools: string;
  fullContent: string;
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function PostPage({ params }: PageProps) {
  const resolvedParams = await params;
  const posts = await getPosts();
  const post = posts.find((p) => p.slug === resolvedParams.slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 pb-16">
      <HomeButton />
      <ProjectHeader post={post} />
      <ProjectDetails post={post} />
      <ProjectContent content={post.fullContent} />
    </article>
  );
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const posts = await getPosts();
  const post = posts.find((p) => p.slug === resolvedParams.slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: `${post.title} | Rebecca Tan`,
    description: post.summary ?? `Project details for ${post.title}`,
  };
}

function HomeButton() {
  return (
    <div className="z-50 fixed top-5 left-5 sm:top-6 sm:left-6">
      <Link
        href="/#projects"
        className="group flex items-center gap-2 glass-panel text-accent rounded-full px-4 py-2.5 sm:px-5 sm:py-3 font-semibold text-sm sm:text-base border border-white/60 hover:bg-secondary/80 hover:border-secondary transition duration-300 shadow-md"
      >
        <FaArrowLeft className="text-base sm:text-lg" aria-hidden="true" />
        <span>Back</span>
      </Link>
    </div>
  );
}

function ProjectHeader({ post }: { post: Post }) {
  if (!post.image) {
    return (
      <header className="mb-8 pt-14 sm:pt-16">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-accent leading-tight">
          {post.title}
        </h1>
        {post.summary && (
          <p className="mt-4 text-base sm:text-lg text-accent/75 max-w-3xl leading-relaxed">
            {post.summary}
          </p>
        )}
      </header>
    );
  }

  return (
    <header className="relative h-64 sm:h-80 md:h-[28rem] mb-8 rounded-2xl overflow-hidden shadow-lg">
      <Image
        src={post.image}
        alt={post.title}
        fill
        priority
        className="object-cover"
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-accent/80 via-accent/30 to-transparent"
        aria-hidden="true"
      />
      <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight max-w-4xl">
          {post.title}
        </h1>
        {post.summary && (
          <p className="mt-3 text-sm sm:text-base text-white/85 max-w-2xl leading-relaxed">
            {post.summary}
          </p>
        )}
      </div>
    </header>
  );
}

function ProjectDetails({ post }: { post: Post }) {
  const details = [
    { label: "Project Type", value: post.type },
    { label: "Industry", value: post.industry },
    { label: "Role", value: post.role },
    { label: "Tools", value: post.tools },
  ];

  return (
    <section className="glass-panel rounded-2xl p-6 sm:p-8 mb-8">
      <h2 className="text-lg font-bold text-accent mb-5">Project overview</h2>
      <dl className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
        {details.map(({ label, value }) => (
          <div key={label}>
            <dt className="text-xs font-semibold uppercase tracking-wider text-accent/60 mb-1">
              {label}
            </dt>
            <dd className="text-sm sm:text-base text-accent leading-relaxed">
              {value}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

function ProjectContent({ content }: { content: string }) {
  return (
    <section className="glass-panel rounded-2xl p-6 sm:p-8 lg:p-10 mb-8">
      <div className="prose prose-lg max-w-none text-accent markdown-content">
        <ReactMarkdown
          urlTransform={caseStudyUrlTransform}
          components={markdownComponents}
        >
          {content}
        </ReactMarkdown>
      </div>
    </section>
  );
}
