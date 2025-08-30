'use server'
import Link from 'next/link';
import { getBlogPosts } from '../lib/blog';

export default function Blog() {
  const posts = getBlogPosts();

  if (posts.length === 0) {
    return (
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Blog</h2>
          <p className="text-center text-gray-600 dark:text-gray-400">
            No blog posts yet. Check back soon!
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center">Blog</h2>
        <div className="space-y-6">
          {posts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="block">
              <article className="border rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800">
                <h3 className="text-xl font-semibold mb-2 text-blue-600 dark:text-blue-400">
                  {post.title}
                </h3>
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-3">
                  <span>{new Date(post.date).toLocaleDateString()}</span>
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-3">{post.excerpt}</p>
                {post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 rounded-full pointer-events-none"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                <span className="text-blue-600 dark:text-blue-400 hover:underline">
                  Read more →
                </span>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}