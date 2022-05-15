import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import Boxlist from './BoxList';

function addBox(boxList, width = "5", height = "5", color = "orange") {
  const divHeight = boxList.getByLabelText("Height:");
  const divWidth = boxList.getByLabelText("Width:");
  const divColor = boxList.getByLabelText("Color:");
  fireEvent.change(divWidth, { target: { value: width }});
  fireEvent.change(divHeight, { target: { value: height }});
  fireEvent.change(divColor, { target: { value: color }});
  const btn = boxList.getByText("Add box");
  fireEvent.click(btn);
}

it('renders without crashing', () => {
  render(<Boxlist />);
});

it('matches the snapshot', () => {
    const { asFragment } = render(<Boxlist />);
    expect(asFragment()).toMatchSnapshot();
});

it('can remove a box', () => {
  const boxList = render(<Boxlist />);
  addBox(boxList);
  const btn = boxList.getByText("Remove");
  fireEvent.click(btn);
  expect(btn).not.toBeInTheDocument();
});

// it('creates a box', () => {
//     const boxList = render(<Boxlist />);
//     expect(boxList.queryByText("Remove")).not.toBeInTheDocument();
//     addBox(boxList);
//     const removeBtn = boxList.getByText("Remove");
//     expect(removeBtn).toBeInTheDocument();
//     expect(removeBtn.previousSibling).toHaveStyle(`width: 5em`);
//     expect(boxList.getAllByDisplayValue("")).toHaveLength(3);
// });