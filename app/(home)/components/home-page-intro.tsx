/**
 * Introduction section for the home page.
 * Displays a brief bio and link to PerformYard.
 */
export function HomePageIntro() {
  return (
    <div className='flex-1'>
      <p className='text-primary/60'>
        Lead Software Engineer at{' '}
        <a href='https://performyard.com' className='underline'>
          PerformYard
        </a>
        . I enjoy <span className='line-through'>breaking</span> building
        things.
        <br />I write what I learn here because I know I'll forget it.
      </p>
    </div>
  )
}
