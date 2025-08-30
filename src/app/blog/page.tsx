import Link from 'next/link';
import { getBlogPosts } from '../../../lib/blog';
import { SearchInput } from '../../../components/searchInput';

// Type for search params
interface BlogPageProps {
  searchParams: Promise<{
    search?: string;
  }>;
}

// Type for blog post (adjust based on your actual post structure)
interface BlogPost {
  slug: string;
  title: string;
  date: string;
  tags: string[];
  content: string;
  excerpt: string;
}

export const metadata = {
  title: 'Blog - Dharun\'s Portfolio',
  description: 'Read my latest thoughts on web development, technology, and more.',
};

// No server action needed - handled by client component

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const posts: BlogPost[] = getBlogPosts();
  const resolvedSearchParams = await searchParams;
  const searchQuery = resolvedSearchParams.search?.toLowerCase() || '';

  // Server-side filtering
  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchQuery) ||
    post.excerpt.toLowerCase().includes(searchQuery) ||
    post.tags.some(tag => tag.toLowerCase().includes(searchQuery))
  );

  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto py-20 px-4">
        <div className='flex justify-between items-center mb-8'>
          <h1 className="text-4xl font-bold">Blog</h1>

          {/* Debounced Search Component */}
          <SearchInput placeholder="Search posts..." />
        </div>

        {/* Show search info */}
        {searchQuery && (
          <div className="mb-6">
            <p className="text-gray-600 dark:text-gray-400">
              Showing {filteredPosts.length} results for {`"${resolvedSearchParams.search}"`}
            </p>
          </div>
        )}

        {filteredPosts.length === 0 ? (
          <div className="text-center">
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {searchQuery ? 'No posts found matching your search.' : 'No blog posts yet. Check back soon!'}
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
            {filteredPosts.map((post) => (
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
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">{post.excerpt}</p>
                  {post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </article>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}