import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Mood } from '@/features/mood/components/Mood'

vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children }: { children: React.ReactNode }) => <div>{children}</div>
  }
}))

describe('Mood component', () => {
  it('should render correctly', () => {
    render(<Mood />)

    expect(screen.getByText('Mood Tracker')).toBeInTheDocument()
    expect(screen.getByText('Track your daily mood with premium UI elements.')).toBeInTheDocument()
  })

  it('should have glass-card styling', () => {
    const { container } = render(<Mood />)
    const card = container.querySelector('.glass-card')
    expect(card).toBeInTheDocument()
    expect(card).toHaveClass('rounded-2xl')
    expect(card).toHaveClass('border')
  })
})