import React from "react";
import Image from "next/image";

// Define the type for the post prop, including image and roles
type PostProps = {
  post: {
    id: number;
    slug: string;
    title: string;
    summary: string;
    image: string;
    role: string | undefined;
  };
  variant?: "featured" | "compact";
};

const Post: React.FC<PostProps> = ({ post, variant = "featured" }) => {
  const roles = post.role
    ? post.role.split(",").map((role) => role.trim())
    : [];

  if (variant === "compact") {
    return (
      <li className="bg-white/80 dark:bg-gray-800/80 p-3 rounded-lg shadow-sm hover:shadow-md transition duration-300 ease-in-out flex flex-col h-full border border-secondary/40">
        <div className="relative w-full h-28 sm:h-32 mb-3 overflow-hidden rounded-md">
          <Image
            src={post.image}
            alt={post.title}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover transition-transform duration-300 ease-in-out hover:scale-105"
          />
        </div>

        <h3 className="text-sm sm:text-base font-semibold text-accent mb-1.5 leading-snug line-clamp-2">
          {post.title}
        </h3>

        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-2 flex-1">
          {post.summary}
        </p>

        <a
          href={`/projects/${post.slug}`}
          className="text-sm font-medium text-accent hover:text-accent/70 transition duration-200"
        >
          Read more →
        </a>
      </li>
    );
  }

  return (
    <li className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md mb-4 transform transition duration-300 ease-in-out hover:shadow-xl flex flex-col h-full">
      {/* Post Image */}
      <Image
        src={post.image}
        alt={post.title}
        width={500}
        height={300}
        className="object-cover transition-transform duration-300 ease-in-out transform hover:scale-110 mb-4"
      />

      <h3 className="text-xl font-bold text-accent mb-2 leading-snug">
        {post.title}
      </h3>

      <p className="text-gray-600 dark:text-gray-300 mb-4">{post.summary}</p>

      {/* Roles (Tags for Project Role) */}
      {roles.length > 0 && (
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {roles.map((role, index) => (
              <span
                key={index}
                className="bg-secondary text-accent rounded-full px-3 py-1 text-xs font-medium"
              >
                {role}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Full Width Read More Button */}
      <div className="mt-auto w-full">
        <a
          href={`/projects/${post.slug}`}
          className="font-semibold block text-accent bg-white border-2 border-accent hover:bg-secondary hover:border-secondary hover:text-accent py-3 rounded-xl text-center transition duration-300 transform hover:scale-105"
        >
          {/* Read More Text */}
          Read more
        </a>
      </div>
    </li>
  );
};

export default Post;
