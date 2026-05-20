import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './Button';

// Mock Framer Motion
jest.mock('framer-motion', () => ({
  ...jest.requireActual('framer-motion'),
  motion: {
    button: ({ children, ...props }) => <button {...props}>{children}</button>
  }
}));

describe('Button', () => {
  // Render Testleri
  describe('Rendering', () => {
    it('renders with children', () => {
      render(<Button>Click Me</Button>);
      expect(screen.getByText('Click Me')).toBeInTheDocument();
    });

    it('renders with different variants', () => {
      const { rerender } = render(<Button variant="primary">Primary</Button>);
      expect(screen.getByText('Primary')).toHaveClass('bg-brand-primary');

      rerender(<Button variant="secondary">Secondary</Button>);
      expect(screen.getByText('Secondary')).toHaveClass('bg-brand-secondary');
    });
  });

  // Interaktif Testleri
  describe('Interactions', () => {
    it('calls onClick handler when clicked', () => {
      const handleClick = jest.fn();
      render(<Button onClick={handleClick}>Click Me</Button>);
      fireEvent.click(screen.getByText('Click Me'));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });

  // Responsive Testleri
  describe('Responsive Behavior', () => {
    it('renders correctly on mobile', () => {
      window.innerWidth = 375;
      render(<Button>Mobile Button</Button>);
      expect(screen.getByText('Mobile Button')).toBeInTheDocument();
    });

    it('renders correctly on desktop', () => {
      window.innerWidth = 1280;
      render(<Button>Desktop Button</Button>);
      expect(screen.getByText('Desktop Button')).toBeInTheDocument();
    });
  });

  // Dark/Light Mode Testleri
  describe('Theme Support', () => {
    it('renders correctly in dark mode', () => {
      document.documentElement.classList.add('dark');
      render(<Button>Dark Mode</Button>);
      expect(screen.getByText('Dark Mode')).toBeInTheDocument();
      document.documentElement.classList.remove('dark');
    });

    it('renders correctly in light mode', () => {
      document.documentElement.classList.add('light');
      render(<Button>Light Mode</Button>);
      expect(screen.getByText('Light Mode')).toBeInTheDocument();
      document.documentElement.classList.remove('light');
    });
  });
});
