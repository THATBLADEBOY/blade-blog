import { HomePage } from '@/app/(home)/components/home-page'
import { getLatestBlogPosts } from '@/lib/get-latest-blog-posts'

/**
 * The Page component for the home route (`/`).
 */
export default function Page() {
  const posts = getLatestBlogPosts()

  // The home page is heavily animated, so it's a client component. It's better
  // to load the posts server-side and pass them to the client component.
  return <HomePage blogPosts={posts} />
}
