/**
 * Blog post metadata extracted from frontmatter.
 */
export interface BlogPostMetadata {
  title: string
  publishedAt: string
  summary: string
  image?: string
}

/**
 * Blog post object returned by utility functions.
 */
export interface BlogPost {
  metadata: BlogPostMetadata
  slug: string
  content: string
}
