import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Notes } from '@/features/notes/components/Notes'

vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children }: { children: React.ReactNode }) => <div>{children}</div>
  }
}))

describe('Notes component', () => {
  it('should render correctly', () => {
    render(<Notes />)

    expect(screen.getByText('Notes')).toBeInTheDocument()
    expect(screen.getByText('Your premium notes dashboard with glassmorphism UI.')).toBeInTheDocument()
  })

  it('should have glass-card styling', () => {
    const { container } = render(<Notes />)
    const card = container.querySelector('.glass-card')
    expect(card).toBeInTheDocument()
    expect(card).toHaveClass('rounded-2xl')
    expect(card).toHaveClass('border')
  })
})