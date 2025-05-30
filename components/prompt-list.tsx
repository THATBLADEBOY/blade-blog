'use client'

import { AnimatedBackground } from '@/components/ui/animated-background'
import { PromptModal } from '@/components/prompt-modal'
import { useState } from 'react'
import { Copy, Check, Eye, EyeOff } from 'lucide-react'
import type { Prompt } from '@/lib/get-prompts'

export interface PromptListProps {
  prompts: Prompt[]
  heading?: string
}

function PromptCard({ prompt }: { prompt: Prompt }) {
  const [copied, setCopied] = useState(false)
  const [showPreview, setShowPreview] = useState(false)

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation()
    try {
      await navigator.clipboard.writeText(prompt.content)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

  const togglePreview = (e: React.MouseEvent) => {
    e.stopPropagation()
    setShowPreview(!showPreview)
  }

  return (
    <div
      className='hover:bg-secondary/20 flex cursor-pointer flex-col space-y-3 rounded-lg p-4
        transition-colors select-none'
    >
      <div className='flex items-start justify-between'>
        <div className='flex-1'>
          <h3 className='text-lg font-medium text-zinc-800 dark:text-zinc-50'>
            {prompt.metadata.title}
          </h3>
          <p className='text-primary/50 flex items-center gap-2 font-mono text-xs'>
            <span>{prompt.metadata.category}</span>
            <span aria-hidden='true'>•</span>
            <span>{prompt.metadata.createdAt}</span>
          </p>
        </div>
        <div className='flex items-center gap-2'>
          <button
            onClick={togglePreview}
            className='text-primary/60 hover:text-primary flex items-center gap-1 rounded px-2 py-1
              text-sm transition-colors'
            title={showPreview ? 'Hide preview' : 'Show preview'}
          >
            {showPreview ? <EyeOff size={16} /> : <Eye size={16} />}
            {showPreview ? 'Hide' : 'Preview'}
          </button>
          <button
            onClick={handleCopy}
            className='text-primary/60 hover:text-primary flex items-center gap-1 rounded px-2 py-1
              text-sm transition-colors'
            title='Copy prompt to clipboard'
          >
            {copied ? <Check size={16} /> : <Copy size={16} />}
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>
      </div>

      <p className='text-primary/70 text-base'>{prompt.metadata.description}</p>

      <div className='flex flex-wrap gap-1'>
        {prompt.metadata.tags.map((tag) => (
          <span
            key={tag}
            className='bg-primary/10 text-primary/70 rounded-full px-2 py-1 text-xs'
          >
            {tag}
          </span>
        ))}
      </div>

      {showPreview && (
        <div className='bg-secondary/50 mt-3 rounded-lg border p-4'>
          <h4 className='text-primary/80 mb-2 text-sm font-medium'>Preview:</h4>
          <div className='text-primary/70 max-h-48 overflow-y-auto text-sm'>
            <pre className='font-mono whitespace-pre-wrap'>
              {prompt.content.length > 500
                ? `${prompt.content.substring(0, 500)}...`
                : prompt.content}
            </pre>
          </div>
          {prompt.content.length > 500 && (
            <p className='text-primary/50 mt-2 text-xs italic'>
              Preview truncated. Click card to see full prompt.
            </p>
          )}
        </div>
      )}
    </div>
  )
}

export function PromptList({ prompts, heading }: PromptListProps) {
  const [selectedPrompt, setSelectedPrompt] = useState<Prompt | null>(null)
  const [modalOpen, setModalOpen] = useState(false)

  const handleCardClick = (prompt: Prompt) => {
    setSelectedPrompt(prompt)
    setModalOpen(true)
  }

  if (prompts.length === 0) {
    return (
      <section>
        {heading && (
          <h1 className='text-primary/40 mb-2 tracking-tight'>{heading}</h1>
        )}
        <div className='text-primary/60 rounded-lg border border-dashed p-8 text-center'>
          <p className='text-lg'>No prompts available yet.</p>
          <p className='text-primary/40 mt-2 text-sm'>
            Add some .md files to the content/prompts directory to get started.
          </p>
        </div>
      </section>
    )
  }

  return (
    <section>
      {heading && (
        <h1 className='text-primary/40 mb-2 tracking-tight'>{heading}</h1>
      )}
      <AnimatedBackground
        className='w-full rounded-lg bg-zinc-100 dark:bg-zinc-800'
        transition={{
          type: 'spring',
          bounce: 0.2,
          duration: 0.6,
        }}
        enableHover
      >
        {prompts.map((prompt, index) => (
          <div
            key={prompt.slug}
            data-id={`prompt-${index}`}
            className='-ml-4 w-full'
            onClick={() => handleCardClick(prompt)}
          >
            <PromptCard prompt={prompt} />
          </div>
        ))}
      </AnimatedBackground>

      <PromptModal
        prompt={selectedPrompt}
        open={modalOpen}
        onOpenChange={setModalOpen}
      />
    </section>
  )
}
