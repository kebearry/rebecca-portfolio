import { getBlogPosts } from "../lib/blog-posts";
import BlogPostCard from "../ui/blogpostcard";

export default async function BlogSection() {
  const posts = await getBlogPosts();

  return (
    <section
      id="blog"
      className="bg-primary text-accent px-4 sm:px-8 py-16 sm:py-20"
    >
      <div className="w-full max-w-screen-xl mx-auto space-y-10">
        <div className="max-w-2xl">
          <h2 className="text-4xl font-bold mb-4">Blog</h2>
          <p className="text-accent/80 leading-relaxed">
            Notes on CMS architecture, frontend delivery, and building digital
            experiences that product, content, and engineering teams can sustain
            after launch.
          </p>
        </div>

        {posts.length > 0 ? (
          <ul
            className={`grid gap-6 sm:gap-8 list-none p-0 m-0 ${
              posts.length === 1
                ? "grid-cols-1 max-w-2xl"
                : "grid-cols-1 lg:grid-cols-2"
            }`}
          >
            {posts.map((post) => (
              <BlogPostCard key={post.slug} post={post} />
            ))}
          </ul>
        ) : (
          <div className="glass-panel rounded-2xl p-8 sm:p-10 max-w-2xl">
            <h3 className="text-xl font-bold text-accent mb-3">
              Posts coming soon
            </h3>
            <p className="text-accent/75 leading-relaxed">
              I am preparing articles on CMS architecture, frontend systems, and
              solution design. Check back soon.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
