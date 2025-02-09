// app/projects/[slug]/page.tsx

import { getPosts } from "../../lib/posts"; // Import your data fetching logic
import ReactMarkdown from "react-markdown";
import Image from "next/image";
import Link from "next/link";
import LinkRenderer from "../../utility/linkrenderer"; // Import the client-side component

// Server-side component to fetch post data
export default async function PostPage({
  params,
}: {
  params: { slug: string }; // Make sure the type is explicitly defined
}) {
  const posts = await getPosts(); // Fetch posts from your API or local data
  const post = posts.find((p) => p.slug === params.slug); // Find the post by slug

  // Handle case where post is not found
  if (!post) {
    return <h1>Post Not Found</h1>;
  }

  return (
    <div className="max-w-screen-xl mx-auto p-6">
      <div className="z-50 fixed top-6 right-6">
        <Link href="/" passHref>
          <div className="flex items-center bg-highlight text-white rounded-lg p-5 shadow-2xl cursor-pointer transition-all duration-300 transform hover:bg-green-600 hover:scale-105">
            <span className="text-2xl">🏠</span>
            <span className="font-bold">Back to Home</span>
          </div>
        </Link>
      </div>
      {post.image && (
        <div className="relative h-[40rem] mb-8">
          <Image
            src={post.image}
            alt={post.title}
            layout="fill"
            objectFit="cover"
            className="rounded-lg shadow-lg"
          />
          <div className="absolute top-0 left-0 w-full h-full bg-black opacity-40 rounded-lg"></div>
          <h1 className="absolute top-1/2 left-8 transform -translate-y-1/2 text-white text-4xl font-bold sm:text-5xl shadow-lg">
            {post.title}
          </h1>
        </div>
      )}
      {/* Project Details Section */}
      <div className="bg-[#9e7a68] text-white p-6 rounded-lg shadow-md mb-8">
        <ul className="space-y-4 text-lg">
          <li>
            <strong>Project Type:</strong> {post.type}
          </li>
          <li>
            <strong>Industry:</strong> {post.industry}
          </li>
          <li>
            <strong>Role:</strong> {post.role}
          </li>
          <li>
            <strong>Tools:</strong> {post.tools}
          </li>
        </ul>
      </div>
      <div className="prose prose-lg text-gray-700 dark:text-gray-300 markdown-content">
        <ReactMarkdown components={{ a: LinkRenderer }}>
          {post.fullContent}
        </ReactMarkdown>
      </div>
    </div>
  );
}
