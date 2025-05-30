import fs from 'fs'
import path from 'path'

/**
 * Recursively collects all .mdx files in a directory.
 * @param dir Directory to search
 * @returns Array of relative file paths
 */
export function getMDXFiles(dir: string): string[] {
  const results: string[] = []

  function traverse(currentDir: string) {
    let files: string[]
    try {
      files = fs.readdirSync(currentDir)
    } catch (err) {
      throw new Error(`Failed to read directory: ${currentDir}`)
    }

    files.forEach((file) => {
      const filePath = path.join(currentDir, file)
      let stat: fs.Stats
      try {
        stat = fs.statSync(filePath)
      } catch (err) {
        throw new Error(`Failed to stat file: ${filePath}`)
      }

      if (stat.isDirectory()) {
        traverse(filePath)
      } else if (path.extname(file) === '.mdx') {
        results.push(path.relative(dir, filePath))
      }
    })
  }

  traverse(dir)
  return results
}
