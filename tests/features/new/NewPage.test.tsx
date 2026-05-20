import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { NewPage } from '@/features/new/NewPage'

vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children }: { children: React.ReactNode }) => <div>{children}</div>
  }
}))

describe('NewPage component', () => {
  it('should render correctly', () => {
    render(<NewPage />)

    expect(screen.getByText('New Page')).toBeInTheDocument()
    expect(screen.getByText('This is a new page with premium UI elements.')).toBeInTheDocument()
  })

  it('should have glass-card styling', () => {
    const { container } = render(<NewPage />)
    const card = container.querySelector('.glass-card')
    expect(card).toBeInTheDocument()
    expect(card).toHaveClass('rounded-2xl')
    expect(card).toHaveClass('border')
  })
})