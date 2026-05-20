import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { AppShell } from '@/components/layout/AppShell'

vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
    span: ({ children }: { children: React.ReactNode }) => <span>{children}</span>
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => <div>{children}</div>
}))

describe('AppShell component', () => {
  it('should render correctly', () => {
    render(
      <MemoryRouter initialEntries={['/dashboard']}>
        <AppShell>Test Content</AppShell>
      </MemoryRouter>
    )

    expect(screen.getByText('MyDailyNotes')).toBeInTheDocument()
    expect(screen.getByText('Test Content')).toBeInTheDocument()
    expect(screen.getByText('Dashboard')).toBeInTheDocument()
    expect(screen.getByText('Notes')).toBeInTheDocument()
  })

  it('should highlight active route', () => {
    render(
      <MemoryRouter initialEntries={['/notes']}>
        <AppShell>Test Content</AppShell>
      </MemoryRouter>
    )

    const notesLink = screen.getByText('Notes').closest('a')
    expect(notesLink).toHaveClass('bg-[var(--brand-500)]/10')
  })

  it('should show mobile navigation on small screens', () => {
    render(
      <MemoryRouter initialEntries={['/dashboard']}>
        <AppShell>Test Content</AppShell>
      </MemoryRouter>
    )

    const mobileNav = screen.getByText('Dashboard').closest('div')
    expect(mobileNav).toHaveClass('md:hidden')
  })
})