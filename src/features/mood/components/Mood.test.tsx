import { render, screen, fireEvent } from '@testing-library/react'
import { Mood } from './Mood'

describe('Mood', () => {
  it('renders mood tracker title', () => {
    render(<Mood />)
    expect(screen.getByText('Mood Tracker')).toBeInTheDocument()
  })

  it('renders all mood options', () => {
    render(<Mood />)
    expect(screen.getByText('Great')).toBeInTheDocument()
    expect(screen.getByText('Good')).toBeInTheDocument()
    expect(screen.getByText('Okay')).toBeInTheDocument()
    expect(screen.getByText('Bad')).toBeInTheDocument()
    expect(screen.getByText('Terrible')).toBeInTheDocument()
  })

  it('selects mood when button is clicked', () => {
    render(<Mood />)
    fireEvent.click(screen.getByText('Good'))
    const goodButton = screen.getByRole('button', { name: /good/i })
    expect(goodButton).toHaveClass('ring-2')
    expect(goodButton).toHaveClass('ring-[var(--brand-500)]')
  })

  it('shows selected mood feedback', () => {
    render(<Mood />)
    fireEvent.click(screen.getByText('Okay'))
    expect(screen.getByText('Okay')).toBeInTheDocument()
  })
})