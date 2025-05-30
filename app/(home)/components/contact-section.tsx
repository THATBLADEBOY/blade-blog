import { EMAIL } from '@/app/data'

import { CONTACT_LINKS } from '@/app/data'
import { MagneticLink } from '@/components/magnetic-link'
import { motion } from 'motion/react'

const VARIANTS_SECTION = {
  hidden: { opacity: 0, y: 20, filter: 'blur(8px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
}

const TRANSITION_SECTION = {
  duration: 0.3,
}

export function ContactSection() {
  return (
    <motion.section variants={VARIANTS_SECTION} transition={TRANSITION_SECTION}>
      <h3 className='text-primary/40 mb-5'>Connect</h3>
      <p className='text-primary/60 mb-5'>
        Feel free to contact me at{'  '}
        <a className='text-primary pl-0.5 underline' href={`mailto:${EMAIL}`}>
          {EMAIL}
        </a>
      </p>
      <div className='flex items-center justify-start space-x-3'>
        {CONTACT_LINKS.map((link) => (
          <MagneticLink key={link.label} link={link.link}>
            {link.label}
          </MagneticLink>
        ))}
      </div>
    </motion.section>
  )
}
