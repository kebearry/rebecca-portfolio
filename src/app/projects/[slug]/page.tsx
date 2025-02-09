// app/projects/[slug]/page.tsx
import { getPosts } from "../../lib/posts";
import ReactMarkdown from "react-markdown";
import Image from "next/image";
import Link from "next/link";
import LinkRenderer from "../../utility/linkrenderer";
import { notFound } from "next/navigation";
import { Metadata } from "next";

interface Post {
  slug: string;
  title: string;
  image?: string;
  type: string;
  industry: string;
  role: string;
  tools: string;
  fullContent: string;
}

interface PageProps {
  params: Promise<{ slug: string }>; // Adjusting to reflect that params is asynchronous
}

export default async function PostPage({ params }: PageProps) {
  const resolvedParams = await params; // Await params to access slug
  const posts = await getPosts();
  const post = posts.find((p) => p.slug === resolvedParams.slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="max-w-screen-xl mx-auto p-6">
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
  const resolvedParams = await params; // Await params to access slug
  const posts = await getPosts();
  const post = posts.find((p) => p.slug === resolvedParams.slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: post.title,
    description: `Project details for ${post.title}`,
  };
}

function HomeButton() {
  return (
    <div className="z-50 fixed top-6 right-6">
      <Link href="/" className="group">
        <div className="flex items-center gap-2 bg-highlight text-white rounded-lg p-5 shadow-2xl transition-all duration-300 hover:bg-green-600 hover:scale-105">
          <span className="text-2xl" aria-hidden="true">
            🏠
          </span>
          <span className="font-bold">Back to Home</span>
        </div>
      </Link>
    </div>
  );
}

function ProjectHeader({ post }: { post: Post }) {
  if (!post.image) return null;

  return (
    <div className="relative h-[40rem] mb-8">
      <Image
        src={post.image}
        alt={post.title}
        fill
        priority
        className="rounded-lg shadow-lg object-cover"
      />
      <div
        className="absolute inset-0 bg-black opacity-40 rounded-lg"
        aria-hidden="true"
      />
      <h1 className="absolute top-1/2 left-8 -translate-y-1/2 text-white text-4xl font-bold sm:text-5xl shadow-lg">
        {post.title}
      </h1>
    </div>
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
    <section className="bg-[#9e7a68] text-white p-6 rounded-lg shadow-md mb-8">
      <ul className="space-y-4 text-lg">
        {details.map(({ label, value }) => (
          <li key={label}>
            <strong>{label}:</strong> {value}
          </li>
        ))}
      </ul>
    </section>
  );
}

function ProjectContent({ content }: { content: string }) {
  return (
    <div className="prose prose-lg text-gray-700 dark:text-gray-300 markdown-content">
      <ReactMarkdown components={{ a: LinkRenderer }}>{content}</ReactMarkdown>
    </div>
  );
}
