import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

// PREMIUM UI: cn() utility for conditional class merging with tailwind-merge
// Ensures class conflicts are resolved and only valid Tailwind classes are applied
// Also includes framer-motion specific classes

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
