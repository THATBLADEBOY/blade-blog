import { baseUrl } from '@/app/sitemap'

interface BlogPostMetadata {
  title: string
  readonly publishedAt: string
  readonly summary: string
  readonly image?: string
}

interface BlogStructuredDataProps {
  readonly metadata: BlogPostMetadata
  readonly slug: string
}

/**
 * BlogStructuredData Component
 *
 * This component adds structured data (JSON-LD) to blog posts for SEO purposes.
 * It implements the BlogPosting schema from schema.org, which helps search
 * engines better understand and display blog content in search results.
 *
 * The structured data includes:
 * - Basic post information (title, dates, description)
 * - Image information
 * - Author information
 * - URL to the post
 *
 * This can lead to rich snippets in search results, showing additional
 * information about the blog post directly in search results.
 */
export function BlogStructuredData({
  metadata,
  slug,
}: BlogStructuredDataProps) {
  return (
    <script
      type="application/ld+json"
      suppressHydrationWarning
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          headline: metadata.title,
          datePublished: metadata.publishedAt,
          dateModified: metadata.publishedAt,
          description: metadata.summary,
          image: metadata.image
            ? `${baseUrl}${metadata.image}`
            : `/og?title=${encodeURIComponent(metadata.title)}`,
          url: `${baseUrl}/blog/${slug}`,
          author: {
            '@type': 'Person',
            name: 'Austin Blade',
          },
        }),
      }}
    />
  )
}
