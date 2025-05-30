'use client'

import { useState } from 'react'
import { Copy, Check, X } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import type { Prompt } from '@/lib/get-prompts'

export interface PromptModalProps {
  prompt: Prompt | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function PromptModal({ prompt, open, onOpenChange }: PromptModalProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    if (!prompt) return

    try {
      await navigator.clipboard.writeText(prompt.content)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

  if (!prompt) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='flex h-[90vh] !w-[85vw] !max-w-none flex-col p-0'>
        <DialogHeader className='flex-shrink-0 p-6 pb-4'>
          <div className='flex items-start justify-between'>
            <div className='flex-1'>
              <DialogTitle className='text-xl font-semibold'>
                {prompt.metadata.title}
              </DialogTitle>
              <DialogDescription className='mt-2'>
                {prompt.metadata.description}
              </DialogDescription>
              <div className='mt-3 flex items-center gap-4'>
                <span className='text-primary/60 font-mono text-sm'>
                  {prompt.metadata.category}
                </span>
                <span className='text-primary/40 font-mono text-sm'>
                  {prompt.metadata.createdAt}
                </span>
              </div>
              <div className='mt-3 flex flex-wrap gap-1'>
                {prompt.metadata.tags.map((tag) => (
                  <span
                    key={tag}
                    className='bg-primary/10 text-primary/70 rounded-full px-2 py-1 text-xs'
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <Button
              onClick={handleCopy}
              variant='outline'
              size='sm'
              className='mr-8 ml-4 flex-shrink-0'
            >
              {copied ? <Check size={16} /> : <Copy size={16} />}
              {copied ? 'Copied!' : 'Copy All'}
            </Button>
          </div>
        </DialogHeader>

        <div className='min-h-0 flex-1 px-6 pb-6'>
          <div className='bg-secondary/30 h-full rounded-lg border'>
            <div className='h-full overflow-y-auto p-6'>
              <pre className='font-mono text-sm leading-relaxed break-words whitespace-pre-wrap'>
                {prompt.content}
              </pre>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
