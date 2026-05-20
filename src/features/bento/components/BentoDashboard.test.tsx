import React from 'react';
import { render, screen } from '@testing-library/react';
import { BentoDashboard } from './BentoDashboard';

// Mock child components
jest.mock('@/components/ui/BentoGrid', () => ({
  BentoGrid: ({ children }) => <div data-testid="mock-bento-grid">{children}</div>,
  BentoGridItem: ({ children, ...props }) => (
    <div data-testid="mock-bento-grid-item" {...props}>{children}</div>
  )
}));

// Mock Framer Motion
jest.mock('framer-motion', () => ({
  ...jest.requireActual('framer-motion'),
  motion: {
    div: ({ children, ...props }) => <div {...props}>{children}</div>
  }
}));

describe('BentoDashboard', () => {
  // Render Testleri
  describe('Rendering', () => {
    it('renders the component with all elements', () => {
      render(<BentoDashboard />);
      expect(screen.getByTestId('mock-bento-grid')).toBeInTheDocument();
      expect(screen.getAllByTestId('mock-bento-grid-item').length).toBe(6); // 6 Bento grid öğesi
    });
  });

  // Responsive Testleri
  describe('Responsive Behavior', () => {
    it('renders correctly on mobile', () => {
      window.innerWidth = 375;
      render(<BentoDashboard />);
      expect(screen.getByTestId('mock-bento-grid')).toBeInTheDocument();
    });

    it('renders correctly on desktop', () => {
      window.innerWidth = 1280;
      render(<BentoDashboard />);
      expect(screen.getByTestId('mock-bento-grid')).toBeInTheDocument();
    });
  });

  // Dark/Light Mode Testleri
  describe('Theme Support', () => {
    it('renders correctly in dark mode', () => {
      document.documentElement.classList.add('dark');
      render(<BentoDashboard />);
      expect(screen.getByTestId('mock-bento-grid')).toBeInTheDocument();
      document.documentElement.classList.remove('dark');
    });

    it('renders correctly in light mode', () => {
      document.documentElement.classList.add('light');
      render(<BentoDashboard />);
      expect(screen.getByTestId('mock-bento-grid')).toBeInTheDocument();
      document.documentElement.classList.remove('light');
    });
  });
});
