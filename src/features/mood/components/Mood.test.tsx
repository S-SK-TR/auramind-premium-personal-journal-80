import React from 'react';
import { render, screen } from '@testing-library/react';
import { Mood } from './Mood';

// Mock MoodTracker component
jest.mock('./MoodTracker', () => ({
  MoodTracker: () => <div data-testid="mock-mood-tracker">Mock Mood Tracker</div>
}));

describe('Mood', () => {
  it('renders the MoodTracker component', () => {
    render(<Mood />);
    expect(screen.getByTestId('mock-mood-tracker')).toBeInTheDocument();
  });

  it('applies custom className to the container', () => {
    render(<Mood className="custom-class" />);
    const container = screen.getByTestId('mock-mood-tracker').parentElement;
    expect(container).toHaveClass('custom-class');
  });
});
