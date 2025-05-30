import { BlogPostMetadata } from './blog-post-metadata'

/**
 * Parses the frontmatter and content from an MDX file.
 * @param fileContent The raw file content
 * @returns An object with metadata and content
 */
export function parseFrontmatter(fileContent: string): {
  metadata: BlogPostMetadata
  content: string
} {
  const frontmatterRegex = /^---\s*([\s\S]*?)\s*---/m
  const match = frontmatterRegex.exec(fileContent)
  if (!match) {
    throw new Error('Missing or invalid frontmatter block')
  }
  const frontMatterBlock = match[1]
  const content = fileContent.replace(frontmatterRegex, '').trim()
  const frontMatterLines = frontMatterBlock.trim().split('\n')
  const metadata: Partial<BlogPostMetadata> = {}

  frontMatterLines.forEach((line) => {
    const [key, ...valueArr] = line.split(': ')
    if (!key || valueArr.length === 0) return
    let value = valueArr.join(': ').trim()
    value = value.replace(/^['\"](.*)['\"]$/, '$1') // Remove quotes
    metadata[key.trim() as keyof BlogPostMetadata] = value
  })

  // Type assertion is safe if frontmatter is valid
  return { metadata: metadata as BlogPostMetadata, content }
}
