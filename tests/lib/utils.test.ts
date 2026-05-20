import { describe, it, expect } from 'vitest'
import { cn } from '@/lib/utils'

describe('cn utility function', () => {
  it('should merge class names correctly', () => {
    expect(cn('bg-red-500', 'text-white')).toBe('bg-red-500 text-white')
  })

  it('should handle conditional classes', () => {
    const isActive = true
    expect(cn(
      'bg-gray-500',
      isActive && 'bg-blue-500',
      !isActive && 'bg-red-500'
    )).toBe('bg-gray-500 bg-blue-500')
  })

  it('should resolve Tailwind conflicts', () => {
    expect(cn('p-4', 'p-8')).toBe('p-8')
  })

  it('should handle array inputs', () => {
    expect(cn(['bg-red-500', 'text-white'])).toBe('bg-red-500 text-white')
  })
})