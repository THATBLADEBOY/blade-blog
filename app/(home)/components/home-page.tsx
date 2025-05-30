'use client'

import { ContactSection } from '@/app/(home)/components/contact-section'
import { motion } from 'motion/react'
import { HomePageIntro } from './home-page-intro'
import { BlogPostList } from '@/components/blog-post-list'

/**
 * Animation variants for the main container.
 * Controls opacity and staggers child animations.
 */
const VARIANTS_CONTAINER = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
}

/**
 * Animation variants for each section.
 * Handles fade-in, vertical movement, and blur effect.
 */
const VARIANTS_SECTION = {
  hidden: { opacity: 0, y: 20, filter: 'blur(8px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
}

/**
 * Transition settings for section animations.
 */
const TRANSITION_SECTION = {
  duration: 0.3,
}

/**
 * Props for the HomePage component.
 * @interface HomePageProps
 * @property {Array<{ metadata: any; slug: string; content: string }>} blogPosts - List of blog post objects to display.
 */
interface HomePageProps {
  blogPosts: {
    metadata: any
    slug: string
    content: string
  }[]
}

/**
 * Home page component for the site. Displays an introduction, a list of blog posts, and a contact section.
 */
export function HomePage({ blogPosts }: HomePageProps) {
  return (
    <motion.main
      className='space-y-8'
      variants={VARIANTS_CONTAINER}
      initial='hidden'
      animate='visible'
    >
      {/* Introduction Section */}
      <motion.section
        variants={VARIANTS_SECTION}
        transition={TRANSITION_SECTION}
      >
        <HomePageIntro />
      </motion.section>

      {/* Blog Posts Section */}
      <motion.section
        variants={VARIANTS_SECTION}
        transition={TRANSITION_SECTION}
      >
        <BlogPostList blogPosts={blogPosts} heading='Recent Writing' />
      </motion.section>

      {/* Contact Section */}
      <ContactSection />
    </motion.main>
  )
}
