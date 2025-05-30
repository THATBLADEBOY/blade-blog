'use client'

import { AnimatedBackground } from '@/components/ui/animated-background'
import { FadeTextEffect } from '@/components/ui/fade-text-effect'
import { motion } from 'motion/react'

const VARIANTS_CONTAINER = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const VARIANTS_ITEM = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

const tools = {
  'Development Stack': [
    {
      name: 'TypeScript',
      description:
        "Because JavaScript wasn't confusing enough already. But seriously, type safety is a game-changer.",
      link: 'https://www.typescriptlang.org/',
    },
    {
      name: 'Node.js',
      description:
        'The OG JavaScript runtime. Still going strong after all these years.',
      link: 'https://nodejs.org/',
    },
    {
      name: 'Bun',
      description:
        "The new kid on the block. So fast it makes Node.js look like it's running in molasses.",
      link: 'https://bun.sh/',
    },
    {
      name: 'React',
      description:
        "The library that made us all component-obsessed. And I wouldn't have it any other way.",
      link: 'https://react.dev/',
    },
    {
      name: 'Next.js',
      description:
        'The framework that makes React actually make sense. Server components? Yes please.',
      link: 'https://nextjs.org/',
    },
    {
      name: 'Rspack',
      description:
        "Webpack's rebellious younger sibling. Faster, simpler, and doesn't need a PhD to configure.",
      link: 'https://www.rspack.dev/',
    },
    {
      name: 'Vite',
      description:
        'The bundler that made us question why we ever used anything else.',
      link: 'https://vitejs.dev/',
    },
    {
      name: 'Turborepo',
      description:
        'Monorepos without the existential crisis. Build caching that actually works.',
      link: 'https://turbo.build/repo',
    },
  ],
  'Development Tools': [
    {
      name: 'Warp',
      description:
        'The terminal that finally made me stop complaining about terminal emulators.',
      link: 'https://www.warp.dev/',
    },
    {
      name: 'Cursor',
      description:
        "The IDE that makes me feel like I'm cheating at coding. AI pair programming is the future.",
      link: 'https://cursor.sh/',
    },
  ],
  Hardware: [
    {
      name: 'MacBook M3 Max',
      description:
        'The laptop that makes my old Intel machine look like a potato. M-series chips are black magic.',
      link: 'https://www.apple.com/macbook-pro/',
    },
    {
      name: 'Logitech Ergo K860',
      description:
        'The keyboard that keeps my wrists from staging a rebellion. Split design? Yes please.',
      link: 'https://www.logitech.com/en-us/products/keyboards/k860-split-ergonomic.920-009387.html',
    },
    {
      name: 'Logitech MX Master 3',
      description:
        "The mouse that makes other mice feel like they're from the stone age.",
      link: 'https://www.logitech.com/en-us/products/mice/mx-master-3.910-005620.html',
    },
    {
      name: 'AirPods Max',
      description:
        "The headphones that make me look like I'm from the future. Spatial audio is witchcraft.",
      link: 'https://www.apple.com/airpods-max/',
    },
  ],
}

export default function Page() {
  return (
    <section>
      <h1 className='mb-8 text-2xl font-semibold tracking-tighter'>Uses</h1>
      <FadeTextEffect
        per='word'
        className='text-primary/70 mb-12 italic'
        speedReveal={1.2}
      >
        "The tools we use shape the way we work."
      </FadeTextEffect>

      <motion.div
        variants={VARIANTS_CONTAINER}
        initial='hidden'
        animate='visible'
        className='space-y-12'
      >
        {Object.entries(tools).map(([category, items]) => (
          <motion.div key={category} variants={VARIANTS_ITEM}>
            <h2 className='mb-4 text-xl font-medium tracking-tight'>
              {category}
            </h2>
            <div className='grid gap-4 sm:grid-cols-2'>
              <AnimatedBackground
                className='bg-secondary rounded-lg'
                transition={{
                  type: 'spring',
                  bounce: 0.2,
                  duration: 0.3,
                }}
                enableHover
              >
                {items.map((tool, index) => (
                  <a
                    key={index}
                    href={tool.link}
                    target='_blank'
                    rel='noopener noreferrer'
                    data-id={tool.name}
                    className='hover:text-primary block p-4 transition-colors duration-200'
                  >
                    <h3 className='mb-1 font-medium'>{tool.name}</h3>
                    <p className='text-primary/70 text-sm'>
                      {tool.description}
                    </p>
                  </a>
                ))}
              </AnimatedBackground>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
