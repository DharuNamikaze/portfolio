import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getBlogPost, getBlogPosts } from '../../../../lib/blog';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';

interface BlogPostPageProps {
  params: Promise<{slug: string}>
}

export async function generateStaticParams() {
  const posts = getBlogPosts(); return posts.map((post) => ({ slug: post.slug, }));
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const post = getBlogPost((await params).slug);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = getBlogPost((await params).slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="max-w-5xl mx-auto py-20 px-4">
      <Link
      aria-label='Return to blogs'
        href="/blog"
        className="text-blue-600 dark:text-blue-400 hover:underline mb-8 inline-block"
      >
        ← Back to Blog
      </Link>

      <header className="mb-8">
        <h1 className="text-[6vh] font-bold mb-4">{post.title}</h1>
        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
          <span>{new Date(post.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}</span>
          <span className="mx-2">•</span>
          <span>{post.author}</span>
        </div>
        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </header>

      <div className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-bold prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-code:bg-gray-100 dark:prose-code:bg-gray-800 prose-code:rounded prose-code:px-1">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeRaw]}
        >
          {post.content}
        </ReactMarkdown>
      </div>
    </article>
  );
}