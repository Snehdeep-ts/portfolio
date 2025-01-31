'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { marked } from 'marked';

interface BlogPost {
  title: string;
  date: string;
  category: 'Tech' | 'Development';
  labels: string[];
  excerpt: string;
  content: string;
}

export default function BlogPost() {
  const params = useParams();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPost() {
      try {
        setIsLoading(true);
        const res = await fetch(`/api/blogs/${params?.slug}`);

        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.error || 'Failed to fetch post');
        }

        const data = await res.json();
        setPost(data);
      } catch (err) {
        console.error('Error fetching post:', err);
        setError(
          err instanceof Error ? err.message : 'Failed to load blog post'
        );
      } finally {
        setIsLoading(false);
      }
    }

    if (params?.slug) {
      fetchPost();
    }
  }, [params?.slug]);

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
          <div className="h-12 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-8"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-red-600 mb-4">Error: {error}</div>
        <Link href="/blogs" className="text-blue-600 hover:text-blue-800">
          ← Back to Blogs
        </Link>
      </div>
    );
  }

  if (!post) return null;

  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <Link
          href="/blogs"
          className="text-blue-600 hover:text-blue-800 inline-flex items-center gap-2"
        >
          ← Back to Blogs
        </Link>
      </div>

      <article>
        <header className="mb-12">
          <h1 className="text-4xl font-bold mb-4">{post.title}</h1>

          <div className="flex flex-wrap items-center gap-4 mb-4">
            <time
              dateTime={new Date(post.date).toISOString()}
              className="text-gray-600"
            >
              {new Date(post.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>

            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
              {post.category}
            </span>
          </div>

          {post.labels && post.labels.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {post.labels.map((label) => (
                <span
                  key={label}
                  className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm"
                >
                  {label}
                </span>
              ))}
            </div>
          )}

          <p className="text-lg text-gray-600 italic">{post.excerpt}</p>
        </header>

        <div
          className="prose lg:prose-xl max-w-none"
          dangerouslySetInnerHTML={{ __html: marked(post.content) }}
        />
      </article>
    </main>
  );
}
