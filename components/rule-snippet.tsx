'use client'

import { useState } from 'react'
import { ChevronDownIcon, ChevronRightIcon } from 'lucide-react'
import { highlight } from 'sugar-high'

export interface RuleSnippetProps {
  title: string
  path: string
  description: string
  snippet: string
  fullContent: string
  type?: 'mdc' | 'md'
}

export function RuleSnippet({
  title,
  path,
  description,
  snippet,
  fullContent,
  type = 'md',
}: RuleSnippetProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const snippetHTML = highlight(snippet)
  const fullContentHTML = highlight(fullContent)

  return (
    <div
      className='overflow-hidden rounded-lg border border-gray-200 bg-gray-50
        dark:border-gray-700 dark:bg-gray-900'
    >
      {/* Header */}
      <div
        className='border-b border-gray-200 bg-white px-4 py-3 dark:border-gray-700
          dark:bg-gray-800'
      >
        <div className='flex items-center justify-between'>
          <div>
            <h4 className='font-semibold text-gray-900 dark:text-gray-100'>
              {title}
            </h4>
            <p className='font-mono text-sm text-gray-600 dark:text-gray-400'>
              {path}
            </p>
          </div>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className='flex items-center gap-1 text-sm text-blue-600 transition-colors
              hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200'
          >
            {isExpanded ? (
              <>
                <ChevronDownIcon className='h-4 w-4' />
                Collapse
              </>
            ) : (
              <>
                <ChevronRightIcon className='h-4 w-4' />
                Expand
              </>
            )}
          </button>
        </div>
        <p className='mt-2 text-sm text-gray-700 dark:text-gray-300'>
          {description}
        </p>
      </div>

      {/* Content */}
      <div className='relative'>
        <pre className='overflow-x-auto p-4 text-sm'>
          <code
            dangerouslySetInnerHTML={{
              __html: isExpanded ? fullContentHTML : snippetHTML,
            }}
          />
        </pre>

        {!isExpanded && (
          <div
            className='pointer-events-none absolute right-0 bottom-0 left-0 h-8 bg-gradient-to-t
              from-gray-50 to-transparent dark:from-gray-900'
          />
        )}
      </div>

      {/* Footer with expand hint */}
      {!isExpanded && (
        <div
          className='border-t border-gray-200 px-4 py-2 text-xs text-gray-500 dark:border-gray-700
            dark:text-gray-400'
        >
          Click "Expand" to see the full rule content
        </div>
      )}
    </div>
  )
}
