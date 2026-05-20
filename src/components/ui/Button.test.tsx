import { render, screen, fireEvent } from '@testing-library/react'
import { Button } from './Button'

describe('Button', () => {
  it('renders with default variant', () => {
    render(<Button>Click Me</Button>)
    const button = screen.getByRole('button', { name: /click me/i })
    expect(button).toHaveClass('bg-[var(--brand-500)]')
    expect(button).toHaveClass('text-white')
  })

  it('renders with ghost variant', () => {
    render(<Button variant="ghost">Ghost Button</Button>)
    const button = screen.getByRole('button', { name: /ghost button/i })
    expect(button).toHaveClass('hover:bg-[var(--glass-bg)]')
    expect(button).toHaveClass('hover:text-[var(--brand-500)]')
  })

  it('renders with icon size', () => {
    render(<Button size="icon">Icon</Button>)
    const button = screen.getByRole('button', { name: /icon/i })
    expect(button).toHaveClass('h-8 w-8')
  })

  it('calls onClick handler when clicked', () => {
    const handleClick = jest.fn()
    render(<Button onClick={handleClick}>Click Me</Button>)
    fireEvent.click(screen.getByRole('button', { name: /click me/i }))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('applies additional className', () => {
    render(<Button className="custom-class">Styled Button</Button>)
    const button = screen.getByRole('button', { name: /styled button/i })
    expect(button).toHaveClass('custom-class')
  })
})