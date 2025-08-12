import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Tic Tac Toe title and initial status', () => {
  render(<App />);
  expect(screen.getByText(/Tic Tac Toe/i)).toBeInTheDocument();
  expect(screen.getByText(/Next: X/i)).toBeInTheDocument();
});

test('renders Reset button', () => {
  render(<App />);
  const resetButton = screen.getByRole('button', { name: /Reset/i });
  expect(resetButton).toBeInTheDocument();
});
