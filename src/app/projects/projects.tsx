import { getFeaturedPosts, getMorePosts } from "../lib/posts";
import Post from "../ui/post";

type PostItem = Awaited<ReturnType<typeof getFeaturedPosts>>[number];

function FeaturedGrid({ posts }: { posts: PostItem[] }) {
  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 list-none p-0 m-0">
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </ul>
  );
}

function MoreProjectsGrid({ posts }: { posts: PostItem[] }) {
  return (
    <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 list-none p-0 m-0">
      {posts.map((post) => (
        <Post key={post.id} post={post} variant="compact" />
      ))}
    </ul>
  );
}

export default async function Projects() {
  const [featuredPosts, morePosts] = await Promise.all([
    getFeaturedPosts(),
    getMorePosts(),
  ]);

  return (
    <section
      id="projects"
      className="bg-primary min-h-screen text-accent px-4 sm:px-8 py-16 sm:py-20"
    >
      <div className="w-full max-w-screen-xl mx-auto space-y-16">
        <div className="max-w-2xl">
          <h1 className="text-4xl font-bold mb-4">Projects</h1>
          <p className="text-accent/80 leading-relaxed">
            A mix of client delivery, CMS implementations, and products
            I&apos;ve built end-to-end — start with the featured work below.
          </p>
        </div>

        <div className="space-y-8">
          <h2 className="text-2xl font-bold">Featured</h2>
          <FeaturedGrid posts={featuredPosts} />
        </div>

        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-bold text-accent/90">More projects</h2>
            <p className="mt-2 text-accent/60 text-sm">
              Earlier work and broader experiments across mobile, ecommerce,
              and product design.
            </p>
          </div>
          <MoreProjectsGrid posts={morePosts} />
        </div>
      </div>
    </section>
  );
}
