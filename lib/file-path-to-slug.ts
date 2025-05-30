/**
 * Converts a file path to a flat slug (hyphen-separated, no extension).
 * @param file Relative file path
 * @returns Slug string
 */
export function filePathToSlug(file: string): string {
  return file
    .replace(/\\/g, '/')
    .replace('.mdx', '')
    .replace(/\//g, '-')
    .replace(/^-+|-+$/g, '')
}
