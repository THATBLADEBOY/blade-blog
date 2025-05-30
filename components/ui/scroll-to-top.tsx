'use client'

import { useEffect, useState } from 'react'
import { Button } from './button'
import { ArrowUp } from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'

/**
 * ScrollToTopButton
 *
 * A floating button that appears after scrolling down and allows users to scroll back to the top.
 * Uses shadcn Button, Lucide ArrowUp icon, and Framer Motion for smooth transitions.
 *
 * @module components/ui/scroll-to-top
 * @example
 * <ScrollToTopButton />
 */
export function ScrollToTopButton() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 200)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
          className='fixed right-6 bottom-6 z-50'
        >
          <Button
            onClick={handleClick}
            size='icon'
            variant='secondary'
            aria-label='Scroll to top'
            className='bg-background/80 supports-[backdrop-filter]:bg-background/60 shadow-lg
              backdrop-blur'
          >
            <ArrowUp className='h-5 w-5' />
            <span className='sr-only'>Scroll to top</span>
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
