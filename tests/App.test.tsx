import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import App from '@/App'

vi.mock('@/components/layout/AppShell', () => ({
  AppShell: ({ children }: { children: React.ReactNode }) => <div>{children}</div>
}))

vi.mock('@/features/bento/components/BentoDashboard', () => ({
  BentoDashboard: () => <div>Mock BentoDashboard</div>
}))

vi.mock('@/features/notes/components/Notes', () => ({
  Notes: () => <div>Mock Notes</div>
}))

vi.mock('@/features/mood/components/Mood', () => ({
  Mood: () => <div>Mock Mood</div>
}))

vi.mock('@/features/routines/components/Routines', () => ({
  Routines: () => <div>Mock Routines</div>
}))

vi.mock('@/features/new/NewPage', () => ({
  NewPage: () => <div>Mock NewPage</div>
}))

vi.mock('framer-motion', () => ({
  AnimatePresence: ({ children }: { children: React.ReactNode }) => <div>{children}</div>
}))

describe('App component', () => {
  it('should render correctly', () => {
    render(
      <MemoryRouter initialEntries={['/dashboard']}>
        <App />
      </MemoryRouter>
    )

    expect(screen.getByText('Mock BentoDashboard')).toBeInTheDocument()
  })

  it('should redirect to dashboard from root', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    )

    expect(screen.getByText('Mock BentoDashboard')).toBeInTheDocument()
  })

  it('should render Notes page when route is /notes', () => {
    render(
      <MemoryRouter initialEntries={['/notes']}>
        <App />
      </MemoryRouter>
    )

    expect(screen.getByText('Mock Notes')).toBeInTheDocument()
  })
})