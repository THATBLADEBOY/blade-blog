'use client'

import { FadeTextEffect } from '@/components/ui/fade-text-effect'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { AnimatedBackground } from '@/components/ui/animated-background'
import { TextScramble } from '@/components/ui/text-scramble'
import { JOB_TITLE, NAME } from './data'

function NavigationLinks() {
  const pathname = usePathname()
  const currentPath = pathname.split('/')[1]

  const isActive = (path: string) => {
    const pathWithoutSlash = path.replace('/', '')
    return currentPath === pathWithoutSlash
  }

  const AVAILABLE_LINKS = [
    {
      label: 'Writing',
      href: '/blog',
    },
    {
      label: 'Prompts',
      href: '/prompts',
    },
    {
      label: 'Uses',
      href: '/uses',
    },
  ]

  return (
    <div className='flex flex-row'>
      <AnimatedBackground
        className='bg-secondary rounded'
        transition={{
          type: 'spring',
          bounce: 0.2,
          duration: 0.3,
        }}
        enableHover
      >
        {AVAILABLE_LINKS.map((link, index) => (
          <Link
            key={index}
            href={link.href}
            data-id={link.href}
            className={`px-2 py-1 transition-colors duration-300 ${
            isActive(link.href)
                ? 'text-primary'
                : 'text-primary/40 hover:text-primary'
            }`}
          >
            {link.label}
          </Link>
        ))}
      </AnimatedBackground>
    </div>
  )
}

export function Header() {
  return (
    <header className='flex items-center justify-between'>
      <div>
        <Link href='/' className='font-medium'>
          <TextScramble characterSet='0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'>
            {NAME}
          </TextScramble>
        </Link>
        <FadeTextEffect
          as='p'
          per='char'
          className='text-primary/40'
          delay={0.5}
        >
          {JOB_TITLE}
        </FadeTextEffect>
      </div>
      <NavigationLinks />
    </header>
  )
}
