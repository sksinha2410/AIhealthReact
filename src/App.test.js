import { render, screen, waitFor } from '@testing-library/react';
import App from './App';

test('renders health news daily header', async () => {
  render(<App />);
  await waitFor(() => {
    const headerElement = screen.getByText(/Health News Daily/i);
    expect(headerElement).toBeInTheDocument();
  });
});

test('renders loading spinner initially', () => {
  render(<App />);
  const loadingElement = screen.getByText(/Loading health news/i);
  expect(loadingElement).toBeInTheDocument();
});
