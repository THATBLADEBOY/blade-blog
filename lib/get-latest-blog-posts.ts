import { BlogPost } from './blog-post-metadata'
import { getBlogPosts } from './get-blog-posts'

/**
 * Retrieves the 3 most recently published blog posts, sorted by publishedAt descending.
 * @returns Array of BlogPost objects
 */
export function getLatestBlogPosts(): BlogPost[] {
  const posts = getBlogPosts()
  return posts
    .slice()
    .sort((a, b) => {
      const dateA = Date.parse(a.metadata.publishedAt)
      const dateB = Date.parse(b.metadata.publishedAt)
      return dateB - dateA
    })
    .slice(0, 3)
}
