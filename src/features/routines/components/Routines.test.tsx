import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Routines } from './Routines';

// Mock Framer Motion
jest.mock('framer-motion', () => ({
  ...jest.requireActual('framer-motion'),
  motion: {
    div: ({ children, ...props }) => <div {...props}>{children}</div>,
    button: ({ children, ...props }) => <button {...props}>{children}</button>
  },
  AnimatePresence: ({ children }) => <>{children}</>
}));

describe('Routines', () => {
  // Render Testleri
  describe('Rendering', () => {
    it('renders the component with all elements', () => {
      render(<Routines />);
      expect(screen.getByText('Rutinler')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Yeni rutin ekle')).toBeInTheDocument();
      expect(screen.getByText('Ekle')).toBeInTheDocument();
    });
  });

  // Interaktif Testleri
  describe('Interactions', () => {
    it('allows adding new routines', async () => {
      render(<Routines />);
      const input = screen.getByPlaceholderText('Yeni rutin ekle');
      const addButton = screen.getByText('Ekle');

      await userEvent.type(input, 'Spor yapmak');
      await userEvent.click(addButton);

      expect(screen.getByText('Spor yapmak')).toBeInTheDocument();
    });

    it('allows toggling routine completion', async () => {
      render(<Routines />);
      const input = screen.getByPlaceholderText('Yeni rutin ekle');
      const addButton = screen.getByText('Ekle');

      await userEvent.type(input, 'Spor yapmak');
      await userEvent.click(addButton);

      const routineItem = screen.getByText('Spor yapmak');
      const checkbox = routineItem.previousSibling;
      await userEvent.click(checkbox);

      expect(routineItem).toHaveClass('line-through');
    });
  });

  // Responsive Testleri
  describe('Responsive Behavior', () => {
    it('renders correctly on mobile', () => {
      window.innerWidth = 375;
      render(<Routines />);
      expect(screen.getByText('Rutinler')).toBeInTheDocument();
    });

    it('renders correctly on desktop', () => {
      window.innerWidth = 1280;
      render(<Routines />);
      expect(screen.getByText('Rutinler')).toBeInTheDocument();
    });
  });

  // Dark/Light Mode Testleri
  describe('Theme Support', () => {
    it('renders correctly in dark mode', () => {
      document.documentElement.classList.add('dark');
      render(<Routines />);
      expect(screen.getByText('Rutinler')).toBeInTheDocument();
      document.documentElement.classList.remove('dark');
    });

    it('renders correctly in light mode', () => {
      document.documentElement.classList.add('light');
      render(<Routines />);
      expect(screen.getByText('Rutinler')).toBeInTheDocument();
      document.documentElement.classList.remove('light');
    });
  });
});
