import { getBlogPosts, getBlogTags } from "../lib/blog-posts";
import BlogPosts from "../ui/blogposts";

type BlogSectionProps = {
  initialTag?: string;
};

export default async function BlogSection({ initialTag }: BlogSectionProps) {
  const [posts, tags] = await Promise.all([getBlogPosts(), getBlogTags()]);

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
          <BlogPosts posts={posts} tags={tags} initialTag={initialTag} />
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
