'use client'
import { cn } from '@/lib/cn'
import {
  AnimatePresence,
  motion,
  TargetAndTransition,
  Transition,
  Variant,
  Variants,
  MotionStyle,
} from 'motion/react'
import React from 'react'

/**
 * The type of text segmentation to use for the fade animation.
 * - 'char': Animate each character individually
 * - 'word': Animate each word individually
 * - 'line': Animate each line individually
 */
export type PerType = 'word' | 'char' | 'line'

/**
 * Props for the FadeTextEffect component.
 * @property {string} children - The text content to animate
 * @property {PerType} [per='word'] - How to segment the text for animation
 * @property {keyof React.JSX.IntrinsicElements} [as='p'] - The HTML element to render as
 * @property {string} [className] - Additional CSS classes to apply
 * @property {number} [delay=0] - Initial delay before animation starts (in seconds)
 * @property {number} [speedReveal=1] - Speed multiplier for the reveal animation
 * @property {number} [speedSegment=1] - Speed multiplier for individual segment animations
 * @property {boolean} [trigger=true] - Whether to trigger the animation
 * @property {() => void} [onAnimationComplete] - Callback when animation completes
 * @property {() => void} [onAnimationStart] - Callback when animation starts
 * @property {string} [segmentWrapperClassName] - Additional CSS classes for segment wrappers
 * @property {Transition} [containerTransition] - Custom transition for the container
 * @property {Transition} [segmentTransition] - Custom transition for individual segments
 * @property {Partial<MotionStyle>} [style] - Additional motion styles to apply
 */
export type FadeTextEffectProps = {
  children: string
  per?: PerType
  as?: keyof React.JSX.IntrinsicElements
  className?: string
  delay?: number
  speedReveal?: number
  speedSegment?: number
  trigger?: boolean
  onAnimationComplete?: () => void
  onAnimationStart?: () => void
  segmentWrapperClassName?: string
  containerTransition?: Transition
  segmentTransition?: Transition
  style?: Partial<MotionStyle>
}

/**
 * Default stagger times for different text segmentation types.
 * Controls the delay between each segment's animation.
 */
const defaultStaggerTimes: Record<PerType, number> = {
  char: 0.03,
  word: 0.05,
  line: 0.1,
}

/**
 * Default container animation variants.
 * Controls the overall container's fade animation.
 */
const defaultContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
  exit: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
}

/**
 * Default item animation variants.
 * Controls the fade animation of individual text segments.
 */
const defaultItemVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
  },
  exit: { opacity: 0 },
}

/**
 * Component that renders and animates a single text segment.
 * @param {Object} props - Component props
 * @param {string} props.segment - The text segment to animate
 * @param {Variants} props.variants - Animation variants to apply
 * @param {PerType} props.per - How the text is segmented
 * @param {string} [props.segmentWrapperClassName] - Additional CSS classes for the wrapper
 */
const AnimationComponent: React.FC<{
  segment: string
  variants: Variants
  per: PerType
  segmentWrapperClassName?: string | undefined
}> = React.memo(({ segment, variants, per, segmentWrapperClassName }) => {
  const content =
    per === 'line' ? (
      <motion.span variants={variants} className='block'>
        {segment}
      </motion.span>
    ) : per === 'word' ? (
      <motion.span
        aria-hidden='true'
        variants={variants}
        className='inline-block whitespace-pre'
      >
        {segment}
      </motion.span>
    ) : (
      <motion.span className='inline-block whitespace-pre'>
        {segment.split('').map((char, charIndex) => (
          <motion.span
            key={`char-${charIndex}`}
            aria-hidden='true'
            variants={variants}
            className='inline-block whitespace-pre'
          >
            {char}
          </motion.span>
        ))}
      </motion.span>
    )

  if (!segmentWrapperClassName) {
    return content
  }

  const defaultWrapperClassName = per === 'line' ? 'block' : 'inline-block'

  return (
    <span className={cn(defaultWrapperClassName, segmentWrapperClassName)}>
      {content}
    </span>
  )
})

AnimationComponent.displayName = 'AnimationComponent'

/**
 * Splits text into segments based on the specified type.
 * @param {string} text - The text to split
 * @param {PerType} per - How to split the text
 * @returns {string[]} Array of text segments
 */
const splitText = (text: string, per: PerType) => {
  if (per === 'line') return text.split('\n')
  return text.split(/(\s+)/)
}

/**
 * Type guard to check if a variant has a transition property.
 */
const hasTransition = (
  variant: Variant,
): variant is TargetAndTransition & { transition?: Transition } => {
  return (
    typeof variant === 'object' && variant !== null && 'transition' in variant
  )
}

/**
 * Creates animation variants with custom transitions.
 * @param {Variants} baseVariants - Base animation variants
 * @param {Transition & { exit?: Transition }} [transition] - Custom transitions to apply
 * @returns {Variants} Combined variants with transitions
 */
const createVariantsWithTransition = (
  baseVariants: Variants,
  transition?: Transition & { exit?: Transition },
): Variants => {
  if (!transition) return baseVariants

  const { exit: _, ...mainTransition } = transition

  return {
    ...baseVariants,
    visible: {
      ...baseVariants['visible'],
      transition: {
        ...(hasTransition(baseVariants['visible'])
          ? baseVariants['visible'].transition
          : {}),
        ...mainTransition,
      },
    },
    exit: {
      ...baseVariants['exit'],
      transition: {
        ...(hasTransition(baseVariants['exit'])
          ? baseVariants['exit'].transition
          : {}),
        ...mainTransition,
        staggerDirection: -1,
      },
    },
  }
}

/**
 * A component that animates text with a fade effect.
 * The text can be animated character by character, word by word, or line by line.
 *
 * @example
 * ```tsx
 * <FadeTextEffect per="char">
 *   Hello World
 * </FadeTextEffect>
 * ```
 *
 * @param {FadeTextEffectProps} props - Component props
 * @returns {JSX.Element} The animated text component
 */
export function FadeTextEffect({
  children,
  per = 'word',
  as = 'p',
  className,
  delay = 0,
  speedReveal = 1,
  speedSegment = 1,
  trigger = true,
  onAnimationComplete,
  onAnimationStart,
  segmentWrapperClassName,
  containerTransition,
  segmentTransition,
  style,
}: FadeTextEffectProps) {
  const segments = splitText(children, per)
  const MotionTag = motion[as as keyof typeof motion] as typeof motion.div

  const stagger = defaultStaggerTimes[per] / speedReveal
  const baseDuration = 0.3 / speedSegment

  const computedVariants = {
    container: createVariantsWithTransition(defaultContainerVariants, {
      staggerChildren: stagger,
      delayChildren: delay,
      ...containerTransition,
      exit: {
        staggerChildren: stagger,
        staggerDirection: -1,
      },
    }),
    item: createVariantsWithTransition(defaultItemVariants, {
      duration: baseDuration,
      ...segmentTransition,
    }),
  }

  return (
    <AnimatePresence mode='popLayout'>
      {trigger && (
        <MotionTag
          initial='hidden'
          animate='visible'
          exit='exit'
          variants={computedVariants.container}
          className={className}
          onAnimationComplete={onAnimationComplete}
          onAnimationStart={onAnimationStart}
          style={style ?? {}}
        >
          {per !== 'line' ? <span className='sr-only'>{children}</span> : null}
          {segments.map((segment, index) => (
            <AnimationComponent
              key={`${per}-${index}-${segment}`}
              segment={segment}
              variants={computedVariants.item}
              per={per}
              segmentWrapperClassName={segmentWrapperClassName}
            />
          ))}
        </MotionTag>
      )}
    </AnimatePresence>
  )
}
