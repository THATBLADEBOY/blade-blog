import { RefObject, useEffect } from 'react'

/**
 * Custom React hook that triggers a handler when a click or touch event occurs outside the referenced element.
 *
 * @example
 * const ref = useRef(null)
 * useClickOutside(ref, () => setOpen(false))
 */
function useClickOutside<T extends HTMLElement>(
  ref: RefObject<T>,
  handler: (event: MouseEvent | TouchEvent) => void,
): void {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (!ref || !ref.current || ref.current.contains(event.target as Node)) {
        return
      }

      handler(event)
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('touchstart', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('touchstart', handleClickOutside)
    }
  }, [ref, handler])
}

export default useClickOutside
