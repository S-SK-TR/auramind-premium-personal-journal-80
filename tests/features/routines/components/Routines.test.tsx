import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Routines } from '@/features/routines/components/Routines'

vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children }: { children: React.ReactNode }) => <div>{children}</div>
  }
}))

describe('Routines component', () => {
  it('should render correctly', () => {
    render(<Routines />)

    expect(screen.getByText('Daily Routines')).toBeInTheDocument()
    expect(screen.getByText('Manage your daily routines with premium UI.')).toBeInTheDocument()
  })

  it('should have glass-card styling', () => {
    const { container } = render(<Routines />)
    const card = container.querySelector('.glass-card')
    expect(card).toBeInTheDocument()
    expect(card).toHaveClass('rounded-2xl')
    expect(card).toHaveClass('border')
  })
})