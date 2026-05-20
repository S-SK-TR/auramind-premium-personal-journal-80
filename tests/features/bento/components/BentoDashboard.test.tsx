import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BentoDashboard } from '@/features/bento/components/BentoDashboard'

vi.mock('@/features/notes/components/Notes', () => ({
  Notes: () => <div>Mock Notes</div>
}))

vi.mock('@/features/mood/components/Mood', () => ({
  Mood: () => <div>Mock Mood</div>
}))

vi.mock('@/features/routines/components/Routines', () => ({
  Routines: () => <div>Mock Routines</div>
}))

vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children }: { children: React.ReactNode }) => <div>{children}</div>
  }
}))

describe('BentoDashboard component', () => {
  it('should render correctly', () => {
    render(<BentoDashboard />)

    expect(screen.getByText('Mock Notes')).toBeInTheDocument()
    expect(screen.getByText('Mock Mood')).toBeInTheDocument()
    expect(screen.getByText('Mock Routines')).toBeInTheDocument()
  })

  it('should have correct grid layout', () => {
    const { container } = render(<BentoDashboard />)
    const grid = container.querySelector('.grid')
    expect(grid).toHaveClass('grid-cols-1')
    expect(grid).toHaveClass('md:grid-cols-3')
  })
})