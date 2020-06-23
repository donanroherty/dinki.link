import React from 'react';
import { render } from '@testing-library/react';
import App from '../App';

test('it renders', () => {
  const { getByText } = render(<App />);
  const appText = getByText(/App/i);
  expect(appText).toBeInTheDocument();
});
