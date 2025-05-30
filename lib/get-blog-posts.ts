import path from 'path'
import { BlogPost } from './blog-post-metadata'
import { getMDXData } from './get-mdx-data'

/**
 * Retrieves all blog posts from the content directory.
 * @returns Array of BlogPost objects
 */
export function getBlogPosts(): BlogPost[] {
  return getMDXData(path.join(process.cwd(), 'content/blog-posts'))
}
