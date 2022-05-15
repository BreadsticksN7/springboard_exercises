import React from 'react';

function Box({ id, handleRemove, width, height, backgroundColor}) {
  const remove = () => handleRemove(id);
  const divStyle = {
    width: {width}+'em',
    height: {height}+'em',
    backgroundColor
  };

  return (
    <div 
      className="box-color" 
      style={{ divStyle }}>
      <button onClick={remove}>X</button>
    </div>
  );
}

export default Box;