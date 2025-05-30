'use client'

import React, { useState, useEffect, useRef } from 'react'
import {
  motion,
  useMotionValue,
  useSpring,
  type SpringOptions,
} from 'motion/react'

/**
 * Configuration for the spring animation used in the magnetic effect
 */
const SPRING_CONFIG = { stiffness: 26.7, damping: 4.1, mass: 0.2 }

/**
 * Props for the Magnetic component
 * @typedef {Object} MagneticProps
 * @property {React.ReactNode} children - The content to be wrapped with magnetic effect
 * @property {number} [intensity=0.6] - The strength of the magnetic effect (0-1)
 * @property {number} [range=100] - The maximum distance in pixels from the center where the effect is active
 * @property {'self'|'parent'|'global'} [actionArea='self'] - Determines which area triggers the magnetic effect:
 *   - 'self': Only the component itself triggers the effect
 *   - 'parent': The parent element triggers the effect
 *   - 'global': The effect is always active
 * @property {SpringOptions} [springOptions=SPRING_CONFIG] - Custom spring animation configuration
 */
export type MagneticProps = {
  children: React.ReactNode
  intensity?: number
  range?: number
  actionArea?: 'self' | 'parent' | 'global'
  springOptions?: SpringOptions
}

/**
 * A React component that creates a magnetic effect on its children.
 * The component moves its children in response to mouse movement, creating an interactive magnetic effect.
 *
 * @param {MagneticProps} props - The props for the Magnetic component
 * @returns {JSX.Element} A motion.div element with magnetic behavior
 *
 * @example
 * ```tsx
 * <Magnetic intensity={0.8} range={150}>
 *   <Button>Hover me!</Button>
 * </Magnetic>
 * ```
 */
export function Magnetic({
  children,
  intensity = 0.6,
  range = 100,
  actionArea = 'self',
  springOptions = SPRING_CONFIG,
}: MagneticProps) {
  const [isHovered, setIsHovered] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const springX = useSpring(x, springOptions)
  const springY = useSpring(y, springOptions)

  /**
   * Calculates the distance between the mouse and the component's center
   * and updates the position accordingly
   * @param {MouseEvent} e - The mouse event
   */
  useEffect(() => {
    const calculateDistance = (e: MouseEvent) => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2
        const distanceX = e.clientX - centerX
        const distanceY = e.clientY - centerY

        const absoluteDistance = Math.sqrt(distanceX ** 2 + distanceY ** 2)

        if (isHovered && absoluteDistance <= range) {
          const scale = 1 - absoluteDistance / range
          x.set(distanceX * intensity * scale)
          y.set(distanceY * intensity * scale)
        } else {
          x.set(0)
          y.set(0)
        }
      }
    }

    document.addEventListener('mousemove', calculateDistance)

    return () => {
      document.removeEventListener('mousemove', calculateDistance)
    }
  }, [ref, isHovered, intensity, range])

  /**
   * Sets up event listeners for the parent element when actionArea is 'parent'
   * or enables global magnetic effect when actionArea is 'global'
   */
  useEffect(() => {
    if (actionArea === 'parent' && ref.current?.parentElement) {
      const parent = ref.current.parentElement

      const handleParentEnter = () => setIsHovered(true)
      const handleParentLeave = () => setIsHovered(false)

      parent.addEventListener('mouseenter', handleParentEnter)
      parent.addEventListener('mouseleave', handleParentLeave)

      return () => {
        parent.removeEventListener('mouseenter', handleParentEnter)
        parent.removeEventListener('mouseleave', handleParentLeave)
      }
    } else if (actionArea === 'global') {
      setIsHovered(true)
    }
  }, [actionArea])

  /**
   * Handles mouse enter event for the 'self' action area
   */
  const handleMouseEnter = () => {
    if (actionArea === 'self') {
      setIsHovered(true)
    }
  }

  /**
   * Handles mouse leave event for the 'self' action area
   */
  const handleMouseLeave = () => {
    if (actionArea === 'self') {
      setIsHovered(false)
      x.set(0)
      y.set(0)
    }
  }

  return (
    <motion.div
      ref={ref}
      onMouseEnter={actionArea === 'self' ? handleMouseEnter : undefined}
      onMouseLeave={actionArea === 'self' ? handleMouseLeave : undefined}
      style={{
        x: springX,
        y: springY,
      }}
    >
      {children}
    </motion.div>
  )
}
