import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Link from 'next/link';

interface Post {
  slug: string;
  frontmatter: {
    title: string;
    date: string;
    category: string;
    labels: string[];
    excerpt: string;
  };
}

async function getPosts(): Promise<Post[]> {
  const files = fs.readdirSync(path.join('posts'));

  const posts = files.map((filename) => {
    const slug = filename.replace('.md', '');
    const markdownWithMeta = fs.readFileSync(
      path.join('posts', filename),
      'utf-8'
    );
    const { data: frontmatter } = matter(markdownWithMeta) as unknown as {
      data: Post['frontmatter'];
    };
    return { slug, frontmatter };
  });

  return posts.sort(
    (a, b) =>
      new Date(b.frontmatter.date).getTime() -
      new Date(a.frontmatter.date).getTime()
  );
}

export default async function BlogsPage() {
  const posts = await getPosts();

  const categories = Array.from(
    new Set(posts.map((post) => post.frontmatter.category))
  );

  const allLabels = Array.from(
    new Set(posts.flatMap((post) => post.frontmatter.labels || []))
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Category and Label Pills */}
      <div className="mb-8 flex flex-wrap gap-2">
        {categories.map((category) => (
          <Link
            key={category}
            href={`/blogs?category=${category}`}
            className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm hover:bg-blue-200 transition"
          >
            {category}
          </Link>
        ))}
        {allLabels.map((label) => (
          <Link
            key={label}
            href={`/blogs?label=${label}`}
            className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm hover:bg-gray-200 transition"
          >
            {label}
          </Link>
        ))}
      </div>

      {/* Blog Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <article
            key={post.slug}
            className="border rounded-lg overflow-hidden shadow-lg"
          >
            <div className="p-6">
              <Link href={`/blogs/${post.slug}`}>
                <h2 className="text-2xl font-semibold hover:text-blue-600 mb-2">
                  {post.frontmatter.title}
                </h2>
              </Link>
              <div className="text-gray-600 text-sm mb-4">
                {new Date(post.frontmatter.date).toLocaleDateString()}
              </div>
              <div className="mb-4 flex flex-wrap gap-2">
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm">
                  {post.frontmatter.category}
                </span>
                {post.frontmatter.labels?.map((label: string) => (
                  <span
                    key={label}
                    className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-sm"
                  >
                    {label}
                  </span>
                ))}
              </div>
              <p className="text-gray-600">{post.frontmatter.excerpt}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
