import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { AppShell } from './AppShell'

// Mock child components
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  NavLink: ({ children, to, className }) => (
    <a href={to} className={className}>{children}</a>
  )
}))

describe('AppShell', () => {
  it('renders logo', () => {
    render(
      <MemoryRouter>
        <AppShell>Test Content</AppShell>
      </MemoryRouter>
    )
    expect(screen.getByText('AuraMind')).toBeInTheDocument()
  })

  it('renders navigation items', () => {
    render(
      <MemoryRouter>
        <AppShell>Test Content</AppShell>
      </MemoryRouter>
    )
    expect(screen.getByText('Dashboard')).toBeInTheDocument()
    expect(screen.getByText('Notes')).toBeInTheDocument()
    expect(screen.getByText('Mood')).toBeInTheDocument()
    expect(screen.getByText('Routines')).toBeInTheDocument()
  })

  it('renders children content', () => {
    render(
      <MemoryRouter>
        <AppShell>Test Content</AppShell>
      </MemoryRouter>
    )
    expect(screen.getByText('Test Content')).toBeInTheDocument()
  })

  it('toggles mobile sidebar', () => {
    render(
      <MemoryRouter>
        <AppShell>Test Content</AppShell>
      </MemoryRouter>
    )

    // Initially hidden on mobile
    expect(screen.queryByText('Dashboard')).not.toBeInTheDocument()

    // Click to open
    fireEvent.click(screen.getByRole('button'))
    expect(screen.getByText('Dashboard')).toBeInTheDocument()

    // Click to close
    fireEvent.click(screen.getByRole('button'))
    expect(screen.queryByText('Dashboard')).not.toBeInTheDocument()
  })
})