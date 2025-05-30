import { BlogPostList } from '@/components/blog-post-list'
import { getBlogPosts } from '@/lib/get-blog-posts'

/**
 * Metadata for the main blog listing page, used for SEO and social sharing.
 */
export const metadata = {
  title: 'Austin Blades Blog',
  description:
    'A collection of thoughts, ideas, and learnings around technology and software development.',
}

/**
 * Renders the main blog listing page, showing all blog posts as cards with animated background.
 *
 * @returns The blog listing page as a React Server Component.
 */
export default function BlogIndexPage() {
  const posts = getBlogPosts()

  return <BlogPostList blogPosts={posts} heading='My Blog' />
}
