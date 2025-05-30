import fs from 'fs'
import { BlogPostMetadata } from './blog-post-metadata'
import { parseFrontmatter } from './parse-frontmatter'

/**
 * Reads and parses an MDX file.
 * @param filePath Absolute file path
 * @returns Parsed metadata and content
 */
export function readMDXFile(filePath: string): {
  metadata: BlogPostMetadata
  content: string
} {
  let rawContent: string
  try {
    rawContent = fs.readFileSync(filePath, 'utf-8')
  } catch (err) {
    throw new Error(`Failed to read file: ${filePath}`)
  }
  return parseFrontmatter(rawContent)
}
