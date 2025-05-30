import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Utility function to conditionally join classNames together and merge Tailwind CSS classes.
 * Uses `clsx` for conditional logic and `tailwind-merge` for deduplication.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
