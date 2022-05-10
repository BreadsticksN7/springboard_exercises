import React from "react";
import { render, classList } from "@testing-library/react";
import Board from "./Board";

it('loads the page without crashing', () => {
  render(<Board />);
});

it('matches snapshot', () => {
  const { asFragment } = render(<Board chanceLightStartsOn={1} />);
  expect(asFragment()).toMatchSnapshot();
});

it('shows winning message', () => {
  const { getByText } = render(<Board chanceLightStartsOn={0} />);
  expect(getByText('You won!')).toBeInTheDocument();
});


