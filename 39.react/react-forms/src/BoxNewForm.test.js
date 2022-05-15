import React from 'react';
import { render } from '@testing-library/react';
import BoxNewForm from './BoxNewForm';

it('renders without crashing', () => {
  render(<BoxNewForm />);
});

it('matches snapshot', () => {
  const { asFragment } = render(<BoxNewForm />);
  expect(asFragment()).toMatchSnapshot();
});