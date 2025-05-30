import fs from 'fs'
import matter from 'gray-matter'
import path from 'path'

export interface PromptMetadata {
  title: string
  description: string
  category: string
  tags: string[]
  createdAt: string
}

export interface Prompt {
  metadata: PromptMetadata
  slug: string
  content: string
}

function getMDXFiles(dir: string) {
  return fs.readdirSync(dir).filter((file) => path.extname(file) === '.md')
}

function readMDXFile(filePath: string) {
  const rawContent = fs.readFileSync(filePath, 'utf-8')
  return matter(rawContent)
}

function getMDXData(dir: string): Prompt[] {
  const mdxFiles = getMDXFiles(dir)
  return mdxFiles.map((file) => {
    const { data: metadata, content } = readMDXFile(path.join(dir, file))
    const slug = path.basename(file, path.extname(file))

    return {
      metadata: metadata as PromptMetadata,
      slug,
      content,
    }
  })
}

export function getPrompts(): Prompt[] {
  const promptsDirectory = path.join(process.cwd(), 'content', 'prompts')

  // Check if directory exists
  if (!fs.existsSync(promptsDirectory)) {
    return []
  }

  const prompts = getMDXData(promptsDirectory)

  // Sort by creation date (newest first)
  return prompts.sort((a, b) => {
    return (
      new Date(b.metadata.createdAt).getTime() -
      new Date(a.metadata.createdAt).getTime()
    )
  })
}

export function getPromptBySlug(slug: string): Prompt | null {
  const prompts = getPrompts()
  return prompts.find((prompt) => prompt.slug === slug) || null
}
