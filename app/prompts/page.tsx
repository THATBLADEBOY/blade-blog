import { PromptList } from '@/components/prompt-list'
import { getPrompts } from '@/lib/get-prompts'

/**
 * Metadata for the prompts page, used for SEO and social sharing.
 */
export const metadata = {
  title: 'LLM Prompts - Austin Blade',
  description:
    'A curated collection of useful LLM prompts for development, writing, and productivity.',
}

/**
 * Renders the main prompts page, showing all available prompts in a searchable list.
 *
 * @returns The prompts page as a React Server Component.
 */
export default function PromptsPage() {
  const prompts = getPrompts()

  return <PromptList prompts={prompts} heading='LLM Prompts' />
}
