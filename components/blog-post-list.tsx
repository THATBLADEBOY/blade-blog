import { AnimatedBackground } from '@/components/ui/animated-background'
import Link from 'next/link'
import { estimateReadTime } from '@/lib/estimate-read-time'

export interface BlogPostListProps {
  blogPosts: {
    metadata: {
      title: string
      publishedAt: string
      summary: string
      image?: string
    }
    slug: string
    content: string
  }[]
  /**
   * Optional: Show a heading above the list (e.g., 'My Blog', 'Writing').
   */
  heading?: string
}

/**
 * Renders a list of blog posts as cards with animated background, including title, date, read time, and summary.
 */
export function BlogPostList({ blogPosts, heading }: BlogPostListProps) {
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
        {blogPosts.map((post, index) => (
          <div
            key={post.slug}
            data-id={`card-${index}`}
            className='-ml-4 w-full'
          >
            <Link href={`/blog/${post.slug}`}>
              <div className='flex flex-col space-y-1 p-4 select-none'>
                <h3 className='text-lg font-medium text-zinc-800 dark:text-zinc-50'>
                  {post.metadata.title}
                </h3>
                <p className='text-primary/50 flex items-center gap-2 font-mono text-xs'>
                  <span>{post.metadata.publishedAt}</span>
                  <span aria-hidden='true'>•</span>
                  <span>{estimateReadTime(post.content)}</span>
                </p>
                <p className='text-primary/70 text-base'>
                  {post.metadata.summary}
                </p>
              </div>
            </Link>
          </div>
        ))}
      </AnimatedBackground>
    </section>
  )
}
