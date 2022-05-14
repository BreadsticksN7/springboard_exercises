import React from 'react';

function Box({ width, height, color}) {
  return (
    <div width={width} height={height} background-color={color}>Tacos!</div>
  )
}

export default Box;