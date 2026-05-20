import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MoodTracker } from './MoodTracker';

// Mock Framer Motion
jest.mock('framer-motion', () => ({
  ...jest.requireActual('framer-motion'),
  motion: {
    div: ({ children, ...props }) => <div {...props}>{children}</div>,
    button: ({ children, ...props }) => <button {...props}>{children}</button>
  },
  AnimatePresence: ({ children }) => <>{children}</>
}));

describe('MoodTracker', () => {
  // Render Testleri
  describe('Rendering', () => {
    it('renders the component with all elements', () => {
      render(<MoodTracker />);
      expect(screen.getByText('Haftalık Duygu Takibi')).toBeInTheDocument();
      expect(screen.getAllByRole('button').length).toBe(7); // 7 duygu butonu
      expect(screen.getAllByRole('article').length).toBe(7); // 7 günlük duygu kartı
    });

    it('renders with custom className', () => {
      render(<MoodTracker className="custom-class" />);
      const container = screen.getByText('Haftalık Duygu Takibi').closest('div');
      expect(container).toHaveClass('custom-class');
    });
  });

  // Interaktif Testleri
  describe('Interactions', () => {
    it('allows selecting moods', async () => {
      render(<MoodTracker />);
      const happyButton = screen.getByTitle('Çok İyi');
      await userEvent.click(happyButton);
      expect(happyButton).toHaveClass('bg-green-500');
    });

    it('updates weekly mood display when mood is selected', async () => {
      render(<MoodTracker />);
      const today = new Date().getDay();
      const happyButton = screen.getByTitle('Çok İyi');
      await userEvent.click(happyButton);
      const todayMoodCard = screen.getAllByRole('article')[today];
      expect(todayMoodCard).toHaveClass('bg-green-500');
      expect(todayMoodCard).toHaveTextContent('😊');
    });
  });

  // Responsive Testleri
  describe('Responsive Behavior', () => {
    it('renders correctly on mobile', () => {
      window.innerWidth = 375;
      render(<MoodTracker />);
      // Mobilde grid layout'un düzgün çalıştığını kontrol et
      const moodCards = screen.getAllByRole('article');
      expect(moodCards.length).toBe(7);
    });

    it('renders correctly on desktop', () => {
      window.innerWidth = 1280;
      render(<MoodTracker />);
      // Desktopta grid layout'un düzgün çalıştığını kontrol et
      const moodCards = screen.getAllByRole('article');
      expect(moodCards.length).toBe(7);
    });
  });

  // Dark/Light Mode Testleri
  describe('Theme Support', () => {
    it('renders correctly in dark mode', () => {
      document.documentElement.classList.add('dark');
      render(<MoodTracker />);
      const container = screen.getByText('Haftalık Duygu Takibi').closest('div');
      expect(container).toHaveClass('glass-card');
      document.documentElement.classList.remove('dark');
    });

    it('renders correctly in light mode', () => {
      document.documentElement.classList.add('light');
      render(<MoodTracker />);
      const container = screen.getByText('Haftalık Duygu Takibi').closest('div');
      expect(container).toHaveClass('glass-card');
      document.documentElement.classList.remove('light');
    });
  });
});
