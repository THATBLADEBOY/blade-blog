import { ThemeSwitcher } from '@/components/theme-switcher'
import { CONTACT_LINKS, NAME } from '@/app/data'

export function Footer() {
  return (
    <footer className='border-t px-0 py-4'>
      <div className='flex items-center justify-between'>
        <a
          href={CONTACT_LINKS.find((link) => link.label === 'Github')?.link}
          target='_blank'
        >
          <span className='text-primary/40 text-xs'>
            © {new Date().getFullYear()} {NAME}.
          </span>
        </a>
        <div className='text-xs'>
          <ThemeSwitcher />
        </div>
      </div>
    </footer>
  )
}
