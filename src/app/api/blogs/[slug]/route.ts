// src/app/api/blogs/[slug]/route.ts
import { NextRequest } from 'next/server';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export async function GET(req: NextRequest): Promise<Response> {
  // Get slug from URL instead of params
  const slug = req.nextUrl.pathname.split('/').pop();
  const filePath = path.join(process.cwd(), 'posts', `${slug}.md`);

  try {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { data, content } = matter(fileContent);

    return new Response(JSON.stringify({ ...data, content }), {
      headers: { 'content-type': 'application/json' },
    });
  } catch {
    return new Response(JSON.stringify({ error: 'Post not found' }), {
      status: 404,
      headers: { 'content-type': 'application/json' },
    });
  }
}
