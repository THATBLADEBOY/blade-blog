import { notFound } from 'next/navigation'
import { CustomMDX } from '@/components/mdx'
import { baseUrl } from '@/app/sitemap'
import { getBlogPosts } from '@/lib/get-blog-posts'
import { formatDate } from '@/lib/format-date'
import { estimateReadTime } from '@/lib/estimate-read-time'
import { BlogStructuredData } from '@/components/blog-structured-data'

/**
 * Generates static params for all blog post pages for Next.js static generation.
 * @returns {Promise<Array<{ slug: string }>>} Array of params objects for each blog post.
 */
export async function generateStaticParams(): Promise<Array<{ slug: string }>> {
  const posts = getBlogPosts()

  return posts.map((post) => ({
    slug: post.slug,
  }))
}

/**
 * Props for the blog page and metadata generation.
 */
export interface BlogPageProps {
  params: Promise<{
    slug: string
  }>
}

/**
 * Generates metadata for a blog post page for SEO and social sharing.
 *
 * @param props - The params object containing the blog post slug.
 * @returns Metadata object for the blog post, or undefined if not found.
 */
export async function generateMetadata(props: BlogPageProps) {
  const { params } = props
  const { slug } = await params
  const post = getBlogPosts().find((post) => post.slug === slug)

  if (!post) return

  const {
    title,
    publishedAt: publishedTime,
    summary: description,
    image,
  } = post.metadata

  // Use provided image or generate an Open Graph image
  const ogImage = image
    ? image
    : `${baseUrl}/og?title=${encodeURIComponent(title)}`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime,
      url: `${baseUrl}/blog/${post.slug}`,
      images: [
        {
          url: ogImage,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  }
}

/**
 * Renders a blog post page, including metadata, title, date, read time, and content.
 *
 * @param props - The params object containing the blog post slug.
 * @returns The blog post page as a React Server Component.
 */
export default async function Blog(props: BlogPageProps) {
  const { params } = props
  const { slug } = await params
  const post = getBlogPosts().find((post) => post.slug === slug)

  if (!post) {
    notFound()
  }

  return (
    <section>
      {/* Structured data for SEO */}
      <BlogStructuredData metadata={post.metadata} slug={post.slug} />

      {/* Blog post title */}
      <h1 className='title !mb-1 text-2xl font-semibold tracking-tighter'>
        {post.metadata.title}
      </h1>

      {/* Publication date and estimated read time */}
      <div className='flex items-center text-sm'>
        <p className='!mt-0 !mb-8 text-sm'>
          {formatDate(post.metadata.publishedAt)} •{' '}
          {estimateReadTime(post.content)}
        </p>
      </div>

      {/* Blog post content rendered as MDX */}
      <article className='prose dark:prose-invert'>
        <CustomMDX source={post.content} />
      </article>
    </section>
  )
}
