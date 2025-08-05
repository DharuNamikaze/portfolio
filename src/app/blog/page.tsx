import Link from 'next/link';
import { getBlogPosts } from '../../../lib/blog';

export const metadata = {
  title: 'Blog - Dharun\'s Portfolio',
  description: 'Read my latest thoughts on web development, technology, and more.',
};

export default function BlogPage() {
  const posts = getBlogPosts();

  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto py-20 px-4">
        <h1 className="text-4xl font-bold mb-8 text-center">Blog</h1>
        
        {posts.length === 0 ? (
          <div className="text-center">
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              No blog posts yet. Check back soon!
            </p>
            <Link 
              href="/" 
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              ← Back to Home
            </Link>
          </div>
        ) : (
          <div className="space-y-8">
            {posts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="block">
                <article className="border rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800">
                  <h2 className="text-2xl font-semibold mb-2 text-blue-600 dark:text-blue-400">
                    {post.title}
                  </h2>
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-3">
                    <span>{new Date(post.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}</span>
                    <span className="mx-2">•</span>
                    <span>{post.author}</span>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">{post.excerpt}</p>
                  {post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
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
                  {/* <span className="text-blue-600 dark:text-blue-400 font-medium">
                    Read more →
                  </span> */}
                </article>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}