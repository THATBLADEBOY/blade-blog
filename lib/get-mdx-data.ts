import path from 'path'
import { BlogPost } from './blog-post-metadata'
import { filePathToSlug } from './file-path-to-slug'
import { getMDXFiles } from './get-mdx-files'
import { readMDXFile } from './read-mdx-file'

/**
 * Reads all MDX files in a directory and returns their parsed data.
 * @param dir Directory to search
 * @returns Array of BlogPost objects
 */
export function getMDXData(dir: string): BlogPost[] {
  const mdxFiles = getMDXFiles(dir)
  return mdxFiles.map((file) => {
    const { metadata, content } = readMDXFile(path.join(dir, file))
    const slug = filePathToSlug(file)
    return { metadata, slug, content }
  })
}
