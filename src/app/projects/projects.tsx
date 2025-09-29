import { getPosts } from "../lib/posts";
import Post from "../ui/post";

export default async function Projects() {
  const posts = await getPosts();

  return (
    <section
      id="projects"
      className="bg-primary min-h-screen flex items-center justify-center text-accent px-4 sm:px-8 py-8"
    >
      <div className="w-full max-w-screen-xl mx-auto flex flex-col sm:flex-row space-y-8 sm:space-y-0 sm:space-x-16">
        <div className="flex-1 max-w-md text-center sm:text-left">
          <h1 className="text-4xl font-bold mb-4">Featured Projects</h1>
        </div>
        <div className="flex-2 w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
          {posts.map((post) => (
            <Post key={post.id} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
}
