import { render, screen } from '@testing-library/react';
import App from './App';

test('renders app title', () => {
  render(<App />);
  const titleElement = screen.getByText(/拼豆图纸生成器/i);
  expect(titleElement).toBeInTheDocument();
});
