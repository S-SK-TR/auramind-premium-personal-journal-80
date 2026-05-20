import React from 'react';
import { render, screen } from '@testing-library/react';
import { AppShell } from './AppShell';

// Mock child components
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  Outlet: () => <div data-testid="mock-outlet">Mock Outlet</div>,
  NavLink: ({ children, ...props }) => (
    <a {...props} data-testid="mock-navlink">{children}</a>
  )
}));

// Mock Framer Motion
jest.mock('framer-motion', () => ({
  ...jest.requireActual('framer-motion'),
  motion: {
    div: ({ children, ...props }) => <div {...props}>{children}</div>
  }
}));

describe('AppShell', () => {
  // Render Testleri
  describe('Rendering', () => {
    it('renders the component with all elements', () => {
      render(<AppShell />);
      expect(screen.getByTestId('mock-outlet')).toBeInTheDocument();
      expect(screen.getAllByTestId('mock-navlink').length).toBe(4); // 4 navigasyon linki
    });
  });

  // Responsive Testleri
  describe('Responsive Behavior', () => {
    it('renders correctly on mobile', () => {
      window.innerWidth = 375;
      render(<AppShell />);
      expect(screen.getByTestId('mock-outlet')).toBeInTheDocument();
    });

    it('renders correctly on desktop', () => {
      window.innerWidth = 1280;
      render(<AppShell />);
      expect(screen.getByTestId('mock-outlet')).toBeInTheDocument();
    });
  });

  // Dark/Light Mode Testleri
  describe('Theme Support', () => {
    it('renders correctly in dark mode', () => {
      document.documentElement.classList.add('dark');
      render(<AppShell />);
      expect(screen.getByTestId('mock-outlet')).toBeInTheDocument();
      document.documentElement.classList.remove('dark');
    });

    it('renders correctly in light mode', () => {
      document.documentElement.classList.add('light');
      render(<AppShell />);
      expect(screen.getByTestId('mock-outlet')).toBeInTheDocument();
      document.documentElement.classList.remove('light');
    });
  });
});
