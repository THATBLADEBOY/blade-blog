/**
 * A scroll progress indicator component that shows a gradient progress bar
 * at the top of a container or the viewport. The progress bar animates smoothly
 * using spring physics as the user scrolls.
 *
 * @module ScrollProgress
 */

'use client'

import { motion, SpringOptions, useScroll, useSpring } from 'motion/react'
import { cn } from '@/lib/cn'
import { RefObject } from 'react'

/**
 * Default spring animation options for the scroll progress bar.
 * These values provide a smooth, natural-feeling animation:
 * - stiffness: Controls how rigid the spring is
 * - damping: Controls how quickly the spring comes to rest
 * - restDelta: The minimum change in value before the spring is considered at rest
 */
const DEFAULT_SPRING_OPTIONS: SpringOptions = {
  stiffness: 200,
  damping: 50,
  restDelta: 0.001,
}

/**
 * Props for the ScrollProgress component
 */
export type ScrollProgressProps = {
  /** Additional CSS classes to apply to the progress bar */
  className?: string
  /** Custom spring animation options to override the defaults */
  springOptions?: SpringOptions
  /** Optional ref to a scrollable container. If not provided, uses the viewport */
  containerRef?: RefObject<HTMLDivElement>
}

/**
 * A scroll progress indicator component that displays a gradient progress bar
 * at the top of a container or the viewport. The progress bar animates smoothly
 * using spring physics as the user scrolls.
 *
 * @param {ScrollProgressProps} props - Component props
 * @param {string} [props.className] - Additional CSS classes to apply
 * @param {SpringOptions} [props.springOptions] - Custom spring animation options
 * @param {RefObject<HTMLDivElement>} [props.containerRef] - Ref to a scrollable container
 * @returns {JSX.Element} A motion.div element representing the progress bar
 */
export function ScrollProgress({
  className,
  springOptions,
  containerRef,
}: ScrollProgressProps) {
  const { scrollYProgress } = useScroll({
    container: containerRef,
    layoutEffect: Boolean(containerRef?.current),
  })

  const scaleX = useSpring(scrollYProgress, {
    ...DEFAULT_SPRING_OPTIONS,
    ...(springOptions ?? {}),
  })

  return (
    <motion.div
      role='progressbar'
      aria-label='Scroll progress'
      aria-valuenow={undefined}
      aria-valuemin={0}
      aria-valuemax={100}
      className={cn(
        `inset-x-0 top-0 h-1 origin-left bg-gradient-to-r from-red-400 via-yellow-400
        to-blue-400`,
        className,
      )}
      style={{
        scaleX,
      }}
    />
  )
}
