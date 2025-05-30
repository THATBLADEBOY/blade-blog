'use client'

import { AnimatedBackground } from '@/components/ui/animated-background'
import { MonitorIcon, MoonIcon, SunIcon } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

const THEMES_OPTIONS = [
  {
    label: 'Light',
    id: 'light',
    icon: <SunIcon className='h-4 w-4' />,
  },
  {
    label: 'Dark',
    id: 'dark',
    icon: <MoonIcon className='h-4 w-4' />,
  },
  {
    label: 'System',
    id: 'system',
    icon: <MonitorIcon className='h-4 w-4' />,
  },
]

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <AnimatedBackground
      className='bg-secondary pointer-events-none rounded'
      defaultValue={theme ?? 'system'}
      transition={{
        type: 'spring',
        bounce: 0,
        duration: 0.2,
      }}
      enableHover={false}
      onValueChange={(id) => {
        setTheme(id as string)
      }}
    >
      {THEMES_OPTIONS.map((theme) => {
        return (
          <button
            key={theme.id}
            className='text-primary/40 data-[checked=true]:text-primary inline-flex h-7 w-7
              items-center justify-center transition-colors duration-100
              focus-visible:outline-2'
            type='button'
            aria-label={`Switch to ${theme.label} theme`}
            data-id={theme.id}
          >
            {theme.icon}
          </button>
        )
      })}
    </AnimatedBackground>
  )
}
