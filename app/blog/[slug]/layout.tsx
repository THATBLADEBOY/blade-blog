import { ScrollProgress } from '@/components/ui/scroll-progress'
import { ScrollToTopButton } from '@/components/ui/scroll-to-top'

/**
 * Blog Post Layout
 *
 * @module app/blog/[slug]/layout
 * @description
 *   Provides the layout for individual blog post pages. Includes a fixed blurred header,
 *   a scroll progress bar, and a styled main content area using Tailwind and Shadcn UI conventions.
 */
export default function LayoutBlogPost({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {/* Fixed blurred header for visual separation and depth */}
      <div
        className='bg-background pointer-events-none fixed top-0 left-0 z-10 h-12 w-full
          to-transparent backdrop-blur-xl
          [-webkit-mask-image:linear-gradient(to_bottom,black,transparent)]'
      />

      {/* Scroll progress bar with spring animation, overlays header */}
      <ScrollProgress
        className='fixed top-0 z-20 h-0.5'
        springOptions={{
          bounce: 0,
        }}
      />

      {/* Scroll to top button, appears after scrolling down */}
      <ScrollToTopButton />

      {/* Main content area styled with Tailwind/Prose for blog readability */}
      <main
        className='prose prose-gray prose-h4:prose-base dark:prose-invert prose-h1:text-2xl
          prose-h1:font-medium prose-h2:mt-12 prose-h2:scroll-m-20 prose-h2:text-xl
          prose-h2:font-medium prose-h3:text-lg prose-h3:font-medium prose-h4:font-medium
          prose-h5:text-base prose-h5:font-medium prose-h6:text-base prose-h6:font-medium
          prose-strong:font-medium pb-20'
      >
        {children}
      </main>
    </>
  )
}
