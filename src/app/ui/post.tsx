import React from "react";
import Image from "next/image";

// Define the type for the post prop, including image and roles
type PostProps = {
  post: {
    id: number;
    slug: string;
    title: string;
    summary: string;
    image: string; // Add image URL
    role: string | undefined; // Roles as a comma-separated string (can be undefined)
  };
};

const Post: React.FC<PostProps> = ({ post }) => {
  // Check if 'roles' exists and is a valid string, otherwise default to an empty string
  const roles = post.role
    ? post.role.split(",").map((role) => role.trim())
    : [];

  return (
    <li className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md mb-4 transform transition duration-300 ease-in-out hover:shadow-xl flex flex-col h-full">
      {/* Post Image */}
      <Image
        src={post.image}
        alt={post.title}
        width={500} // Set the fixed image width
        height={300} // Set the fixed image height
        className="object-cover transition-transform duration-300 ease-in-out transform hover:scale-110 mb-4"
      />

      {/* Post Summary */}
      <p className="text-gray-600 dark:text-gray-300 mb-4">{post.summary}</p>

      {/* Roles (Tags for Project Role) */}
      {roles.length > 0 && (
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {roles.map((role, index) => (
              <span
                key={index}
                className="bg-hotpink text-white rounded-full px-3 py-1 text-xs"
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
          className="font-light block text-primary bg-white border border-primary hover:bg-primary hover:text-white dark:bg-gray-800 dark:text-primary-400 dark:border-primary-400 dark:hover:bg-primary-500 dark:hover:text-white py-3 rounded-xl text-center transition duration-300 transform"
        >
          {/* Read More Text */}
          Read more
        </a>
      </div>
    </li>
  );
};

export default Post;
