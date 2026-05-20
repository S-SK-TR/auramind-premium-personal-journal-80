import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import App from './App'

// Mock child components
jest.mock('@/components/layout/AppShell', () => ({ children }) => <div data-testid="app-shell">{children}</div>)
jest.mock('@/features/bento/components/BentoDashboard', () => () => <div data-testid="dashboard" />)
jest.mock('@/features/notes/components/Notes', () => () => <div data-testid="notes" />)
jest.mock('@/features/mood/components/Mood', () => () => <div data-testid="mood" />)
jest.mock('@/features/routines/components/Routines', () => () => <div data-testid="routines" />)

describe('App', () => {
  it('renders AppShell component', () => {
    render(
      <MemoryRouter initialEntries={[ '/' ]}>
        <App />
      </MemoryRouter>
    )
    expect(screen.getByTestId('app-shell')).toBeInTheDocument()
  })

  it('renders Dashboard by default', () => {
    render(
      <MemoryRouter initialEntries={[ '/' ]}>
        <App />
      </MemoryRouter>
    )
    expect(screen.getByTestId('dashboard')).toBeInTheDocument()
  })

  it('renders Notes component when route is /notes', () => {
    render(
      <MemoryRouter initialEntries={[ '/notes' ]}>
        <App />
      </MemoryRouter>
    )
    expect(screen.getByTestId('notes')).toBeInTheDocument()
  })

  it('renders Mood component when route is /mood', () => {
    render(
      <MemoryRouter initialEntries={[ '/mood' ]}>
        <App />
      </MemoryRouter>
    )
    expect(screen.getByTestId('mood')).toBeInTheDocument()
  })

  it('renders Routines component when route is /routines', () => {
    render(
      <MemoryRouter initialEntries={[ '/routines' ]}>
        <App />
      </MemoryRouter>
    )
    expect(screen.getByTestId('routines')).toBeInTheDocument()
  })

  it('redirects to /dashboard for unknown routes', () => {
    render(
      <MemoryRouter initialEntries={[ '/unknown' ]}>
        <App />
      </MemoryRouter>
    )
    expect(screen.getByTestId('dashboard')).toBeInTheDocument()
  })
})