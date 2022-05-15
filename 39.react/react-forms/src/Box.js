import React from 'react';

function Box({ id, handleRemove, width, height, backgroundColor}) {
  const remove = () => handleRemove(id);

  return (
    <div>
      <div 
        className="box-color" 
        style={{ width: `${width}em`, height: `${height}em`, backgroundColor }}>
        <button onClick={remove}>Remove</button>
      </div>
    </div>
  );
}

export default Box;