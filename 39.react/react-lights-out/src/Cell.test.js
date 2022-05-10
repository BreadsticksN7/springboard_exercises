import React from "react";
import { render } from "@testing-library/react";
import Cell from "./Cell";

it('loads the page without crashing', () => {
  render(<Cell />);
});

it('matches snapshot', () => {
  const { asFragment } = render(<Cell />);
  expect(asFragment()).toMatchSnapshot();
});