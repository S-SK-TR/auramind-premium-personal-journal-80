import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

// Mock child components
jest.mock('./features/notes/components/Notes', () => ({
  Notes: () => <div data-testid="mock-notes">Mock Notes</div>
}));

jest.mock('./features/mood/components/Mood', () => ({
  Mood: () => <div data-testid="mock-mood">Mock Mood</div>
}));

jest.mock('./features/routines/components/Routines', () => ({
  Routines: () => <div data-testid="mock-routines">Mock Routines</div>
}));

jest.mock('./features/bento/components/BentoDashboard', () => ({
  BentoDashboard: () => <div data-testid="mock-bento-dashboard">Mock Bento Dashboard</div>
}));

// Mock Framer Motion
jest.mock('framer-motion', () => ({
  ...jest.requireActual('framer-motion'),
  motion: {
    div: ({ children, ...props }) => <div {...props}>{children}</div>
  }
}));

describe('App', () => {
  // Render Testleri
  describe('Rendering', () => {
    it('renders the component with all elements', () => {
      render(<App />);
      expect(screen.getByTestId('mock-notes')).toBeInTheDocument();
      expect(screen.getByTestId('mock-mood')).toBeInTheDocument();
      expect(screen.getByTestId('mock-routines')).toBeInTheDocument();
      expect(screen.getByTestId('mock-bento-dashboard')).toBeInTheDocument();
    });
  });

  // Responsive Testleri
  describe('Responsive Behavior', () => {
    it('renders correctly on mobile', () => {
      window.innerWidth = 375;
      render(<App />);
      expect(screen.getByTestId('mock-notes')).toBeInTheDocument();
    });

    it('renders correctly on desktop', () => {
      window.innerWidth = 1280;
      render(<App />);
      expect(screen.getByTestId('mock-notes')).toBeInTheDocument();
    });
  });

  // Dark/Light Mode Testleri
  describe('Theme Support', () => {
    it('renders correctly in dark mode', () => {
      document.documentElement.classList.add('dark');
      render(<App />);
      expect(screen.getByTestId('mock-notes')).toBeInTheDocument();
      document.documentElement.classList.remove('dark');
    });

    it('renders correctly in light mode', () => {
      document.documentElement.classList.add('light');
      render(<App />);
      expect(screen.getByTestId('mock-notes')).toBeInTheDocument();
      document.documentElement.classList.remove('light');
    });
  });
});
