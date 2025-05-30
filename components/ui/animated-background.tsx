'use client'

import { cn } from '@/lib/cn'
import { AnimatePresence, Transition, motion } from 'motion/react'
import {
  Children,
  cloneElement,
  ReactElement,
  useEffect,
  useState,
  useId,
} from 'react'

/**
 * Props interface for the AnimatedBackground component
 */
export type AnimatedBackgroundProps = {
  /**
   * Child elements that will have the animated background effect.
   * Each child must have a unique 'data-id' prop for identification.
   */
  children:
    | ReactElement<{ 'data-id': string }>[]
    | ReactElement<{ 'data-id': string }>
  /**
   * The default active element ID when the component mounts.
   * If not provided, no element will be active initially.
   */
  defaultValue?: string
  /**
   * Callback function that is called when the active element changes.
   * @param newActiveId - The ID of the newly active element, or null if no element is active
   */
  onValueChange?: (newActiveId: string | null) => void
  /**
   * Additional CSS classes to apply to the animated background element.
   */
  className?: string
  /**
   * Animation transition configuration for the background effect.
   * Uses Framer Motion's Transition type.
   * @default { type: 'spring', bounce: 0, duration: 0.3 }
   */
  transition?: Transition
  /**
   * If true, the background animation will be triggered on hover instead of click.
   * @default false
   */
  enableHover?: boolean
}

/**
 * A component that creates an animated background effect for a group of elements.
 * The background can be triggered by either hover or click interactions.
 *
 * @example
 * ```tsx
 * <AnimatedBackground enableHover>
 *   <div data-id="item1">Item 1</div>
 *   <div data-id="item2">Item 2</div>
 * </AnimatedBackground>
 * ```
 *
 * @param props - The component props
 * @returns A group of elements with animated background effects
 */
export function AnimatedBackground({
  children,
  defaultValue,
  onValueChange,
  className,
  transition = {
    type: 'spring',
    bounce: 0,
    duration: 0.3,
  },
  enableHover = false,
}: AnimatedBackgroundProps) {
  const [activeId, setActiveId] = useState<string | null>(null)
  const uniqueId = useId()

  const handleSetActiveId = (id: string | null) => {
    setActiveId(id)

    if (onValueChange) {
      onValueChange(id)
    }
  }

  useEffect(() => {
    if (defaultValue !== undefined) {
      setActiveId(defaultValue)
    }
  }, [defaultValue])

  return Children.map(children, (child: any, index) => {
    const id = child.props['data-id']

    const interactionProps = enableHover
      ? {
          onMouseEnter: () => handleSetActiveId(id),
          onMouseLeave: () => handleSetActiveId(null),
        }
      : {
          onClick: () => handleSetActiveId(id),
        }

    return cloneElement(
      child,
      {
        key: index,
        className: cn('relative inline-flex', child.props.className),
        'data-checked': activeId === id ? 'true' : 'false',
        ...interactionProps,
      },
      <>
        <AnimatePresence initial={false}>
          {activeId === id && (
            <motion.div
              layoutId={`background-${uniqueId}`}
              aria-hidden='true'
              tabIndex={-1}
              role='presentation'
              className={cn('absolute inset-0', className)}
              transition={transition}
              initial={{ opacity: defaultValue ? 1 : 0 }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
              }}
            />
          )}
        </AnimatePresence>
        <div className='z-10'>{child.props.children}</div>
      </>,
    )
  })
}
