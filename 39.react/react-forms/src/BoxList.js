import React, { useState } from 'react';
import Box from './Box';
import BoxNewForm from './BoxNewForm';

function Boxlist() {
  const [ boxes, setBoxes ] = useState([]);
  const add = boxObj => {
    setBoxes(boxes => [...boxes, boxObj]);
  };
  const remove = id => {
    setBoxes(boxes => boxes.filter(box => box.id !== id));
  };

  const boxProps = boxes.map(box => (
    <Box 
      key={box.id}
      id={box.id}
      handleRemove={remove}
      width={box.width}
      height={box.height}
      backgroundColor={box.backgroundColor}
    />
  ));
  
  return (
    <div>
      <BoxNewForm createBox={add} />
      {boxProps}
    </div>
  );
}

export default Boxlist;