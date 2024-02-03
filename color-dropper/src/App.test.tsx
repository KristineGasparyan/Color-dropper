import React from 'react';
import { render, screen } from '@testing-library/react';
import ColorDropperApp from './App';

test('renders learn react link', () => {
  render(<ColorDropperApp />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
