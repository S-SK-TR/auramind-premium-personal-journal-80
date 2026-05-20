import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { Dashboard } from './BentoDashboard'

// Mock useNavigate
const mockNavigate = jest.fn()
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate
}))

describe('Dashboard', () => {
  it('renders dashboard title', () => {
    render(
      <MemoryRouter>
        <Dashboard />
      </MemoryRouter>
    )
    expect(screen.getByText('Dashboard')).toBeInTheDocument()
  })

  it('renders all bento items', () => {
    render(
      <MemoryRouter>
        <Dashboard />
      </MemoryRouter>
    )
    expect(screen.getByText('Notes')).toBeInTheDocument()
    expect(screen.getByText('Mood Tracker')).toBeInTheDocument()
    expect(screen.getByText('Routines')).toBeInTheDocument()
  })

  it('navigates to correct route when bento item is clicked', () => {
    render(
      <MemoryRouter>
        <Dashboard />
      </MemoryRouter>
    )

    fireEvent.click(screen.getByText('Notes'))
    expect(mockNavigate).toHaveBeenCalledWith('/notes')

    fireEvent.click(screen.getByText('Mood Tracker'))
    expect(mockNavigate).toHaveBeenCalledWith('/mood')

    fireEvent.click(screen.getByText('Routines'))
    expect(mockNavigate).toHaveBeenCalledWith('/routines')
  })
})